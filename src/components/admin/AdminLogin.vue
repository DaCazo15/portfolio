<script setup>
import { ref } from 'vue';
import { useAuthAdmin } from '../../composables/useAuthAdmin';

const emit = defineEmits(['login-success', 'volver']);
const { login, loginDev, loading, error, isConfigured } = useAuthAdmin();

const email = ref('dcazorla.0190@gmail.com');
const password = ref('');
const showPassword = ref(false);

const handleLogin = async () => {
  if (!email.value) return;
  try {
    await login(email.value, password.value);
    emit('login-success');
  } catch (err) {
    // Error ya gestionado en composable
  }
};

const handleDevLogin = () => {
  loginDev(email.value || 'dcazorla.0190@gmail.com');
  emit('login-success');
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-[var(--fondo-negro)]">
    <div class="w-full max-w-md bg-[rgba(var(--gris-oscuroRGB),0.85)] border border-[var(--verde-cian)]/30 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
      <!-- Encabezado -->
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--verde-cian)]/15 text-[var(--verde-cian)] mb-3 text-3xl border border-[var(--verde-cian)]/40 shadow-lg shadow-[var(--verde-cian)]/20">
          <i class="bi bi-terminal"></i>
        </div>
        <h1 class="text-2xl font-bold font-['Rubik'] text-[var(--gris-claro)] tracking-wide">
          Panel de Control <span class="text-[var(--verde-cian)]">CMD</span>
        </h1>
        <p class="text-xs text-gray-400 mt-1">Acceso de administración para Daniel Cazorla</p>
      </div>

      <!-- Alerta de Error -->
      <div v-if="error" class="mb-5 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
        <i class="bi bi-exclamation-octagon text-base text-red-400 shrink-0"></i>
        <span>{{ error }}</span>
      </div>

      <!-- Formulario de Inicio de Sesión -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
            Correo Electrónico
          </label>
          <div class="relative">
            <i class="bi bi-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              v-model="email" 
              type="email" 
              required
              placeholder="dcazorla.0190@gmail.com"
              class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--gris-claro)] outline-none transition"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
            Contraseña
          </label>
          <div class="relative">
            <i class="bi bi-key absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              :required="isConfigured"
              placeholder="••••••••"
              class="w-full bg-[var(--fondo-negro)] border border-gray-700 focus:border-[var(--verde-cian)] rounded-xl py-2.5 pl-10 pr-10 text-sm text-[var(--gris-claro)] outline-none transition"
            />
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--verde-cian)] transition cursor-pointer"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-3 px-4 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-semibold text-sm transition duration-200 shadow-lg shadow-[var(--verde-cian)]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span v-if="loading" class="inline-block animate-spin">
            <i class="bi bi-arrow-repeat text-lg"></i>
          </span>
          <span v-else>
            <i class="bi bi-box-arrow-in-right"></i> Entrar al Panel CMD
          </span>
        </button>
      </form>

      <!-- Mensaje si Firebase no está configurado -->
      <div v-if="!isConfigured" class="mt-4 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs text-left">
        <div class="flex items-center gap-2 font-bold mb-1 text-cyan-300">
          <i class="bi bi-info-circle-fill"></i>
          <span>Modo Local Activo</span>
        </div>
        <p class="text-[11px] text-gray-300 mb-2 leading-relaxed">
          Puedes ingresar directamente para probar y gestionar el portafolio en modo local:
        </p>
        <button 
          type="button" 
          @click="handleDevLogin"
          class="w-full py-2 px-3 rounded-lg bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-bold text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <i class="bi bi-lightning-charge-fill"></i> Acceso Rápido Local
        </button>
      </div>

      <!-- Botón de regreso -->
      <div class="mt-6 text-center">
        <button 
          @click="emit('volver')"
          class="text-xs text-gray-400 hover:text-[var(--verde-cian)] transition flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
        >
          <i class="bi bi-arrow-left"></i> Volver al Portafolio
        </button>
      </div>
    </div>
  </div>
</template>
