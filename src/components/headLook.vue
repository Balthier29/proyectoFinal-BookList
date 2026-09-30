<script setup>
import libroLogin from '@/assets/img/libro-login.gif';
import { tema, alternarTema } from '@/data/tema.js'

defineProps({
  usuarioActivo: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['logout']);

const cerrarSesion = () => {
  emit('logout');
};
</script>

<template>
  <header>
    <div class="titulo">
      <h1>BookList</h1>
      <p>Tu rincón cultural preferido</p>
    </div>

    <div class="navegacion">
      <nav>
        <ul>
          <li><router-link to="/" class="link-nav">Inicio</router-link></li>
          <li><router-link to="/catalogo" class="link-nav">Catalogo</router-link></li>

          <template v-if="!usuarioActivo">
            <li><router-link to="/" class="link-nav">Planes</router-link></li>
            <li><router-link to="/" class="link-nav">Contacto</router-link></li>
          </template>

          <template v-else>
            <li><router-link to="/libros" class="link-nav">libros</router-link></li>
            <li><router-link to="/libros/1" class="link-nav">detalles</router-link></li>
          </template>
        </ul>
      </nav>
    </div>

    <div class="login">
      <router-link v-if="!usuarioActivo" to="/registro">
        <button> 🔐Registrar </button>
      </router-link>
      <div v-else class="sesion-activa">
        <span class="bienvenida">Bienvenido/a, {{ usuarioActivo.nombre }}</span>
        <button type="button" @click="cerrarSesion"> Cerrar Sesión</button>
        <button type="button" class="btn-tema" @click="alternarTema"
          :title="tema.actual === 'dark' ? 'Cambiar a claro' : 'Cambiar a oscuro'">
          {{ tema.actual === 'dark' ? '☀️' : '🌙' }}
        </button>
        <span class="icono">
          <img :src="libroLogin" alt="" width="40">
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primario);
  color: #FFFFFF;
  padding: 12px 0;

  .titulo {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-left: 25px;

    h1 {
      margin: 0;
      font-family: var(--fuente-titulo);
      color: #FFFFFF;
    }

    p {
      margin: 0;
      color: var(--color-texto-sobre-primario);
      font-size: 13px;
    }
  }

  .navegacion {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    nav {
      flex: 1;
    }

    nav ul {
      display: flex;
      justify-content: center;
      list-style: none;
      gap: 20px;
      padding: 0;
      margin: 0;
    }

    nav a.link-nav {
      color: #FFFFFF;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .login {
    margin: 15px 15px;
    display: flex;
    align-items: center;
    gap: 12px;

    button {
      font-size: 14px;
      border-radius: var(--radio-md);
      height: 40px;
      padding: 0 20px;
      border: none;
      background-color: var(--color-acento-fuerte);
      color: #FFFFFF;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background-color: var(--color-acento-hover);
    }
  }

  .sesion-activa {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 600;

    button {
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #FFFFFF;
      font-weight: 500;
    }

    button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .btn-tema {
      border-radius: var(--radio-pill);
      width: 36px;
      height: 36px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>