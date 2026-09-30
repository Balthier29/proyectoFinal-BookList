# 📚 BookList — Gestor de Libros Interactivo con Vue.js

Proyecto realizado para resolver la problemática que tenía nuestro cliente Editorial Nova, donde generamos una SPA de forma modular y reactiva, cumpliendo con altos estándares de la industria actual.

-----------------------------------------------------------------------------------------------------
## 📝 Descripción

Booklist es una SPA, construida bajo el motor de Vue 3 CLI, para la gestión interna del catálogo de publicaciones de la editorial Nova. Permite registrar, visualizar, filtrar, editar y eliminar libros, con persistencia real de datos a través de una API REST simulada. Además cuenta con un dashboard con registro e inicio de sesión de usuarios, estado global centralizado con Vuex, y soporte de modo oscuro.

-----------------------------------------------------------------------------------------------------
## 🚀 Tecnologías utilizadas
* Vue 3 CLI (Composition API)
* Vue Router (rutas estáticas y dinámicas)
* Vuex 4 (estado global, módulos namespaced)
* Axios (cliente HTTP)
* json-server (API REST simulada / mock backend)

-----------------------------------------------------------------------------------------------------
## ✨ Funcionalidades principales

* **Gestión de libros (CRUD):** agregar, editar, listar y eliminar títulos del catálogo, persistidos vía API.
* **Formulario reactivo:** campos input, select y textarea vinculados con `v-model`, actualizando en tiempo real.
* **Filtros:** por autor, categoría, estado de publicación, y por libros marcados como prioritarios o destacados del mes.
* **Edición inline:** cada tarjeta del libro se puede actualizar directamente desde `/libros`.
* **Rutas dinámicas:** vista de detalle individual por libro (`/libros/:id`).
* **Ruta 404 personalizada:** cualquier URL no reconocida muestra una vista de error amigable.
* **Registro e inicio de sesión de usuarios:** registro mediante nombre y correo; el acceso al panel se valida por correo, y la sesión persiste al recargar (`localStorage`).
* **Catálogo público:** carrusel con los libros en estado "Publicado", accesible con o sin sesión iniciada.
* **Prioridad / Destacado del mes:** cada libro puede marcarse con bandera (prioridad de publicación, mientras está en diseño o edición) o estrella (destacado del mes, una vez publicado).
* **Modo oscuro:** alternable manualmente y con detección de preferencia del sistema, con persistencia de la elección.
* **Sistema de diseño centralizado:** paleta de colores, espaciados y tipografía definidos como variables CSS, reutilizados en todos los componentes.

-----------------------------------------------------------------------------------------------------
## 🗂️ Estructura del proyecto

src/
├── api/ # Configuración de Axios (instancia base)
├── assets/ # Imágenes, íconos y recursos estáticos
├── components/ # Componentes reutilizables
│ ├── headLook.vue
│ ├── FooterLook.vue
│ ├── FormularioLibro.vue
│ ├── LibroItem.vue
│ ├── ResumenEstado.vue
│ └── TarjetaProceso.vue
├── data/ # Módulos de estado fuera de Vuex
│ ├── sesion.js # Sesión de usuario (persistida en localStorage)
│ └── tema.js # Modo claro/oscuro (persistido en localStorage)
├── store/ # Vuex
│ ├── index.js
│ └── modules/
│ ├── productos.js # CRUD de libros
│ ├── estado.js # Cambios de estado de publicación
│ ├── filtros.js # Filtros de búsqueda
│ └── prioritarios.js # Prioridad / destacado del mes
├── views/ # Vistas asociadas a rutas
│ ├── inicioHome.vue
│ ├── listaLibros.vue
│ ├── detalleLibro.vue
│ ├── RegistroUsuario.vue
│ ├── CatalogoPublico.vue
│ └── PaginaNoEncontrada.vue
├── router/
│ └── index.js
├── assets/css/
│ └── global.css # Variables de diseño (colores, espaciado, tipografía)
├── App.vue # Componente raíz (layout, sesión)
└── main.js
-----------------------------------------------------------------------------------------------------
## 🧩 Rutas

| Ruta          |           Vista       |                 Descripción                    |
|---            |---                    |---                                             |
| `/`           | inicioHome            | Landing / panel de bienvenida                  |
| `/catalogo`   | CatalogoPublico       | Vitrina pública de libros (carrusel)           |
| `/libros`     | listaLibros           | Panel de gestión del catálogo                  |
| `/libros/:id` | detalleLibro          | Detalle individual de un libro (ruta dinámica) |
| `/registro`   | RegistroUsuario       | Registro e inicio de sesión                    |
| `*`           | PaginaNoEncontrada    | Página 404                                     |

-----------------------------------------------------------------------------------------------------
⚙️ Instalación y ejecución local

# Clonar el repositorio
git clone [https://github.com/Balthier29/BookListNova]

# Entrar a la carpeta del proyecto
cd proyecto-final-biblo

# Instalar dependencias
npm install

# Levantar la API simulada (json-server), en una terminal
npm run mock

# Levantar el servidor de desarrollo, en otra terminal
npm run serve
```

El proyecto quedará disponible en `http://localhost:8080/`, con la API en `http://localhost:3001/`.

-----------------------------------------------------------------------------------------------------

📌 Notas

* El modelo de datos (libros y usuarios) se persiste a través de `json-server`, sirviendo el archivo `db.json` como base de datos simulada.
* La sesión del usuario y la preferencia de tema (claro/oscuro) se guardan en `localStorage` del navegador, por lo que sobreviven a recargar la página.
* Los libros nuevos que no tengan imagen de portada asignada muestran por defecto una ilustración de "sin portada disponible".
* El catálogo público (`/catalogo`) está disponible tanto con sesión iniciada como sin ella, y solo muestra los libros en estado "Publicado".

-----------------------------------------------------------------------------------------------------

👤 Autor

Davis Vicencio // alias Balthier29.


=======
# BookListNova
panel de gestión para editorial Nova 2.0
