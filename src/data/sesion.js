import { reactive } from 'vue'


function cargarUsuario() {
    const guardado = localStorage.getItem('token')
    return guardado ? JSON.parse(guardado) : null
}

export const sesion = reactive({
  usuario: cargarUsuario()
})

export function iniciarSesion(usuario) {
  
  if (!usuario) return false

  sesion.usuario = usuario
  localStorage.setItem('token', JSON.stringify(usuario))
  return true
}

export function cerrarSesion() {
  sesion.usuario = null
  localStorage.removeItem('token')
}
