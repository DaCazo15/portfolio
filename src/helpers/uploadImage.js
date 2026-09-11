import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from '../firebase';

/**
 * Sube una imagen a Firebase Storage en la ruta proyectos/{id}/{timestamp}_{filename}
 * 
 * @param {File} file - Archivo de imagen seleccionado
 * @param {string} proyectoId - Identificador del proyecto
 * @returns {Promise<string>} URL pública de descarga de la imagen
 */
export async function uploadProjectImage(file, proyectoId = 'general') {
  if (!storage || !isFirebaseConfigured) {
    throw new Error('Firebase Storage no está configurado. Por favor define las variables VITE_FIREBASE_* en tu archivo .env');
  }

  if (!file) throw new Error('No se proporcionó ningún archivo de imagen');

  // Validaciones
  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo debe ser una imagen válida (.png, .jpg, .webp, .svg)');
  }

  const maxSize = 5 * 1024 * 1024; // 5 MB
  if (file.size > maxSize) {
    throw new Error('La imagen no debe superar los 5 MB de tamaño');
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `proyectos/${proyectoId}/${Date.now()}_${cleanName}`;
  const fileRef = storageRef(storage, path);

  const snapshot = await uploadBytes(fileRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);

  return downloadUrl;
}
