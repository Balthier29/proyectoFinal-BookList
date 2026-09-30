<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TarjetaProceso from '@/components/TarjetaProceso.vue';
import iconoCatalogo from '@/assets/img/iconoCatalogo.gif';
import iconoEdicion from '@/assets/img/iconoEdicion.gif';
import iconoPublicacion from '@/assets/img/iconoPublicacion.gif';

defineProps({
  usuarioActivo: {
    type: Object,
    default: null
  }
});

const store = useStore();
const libros = computed(() => store.getters['productos/libros']);

const totalLibros = computed(() => libros.value.length);

const publicados = computed(() =>
  libros.value.filter(l => l.estado === 'Publicado').length
);

const enDiseno = computed(() =>
  libros.value.filter(l => l.estado === 'En diseño').length
);

const enEdicion = computed(() =>
  libros.value.filter(l => l.estado === 'En edición').length
);

const ultimosLibros = computed(() =>
  libros.value.slice(-3).reverse()
);

const colorEstado = (estado) => {
  if (estado === 'Publicado') return 'badge-exito';
  if (estado === 'En edición') return 'badge-advertencia';
  return 'badge-info';
};
</script>

<template>
  <div class="panel">
    <div v-if="usuarioActivo">
      <div class="encabezado">
        <h1>Panel de gestión editorial</h1>
        <p>Resumen del catálogo interno de publicaciones</p>
      </div>

      <div class="metricas">
        <div class="tarjeta-metrica">
          <span class="etiqueta">Total Títulos</span>
          <span class="valor">{{ totalLibros }}</span>
        </div>
        <div class="tarjeta-metrica">
          <span class="etiqueta">Publicados</span>
          <span class="valor exito">{{ publicados }}</span>
        </div>
        <div class="tarjeta-metrica">
          <span class="etiqueta">En diseño</span>
          <span class="valor info">{{ enDiseno }}</span>
        </div>
        <div class="tarjeta-metrica">
          <span class="etiqueta">En edición</span>
          <span class="valor advertencia">{{ enEdicion }}</span>
        </div>
      </div>

      <div class="contenido-inferior">
        <div class="tarjeta-lista">
          <h3>Últimos títulos agregados</h3>
          <div v-if="ultimosLibros.length === 0" class="vacio">Aún no hay libros registrados.</div>
          <div v-for="(libro, i) in ultimosLibros" :key="i" class="fila-libro">
            <span>{{ libro.titulo }}</span>
            <span class="badge" :class="colorEstado(libro.estado)">{{ libro.estado }}</span>
          </div>
        </div>

        <div class="tarjeta-cta">
          <h3>Gestiona el catálogo</h3>
          <p>Registra, filtra y actualiza los títulos publicados por la editorial.</p>
          <router-link to="/catalogo">
            <button type="button">Ver catálogo</button>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="landing">
      <h1>Editorial Nova Booklist</h1>
      <p class="subtitulo">Panel interno de gestión editorial — Editorial Nova</p>
      <p class="descripcion">Inicia sesión o regístrate para acceder al catálogo.</p>
      <router-link to="/registro">
        <button type="button">Ingresar al sistema</button>
      </router-link>
    </div>

    <div class="grid-procesos">
      <tarjeta-proceso :icono="iconoCatalogo" titulo="Gestiona el catálogo"
        descripcion="Registra y organiza todos los títulos publicados por la editorial." />
      <tarjeta-proceso :icono="iconoEdicion" titulo="Sigue el proceso editorial"
        descripcion="Controla el estado de cada libro: en diseño, en edición o publicado." />
      <tarjeta-proceso :icono="iconoPublicacion" titulo="Publica con confianza"
        descripcion="Publicaremos tu libro a través de nuestros canales de venta. Tu libro estará a nivel mundial en formato papel y digital." />
    </div>
  </div>
</template>

<style scoped>
.panel {
  background-color: var(--color-fondo);
  min-height: calc(100vh - 100px);
  padding: var(--espacio-lg) 24px;
}

.encabezado h1 {
  font-family: var(--fuente-texto);
  font-size: 22px;
  color: var(--color-texto);
  margin-bottom: 4px;
}

.encabezado p {
  color: var(--color-texto-suave);
  font-size: 14px;
  margin-bottom: var(--espacio-md);
}

.metricas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--espacio-sm);
  margin-bottom: var(--espacio-md);
}

.tarjeta-metrica {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.etiqueta {
  font-size: 12px;
  color: var(--color-texto-suave);
}

.valor {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-texto);
}

.valor.exito {
  color: var(--color-exito);
}

.valor.info {
  color: var(--color-info);
}

.valor.advertencia {
  color: var(--color-advertencia);
}

.contenido-inferior {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--espacio-sm);
}

.tarjeta-lista,
.tarjeta-cta {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-lg);
  padding: 18px 20px;
}

.tarjeta-cta {
  background: var(--color-primario);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--espacio-xs);
}

.tarjeta-cta p {
  color: var(--color-texto-sobre-primario);
  font-size: 13px;
  line-height: 1.5;
}

.tarjeta-cta button {
  background: white;
  color: var(--color-primario);
  border: none;
  padding: 8px 14px;
  border-radius: var(--radio-md);
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
}

.fila-libro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid var(--color-borde);
  font-size: 13px;
  color: var(--color-texto);
}

.vacio {
  color: var(--color-texto-suave);
  font-size: 13px;
  padding: 10px 0;
}

.badge {
  font-size: 11px;
  padding: 2px 10px;
  border-radius: var(--radio-pill);
}

.badge-exito {
  background: var(--color-exito-bg);
  color: var(--color-exito);
}

.badge-advertencia {
  background: var(--color-advertencia-bg);
  color: var(--color-advertencia);
}

.badge-info {
  background: var(--color-info-bg);
  color: var(--color-info);
}

.landing {
  text-align: center;
  padding: 80px 20px;
}

.landing h1 {
  font-family: var(--fuente-titulo);
  font-size: 32px;
  color: var(--color-primario);
}

.landing .subtitulo {
  color: var(--color-texto-suave);
  font-size: 15px;
  margin-bottom: var(--espacio-md);
}

.landing .descripcion {
  color: var(--color-texto);
  margin-bottom: var(--espacio-md);
}

.landing button {
  background: var(--color-primario);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: var(--radio-md);
  font-weight: 600;
  cursor: pointer;
}

.grid-procesos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espacio-lg);
  margin-top: var(--espacio-xl);
}
</style>