import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Lectura y formateo de Excel
function leerExcel(archivoRelativo) {
  const rutaCompleta = path.join(rootDir, 'public', 'data', archivoRelativo);
  if (!fs.existsSync(rutaCompleta)) {
    console.warn(`Archivo no encontrado: ${rutaCompleta}`);
    return [];
  }
  const fileBuffer = fs.readFileSync(rutaCompleta);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

console.log('--- Iniciando procesamiento de datos Excel ---');

// Procesamiento de Experiencia (Data.xlsx)
const rawExperiencia = leerExcel('Data.xlsx');
const experiencia = rawExperiencia.map((row, index) => ({
  id: `exp_${index + 1}`,
  Name: row.Name || '',
  Abreviatura: row.Abreviatura || '',
  Cargo: row.Cargo ? row.Cargo.replace(/(\r\n|\n|\r|\\|\|1)/g, '').trim() : '',
  Descripcion: row.Descripcion
    ? row.Descripcion.replace(/1/g, '-' + '&nbsp;'.repeat(5)).replace(/(\r\n|\n|\r|\\|\|1)/g, '').trim()
    : '',
  competencias: row.competencias
    ? row.competencias.replace(/1/g, '&nbsp;'.repeat(5)).replace(/(\r\n|\n|\r|\\|\|1)/g, '').trim()
    : '',
  Tecnologias: typeof row.Tecnologias === 'string'
    ? row.Tecnologias.split(',').map((t) => t.trim().toLowerCase())
    : [],
  orden: index + 1
}));

// Procesamiento de Contribuciones (Data_2.xlsx)
const rawContribuciones = leerExcel('Data_2.xlsx');
const contribuciones = rawContribuciones.map((row, index) => ({
  id: `cont_${index + 1}`,
  Name: row.Name || '',
  Abreviatura: row.Abreviatura || '',
  Institucion: row.Institucion || '',
  Descripcion: row.Descripcion ? row.Descripcion.trim() : '',
  Rol: row.Rol || '',
  Tecnologias: typeof row.Tecnologias === 'string'
    ? row.Tecnologias.split(',').map((t) => t.trim().toLowerCase())
    : [],
  orden: index + 1
}));

// Procesamiento de Proyectos (Data_3.xlsx)
const rawProyectos = leerExcel('Data_3.xlsx');
const destacadosDefault = ['roz', 'neo', 'planb', 'paralelo'];

const proyectos = rawProyectos.map((row, index) => {
  const abrev = row.Abreviatura || `proj_${index + 1}`;
  return {
    id: abrev,
    Name: row.Name || '',
    titulo: row.Name ? row.Name.replace(/<br>/g, ' ') : '',
    Abreviatura: abrev,
    Descripcion: row.Descripcion ? row.Descripcion.trim() : '',
    descripcion: row.Descripcion ? row.Descripcion.trim() : '',
    Tecnologias: typeof row.Tecnologias === 'string'
      ? row.Tecnologias.split(',').map((t) => t.trim().toLowerCase())
      : [],
    tecnologias: typeof row.Tecnologias === 'string'
      ? row.Tecnologias.split(',').map((t) => t.trim().toLowerCase())
      : [],
    despliegue: row.despliegue || 'null',
    destacado: destacadosDefault.includes(abrev),
    orden: index + 1,
    imagenes: [],
    repoUrl: '',
    demoUrl: '',
    fechaCreacion: new Date(2024, index, 1).toISOString()
  };
});

const configSite = {
  seccionesActivas: {
    about: true,
    experiencia: true,
    contribuciones: true,
    proyectos: true
  },
  ultimaActualizacion: new Date().toISOString()
};

// 2. Guardar backup JSON local en src/data/initialData.json
const dataDir = path.join(rootDir, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const initialData = {
  config: configSite,
  experiencia,
  contribuciones,
  proyectos
};

fs.writeFileSync(
  path.join(dataDir, 'initialData.json'),
  JSON.stringify(initialData, null, 2),
  'utf-8'
);
console.log('✅ Archivo src/data/initialData.json generado exitosamente.');

// 3. Subir a Firestore si las variables de entorno están presentes
async function subirAFirestore() {
  const apiKey = process.env.VITE_FIREBASE_API_KEY;
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;

  if (!apiKey || !projectId) {
    console.log('ℹ️ Variables VITE_FIREBASE_API_KEY y VITE_FIREBASE_PROJECT_ID no detectadas en entorno Node.');
    console.log('   Los datos locales iniciales están listos para useFirestoreCollection.');
    return;
  }

  try {
    console.log(`Conectando a Firebase Project: ${projectId}...`);
    const app = initializeApp({
      apiKey,
      projectId,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      appId: process.env.VITE_FIREBASE_APP_ID
    });
    const db = getFirestore(app);

    // Guardar config
    await setDoc(doc(db, 'config', 'site'), configSite);
    console.log('✅ Configuración guardada en Firestore.');

    // Guardar proyectos
    for (const proj of proyectos) {
      await setDoc(doc(db, 'proyectos', proj.id), proj);
    }
    console.log(`✅ ${proyectos.length} proyectos guardados en Firestore.`);

    // Guardar experiencia
    for (const exp of experiencia) {
      await setDoc(doc(db, 'experiencia', exp.id), exp);
    }
    console.log(`✅ ${experiencia.length} experiencias guardadas en Firestore.`);

    // Guardar contribuciones
    for (const cont of contribuciones) {
      await setDoc(doc(db, 'contribuciones', cont.id), cont);
    }
    console.log(`✅ ${contribuciones.length} contribuciones guardadas en Firestore.`);
  } catch (error) {
    console.error('Error al subir a Firestore:', error);
  }
}

subirAFirestore();
