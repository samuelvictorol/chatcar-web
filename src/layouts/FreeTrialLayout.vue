<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-dark text-white">
            <q-toolbar>
                <q-toolbar-title class="row no-wrap w100 items-center">
                    <q-avatar>
                        <q-icon name="sms" size="lg" to="/" />
                    </q-avatar>
                    <div class="q-pl-sm">
                        ChatCar Teste
                    </div>
                </q-toolbar-title>
                <q-btn class="q-mr-sm" color="grey-2" to="/" flat icon="logout" />
                <q-btn glossy color="secondary" icon="store" @click="toggleEstoqueDrawer" />
            </q-toolbar>
        </q-header>

        <!-- Menu lateral com estoque completo -->
        <q-drawer v-model="showEstoqueDrawer" side="right" bordered>
            <q-toolbar class="bg-dark text-white">
                <q-toolbar-title>Estoque</q-toolbar-title>
                <q-btn flat round icon="close" @click="showEstoqueDrawer = false" />
            </q-toolbar>
            <q-input v-model="filtroEstoque" color="secondary" outlined label="Filtrar estoque..." dense debounce="300"
                class="q-pa-sm">
                <template v-slot:append>
                    <q-icon name="search" class="cursor-pointer" color="secondary" />
                </template>
            </q-input>
            <q-list>
                <q-item id="item-estoque" v-for="(carro, i) in estoqueFiltrado" :key="i">
                    <q-item-section style="border-bottom: 1px solid #26A69A ;" class="q-pb-sm">
                        <div class="row w100 no-wrap items-center">
                            <div class="column text-bold">
                                <q-item-label>{{ carro.modelo }} - {{ carro.ano }}</q-item-label>
                                <q-item-label caption>{{ carro.categoria }}</q-item-label>
                            </div>
                            <q-btn icon="visibility" color="secondary" glossy dense class="q-ml-md"
                                @click="() => $q.notify({ message: 'detalhes do carro', color: 'secondary' })" />
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <!-- Página principal do chat -->
        <q-page-container class="bg-dark">
            <q-page class="q-pa-none bg-grey-4 column full-height relative">
                <!-- Vitrine fixa -->
                <div class="bg-dark text-white q-pa-sm w100" style="position: sticky; top: 50px; z-index: 10;">

                    <div class="text-h6 q-mb-sm">Vitrine de SuaLoja</div>

                    <q-carousel v-if="carrossel.length" v-model="carrosselIndex" navigation navigation-color="secondary"
                        arrows height="250px" class="bg-dark  text-white q-pb-md">
                        <q-carousel-slide v-for="(carro, i) in carrossel" :name="i" :key="i" class="relative-position">
                            <q-img :src="carro.img_url" :alt="carro.modelo" class="fit"
                                style="object-fit: cover; border-radius: 12px;">
                                <div class="absolute-bottom text-white q-pa-sm"
                                    style="background: #070707a2; backdrop-filter: blur(4px);">
                                    <div class="text-subtitle1 text-weight-bold">{{ carro.modelo }}</div>
                                    <div class="text-caption">{{ carro.categoria }} - {{ carro.ano }}</div>
                                    <q-btn icon="search" color="secondary" glossy dense class="q-mt-sm full-width"
                                        label="Ver Detalhes" />
                                </div>
                            </q-img>
                        </q-carousel-slide>
                    </q-carousel>
                </div>

                <div ref="mensagensContainer" class="col scroll q-pa-md q-gutter-sm"
                    style="min-height: 0; overflow-y: auto;">
                    <q-chat-message v-for="(msg, index) in messages" :key="index" :sent="msg.from === 'user'"
                        :text="[msg.text]" :name="msg.from === 'user' ? 'Você' : 'Concessionária'"
                        :bg-color="msg.from === 'user' ? 'blue-2' : 'grey-3'" />
                </div>
                <!-- Input fixo no final -->
                <div class="q-pa-md bg-white row items-center" style="flex-shrink: 0;">
                    <q-input filled v-model="input" color="secondary" class="col"
                        placeholder="Pergunte algo sobre o estoque..." @keyup.enter="sendMessage" />
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
import { nextTick } from 'vue'
const mensagensContainer = ref(null)

const $q = useQuasar()

// Mock do estoque com imagens e valores
const estoque = [
    { modelo: 'Fiat Uno', categoria: 'popular', ano: 2015, valor: 25000, img_url: '/uno.jpg' },
    { modelo: 'Chevrolet Onix', categoria: 'popular', ano: 2020, valor: 48000, img_url: '/onix.jpg' },
    { modelo: 'Chevrolet Camaro', categoria: 'esportivo', ano: 2023, valor: 46000, img_url: '/camaro.jpg' },
    { modelo: 'Toyota Corolla', categoria: 'sedan', ano: 2019, valor: 72000, img_url: '/corolla.jpg' },
    { modelo: 'Volkswagen T-Cross', categoria: 'SUV', ano: 2021, valor: 89000, img_url: '/tcross.jpg' },
    { modelo: 'Jeep Renegade', categoria: 'SUV', ano: 2022, valor: 95000, img_url: '/renegade.jpg' },
    { modelo: 'Renault Kwid', categoria: 'popular', ano: 2023, valor: 46000, img_url: '/kwid.jpg' },
    { modelo: 'Honda Civic', categoria: 'sedan', ano: 2020, valor: 88000, img_url: '/civic.jpg' },
    { modelo: 'Ford Ka', categoria: 'popular', ano: 2018, valor: 32000, img_url: '/ka.jpg' },
    { modelo: 'Hyundai Creta', categoria: 'SUV', ano: 2022, valor: 104000, img_url: '/creta.jpg' },
    { modelo: 'Up Tsi', categoria: 'hatch', ano: 2016, valor: 46000, img_url: '/up.jpg' },
    { modelo: 'Ford Mustang', categoria: 'esportivo', ano: 2016, valor: 46000, img_url: '/mustang.jpg' },
    { modelo: 'Chevy Impala', categoria: 'colecionador', ano: 1975, valor: 290000, img_url: '/impala.jpg' },
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
        title: 'Bem-vindo(a) à SuaLoja!',
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
            return
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
                return
            }

            usuario.value.telefone = telefone

            // Categorias únicas do estoque
            const categoriasUnicas = [
                ...new Set(estoque.map(carro => carro.categoria))
            ]

            const categoriaOptions = categoriasUnicas.map(cat => ({
                label: cat.charAt(0).toUpperCase() + cat.slice(1),
                value: cat
            }))

            $q.dialog({
                title: 'Preferências',
                message: 'Quais tipos de carro você mais te interessa?',
                options: {
                    type: 'checkbox',
                    model: [],
                    color: 'secondary',
                    items: categoriaOptions
                },
                persistent: true
            }).onOk(preferencias => {
                if (!preferencias.length) {
                    const randomCarros = estoque.sort(() => 0.5 - Math.random()).slice(0, 5)
                    carrossel.value = randomCarros
                }
                messages.value.push({
                    from: 'bot',
                    text: `Se quiser ver mais opções, clique no ícone de "estoque" na parte superior.`,
                })
                messages.value.push({
                    from: 'bot',
                    text: `😁 Qual veículo você busca? Poderia me informar o modelo, ano, categoria ou preço?`
                })

                usuario.value.preferencias = preferencias

                $q.dialog({
                    title: 'Nos conte mais...',
                    message: 'Se quiser, descreva em poucas palavras como pretende usar o carro (uso urbano, família, trabalho, etc). Isso nos ajuda a entender melhor seu perfil:',
                    prompt: {
                        model: '',
                        type: 'textarea',
                        color: 'secondary',
                        isValid: val => true // não obrigatório
                    },
                    persistent: false
                }).onOk(descricao => {
                    // usuario.value.descricao = descricao || ''

                    // const carrosSugeridos = estoque
                    //     .filter(carro => preferencias.includes(carro.categoria))
                    //     .slice(0, 5)

                    // carrossel.value = carrosSugeridos

                    // messages.value.push({
                    //     from: 'bot',
                    //     text: `Olá ${nome.split(' ')[0]}! Veja algumas opções com base no seu perfil⬆️`
                    // })
                })
            })
        })
    })
})

function toggleEstoqueDrawer() {
    showEstoqueDrawer.value = !showEstoqueDrawer.value
}
function sendMessage() {
    if (!input.value.trim()) return

    const texto = input.value.trim()
    messages.value.push({ from: 'user', text: texto })
    interacoes.value++

    input.value = ''

    const termo = texto.toLowerCase()

    const resultado = estoque.filter(carro =>
        carro.modelo.toLowerCase().includes(termo) ||
        carro.categoria.toLowerCase().includes(termo) ||
        carro.ano.toString().includes(termo) ||
        carro.valor.toString().includes(termo)
    )

    if (resultado.length) {
        messages.value.push({
            from: 'bot',
            text: `🔍 Encontrei ${resultado.length} carro(s) que podem te interessar. Veja na vitrine acima!`
        })
        carrossel.value = resultado
    } else {
        messages.value.push({
            from: 'bot',
            text: `😕 Não encontrei resultados com esse termo. Tente algo como "SUV", "Corolla", "2020" ou "até 50 mil".`
        })
    }

    nextTick(() => {
        if (mensagensContainer.value) {
            mensagensContainer.value.scrollTop = mensagensContainer.value.scrollHeight
        }
    })
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
#item-estoque {
    cursor: pointer;
    transform: all 0.2s linear;
}

#item-estoque:hover {
    background-color: #26A69A !important;
    color: white !important;
}

@media (min-width: 800px) {
    .q-page-container {
        padding: 0 300px 0 300px;
    }
}

.scroll {
    scroll-behavior: smooth;
}
</style>
