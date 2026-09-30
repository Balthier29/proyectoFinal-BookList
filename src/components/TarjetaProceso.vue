<script setup>

defineProps({
  icono: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="tarjeta-proceso">
    <div class="icono-envoltorio">
      <img :src="icono" :alt="titulo" class="icono-proceso">
    </div>
    <h3>{{ titulo }}</h3>
    <p>{{ descripcion }}</p>
  </div>
</template>

<style scoped>

.icono-envoltorio {
  width: 84px;
  height: 84px;
  margin: 0 auto 14px;
  background: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.icono-proceso {
  width: 56px;
  height: 56px;
  object-fit: contain;
  display: block;
}

.tarjeta-proceso {
  text-align: center;
  padding: var(--espacio-md);
}

.icono-proceso {
  width: 64px;
  height: 64px;
  margin-bottom: 14px;
}

.tarjeta-proceso h3 {
  font-size: 17px;
  color: var(--color-texto);
  margin: 0 0 10px 0;
  font-family: var(--fuente-titulo);
}

.tarjeta-proceso p {
  font-size: 13px;
  color: var(--color-texto-suave);
  line-height: 1.6;
  margin: 0;
}
</style>