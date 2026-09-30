<script setup>
import { reactive } from 'vue';


const emit = defineEmits(['agregar-libro']);

const nuevoLibro = reactive({
  titulo: '',
  autor: '',
  categoria: '',
  descripcion: '',
  estado: ''
});

const guardar = () => {
  emit('agregar-libro', { ...nuevoLibro });
  Object.assign(nuevoLibro, {
    titulo: '',
    autor: '',
    categoria: '',
    descripcion: '',
    estado: ''
  });
};


</script>

<template>
    <form @submit.prevent="guardar">
        <div>
            <label>Título</label>
            <input type="text" v-model="nuevoLibro.titulo" placeholder="Título del libro" required>
        </div>
        <div>
            <label>Autor</label>
            <input type="text" v-model="nuevoLibro.autor" placeholder="Autor del libro">
        </div>
        <div>
            <label>Categoría</label>
            <select v-model="nuevoLibro.categoria" required>
                <option value="" disabled>Selecciona una categoría</option>
                <option value="Novela">Novela</option>
                <option value="Ciencia Ficción">Ciencia Ficción</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Bíografia">Bíografia</option>
                <option value="Historia">Historia</option>
                <option value="Poesía">Poesía</option>
            </select>
        </div>
        <div>
            <label>Estado</label>
            <select v-model="nuevoLibro.estado" required>
                <option value="" disabled>Selecciona el estado</option>
                <option value="En edición">En edición</option>
                <option value="En diseño">En diseño</option>
                <option value="Publicado">Publicado</option>
            </select>
        </div>
        <div class="campo-completo">
            <label>Descripción</label>
            <textarea v-model="nuevoLibro.descripcion" placeholder="Escribe una breve descripción" rows="3"></textarea>
        </div>
        <button type="submit">Guardar Libro</button>
    </form>
</template>

<style scoped>
form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 16px;
}

form > div {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.campo-completo {
    grid-column: 1 / -1;
}

label {
    font-size: 12px;
    color: var(--color-texto-suave);
    font-weight: 500;
}

input,
select,
textarea {
    padding: 7px 0;
    border: none;
    border-bottom: 1px solid var(--color-borde);
    font-size: 14px;
    font-family: inherit;
    background: transparent;
    color: var(--color-texto);
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-bottom-color: var(--color-primario);
}

textarea {
    resize: vertical;
    min-height: 50px;
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-sm);
    padding: 8px;
}

textarea:focus {
    border-color: var(--color-primario);
}

button[type="submit"] {
    background: var(--color-primario);
    color: white;
    border: none;
    padding: 9px 18px;
    border-radius: var(--radio-sm);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    justify-self: center;
    margin-top: 4px;
    align-self: end;
}

button[type="submit"]:hover {
    background: var(--color-primario-hover);
}
</style>