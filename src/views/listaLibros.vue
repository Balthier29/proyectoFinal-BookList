<script setup>
import { ref, computed, onMounted } from 'vue';
import FormularioLibro from '@/components/FormularioLibro.vue';
import LibroItem from '@/components/LibroItem.vue';
import { useStore } from 'vuex'
import ResumenEstado from '@/components/ResumenEstado.vue';

const store = useStore()

const filtroAutor = computed({
    get: () => store.getters['filtros/autor'],
    set: (valor) => store.commit('filtros/SET_AUTOR', valor)
})
const filtroCategoria = computed({
    get: () => store.getters['filtros/categoria'],
    set: (valor) => store.commit('filtros/SET_CATEGORIA', valor)
})
const filtroEstado = computed({
    get: () => store.getters['filtros/estado'],
    set: (valor) => store.commit('filtros/SET_ESTADO', valor)
})
const verPrioridades = computed({
    get: () => store.getters['filtros/verPrioridades'],
    set: (valor) => store.commit('filtros/SET_VER_PRIORIDADES', valor)
})
const verDestacadoMes = computed({
    get: () => store.getters['filtros/verDestacadoMes'],
    set: (valor) => store.commit('filtros/SET_VER_DESTACADO_MES', valor)
})

const agregarLibro =(nuevoLibro) => store.dispatch('productos/agregarLibro', nuevoLibro)
const eliminarLibro = (id) => store.dispatch('productos/eliminarLibro', id)
const editarLibro = (libro) => store.dispatch('productos/editarLibro', libro)


const mostrarFormulario = ref(false);
const mostrarFiltros = ref(false);

onMounted(async () => {
    store.dispatch('productos/cargarLibros')
})


const librosFiltrados = computed(() => store.getters['filtros/librosFiltrados'])



</script>

<template>
    <div>
        <div class="encabezado-catalogo">
            <h2>Catálogo de libros</h2>
            <p class="subtitulo">Gestiona el catálogo interno de publicaciones.</p>
        </div>

        <ResumenEstado/>

        <div class="acciones-catalogo">
            <button class="btn-toggle" @click="mostrarFormulario = !mostrarFormulario">
                {{ mostrarFormulario ? 'X cerrar formulario' : ' + Agregar Libro' }}
            </button>
            <button class="btn-toggle secundario" @click="mostrarFiltros = !mostrarFiltros">
                {{ mostrarFiltros ? 'X Cerrar Filtros' : '🔍 Filtros' }}
            </button>
        </div>
        <div class="campo campo-checkbox">
            <label>
                <input type="checkbox" v-model="verPrioridades">
                Ver prioridad 🚩
            </label>
        </div>
        <div class="campo campo-checkbox">
            <label>
                <input type="checkbox" v-model="verDestacadoMes">
                Ver destacado del mes ⭐
            </label>
        </div>


        <div class="fila-superior" v-if="mostrarFormulario || mostrarFiltros"
            :class="{ 'dos-columnas': mostrarFormulario && mostrarFiltros }">

            <div class="panel-formulario" v-if="mostrarFormulario">
                <FormularioLibro @agregar-libro="agregarLibro" />
            </div>

            <div class="panel-filtros" v-if="mostrarFiltros">
                <h3>Filtros</h3>
                <div class="campo">
                    <label>Buscar por Autor:</label>
                    <input type="text" v-model="filtroAutor" placeholder="Escribe el nombre del autor">
                </div>
                <div class="campo">
                    <label>Filtrar por categoría</label>
                    <select v-model="filtroCategoria">
                        <option value="">Todas las categorías</option>
                        <option value="Novela">Novela</option>
                        <option value="Ciencia Ficción">Ciencia Ficción</option>
                        <option value="Fantasía">Fantasía</option>
                        <option value="Bíografia">Bíografia</option>
                        <option value="Historia">Historia</option>
                        <option value="Poesía">Poesía</option>
                    </select>
                </div>
                <div class="campo">
                    <label>Filtrar por estado</label>
                    <select v-model="filtroEstado">
                        <option value="">Todos los estados</option>
                        <option value="En edición">En edición</option>
                        <option value="En diseño">En diseño</option>
                        <option value="Publicado">Publicado</option>
                    </select>
                </div>
            </div>
        </div>

        <hr>

        <div class="grid-libros" v-if="librosFiltrados.length > 0">
            <LibroItem v-for="libro in librosFiltrados" :key="libro.id" :libro="libro" @eliminar="eliminarLibro"
                @editar="editarLibro" />
        </div>
        <p v-else>No se encontraron libros con ese criterio de búsqueda.</p>
    </div>
</template>


<style scoped>
.encabezado-catalogo {
    margin-bottom: var(--espacio-lg);
    padding-top: 32px;
}

.encabezado-catalogo h2 {
    margin: 0 0 2px 0;
    font-size: 22px;
    color: var(--color-texto);
}

.encabezado-catalogo .subtitulo {
    margin: 0;
    font-size: 13px;
    color: var(--color-texto-suave);
}

.acciones-catalogo {
    display: flex;
    gap: var(--espacio-sm);
    margin-bottom: var(--espacio-lg);
}

.btn-toggle {
    background: var(--color-primario);
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: var(--radio-md);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
}

.btn-toggle.secundario {
    background: var(--color-superficie);
    color: var(--color-primario);
    border: 1px solid var(--color-borde);
}

.btn-toggle:hover {
    opacity: 0.9;
}

.fila-superior {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: var(--espacio-md);
    align-items: start;
}

.fila-superior.dos-columnas {
    grid-template-columns: 1.3fr 1fr;
}

.panel-formulario,
.panel-filtros {
    background: var(--color-superficie-alt);
    border: none;
    border-radius: var(--radio-lg);
    padding: var(--espacio-md) 24px;
}

.panel-filtros h3 {
    margin: 0 0 var(--espacio-sm) 0;
    font-size: 13px;
    color: var(--color-texto-suave);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.panel-filtros .campo {
    margin-bottom: var(--espacio-sm);
    display: flex;
    flex-direction: column;
    gap: var(--espacio-2xs);
}

.panel-filtros label {
    font-size: 12px;
    color: var(--color-texto-suave);
    font-weight: 500;
}

.panel-filtros input,
.panel-filtros select {
    padding: 7px 0;
    border: none;
    border-bottom: 1px solid var(--color-borde);
    font-size: 14px;
    background: transparent;
    border-radius: 0;
}

.panel-filtros input:focus,
.panel-filtros select:focus {
    outline: none;
    border-bottom-color: var(--color-primario);
}

hr {
    margin: var(--espacio-lg) 0;
    border: none;
    border-top: 1px solid var(--color-borde);
}

.grid-libros {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--espacio-lg);
    padding-bottom: var(--espacio-xl);
}

@media (max-width: 768px) {
    .fila-superior.dos-columnas {
        grid-template-columns: 1fr;
    }

    .acciones-catalogo {
        flex-direction: column;
    }
}
</style>