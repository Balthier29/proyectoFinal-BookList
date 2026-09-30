import api from '@/api'

export default {
    namespaced: true,
    actions: {
        async alternarEstado({ rootState, commit }, id) {
            const libro = rootState.productos.libros.find(l => l - id === id)
            if (!libro) return

            const orden = ['En diseño', 'En edición', 'Publicado']
            const indiceActual = orden.indexOf(libro.estado)
            const siguienteEstado = orden[(indiceActual + 1) % orden.length]

            const { data } = await api.put(`/libros/${id}`, { ...libro, estado: siguienteEstado })
            commit('productos/EDITAR_LIBRO', data, { root: true })
        },
        async publicarTodos({ rootState, commit }) {
            const actualizados = await Promise.all(
                rootState.productos.libros.map(libro => api.put(`/libros/${libro.id}`, { ...libro, estado: 'Publicado' }).then(res => res.data)
                )
            )
            commit ('productos/SET_LIBROS', actualizados, {root: true})
        }
    }
}