<template>
    <div class="q-pa-md q-gutter-md">
        <q-card flat bordered class="bg-white text-dark shadow-2">
            <q-card-section class="bg-grey-2">
                <div class="text-h6 text-primary">Relatório Inteligente do Cliente</div>
                <div class="text-subtitle2 text-grey-7">Gerado por inteligência artificial</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="text-subtitle1 q-mb-sm text-bold">📌 Interesses do cliente:</div>
                <div class="text-body1 text-grey-8" v-if="relatorio.interesses">
                    {{ relatorio.interesses }}
                </div>
                <q-skeleton v-else type="text" width="100%" />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="text-subtitle1 q-mb-sm text-bold">📞 Dicas de abordagem por telefone:</div>
                <div class="text-body1 text-grey-8" v-if="relatorio.abordagem">
                    {{ relatorio.abordagem }}
                </div>
                <q-skeleton v-else type="text" width="100%" />
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Simulação de resposta da IA vinda do backend
const relatorio = ref({
    interesses: '',
    abordagem: ''
})

onMounted(() => {
    // Simular chamada a API (pode ser substituído por axios)
    setTimeout(() => {
        relatorio.value = {
            interesses:
                'Cliente demonstrou forte interesse por SUVs automáticos com teto solar, até R$ 95.000, e buscou informações sobre consumo e espaço interno. Mostrou preferência por Jeep Renegade e VW T-Cross.',
            abordagem:
                'Inicie a conversa reforçando o conforto e segurança dos modelos SUV, especialmente para viagens em família. Mencione a disponibilidade imediata do Renegade com teto solar. Sugira agendar um test drive e ofereça simulação de financiamento. Evite insistência em modelos que ele não mencionou interesse.'
        }
    }, 1000)
})
</script>

<style scoped>
.text-bold {
    font-weight: 600;
}
</style>