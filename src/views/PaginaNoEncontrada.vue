<template>
    <section class="no-encontrado">
        <img src="@/assets/img/Robot 404 Error.gif" alt="robot 404" class="no-encontrado-img">
        <h1>Esta página no existe</h1>
        <p>Disculpa las molestias, estamos revisando lo sucedido U.U</p>
        <p>Revisa la dirección, recarga el navegador o vuelve al inicio para seguir navegando</p>
        <router-link :to="{ name: 'inicio' }" class="boton">Ir al inicio</router-link>
    </section>
</template>

<style scoped>
.no-encontrado {
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
}

.no-encontrado-img {
    width: 100%;
    max-width: 150px;
}

h1 {
    margin: 1rem 0 0.5rem;
}

p {
    margin: 0 0 1.5rem;
    color: var(--color-texto-suave);
}

.boton {
    padding: 0.8rem 1.5rem;
    border-radius: var(--radio-pill);
    background: var(--color-acento-fuerte);
    color: white;
    font-weight: 700;
    text-decoration: none;
}

.boton:hover {
    background: var(--color-acento-hover);
}
</style>