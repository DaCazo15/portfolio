<script setup>
import { ref } from 'vue';
import { useFirestoreCollection } from '../../composables/useFirestoreCollection';
import { uploadProjectImage } from '../../helpers/uploadImage';

const { data: proyectos, loading, addItem, updateItem, deleteItem } = useFirestoreCollection('proyectos', {
  autoFetch: true,
  realtime: true
});

const modalAbierto = ref(false);
const editandoId = ref(null);
const subiendoImagen = ref(false);
const guardando = ref(false);
const errorForm = ref('');

const formulario = ref({
  titulo: '',
  Abreviatura: '',
  descripcion: '',
  tecnologiasTexto: '',
  despliegue: 'Netlify',
  destacado: false,
  orden: 1,
  repoUrl: '',
  demoUrl: '',
  imagenes: []
});

const abrirNuevo = () => {
  editandoId.value = null;
  errorForm.value = '';
  formulario.value = {
    titulo: '',
    Abreviatura: '',
    descripcion: '',
    tecnologiasTexto: '',
    despliegue: 'Netlify',
    destacado: false,
    orden: (proyectos.value?.length || 0) + 1,
    repoUrl: '',
    demoUrl: '',
    imagenes: []
  };
  modalAbierto.value = true;
};

const abrirEditar = (item) => {
  editandoId.value = item.id;
  errorForm.value = '';
  formulario.value = {
    titulo: item.titulo || item.Name || '',
    Abreviatura: item.Abreviatura || '',
    descripcion: item.descripcion || item.Descripcion || '',
    tecnologiasTexto: Array.isArray(item.Tecnologias || item.tecnologias) 
      ? (item.Tecnologias || item.tecnologias).join(', ') 
      : '',
    despliegue: item.despliegue || 'null',
    destacado: !!item.destacado,
    orden: item.orden ?? 1,
    repoUrl: item.repoUrl || '',
    demoUrl: item.demoUrl || '',
    imagenes: Array.isArray(item.imagenes) ? [...item.imagenes] : []
  };
  modalAbierto.value = true;
};

const cerrarModal = () => {
  modalAbierto.value = false;
  editandoId.value = null;
};

const handleSubirImagen = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  subiendoImagen.value = true;
  errorForm.value = '';
  try {
    const idParaPath = editandoId.value || formulario.value.Abreviatura || 'nuevo';
    const urlDescarga = await uploadProjectImage(file, idParaPath);
    formulario.value.imagenes.push(urlDescarga);
  } catch (err) {
    errorForm.value = `Error al subir imagen: ${err.message}`;
  } finally {
    subiendoImagen.value = false;
    event.target.value = '';
  }
};

const eliminarImagen = (index) => {
  formulario.value.imagenes.splice(index, 1);
};

const guardarProyecto = async () => {
  if (!formulario.value.titulo.trim()) {
    errorForm.value = 'El título del proyecto es obligatorio.';
    return;
  }

  guardando.value = true;
  errorForm.value = '';

  const tecnologiasArray = formulario.value.tecnologiasTexto
    ? formulario.value.tecnologiasTexto.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
    : [];

  const payload = {
    titulo: formulario.value.titulo.trim(),
    Name: formulario.value.titulo.trim(),
    Abreviatura: formulario.value.Abreviatura.trim() || formulario.value.titulo.trim().toLowerCase().slice(0, 6),
    descripcion: formulario.value.descripcion.trim(),
    Descripcion: formulario.value.descripcion.trim(),
    tecnologias: tecnologiasArray,
    Tecnologias: tecnologiasArray,
    despliegue: formulario.value.despliegue,
    destacado: formulario.value.destacado,
    orden: Number(formulario.value.orden) || 1,
    repoUrl: formulario.value.repoUrl.trim(),
    demoUrl: formulario.value.demoUrl.trim(),
    imagenes: formulario.value.imagenes
  };

  try {
    if (editandoId.value) {
      await updateItem(editandoId.value, payload);
    } else {
      await addItem(payload);
    }
    cerrarModal();
  } catch (err) {
    errorForm.value = `Error al guardar: ${err.message}`;
  } finally {
    guardando.value = false;
  }
};

const confirmarEliminar = async (id, titulo) => {
  if (confirm(`¿Estás seguro de que deseas eliminar el proyecto "${titulo}"?`)) {
    try {
      await deleteItem(id);
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`);
    }
  }
};
</script>

<template>
  <div class="bg-[rgba(var(--gris-oscuroRGB),0.7)] border border-gray-800 rounded-2xl p-6 md:p-8 backdrop-blur-md">
    <!-- Encabezado de la Sección -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-800">
      <div>
        <h2 class="text-xl font-bold font-['Rubik'] text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
          <i class="bi bi-folder2-open text-[var(--verde-cian)]"></i>
          Gestión de Proyectos
        </h2>
        <p class="text-xs text-gray-400 mt-1">Crea, edita, ordena y marca los proyectos destacados</p>
      </div>

      <button 
        @click="abrirNuevo"
        class="py-2.5 px-4 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-semibold text-xs transition duration-200 shadow-md flex items-center gap-2 cursor-pointer w-fit"
      >
        <i class="bi bi-plus-lg"></i>
        Nuevo Proyecto
      </button>
    </div>

    <!-- Lista de Proyectos -->
    <div v-if="loading && (!proyectos || proyectos.length === 0)" class="py-12 text-center text-gray-400">
      <i class="bi bi-arrow-repeat animate-spin text-3xl text-[var(--verde-cian)] block mb-2"></i>
      Cargando proyectos...
    </div>

    <div v-else class="space-y-3">
      <div 
        v-for="item in proyectos" 
        :key="item.id"
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-gray-700 transition"
      >
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-800 text-xs text-gray-300 font-bold">
            #{{ item.orden || 1 }}
          </span>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-bold text-[var(--gris-claro)] m-0 text-left">
                {{ item.titulo || item.Name }}
              </h3>
              <span 
                v-if="item.destacado" 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1"
              >
                <i class="bi bi-star-fill text-[8px]"></i> Destacado
              </span>
            </div>
            <p class="text-xs text-gray-400 line-clamp-1 mt-1 max-w-xl text-left">
              {{ item.descripcion || item.Descripcion }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-end md:self-center">
          <button 
            @click="abrirEditar(item)"
            class="py-1.5 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <i class="bi bi-pencil-square text-[var(--verde-cian)]"></i>
            Editar
          </button>
          <button 
            @click="confirmarEliminar(item.id, item.titulo || item.Name)"
            class="py-1.5 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <i class="bi bi-trash"></i>
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Formulario CRUD -->
    <div v-if="modalAbierto" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="w-full max-w-2xl bg-[var(--gris-oscuro)] border border-gray-700 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex items-center justify-between pb-3 mb-5 border-b border-gray-700">
          <h3 class="text-lg font-bold font-['Rubik'] text-[var(--gris-claro)] m-0">
            {{ editandoId ? 'Editar Proyecto' : 'Nuevo Proyecto' }}
          </h3>
          <button @click="cerrarModal" class="text-gray-400 hover:text-white text-lg cursor-pointer">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div v-if="errorForm" class="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
          {{ errorForm }}
        </div>

        <form @submit.prevent="guardarProyecto" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Título del Proyecto *</label>
              <input 
                v-model="formulario.titulo" 
                type="text" 
                required 
                placeholder="Ej: PlanB: Control de Gastos"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Abreviatura / Slug</label>
              <input 
                v-model="formulario.Abreviatura" 
                type="text" 
                placeholder="Ej: planb"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Descripción</label>
            <textarea 
              v-model="formulario.descripcion" 
              rows="3" 
              placeholder="Resumen del proyecto..."
              class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Tecnologías (separadas por coma)</label>
              <input 
                v-model="formulario.tecnologiasTexto" 
                type="text" 
                placeholder="Vue, Tailwind, Firebase"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Despliegue</label>
              <select 
                v-model="formulario.despliegue"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              >
                <option value="Netlify">Netlify</option>
                <option value="Vercel">Vercel</option>
                <option value="RobloxStudio">RobloxStudio</option>
                <option value="null">Ninguno / Local</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Orden</label>
              <input 
                v-model.number="formulario.orden" 
                type="number" 
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">URL Repositorio</label>
              <input 
                v-model="formulario.repoUrl" 
                type="url" 
                placeholder="https://github.com/..."
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">URL Demo</label>
              <input 
                v-model="formulario.demoUrl" 
                type="url" 
                placeholder="https://..."
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
          </div>

          <!-- Checkbox Destacado -->
          <div class="pt-2">
            <label class="inline-flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="formulario.destacado" 
                class="w-4 h-4 accent-[var(--verde-cian)]"
              />
              <span class="text-xs font-semibold text-amber-300 flex items-center gap-1">
                <i class="bi bi-star-fill text-xs"></i>
                Destacar en Carrusel de Inicio (sugerido máx. 5)
              </span>
            </label>
          </div>

          <!-- Subida de Imágenes a Firebase Storage -->
          <div class="pt-3 border-t border-gray-700">
            <label class="block text-xs font-semibold text-gray-300 mb-2">Imágenes en Firebase Storage</label>
            <div class="flex items-center gap-3 mb-3">
              <label class="py-2 px-3.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 text-xs text-gray-200 cursor-pointer flex items-center gap-2 transition">
                <i class="bi bi-cloud-arrow-up text-[var(--verde-cian)] text-sm"></i>
                <span>{{ subiendoImagen ? 'Subiendo...' : 'Subir Imagen' }}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  @change="handleSubirImagen" 
                  :disabled="subiendoImagen" 
                  class="hidden"
                />
              </label>
              <span class="text-[11px] text-gray-400">Máx 5MB (.webp, .png, .jpg)</span>
            </div>

            <!-- Previsualización de imágenes añadidas -->
            <div v-if="formulario.imagenes.length" class="grid grid-cols-3 gap-2">
              <div 
                v-for="(imgUrl, idx) in formulario.imagenes" 
                :key="idx" 
                class="relative rounded-lg overflow-hidden border border-gray-700 group h-20 bg-black/40"
              >
                <img :src="imgUrl" alt="preview" class="w-full h-full object-cover" />
                <button 
                  type="button" 
                  @click="eliminarImagen(idx)"
                  class="absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white rounded-md p-1 text-xs transition cursor-pointer"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button 
              type="button" 
              @click="cerrarModal"
              class="py-2 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              :disabled="guardando || subiendoImagen"
              class="py-2 px-5 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-semibold text-xs transition flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <i v-if="guardando" class="bi bi-arrow-repeat animate-spin"></i>
              {{ guardando ? 'Guardando...' : 'Guardar Proyecto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
