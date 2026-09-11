import { ref, onMounted, onUnmounted } from 'vue';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';
import initialData from '../data/initialData.json';

/**
 * Composable para interactuar de forma reactiva con colecciones de Firestore
 * con soporte de tiempo real y fallback automático a datos locales iniciales.
 * 
 * @param {string} collectionName - Nombre de la colección ('proyectos', 'experiencia', 'contribuciones', 'config')
 * @param {Object} options - Opciones de configuración (realtime, autoFetch, orderByField)
 */
export function useFirestoreCollection(collectionName, options = {}) {
  const {
    realtime = false,
    autoFetch = true,
    orderByField = 'orden'
  } = options;

  const data = ref(initialData[collectionName] || []);
  const loading = ref(false);
  const error = ref(null);
  let unsubscribe = null;

  // Función para obtener datos de Firestore con fallback robusto
  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Si la colección es 'config', tratamos el documento 'site'
      if (collectionName === 'config') {
        const docRef = doc(db, 'config', 'site');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          data.value = docSnap.data();
        } else {
          data.value = initialData.config || {};
        }
        return data.value;
      }

      let q = collection(db, collectionName);
      if (orderByField) {
        try {
          q = query(q, orderBy(orderByField));
        } catch {
          q = collection(db, collectionName);
        }
      }

      if (realtime) {
        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (!snapshot.empty) {
              data.value = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data()
              }));
            } else if (initialData[collectionName]) {
              data.value = initialData[collectionName];
            }
            loading.value = false;
          },
          (err) => {
            console.warn(`Firestore snapshot error en ${collectionName}:`, err.message);
            error.value = err.message;
            if (initialData[collectionName]) {
              data.value = initialData[collectionName];
            }
            loading.value = false;
          }
        );
      } else {
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          data.value = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
        } else if (initialData[collectionName]) {
          data.value = initialData[collectionName];
        }
      }
    } catch (err) {
      console.warn(`Error al consultar Firestore (${collectionName}):`, err.message);
      error.value = err.message;
      if (initialData[collectionName]) {
        data.value = initialData[collectionName];
      }
    } finally {
      if (!realtime) {
        loading.value = false;
      }
    }
  };

  // Operaciones de escritura para el panel de administración
  const addItem = async (itemData) => {
    try {
      const colRef = collection(db, collectionName);
      const docRef = await addDoc(colRef, {
        ...itemData,
        fechaCreacion: new Date().toISOString()
      });
      return docRef.id;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, itemData);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateConfigSite = async (newConfig) => {
    try {
      const docRef = doc(db, 'config', 'site');
      await setDoc(docRef, {
        ...newConfig,
        ultimaActualizacion: new Date().toISOString()
      }, { merge: true });
      data.value = { ...data.value, ...newConfig };
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  if (autoFetch) {
    onMounted(() => {
      fetchData();
    });
  }

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return {
    data,
    loading,
    error,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
    updateConfigSite
  };
}

export default useFirestoreCollection;
