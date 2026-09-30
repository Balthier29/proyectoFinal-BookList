import { createStore } from 'vuex'
import productos from './modules/productos'
import estado from './modules/estado'
import filtros from './modules/filtros'
import prioritarios from './modules/prioritarios'


export default createStore({
  
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    productos,
    estado,
    filtros,
    prioritarios
  }
})
