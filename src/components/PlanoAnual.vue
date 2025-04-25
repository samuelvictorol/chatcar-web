<template>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto">
        <q-card-section>
            <div class="text-h5 text-bold">Pacote Profissional</div>
            <div class="text-subtitle2 q-mt-sm">
                12 meses de plataforma, otimizada para você converter mais leads em vendas e economizar à longo prazo
            </div>
            <div class="text-h6 q-my-md text-blue-14 text-bold">R$ 899,90</div>
            <ul class="text-left">
                <li><strong>12 meses</strong> de <strong>acesso</strong></li>
                <li>Funcionalidades <strong>extras</strong> das atualizações sem custo adicional.</li>
                <li><strong>Inclui</strong> todos os <strong>outros planos</strong></li>
                <li>Mais <strong>econômico</strong> e completo</li>
            </ul>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center" class="q-mt-md">
            <q-btn label="Solicitar Plano" glossy color="blue-14" @click="solicitarPlanoAnualWpp()" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const chatcarsWpp = '61981748795'
const text = 'Olá, Gostaria de saber mais sobre o Plano Profissional da ChatCars IA e como posso automatizar meus atendimentos.'

function solicitarPlanoMensalWpp() {
    const numero = chatcarsWpp
    const mensagem = encodeURIComponent(text)
    const link = `https://wa.me/${numero}?text=${mensagem}`
    window.open(link, '_blank')
}

const items = [
    {
        name: 'Plano Anual - ChatCar IA',
        amount: 79990,
        quantity: 1,
    },
]

</script>