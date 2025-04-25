<template>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto">
        <q-card-section>
            <div class="text-h5 text-bold">Pacote Semestral</div>
            <div class="text-subtitle2 q-mt-sm">
                6 meses de plataforma, otimizada para você converter mais leads em vendas
            </div>
            <div class="text-h6 q-my-md text-green text-bold">R$ 419,90</div>
            <ul class="text-left">
                <li><strong>6 meses</strong> de <strong>acesso</strong></li>
                <li>Relatórios com <strong>copys otimizadas</strong> para serem mais <strong>persuasivas</strong> e <strong>matadoras</strong></li>
                <li><strong>Funcionalidades extras</strong> com IA</li>
                <li><strong>Linguagem natural</strong> configurável para os veículos</li>
                <li>Mais <strong>vendido</strong></li>
            </ul>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center" class="q-mt-md">
            <q-btn label="Solicitar Plano" color="green" glossy 
                @click="solicitarPlanoSemestralWpp()" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const chatcarsWpp = '61981748795'
const text = 'Olá, Gostaria de saber mais sobre o Plano Semestral da ChatCars IA e como posso automatizar meus atendimentos.'

function solicitarPlanoMeSemestralp() {
    const numero = chatcarsWpp
    const mensagem = encodeURIComponent(text)
    const link = `https://wa.me/${numero}?text=${mensagem}`
    window.open(link, '_blank')
}
const items = [
    {
        name: 'Plano Semestral - ChatCar IA',
        amount: 41990,
        quantity: 1,
    },
]

</script>