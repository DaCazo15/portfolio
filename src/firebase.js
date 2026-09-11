import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID

// Validar si las credenciales de Firebase están correctamente provistas en el entorno
export const isFirebaseConfigured = Boolean(
  apiKey && 
  typeof apiKey === 'string' &&
  apiKey.trim() !== '' && 
  apiKey !== 'tu_api_key' &&
  projectId &&
  typeof projectId === 'string' &&
  projectId.trim() !== '' &&
  projectId !== 'tu_proyecto_id'
)

let firebaseApp = null
let db = null
let auth = null
let storage = null

if (isFirebaseConfigured) {
  try {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }

    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    db = getFirestore(firebaseApp)
    auth = getAuth(firebaseApp)
    storage = getStorage(firebaseApp)
  } catch (err) {
    console.warn('⚠️ No se pudo inicializar Firebase con las credenciales provistas:', err.message)
  }
} else {
  console.info('ℹ️ Modo local activo: Firebase no configurado en .env. Se utilizarán datos locales iniciales.')
}

export { firebaseApp, db, auth, storage }
