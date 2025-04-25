<template>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto">
        <q-card-section>
            <div class="text-h5 text-bold">Pacote Básico</div>
            <div class="text-subtitle2 q-mt-sm">
                Utilize a plataforma no plano mensal, pague apenas se for utilizar
            </div>
            <div class="text-h6 q-my-md text-secondary text-bold">R$ 89,90</div>
            <ul class="text-left">
                <li><strong>Captação</strong> de Leads Ilimitados</li>
                <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat IA da sua loja</li>
                <li><strong>Chat IA</strong> para seu estoque</li>
            </ul>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center" class="q-mt-md">
            <q-btn label="Solicitar Plano" color="secondary" glossy 
                @click="solicitarPlanoMensalWpp()" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const chatcarsWpp = '61981748795'
const text = 'Olá, Gostaria de saber mais sobre o Plano Mensal da ChatCars IA e como posso automatizar meus atendimentos.'

function solicitarPlanoMensalWpp() {
    const numero = chatcarsWpp
    const mensagem = encodeURIComponent(text)
    const link = `https://wa.me/${numero}?text=${mensagem}`
    window.open(link, '_blank')
}

const items = [
    {
        name: 'Plano Mensal - ChatCar IA',
        amount: 8990,
        quantity: 1,
    },
]

</script>