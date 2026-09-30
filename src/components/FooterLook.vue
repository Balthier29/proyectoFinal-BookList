
<template>
    <footer>
        <div class="contenido-footer">
            <div class="columna-marca">
                <h3>Booklist</h3>
                <p>Panel interno de gestión editorial - Editorial Nova.</p>
            </div>

            <div class="columna-links">
                <h4>Navegación</h4>
                <ul>
                    <li><router-link to="/">Inicio</router-link></li>
                    <li><router-link to="/catalogo">Catálogos</router-link></li>
                    <li><router-link to="/registro">Registrarse</router-link></li>
                </ul>
            </div>

            <div class="columna-contacto">
                <h4>Contacto</h4>
                <p>contacto@editorialnova.cl</p>
                <p>+56 9 987123654</p>
            </div>


        </div>
        <div class="linea-copyright">
            <p>© 2026 Editorial Nova. Todos los derechos reservados.</p>
        </div>
    </footer>

</template>

<style scoped>
footer {
    background-color: var(--color-primario);
    color: var(--color-texto-sobre-primario);
}

.contenido-footer {
    max-width: var(--ancho-maximo);
    margin: 0 auto;
    padding: 40px 24px 24px;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 32px;
}

.columna-marca h3 {
    font-family: var(--fuente-titulo);
    color: #FFFFFF;
    font-size: 20px;
    margin: 0 0 8px 0;
}

.columna-marca p {
    font-size: 13px;
    color: var(--color-texto-sobre-primario);
    margin: 0;
    line-height: 1.6;
}

.columna-links h4,
.columna-contacto h4 {
    color: #FFFFFF;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 14px 0;
}

.columna-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.columna-links a {
    color: var(--color-texto-sobre-primario);
    text-decoration: none;
    font-size: 13px;
}

.columna-links a:hover {
    text-decoration: underline;
}

.columna-contacto p {
    font-size: 13px;
    color: var(--color-texto-sobre-primario);
    margin: 0 0 8px 0;
}

.linea-copyright {
    max-width: var(--ancho-maximo);
    margin: 0 auto;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding: 16px 24px;
    text-align: center;
}

.linea-copyright p {
    margin: 0;
    font-size: 12px;
    color: var(--color-texto-sobre-primario-tenue);
}
</style>