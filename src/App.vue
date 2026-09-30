<script setup>
import api from '@/api/index.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { sesion, cerrarSesion } from '@/data/sesion.js'

import headLook from './components/headLook.vue';
import FooterLook from './components/FooterLook.vue';


const router = useRouter();
const store = useStore();

const usuarios = ref([]);

onMounted(async () => {
  store.dispatch('productos/cargarLibros')

  const resUsuarios = await api.get('/usuarios')
  usuarios.value = resUsuarios.data
})

const registrarUsuario = async (nuevoUsuario) => {
  try {
    const res = await api.post('/usuarios', nuevoUsuario)
    usuarios.value.push(res.data);
  } catch (error) {
    console.error('Error al registrar el usuario:', error)
  }
};

const loginUsuario = () => {
  router.push('/libros')
};

const logout = () => {
  cerrarSesion();
  router.push('/');
};

</script>

<template>
  <div>
    <headLook :usuario-activo="sesion.usuario" @logout="logout" />
    <main class="contenedor">
      <router-view :usuarios="usuarios" :usuario-activo="sesion.usuario" @registrar-usuario="registrarUsuario"
        @login-usuario="loginUsuario" />

    </main>
    <FooterLook />
  </div>
</template>

<style></style>