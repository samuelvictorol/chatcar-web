<template>
    <q-dialog v-model="show" persistent maximized transition-show="slide-up" transition-hide="slide-down">
        <q-card class="bg-white text-dark">
            <q-bar class="bg-dark text-white">
                <div class="text-h6">Relatório Inteligente</div>
                <q-space />
                <q-btn dense flat icon="close" @click="show = false" />
            </q-bar>

            <q-card-section class="q-pa-md q-gutter-md">
                <div class="text-subtitle1 text-weight-bold">📞 Contato do Cliente:</div>
                <div class="text-body1 q-mb-md">{{ relatorio.telefone }}</div>

                <div class="text-subtitle1 text-weight-bold">🎯 Principais Interesses:</div>
                <q-banner rounded class="bg-grey-2 text-dark q-pa-md">
                    {{ relatorio.interesses }}
                </q-banner>

                <div class="text-subtitle1 text-weight-bold q-mt-md">📢 Dicas de Abordagem por Telefone:</div>
                <q-banner rounded class="bg-grey-2 text-dark q-pa-md">
                    {{ relatorio.abordagem }}
                </q-banner>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const show = ref(false);
const relatorio = ref({
    telefone: "",
    interesses: "",
    abordagem: "",
});

// Expor função para ser chamada externamente
function abrir(dados) {
    relatorio.value = {
        telefone: dados.telefone || "(sem telefone)",
        interesses: dados.interesses || "Não identificado.",
        abordagem: dados.abordagem || "Nenhuma sugestão encontrada."
    };
    show.value = true;
}

defineExpose({ abrir });
</script>