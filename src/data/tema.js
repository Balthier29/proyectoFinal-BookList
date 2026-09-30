import { reactive } from 'vue'

function cargarTema() {
  return localStorage.getItem('tema') || 'sistema'
}

export const tema = reactive({
  actual: cargarTema()
})

function aplicarTema() {
  if (tema.actual === 'sistema') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', tema.actual)
  }
}

export function alternarTema() {
  tema.actual = tema.actual === 'dark' ? 'light' : 'dark'
  localStorage.setItem('tema', tema.actual)
  aplicarTema()
}

aplicarTema()