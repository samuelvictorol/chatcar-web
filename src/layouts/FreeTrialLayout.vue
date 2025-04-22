<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-dark text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <q-icon name="directions_car" size="lg"></q-icon>
                    </q-avatar>
                    ChatCarIA - Teste Grátis
                </q-toolbar-title>

                <q-btn glossy color="white" class="text-black" icon="logout" />
            </q-toolbar>

            <q-tabs align="center">
                <q-route-tab to="/#" label="Estoque" />
                <q-route-tab to="/#" label="Loja" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <q-page class="q-pa-md column justify-end full-height">
                <div class="scroll column q-gutter-sm" style="flex: 1; overflow-y: auto">
                    <q-chat-message v-for="(msg, index) in messages" :key="index" :sent="msg.from === 'user'"
                        :text="[msg.text]" :name="msg.from === 'user' ? 'Você' : 'ChatCarIA'"
                        :bg-color="msg.from === 'user' ? 'blue-2' : 'grey-3'" />
                </div>

                <div class="row q-mt-md">
                    <q-input filled v-model="input" class="col" placeholder="Pergunte algo sobre o estoque..."
                        @keyup.enter="sendMessage" />
                    <q-btn icon="send" color="primary" flat round @click="sendMessage" />
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'

// Estoque mockado
const estoque = [
    { modelo: 'Fiat Uno', categoria: 'popular', ano: 2015 },
    { modelo: 'Chevrolet Onix', categoria: 'popular', ano: 2020 },
    { modelo: 'Toyota Corolla', categoria: 'sedan', ano: 2019 },
    { modelo: 'Volkswagen T-Cross', categoria: 'SUV', ano: 2021 },
    { modelo: 'Jeep Renegade', categoria: 'SUV', ano: 2022 }
]

const messages = ref([
    { from: 'bot', text: 'Olá! Pergunte sobre o nosso estoque de carros.' }
])
const input = ref('')

function sendMessage() {
    const question = input.value.trim()
    if (!question) return

    // Adiciona mensagem do usuário
    messages.value.push({ from: 'user', text: question })
    input.value = ''

    // Responde com base em palavras-chave
    let resposta = 'Desculpe, não encontrei nada sobre isso.'

    if (/popular/i.test(question)) {
        const populares = estoque.filter(c => c.categoria === 'popular')
        resposta = populares.length
            ? 'Carros populares disponíveis:\n' + populares.map(c => `- ${c.modelo} (${c.ano})`).join('\n')
            : 'Não temos carros populares no momento.'
    } else if (/SUV/i.test(question)) {
        const suvs = estoque.filter(c => c.categoria === 'SUV')
        resposta = suvs.length
            ? 'SUVs disponíveis:\n' + suvs.map(c => `- ${c.modelo} (${c.ano})`).join('\n')
            : 'Não temos SUVs no momento.'
    } else if (/sedan/i.test(question)) {
        const sedans = estoque.filter(c => c.categoria === 'sedan')
        resposta = sedans.length
            ? 'Sedans disponíveis:\n' + sedans.map(c => `- ${c.modelo} (${c.ano})`).join('\n')
            : 'Não temos sedans no momento.'
    }

    setTimeout(() => {
        messages.value.push({ from: 'bot', text: resposta })
    }, 500) // Delay para simular resposta
}
</script>