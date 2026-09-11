<script setup>
import { ref } from 'vue';
import { useFirestoreCollection } from '../../composables/useFirestoreCollection';

const { data: contribuciones, loading, addItem, updateItem, deleteItem } = useFirestoreCollection('contribuciones', {
  autoFetch: true,
  realtime: true
});

const modalAbierto = ref(false);
const editandoId = ref(null);
const guardando = ref(false);
const errorForm = ref('');

const formulario = ref({
  Name: '',
  Abreviatura: '',
  Institucion: '',
  Descripcion: '',
  Rol: '',
  tecnologiasTexto: '',
  orden: 1
});

const abrirNuevo = () => {
  editandoId.value = null;
  errorForm.value = '';
  formulario.value = {
    Name: '',
    Abreviatura: '',
    Institucion: '',
    Descripcion: '',
    Rol: '',
    tecnologiasTexto: '',
    orden: (contribuciones.value?.length || 0) + 1
  };
  modalAbierto.value = true;
};

const abrirEditar = (item) => {
  editandoId.value = item.id;
  errorForm.value = '';
  formulario.value = {
    Name: item.Name || '',
    Abreviatura: item.Abreviatura || '',
    Institucion: item.Institucion || '',
    Descripcion: item.Descripcion || '',
    Rol: item.Rol || '',
    tecnologiasTexto: Array.isArray(item.Tecnologias) ? item.Tecnologias.join(', ') : '',
    orden: item.orden ?? 1
  };
  modalAbierto.value = true;
};

const cerrarModal = () => {
  modalAbierto.value = false;
  editandoId.value = null;
};

const guardarContribucion = async () => {
  if (!formulario.value.Name.trim()) {
    errorForm.value = 'El título de la contribución es obligatorio.';
    return;
  }

  guardando.value = true;
  errorForm.value = '';

  const tecnologiasArray = formulario.value.tecnologiasTexto
    ? formulario.value.tecnologiasTexto.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
    : [];

  const payload = {
    Name: formulario.value.Name.trim(),
    Abreviatura: formulario.value.Abreviatura.trim() || formulario.value.Name.trim().slice(0, 8),
    Institucion: formulario.value.Institucion.trim(),
    Descripcion: formulario.value.Descripcion.trim(),
    Rol: formulario.value.Rol.trim(),
    Tecnologias: tecnologiasArray,
    orden: Number(formulario.value.orden) || 1
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

const confirmarEliminar = async (id, name) => {
  if (confirm(`¿Estás seguro de eliminar la contribución "${name}"?`)) {
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
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-800">
      <div>
        <h2 class="text-xl font-bold font-['Rubik'] text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
          <i class="bi bi-stars text-[var(--verde-cian)]"></i>
          Gestión de Contribuciones
        </h2>
        <p class="text-xs text-gray-400 mt-1">Administra proyectos académicos, bootcamps y colaboraciones</p>
      </div>

      <button 
        @click="abrirNuevo"
        class="py-2.5 px-4 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-semibold text-xs transition duration-200 shadow-md flex items-center gap-2 cursor-pointer w-fit"
      >
        <i class="bi bi-plus-lg"></i>
        Nueva Contribución
      </button>
    </div>

    <!-- Lista -->
    <div v-if="loading && (!contribuciones || contribuciones.length === 0)" class="py-12 text-center text-gray-400">
      <i class="bi bi-arrow-repeat animate-spin text-3xl text-[var(--verde-cian)] block mb-2"></i>
      Cargando contribuciones...
    </div>

    <div v-else class="space-y-3">
      <div 
        v-for="item in contribuciones" 
        :key="item.id"
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-gray-700 transition"
      >
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-800 text-xs text-gray-300 font-bold">
            #{{ item.orden || 1 }}
          </span>
          <div>
            <h3 class="text-sm font-bold text-[var(--gris-claro)] m-0 text-left" v-html="item.Name"></h3>
            <p class="text-xs text-[var(--verde-cian)] mt-0.5 text-left">
              {{ item.Institucion }} — <span class="text-gray-400">{{ item.Rol }}</span>
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
            @click="confirmarEliminar(item.id, item.Name)"
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
            {{ editandoId ? 'Editar Contribución' : 'Nueva Contribución' }}
          </h3>
          <button @click="cerrarModal" class="text-gray-400 hover:text-white text-lg cursor-pointer">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div v-if="errorForm" class="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
          {{ errorForm }}
        </div>

        <form @submit.prevent="guardarContribucion" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Nombre / Título *</label>
              <input 
                v-model="formulario.Name" 
                type="text" 
                required 
                placeholder="Ej: E-28 Extrusora de Filamento"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Abreviatura / Clave</label>
              <input 
                v-model="formulario.Abreviatura" 
                type="text" 
                placeholder="Ej: E-28"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Institución / Evento</label>
              <input 
                v-model="formulario.Institucion" 
                type="text" 
                placeholder="Ej: Colegio Guayamuri / HUB Networking"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Rol Desempeñado</label>
              <input 
                v-model="formulario.Rol" 
                type="text" 
                placeholder="Ej: Software Developer / Líder Técnico"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Descripción</label>
            <textarea 
              v-model="formulario.Descripcion" 
              rows="3" 
              placeholder="Detalles sobre el alcance y la solución..."
              class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Tecnologías (separadas por coma)</label>
              <input 
                v-model="formulario.tecnologiasTexto" 
                type="text" 
                placeholder="Arduino, Python, TensorFlow"
                class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2 px-3 text-xs text-[var(--gris-claro)] outline-none"
              />
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

          <!-- Botones -->
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
              :disabled="guardando"
              class="py-2 px-5 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-semibold text-xs transition flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <i v-if="guardando" class="bi bi-arrow-repeat animate-spin"></i>
              {{ guardando ? 'Guardando...' : 'Guardar Contribución' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
