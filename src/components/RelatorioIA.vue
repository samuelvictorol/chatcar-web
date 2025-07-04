<template>
  <div class="q-pa-md q-gutter-md">
    <q-card ref="pdfRef" flat bordered class="bg-white text-dark shadow-2">
      <q-card-section class="bg-grey-2">
        <div class="text-h6 text-teal text-bold">Relatório Inteligente do Cliente</div>
        <div class="text-subtitle2 text-grey-7">Otimizado pela I.A. do ChatCar</div>
      </q-card-section>

      <!-- BOTÕES -->
      <div align="right" class="w100 row q-gutter-x-sm q-my-md q-ml-sm no-print">
        <q-btn label="WhatsApp" class="q-mr-sm" color="green" icon="chat" glossy @click="abrirWhatsapp"
          :disable="!lead?.contato || !lead?.relatorioIA?.sugestaoAbordagem" />
        <q-btn label="Baixar PDF" color="blue" icon="download" glossy @click="baixarPDF"
          :disable="!lead?.relatorioIA" />
      </div>

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
      <div class="w100 text-center text-teal q-pb-md">Cliente entrou em contato em {{ lead?.dataHora}}</div>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

const props = defineProps({
  lead: {
    type: Object,
    required: true
  }
})

const pdfRef = ref(null)

function abrirWhatsapp() {
  const rawNumero = props.lead?.contato || ''
  const numero = rawNumero.replace(/\D/g, '')

  let sugestao = props.lead?.relatorioIA?.sugestaoAbordagem || ''
  sugestao = sugestao.replace(/\r?\n|\r/g, '\n').trim()

  const mensagemTexto = `${sugestao}`
  const mensagemCodificada = encodeURIComponent(mensagemTexto)  // Removido o unescape!

  if (numero.length < 10) {
    console.warn('Número de WhatsApp inválido:', rawNumero)
    return
  }

  const link = `https://wa.me/55${numero}?text=${mensagemCodificada}`
  console.log('Abrindo WhatsApp:', link)
  window.open(link, '_blank')
}



function baixarPDF() {
  if (!pdfRef.value) return

  const noPrintEls = pdfRef.value.$el.querySelectorAll('.no-print')
  noPrintEls.forEach(el => el.style.display = 'none')

  html2pdf()
    .from(pdfRef.value.$el)
    .set({
      margin: 10,
      filename: `Relatorio-ChatCar-${props.lead?.nome || 'cliente'}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .save()
    .finally(() => {
      noPrintEls.forEach(el => el.style.display = '')
    })
}

</script>

<style scoped>
.text-bold {
  font-weight: 600;
}

.no-print {}
</style>
