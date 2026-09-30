<script setup>
import { computed, onMounted } from 'vue';
import libroSinImagen from '@/assets/img/libro-de-lectura.webp';
import { useStore } from 'vuex';

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    }
});

const store = useStore();
onMounted(() => {
    store.dispatch('productos/cargarLibros');
})

const libro = computed(() => store.getters['productos/libroPorId'](props.id));

const colorEstado = computed(() => {
    if (!libro.value) return '';
    if (libro.value.estado === 'Publicado') return 'badge-exito';
    if (libro.value.estado === 'En edición') return 'badge-advertencia';
    return 'badge-info';
});
</script>

<template>
    <div class="pagina-detalle">

        <div class="tarjeta-detalle" v-if="libro">

            <div class="columna-info">
                <div class="badges">
                    <span class="badge badge-categoria">{{ libro.categoria }}</span>
                    <span class="badge" :class="colorEstado">{{ libro.estado }}</span>
                </div>

                <h1>{{ libro.titulo }}</h1>
                <p class="autor">{{ libro.autor }}</p>

                <div class="descripcion">
                    <h3>Descripción</h3>
                    <p>{{ libro.descripcion || 'Sin descripción disponible.' }}</p>
                </div>

                <router-link to="/libros">
                    <button type="button" class="btn-volver">← Volver al listado</button>
                </router-link>
            </div>

            <div class="columna-portada">
                <img v-if="libro.imagen" :src="libro.imagen" :alt="libro.titulo" class="imagen-real">
                <img v-else :src="libroSinImagen" alt="Sin portada disponible" class="sin-imagen">
            </div>

        </div>

        <div v-else class="no-encontrado">
            <p>Libro no encontrado</p>
            <router-link to="/libros">
                <button type="button" class="btn-volver">← Volver al listado</button>
            </router-link>
        </div>

    </div>
</template>

<style scoped>
.pagina-detalle {
    padding: var(--espacio-xl) 24px;
    background: var(--color-fondo);
}

.tarjeta-detalle {
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    border-radius: var(--radio-lg);
    max-width: 800px;
    margin: 0 auto;
    padding: 36px;
    display: grid;
    grid-template-columns: 1fr 240px;
    gap: var(--espacio-xl);
    align-items: start;
}

.columna-info {
    display: flex;
    flex-direction: column;
}

.badges {
    display: flex;
    gap: 6px;
    margin-bottom: 14px;
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

.columna-info h1 {
    margin: 0 0 6px 0;
    font-size: 26px;
    color: var(--color-texto);
}

.autor {
    margin: 0 0 24px 0;
    font-size: 15px;
    color: var(--color-texto-suave);
}

.descripcion h3 {
    font-size: 13px;
    color: var(--color-texto-suave);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
}

.descripcion p {
    font-size: 14px;
    color: var(--color-texto);
    line-height: 1.7;
    margin-bottom: 28px;
}

.btn-volver {
    background: var(--color-primario);
    color: white;
    border: none;
    padding: 9px 18px;
    border-radius: var(--radio-md);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    align-self: flex-start;
}

.btn-volver:hover {
    background: var(--color-primario-hover);
}

.columna-portada {
    width: 100%;
    display: flex;
    justify-content: center;
}

.imagen-real {
    width: 100%;
    aspect-ratio: 2 / 3;
    border-radius: var(--radio-lg);
    object-fit: cover;
    box-shadow: 0 8px 24px rgba(26, 35, 50, 0.12);
    display: block;
}

.sin-imagen {
    width: 240px;
    height: 240px;
    border-radius: var(--radio-lg);
    box-shadow: 0 8px 24px rgba(26, 35, 50, 0.12);
    display: block;
}

.no-encontrado {
    text-align: center;
    padding: 60px 20px;
    color: var(--color-texto-suave);
}
</style>