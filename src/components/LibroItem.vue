<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';


const props = defineProps({
  libro: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['eliminar', 'editar']);

const store = useStore()

const editando = ref(false);
const borrador = reactive({ ...props.libro });

const colorEstado = computed(() => {
  if (props.libro.estado === 'Publicado') return 'badge-exito';
  if (props.libro.estado === 'En edición') return 'badge-advertencia';
  return 'badge-info';
});

const textoPrioridad = computed(() => {
  return props.libro.estado === 'Publicado' ? 'Destacado del mes' : 'Prioridad';
});

const alternarPrioridad = () => store.dispatch('prioritarios/alternarPrioridad', props.libro.id);


const activarEdicion = () => {
  Object.assign(borrador, props.libro);
  editando.value = true;
};

const cancelarEdicion = () => {
  editando.value = false;
};

const guardarEdicion = () => {
  emit('editar', { ...borrador });
  editando.value = false;
};

</script>

<template>
  <div class="tarjeta-libro">
    <!-- Modo vista -->
    <template v-if="!editando">
      <div class="fila-titulo">
        <h3>{{ libro.titulo }}</h3>
        <button type="button" class="btn-bandera" @click="alternarPrioridad" :title="textoPrioridad">
          <span v-if="libro.estado !== 'Publicado'">{{ libro.prioritario ? '🚩' : '🏳️' }}</span>
          <span v-else>{{ libro.prioritario ? '⭐' : '☆' }}</span>
        </button>
      </div>
      <p class="autor">{{ libro.autor }}</p>

      <div class="badges">
        <span class="badge badge-categoria">{{ libro.categoria }}</span>
        <span class="badge" :class="colorEstado">{{ libro.estado }}</span>
      </div>

      <p v-if="libro.prioritario" class="texto-prioridad" :class="{ destacado: libro.estado === 'Publicado' }">
        <template v-if="libro.estado === 'Publicado'"> {{ textoPrioridad }}</template>
        <template v-else>{{ textoPrioridad }}</template>
      </p>

      <div class="acciones">
        <router-link :to="{ name: 'detalleLibro', params: { id: libro.id } }">
          <button type="button">Ver Detalle</button>
        </router-link>
        <button type="button" class="btn-editar" @click="activarEdicion">Editar</button>
        <button type="button" class="btn-peligro" @click.once="emit('eliminar', libro.id)">Eliminar</button>
      </div>
    </template>

    <!-- Modo Edición -->
    <template v-else>
      <div class="campo-editar">
        <label>Título</label>
        <input type="text" v-model="borrador.titulo">
      </div>
      <div class="campo-editar">
        <label>Autor</label>
        <input type="text" v-model="borrador.autor">
      </div>
      <div class="campo-editar">
        <label>Categoría</label>
        <select v-model="borrador.categoria">
          <option value="Novela">Novela</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Bíografia">Bíografia</option>
          <option value="Historia">Historia</option>
          <option value="Poesía">Poesía</option>
        </select>
      </div>
      <div class="campo-editar">
        <label>Estado</label>
        <select v-model="borrador.estado">
          <option value="En edición">En edición</option>
          <option value="En diseño">En diseño</option>
          <option value="Publicado">Publicado</option>
        </select>
      </div>
      <div class="acciones">
        <button type="button" class="btn-guardar" @click="guardarEdicion">Guardar</button>
        <button type="button" class="btn-secundario" @click="cancelarEdicion">Cancelar</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.tarjeta-libro {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-lg);
  padding: var(--espacio-md);
  display: flex;
  flex-direction: column;
  gap: var(--espacio-xs);
}

.fila-titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espacio-xs);
}

.fila-titulo h3 {
  margin: 0;
  font-size: 15px;
  color: var(--color-texto);
}

.autor {
  margin: 0;
  font-size: 13px;
  color: var(--color-texto-suave);
}

.badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: var(--radio-pill);
}

.badge-categoria {
  background: var(--color-info-bg);
  color: var(--color-primario);
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

.btn-bandera {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 2px 4px;
  line-height: 1;
  flex-shrink: 0;
}

.texto-prioridad {
  display: inline-block;
  align-self: flex-start;
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--radio-pill);
  background: var(--color-peligro-bg);
  color: var(--color-peligro);
}

.texto-prioridad.destacado {
  background: linear-gradient(135deg, #FBBF24, #F59E0B);
  color: var(--color-destacado-texto);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 4px 12px;
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);
}

.acciones {
  display: flex;
  gap: var(--espacio-xs);
  margin-top: var(--espacio-sm);
}

.acciones button {
  flex: 1;
  padding: 10px 10px;
  border-radius: var(--radio-md);
  font-size: 12px;
  cursor: pointer;
  border: none;
}

.btn-secundario {
  background: var(--color-info-bg);
  color: var(--color-primario);
}

.btn-peligro {
  background: var(--color-peligro-bg);
  color: var(--color-peligro);
}

.campo-editar {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: var(--espacio-xs);
}

.campo-editar label {
  font-size: 11px;
  color: var(--color-texto-suave);
}

.campo-editar input,
.campo-editar select {
  padding: 6px 8px;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-sm);
  font-size: 13px;
}

.btn-editar {
  background: var(--color-info-bg);
  color: var(--color-primario);
}

.btn-guardar {
  background: var(--color-primario);
  color: white;
}
</style>