<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import libroSinImagen from '@/assets/img/libro-de-lectura.webp';

const store = useStore();
const libros = computed(() => 
store.getters['productos/libros'].filter (l => l.estado === 'Publicado'));

const indiceActual = ref(0);

const libroActual = computed(() => libros.value[indiceActual.value]);

const anterior = () => {
    indiceActual.value = indiceActual.value === 0 
    ? libros.value.length - 1 
    : indiceActual.value - 1;
};

const siguiente = () => {
  indiceActual.value = indiceActual.value === libros.value.length - 1 
    ? 0 
    : indiceActual.value + 1;
};

const irA = (i) => {
  indiceActual.value = i;
};
</script>

<template>
  <div class="pagina-catalogo">
    <div class="encabezado-catalogo">
      <h1>Nuestro Catálogo</h1>
      <p>Descubre los títulos publicados por Editorial Nova.</p>
    </div>

    <div class="carrusel" v-if="libros.length > 0">
      <button class="flecha izquierda" @click="anterior">↩️</button>

      <div class="tarjeta-carrusel">
        <img v-if="libroActual.imagen" :src="libroActual.imagen" :alt="libroActual.titulo">
        <img v-else :src="libroSinImagen" alt="sin portada disponible" class="sin-imagen">

        <div class="info-carrusel">
          <span class="badge">{{ libroActual.categoria }}</span>
          <h2>{{ libroActual.titulo }}</h2>
          <p class="autor">{{ libroActual.autor }}</p>
          <p class="descripcion">
            {{ libroActual.descripcion || 'Descubre esta obra en nuestro Catálogo.' }}
          </p>
        </div>
      </div>
      <button class="flecha derecha" @click="siguiente">↪️</button>
    </div>

    <div class="puntos" v-if="libros.length > 0">
      <span 
        v-for="(libro, i) in libros" 
        :key="i" 
        class="punto" 
        :class="{ activo: i === indiceActual }"
        @click="irA(i)"
      ></span>
    </div>
    <p v-else class="vacio">Aún no hay libros publicados en el catálogo</p>
  </div>
</template>

<style scoped>

.pagina-catalogo {
  background: var(--color-fondo);
  padding: var(--espacio-xl) 24px;
}

.encabezado-catalogo {
  text-align: center;
  margin-top: var(--espacio-lg);
  margin-bottom: var(--espacio-xl);
}

.encabezado-catalogo h1 {
  font-family: var(--fuente-titulo);
  color: var(--color-texto);
  font-size: 28px;
  margin: 0 0 6px 0;
}

.encabezado-catalogo p {
  color: var(--color-texto-suave);
  margin: 0;
}

.carrusel {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--espacio-md);
}

.tarjeta-carrusel {
  background: var(--color-superficie);
  border-radius: var(--radio-xl);
  box-shadow: 0 10px 30px rgba(26, 35, 50, 0.1);
  padding: var(--espacio-xl);
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--espacio-lg);
  flex: 1;
  align-items: center;

}

.tarjeta-carrusel img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: var(--radio-lg);
}

.tarjeta-carrusel img.sin-imagen {
  object-fit: contain;
  background: var(--color-fondo);
}

.badge {
  display: inline-block;
  background: var(--color-info-bg);
  color: var(--color-info);
  font-size: 11px;
  padding: 3px 10px;
  border-radius: var(--radio-pill);
  margin-bottom: 10px;
}

.info-carrusel h2 {
  margin: 0 0 4px 0;
  font-size: 22px;
  color: var(--color-texto);
}

.autor {
  color: var(--color-texto-suave);
  margin: 0 0 14px 0;
}

.descripcion {
  color: var(--color-texto);
  font-size: 14px;
  line-height: 1.6;
}

.flecha {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 22px;
  color: var(--color-primario);
  cursor: pointer;
  flex-shrink: 0;
}

.flecha:hover {
  background: var(--color-primario);
  color: white;
}

.puntos {
  display: flex;
  justify-content: center;
  gap: var(--espacio-xs);
  margin-top: var(--espacio-lg);
}

.punto {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #CBD5E1;
  cursor: pointer;
}

.punto.activo {
  background: var(--color-primario);
  width: 22px;
  border-radius: 4px;
}

.vacio {
  text-align: center;
  color: var(--color-texto-suave);
}

@media (max-width: 600px) {
  .tarjeta-carrusel {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .tarjeta-carrusel img {
    max-width: 160px;
    margin: 0 auto;
  }
}
</style>