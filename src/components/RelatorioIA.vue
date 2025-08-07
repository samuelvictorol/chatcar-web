<template>
  <div ref="pdfRef" class="q-pa-md q-gutter-md">
    <q-card ref="pdfRef" flat bordered class="bg-white text-dark shadow-2">
      <div class="w100 text-h6 text-teal q-pa-md text-center">
        Relatório ChatCar IA
      </div>
      <q-card-section class="bg-grey-2">
        <div style="font-size: 1.2rem;" class=" text-teal text-uppercase text-bold">{{ lead?.name }}</div>
        <div class="text-subtitle2 text-grey-7">🛬 {{ lead?.status }}</div>
      </q-card-section>

      <!-- BOTÕES -->
      <div align="right" class="w100 row q-my-md q-ml-sm no-print">
        <q-btn label="WhatsApp" class="q-mr-sm" color="green" icon="chat" glossy @click="abrirWhatsapp"
          :disable="!lead?.contato || !lead?.relatorioIA?.sugestaoAbordagem" />
        <!-- <q-btn label="Baixar PDF" color="blue" icon="download" glossy @click="baixarPDF"
          :disable="!lead?.relatorioIA" /> -->
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
      <div class="w100 text-center text-teal q-pb-md">Cliente entrou em contato em {{ lead?.dataHora }}</div>
      <q-card-section v-if="lead?.respostasCliente?.length">
        <div class="text-subtitle1 q-mb-sm text-bold">
          Mensagens do Cliente:
        </div>
        <ul class="text-body1 text-grey-8 q-pl-md">
          <li v-for="(msg, index) in lead.respostasCliente" :key="index">
            💬 {{ msg }}
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
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

function gerarNomeArquivo(nomeCompleto) {
  if (!nomeCompleto) return 'cliente';

  // Remove acentos e caracteres especiais
  const semAcento = nomeCompleto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Pega os dois primeiros nomes
  const nomes = semAcento.trim().split(/\s+/).slice(0, 2).join('');

  return nomes || 'cliente';
}

function baixarPDF() {
  nextTick(() => {
    const element = pdfRef.value
    if (!element) return

    // Oculta os elementos com a classe no-print
    const noPrintEls = element.querySelectorAll('.no-print')
    noPrintEls.forEach(el => el.style.display = 'none')

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: `Relatorio-${gerarNomeArquivo(props.lead?.name)}-ChatCar.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .save()
      .finally(() => {
        // Reexibe os elementos no-print
        noPrintEls.forEach(el => el.style.display = '')
      })
  })
}
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}

@media print {
  .no-print {
    display: none !important;
  }
}

</style>
