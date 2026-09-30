export default {
    namespaced: true,
    state: () => ({
        autor: '',
        categoria: '',
        estado: '',
        verPrioridades: false,
        verDestacadoMes: false
    }),
    mutations: {
        SET_AUTOR(state, valor) {
            state.autor = valor
        },
        SET_CATEGORIA(state, valor) {
            state.categoria = valor
        },
        SET_ESTADO(state, valor) {
            state.estado = valor
        },
        SET_VER_PRIORIDADES(state, valor) {
            state.verPrioridades = valor
        },
        SET_VER_DESTACADO_MES(state, valor) {
            state.verDestacadoMes = valor
        },
        LIMPIAR(state) {
            state.autor = ''
                state.categoria = ''
                state.estado = ''
                state.verPrioridades = false
                state.verDetacadoMes = false
        }
    },
    getters: {
        autor: state => state.autor,
        categoria: state => state.categoria,
        estado: state => state.estado,
        verPrioridades: state => state.verPrioridades,
        verDetacadoMes: state => state.verDestacadoMes,

       librosFiltrados: (state, getters, rootState, rootGetters) => {
            const libros = rootGetters['productos/libros']
            return libros.filter(libro => {
                const coincideAutor = libro.autor.toLowerCase().includes(state.autor.toLowerCase())
                const coincideCategoria = state.categoria === '' || libro.categoria === state.categoria
                const coincideEstado = state.estado === '' || libro.estado === state.estado
                const coincidePrioridades = !state.verPrioridades || (libro.prioritario && libro.estado !== 'Publicado')
                const coincideDestacado = !state.verDestacadoMes || (libro.prioritario && libro.estado === 'Publicado')
                return coincideAutor && coincideCategoria && coincideEstado && coincidePrioridades && coincideDestacado
            })
        }
    }
}