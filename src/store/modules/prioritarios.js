import api from '@/api'

export default {
    namespaced: true,
    actions: {
        async alternarPrioridad({ rootState, commit }, id) {
            const libro = rootState.productos.libros.find(l => l.id === id)
            if (!libro) return

            const { data } = await api.put(`/libros/${id}`, { ...libro, prioritario: !libro.prioritario })
            commit('productos/EDITAR_LIBRO', data, { root: true })
        }
    }
}