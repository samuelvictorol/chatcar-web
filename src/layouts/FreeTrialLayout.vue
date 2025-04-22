<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-dark text-white">
            <q-toolbar>
                <q-toolbar-title class="row no-wrap w100 items-center">
                    <q-avatar>
                        <q-icon name="sms" size="lg" to="/" />
                    </q-avatar>
                    <div class="q-pl-sm">
                        Chat da Loja
                    </div>
                </q-toolbar-title>
                <q-btn glossy color="secondary" label="estoque" @click="toggleEstoqueDrawer" />
            </q-toolbar>
        </q-header>

        <!-- Menu lateral com estoque completo -->
        <q-drawer v-model="showEstoqueDrawer" side="right" bordered>
            <q-toolbar class="bg-dark text-white">
                <q-toolbar-title>Estoque completo</q-toolbar-title>
                <q-btn flat round icon="close" @click="showEstoqueDrawer = false" />
            </q-toolbar>
            <q-input v-model="filtroEstoque" label="Filtrar estoque..." dense debounce="300" class="q-pa-sm" />
            <q-list>
                <q-item v-for="(carro, i) in estoqueFiltrado" :key="i">
                    <q-item-section>
                        <q-item-label>{{ carro.modelo }} - {{ carro.ano }}</q-item-label>
                        <q-item-label caption>{{ carro.categoria }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-btn class="q-mt-md q-ma-sm" color="primary" to="/" label="Voltar" />
        </q-drawer>

        <!-- Página principal do chat -->
        <q-page-container class="bg-dark">
            <q-page class="q-pa-md bg-grey-4 column justify-end full-height">
                <div class="scroll column q-gutter-sm" style="flex: 1; overflow-y: auto">
                    <q-carousel v-if="carrossel.length" v-model="carrosselIndex" navigation navigation-color="secondary"
                        arrows height="250px" class="bg-dark text-white q-my-md q-py-lg">
                        <q-carousel-slide v-for="(carro, i) in carrossel" :name="i" :key="i"
                            class="column items-center justify-center">
                            <q-img :src="carro.img_url" :alt="carro.modelo" class="q-mb-sm rounded-borders shadow-1"
                                style="max-width: 100px" />
                            <div class="text-weight-bold">{{ carro.modelo }}</div>
                            <div>{{ carro.categoria }} - {{ carro.ano }}</div>
                            <q-btn icon="search" color="secondary" glossy></q-btn>
                        </q-carousel-slide>
                    </q-carousel>
                    <q-chat-message v-for="(msg, index) in messages" :key="index" :sent="msg.from === 'user'"
                        :text="[msg.text]" :name="msg.from === 'user' ? 'Você' : 'Concessionária'"
                        :bg-color="msg.from === 'user' ? 'blue-2' : 'grey-3'" />
                </div>

                <div class="row q-mt-md">
                    <q-input filled v-model="input" class="col" placeholder="Pergunte algo sobre o estoque..."
                        @keyup.enter="sendMessage" />
                    <q-btn v-if="interacoes >= 5" icon="rocket" color="orange" flat round
                        @click="() => $q.notify('chama resultado por ia aqui')" />
                    <q-btn icon="send" color="secondary" flat round @click="sendMessage" />
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Mock do estoque com imagens e valores
const estoque = [
    { modelo: 'Fiat Uno', categoria: 'popular', ano: 2015, valor: 25000, img_url: '/logo.jpg' },
    { modelo: 'Chevrolet Onix', categoria: 'popular', ano: 2020, valor: 48000, img_url: '/logo.jpg' },
    { modelo: 'Toyota Corolla', categoria: 'sedan', ano: 2019, valor: 72000, img_url: '/logo.jpg' },
    { modelo: 'Volkswagen T-Cross', categoria: 'SUV', ano: 2021, valor: 89000, img_url: '/logo.jpg' },
    { modelo: 'Jeep Renegade', categoria: 'SUV', ano: 2022, valor: 95000, img_url: '/logo.jpg' },
    { modelo: 'Honda Civic', categoria: 'sedan', ano: 2020, valor: 88000, img_url: '/logo.jpg' },
    { modelo: 'Ford Ka', categoria: 'popular', ano: 2018, valor: 32000, img_url: '/logo.jpg' },
    { modelo: 'Hyundai Creta', categoria: 'SUV', ano: 2022, valor: 104000, img_url: '/logo.jpg' },
    { modelo: 'Renault Kwid', categoria: 'popular', ano: 2023, valor: 46000, img_url: '/logo.jpg' }
]

const messages = ref([])
const input = ref('')
const showEstoqueDrawer = ref(false)
const filtroEstoque = ref('')
const carrossel = ref([])
const carrosselIndex = ref(0)
const interacoes = ref(0)

const usuario = ref({
    nome: '',
    telefone: '',
    preferencias: []
})

const estoqueFiltrado = computed(() => {
    return estoque.filter(carro =>
        carro.modelo.toLowerCase().includes(filtroEstoque.value.toLowerCase()) ||
        carro.categoria.toLowerCase().includes(filtroEstoque.value.toLowerCase())
    )
})
onMounted(() => {
    $q.dialog({
        title: 'Bem-vindo!',
        message: 'Qual o seu nome?',
        prompt: {
            model: '',
            type: 'text',
            color: 'secondary'
        },
        persistent: true
    }).onOk(nome => {
        if (!nome.trim()) {
            $q.notify({
                color: 'orange-14',
                position: 'top',
                message: '⚠️ O nome é obrigatório!',
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }

        usuario.value.nome = nome

        $q.dialog({
            title: 'Telefone',
            message: 'Digite seu número com DDD:',
            prompt: {
                model: '',
                type: 'tel',
                mask: '(##) #####-####',
                color: 'secondary'
            },
            persistent: true
        }).onOk(telefone => {
            if (!telefone.trim()) {
                $q.notify({
                    color: 'orange-14',
                    position: 'top',
                    message: '⚠️ O telefone é obrigatório!',
                })
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }

            usuario.value.telefone = telefone

            $q.dialog({
                title: 'Preferências',
                message: 'Quais tipos de carro você prefere?',
                options: {
                    type: 'checkbox',
                    model: [],
                    color: 'secondary',
                    items: [
                        { label: 'Popular', value: 'popular' },
                        { label: 'SUV', value: 'SUV' },
                        { label: 'Sedan', value: 'sedan' }
                    ]
                },
                persistent: true
            }).onOk(preferencias => {
                if (!preferencias.length) {
                    // mostra 5 carros aleatórios
                    const randomCarros = estoque.sort(() => 0.5 - Math.random()).slice(0, 5)
                    carrossel.value = randomCarros
                    messages.value.push({
                        from: 'bot',
                        text: `Olá ${nome.split(' ')[0]}! Veja algumas opções aleatórias ⬆️`
                    })
                    messages.value.push({
                        from: 'bot',
                        text: `🧐 Me diga qual carro você procura! `
                    })
                    messages.value.push({
                        from: 'bot',
                        text: `Se quiser ver mais opções, clique no botão "estoque" ao lado!`
                    })
                    messages.value.push({
                        from: 'bot',
                        text:  `😁 Você pode pesquisar por modelo, ano, categoria ou valor!`
                    })
                    return
                }

                usuario.value.preferencias = preferencias

                const carrosSugeridos = estoque.filter(e =>
                    preferencias.includes(e.categoria)).slice(0, 5)

                carrossel.value = carrosSugeridos
                messages.value.push({
                    from: 'bot',
                    text: `Olá ${nome.split(' ')[0]}! Veja algumas opções com base no seu perfil:`
                })
            })
        })
    })
})
function toggleEstoqueDrawer() {
    showEstoqueDrawer.value = !showEstoqueDrawer.value
}

function sendMessage() {
    const question = input.value.trim()
    if (!question) return

    interacoes.value += 1
    messages.value.push({ from: 'user', text: question })
    input.value = ''

    let resposta = 'Desculpe, não encontrei nenhum carro com esses critérios.'
    let resultados = []

    // Buscas por nome, desc, ano ou valor
    resultados = estoque.filter(c =>
        c.modelo.toLowerCase().includes(question.toLowerCase()) ||
        c.categoria.toLowerCase().includes(question.toLowerCase()) ||
        String(c.ano).includes(question) ||
        String(c.valor).includes(question)
    )

    if (resultados.length === 1) {
        const c = resultados[0]
        resposta = `🔎 Resultado: ${c.modelo} ${c.ano} (${c.categoria}) - R$ ${c.valor.toLocaleString()}`
    } else if (resultados.length > 1) {
        resposta = `🔎 Encontrei ${resultados.length} opções para você:`
        carrossel.value = resultados.slice(0, 5)
    }

    setTimeout(() => {
        messages.value.push({ from: 'bot', text: resposta })
    }, 400)
}

watch(interacoes, (val) => {
    if (val === 5) {
        setTimeout(() => {
            messages.value.push({
                from: 'bot',
                text: '🚀 Clique no foguete ao lado para ver os resultados por IA!'
            })
        }, 600)
    }
})
</script>
<style scoped>

@media (min-width: 800px) {
    .q-page-container {
        padding: 0 300px 0 300px;
    }
}
</style>
