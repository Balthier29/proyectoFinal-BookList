<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore()
const libros = computed(() => store.getters['productos/libros'])

const contarEstado = (estado) => {
  return libros.value.filter(libro => libro.estado === estado).length;
};

const totalPendientes = computed(() => {
  return contarEstado('En diseño') + contarEstado('En edición');
});

const totalPublicado = computed(() => {
  return contarEstado('Publicado');
});

const publicarTodos = () => store.dispatch('estado/publicarTodos')
</script>

<template>
  <div class="resumen-wrapper">
    <div class="resumen-estados">
      <span class="chip publicado">📗 Publicados: {{ contarEstado('Publicado') }}</span>
      <span class="chip diseno">🎨 En diseño: {{ contarEstado('En diseño') }}</span>
      <span class="chip edicion">✏️ En edición: {{ contarEstado('En edición') }}</span>
    </div>

    <div class="banner-pendientes" v-if="totalPendientes > 0">
      <span>📋 Pendientes: {{ contarEstado('En diseño') }} en diseño, {{ contarEstado('En edición') }} en
        edición.</span>
      <button type="button" class="btn-publicar-todos" @click="publicarTodos">Publicar todos</button>
    </div>

    <div class="banner-al-dia" v-else>
      <span>✅ Catálogo al día: {{ totalPublicado }} libros publicados.</span>
    </div>
  </div>
</template>

<style scoped>
.resumen-wrapper {
  margin-bottom: var(--espacio-md);
}

.resumen-estados {
  display: flex;
  gap: var(--espacio-sm);
  margin-bottom: var(--espacio-sm);
  flex-wrap: wrap;
}

.chip {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  padding: 8px 16px;
  border-radius: var(--radio-pill);
  font-size: 13px;
  color: var(--color-texto);
}

.banner-pendientes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--espacio-sm);
  width: 100%;
  box-sizing: border-box;
  background: var(--color-advertencia);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radio-md);
  font-size: 14px;
  font-weight: 600;
}

.btn-publicar-todos {
  background: white;
  color: var(--color-advertencia);
  border: none;
  padding: 6px 14px;
  border-radius: var(--radio-sm);
  font-weight: 700;
  cursor: pointer;
}

.banner-al-dia {
  width: 100%;
  box-sizing: border-box;
  background: var(--color-exito);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radio-md);
  font-size: 14px;
  font-weight: 600;
}
</style>