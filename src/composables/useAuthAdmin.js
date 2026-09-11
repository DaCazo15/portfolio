import { ref, onMounted } from 'vue';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';

const user = ref(null);
const loading = ref(true);
const error = ref(null);

export function useAuthAdmin() {
  const login = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      return userCredential.user;
    } catch (err) {
      console.error('Error en autenticación:', err);
      let mensaje = 'Error al iniciar sesión. Verifica tus credenciales.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        mensaje = 'Correo o contraseña incorrectos.';
      } else if (err.code === 'auth/too-many-requests') {
        mensaje = 'Demasiados intentos fallidos. Inténtalo más tarde.';
      }
      error.value = mensaje;
      throw new Error(mensaje);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await signOut(auth);
      user.value = null;
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      loading.value = false;
    });
  });

  return {
    user,
    loading,
    error,
    login,
    logout
  };
}

export default useAuthAdmin;
