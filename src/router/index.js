import { createRouter, createWebHashHistory } from 'vue-router'
import inicioHome from '@/views/inicioHome.vue'
import listaLibros from '@/views/listaLibros.vue'
import detalleLibro from '@/views/detalleLibro.vue'
import RegistroUsuario from '@/views/RegistroUsuario.vue'
import CatalogoPublico from '@/views/CatalogoPublico.vue'
import PaginaNoEncontrada from '@/views/PaginaNoEncontrada.vue'


const routes = [
  {
    path: '/',
    name: 'inicio',
    component: inicioHome,
  },
  {
    path: '/catalogo',
    name: 'catalogoPublico',
    component: CatalogoPublico
  },
  {
    path: '/libros',
    name: 'libros',
    component: listaLibros
  },
  {
    path: '/libros/:id',
    name: 'detalleLibro',
    component: detalleLibro,
    props: true
  },
  {
    path: '/registro',
    name: 'registroUsuario',
    component: RegistroUsuario
  },
  {
    path: '/:pathMatch(.*)',
    name: 'no-encontrado',
    component: PaginaNoEncontrada
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
