<template>
  <div class="q-pa-md q-gutter-md">
    <q-card flat bordered class="bg-white text-dark shadow-2">
      <q-card-section class="bg-grey-2">
        <div class="text-h6 text-teal text-bold">Relatório Inteligente do Cliente</div>
        <div class="text-subtitle2 text-grey-7">Otimizado pela I.A. do ChatCar</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle1 q-mb-sm text-bold">📌 Resumo da interação:</div>
        <div class="text-body1 text-grey-8" v-if="lead?.relatorioIA?.resumo">
          {{ lead.relatorioIA.resumo }}
        </div>
        <q-skeleton v-else type="text" width="100%" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle1 q-mb-sm text-bold">📞 Sugestão de abordagem:</div>
        <div class="text-body1 text-grey-8" v-if="lead?.relatorioIA?.sugestaoAbordagem">
          {{ lead.relatorioIA.sugestaoAbordagem }}
        </div>
        <q-skeleton v-else type="text" width="100%" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
defineProps({
  lead: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}
</style>