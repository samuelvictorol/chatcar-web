<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-dark text-white">
            <q-toolbar>
                <q-toolbar-title class="row no-wrap w100 items-center">
                    <q-avatar>
                        <q-icon name="sms" size="lg" to="/" />
                    </q-avatar>
                    <div class="q-pl-sm">
                        FreeTrial
                    </div>
                </q-toolbar-title>
                <q-btn class="q-mr-sm" color="grey-2" to="/" flat icon="logout" />
                <q-btn class="q-mr-sm" glossy color="blue-14" icon="psychology" @click="showDialog = !showDialog" />
                <q-btn glossy color="secondary" icon="store" @click="toggleEstoqueDrawer" />
            </q-toolbar>
        </q-header>

        <!-- Menu lateral com estoque completo -->
        <q-drawer v-model="showEstoqueDrawer" side="right" bordered>
            <q-toolbar class="bg-dark text-white">
                <q-toolbar-title>Estoque de ChatCars Store</q-toolbar-title>
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
                                @click="() => selecionarCarro(carro)" />

                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <!-- Página principal do chat -->
        <q-page-container class="bg-dark">
            <q-page class="q-pa-none bg-grey-4 column full-height relative">
                <!-- Vitrine fixa -->
                <div class="bg-dark">
                    <div class="w100 row no-wrap items-center justify-between q-px-md q-pt-sm">
                        <div class="text-h6 text-white q-pt-sm q-mb-sm">Vitrine</div>
                        <div class="text-h6 text-white q-pt-sm q-mb-sm"><q-btn label="ChatCars Store" color=""
                                @click="openInfoLoja()" style="border:2px solid #26A69A" dense flat></q-btn></div>

                    </div>

                    <div class="q-mx-auto" style="max-width: 700px;">
                        <q-carousel v-if="carrossel.length" v-model="carrosselIndex" navigation
                            navigation-color="secondary" arrows height="250px" class="bg-dark text-white q-pb-md">
                            <q-carousel-slide v-for="(carro, i) in carrossel" :name="i" :key="i"
                                class="relative-position">
                                <q-img :src="carro.img_url" :alt="carro.modelo" class="fit"
                                    style="object-fit: cover; border-radius: 12px;">
                                    <div class="absolute-bottom text-white q-pa-sm"
                                        style="background: #070707a2; backdrop-filter: blur(4px);">
                                        <div class="text-subtitle1 text-weight-bold">{{ carro.modelo }}</div>
                                        <div class="text-caption">{{ carro.categoria }} - {{ carro.ano }}</div>
                                        <q-btn icon="search" color="secondary" glossy dense class="q-mt-sm full-width"
                                            label="Ver Detalhes" @click="abrirDialog(carro)" />
                                    </div>
                                </q-img>
                            </q-carousel-slide>
                        </q-carousel>
                    </div>
                    <q-dialog v-model="showDialog" persistent>
                        <q-card flat bordered class="bg-white text-dark shadow-2"
                            style="min-width: 400px; max-width: 95vw">
                            <q-card-section class="bg-grey-2 row items-center">
                                <q-icon name="psychology_alt" color="blue-14" size="md" />
                                <div class="text-h6 text-blue-14 q-ml-sm">Relatório Lead<br>Vendedor</div>
                                <q-space />
                                <q-btn flat round dense icon="close" @click="showDialog = false" />
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

                            <q-separator />

                            <q-card-section>
                                <div class="text-caption text-grey-6 text-center">
                                    Análise automatizada com base nos dados de navegação e preferências recentes do
                                    lead.
                                </div>
                            </q-card-section>
                        </q-card>
                    </q-dialog>
                    <!-- Dialog da IA -->
                    <q-dialog v-model="iaDialogVisible" persistent>
                        <q-card class="q-pa-md" style="min-width: 400px; max-width: 95vw">
                            <q-card-section class="row items-center q-pb-none">
                                <q-icon name="psychology" size="md" color="blue-14" />
                                <div class="text-h6 q-ml-sm">Recomendações Inteligentes</div>
                                <q-space />
                                <q-btn icon="close" flat round dense @click="iaDialogVisible = false" />
                            </q-card-section>

                            <q-card-section>
                                <div class="text-body1 text-grey-8">
                                    Com base no seu perfil de uso, a IA selecionou 2 carros com melhor custo-benefício
                                    no
                                    estoque:
                                </div>
                            </q-card-section>

                            <q-separator spaced />

                            <!-- Opção 1: Renault Kwid -->
                            <q-card-section class="q-mb-sm">
                                <div class="text-subtitle1 text-blue-14">1. Renault Kwid 2023</div>
                                <q-img src="/kwid.jpg" class="q-mt-sm rounded-borders"
                                    style="max-height: 180px; object-fit: cover;" />
                                <div class="q-mt-sm text-body2">
                                    <b>Descrição:</b> 1.0 FLEX ZEN MANUAL - 50.000km - Preto - 2020
                                    <br />
                                    <b>Motivos da escolha:</b>
                                    <ul class="q-pl-md">
                                        <li>O Kwid é um dos carros mais econômicos do Brasil!</li>
                                        <li>Esse modelo vem com central multimídia e direção elétrica.</li>
                                        <li>IPVA e manutenção fácil!</li>
                                    </ul>
                                </div>
                            </q-card-section>

                            <q-separator spaced />

                            <!-- Opção 2: Honda Civic -->
                            <q-card-section>
                                <div class="text-subtitle1 text-blue-14">2. Honda Civic 2020</div>
                                <q-img src="/civic.jpg" class="q-mt-sm rounded-borders"
                                    style="max-height: 180px; object-fit: cover;" />
                                <div class="q-mt-sm text-body2">
                                    <b>Descrição:</b> 1.5 TURBO FLEX EX CVT - 50.000km - Preto - 2020
                                    <br />
                                    <b>Motivos da escolha:</b>
                                    <ul class="q-pl-md">
                                        <li>O Civic é conhecido pela sua confiabilidade e durabilidade.</li>
                                        <li>Esse modelo tem um ótimo espaço interno e conforto para viagens longas.</li>
                                        <li>IPVA e manutenção muito baratos!</li>
                                    </ul>
                                </div>
                            </q-card-section>

                            <q-separator spaced />

                            <q-card-section>
                                <div class="text-caption text-grey text-center">
                                    Análise automática gerada com base no histórico de preferências dos nossos clientes.
                                </div>
                            </q-card-section>
                        </q-card>
                    </q-dialog>
                    <!-- Dialog com informações da loja -->
                    <q-dialog v-model="infoLojaVisible">
                        <q-card class="q-pa-md" style="min-width: 350px; max-width: 90vw">
                            <q-card-section class="row items-center q-pb-none">
                                <div class="row justify-between no-wrap w100">
                                    <div class="text-h6">Sobre a Loja</div><br>
                                    <q-img src="/logo.jpg" alt="Logo da loja" class="rounded-borders" width="100px"
                                        height="100px" />
                                </div>
                                <q-space />
                            </q-card-section>

                            <q-card-section>
                                <q-list bordered padding class="rounded-borders">
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label class="text-subtitle1">Nome:</q-item-label>
                                            <q-item-label caption>ChatCars Store</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label class="text-subtitle1">CNPJ:</q-item-label>
                                            <q-item-label caption>12.345.678/0001-99</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label class="text-subtitle1">Endereço:</q-item-label>
                                            <q-item-label caption>Av. das Inovações, 1234 - Centro, São Paulo -
                                                SP</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label class="text-subtitle1">Telefone:</q-item-label>
                                            <q-item-label caption>(11) 98765-4321</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label class="text-subtitle1">Email:</q-item-label>
                                            <q-item-label caption>contato@chatcarsstore.com.br</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                    </q-dialog>
                    <!-- Dialog de detalhes -->
                    <q-dialog v-model="dialogAberto">
                        <q-card class="q-pa-md" style="width: 100%; max-width: 500px;">
                            <q-card-section>
                                <div class="text-h6">{{ carroSelecionado.modelo }}<br>R$ {{ carroSelecionado.valor }},00
                                </div>
                                <div class="text-caption q-mb-sm">{{ carroSelecionado.categoria }} - {{
                                    carroSelecionado.ano
                                }}
                                </div>
                                <q-img :src="carroSelecionado.img_url" :alt="carroSelecionado.modelo"
                                    style="border-radius: 12px;" class="q-mb-md" />
                                <div v-if="carroSelecionado.descricao" class="text-body2">
                                    {{ carroSelecionado.descricao }}
                                </div>
                            </q-card-section>
                            <q-card-actions align="right">
                                <q-btn flat label="Fechar" color="secondary" v-close-popup />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>

                </div>

                <div ref="mensagensContainer" class="col scroll q-pa-md q-gutter-sm"
                    style="min-height: 0; overflow-y: auto;">
                    <q-chat-message v-for="(msg, index) in messages" :key="index" :sent="msg.from === 'user'"
                        :text="[msg.text]" :name="msg.from === 'user' ? 'Você' : 'ChatCars Store diz:'"
                        :bg-color="msg.from === 'user' ? 'green-11' : 'grey-3'" />
                </div>
                <!-- Input fixo no final -->
                <div class="q-pa-md bg-white row items-center" style="flex-shrink: 0;">
                    <q-input filled v-model="input" color="secondary" class="col"
                        placeholder="Pergunte algo sobre o estoque..." @keyup.enter="sendMessage" />
                    <q-btn v-if="interacoes >= 3" icon="rocket" color="orange-14" class="q-mx-sm" glossy round
                        @click="iaDialogVisible = true" />
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
const showDialog = ref(false)

// Relatório mockado gerado pela "IA"
const relatorio = ref({
    interesses: '',
    abordagem: ''
})
const mensagensContainer = ref(null)
const dialogAberto = ref(false)
const carroSelecionado = ref({})
const $q = useQuasar()
const filtroEstoque = ref('')
const infoLojaVisible = ref(false)
const iaDialogVisible = ref(false)
const messages = ref([])
const input = ref('')
const showEstoqueDrawer = ref(false)
const carrossel = ref([])
const carrosselIndex = ref(0)
const interacoes = ref(0)

const usuario = ref({
    nome: '',
    telefone: '',
    preferencias: []
})

function openInfoLoja() {
    infoLojaVisible.value = true
}

const estoqueFiltrado = computed(() =>
    estoque.filter(carro =>
        carro.modelo.toLowerCase().includes(filtroEstoque.value.toLowerCase()) ||
        carro.categoria.toLowerCase().includes(filtroEstoque.value.toLowerCase()) ||
        carro.ano.toString().includes(filtroEstoque.value)
    )
)

function abrirDialog(carro) {
    while (carro.mensagens.length > 0) {
        messages.value.push({
            from: 'bot',
            text: carro.mensagens.pop()
        })
    }
    carroSelecionado.value = carro
    dialogAberto.value = true
}

function selecionarCarro(carro) {
    // Atualiza carrossel com apenas o carro selecionado
    carrossel.value = [carro]
    carrosselIndex.value = 0

    // Adiciona mensagens sobre o carro no chat
    carro.mensagens.forEach(texto => {
        messages.value.push({
            from: 'bot',
            text: texto
        })
    })

    nextTick(() => {
        mensagensContainer.value.scrollTop = mensagensContainer.value.scrollHeight
    })

    showEstoqueDrawer.value = false
}

const estoque = [
    {
        modelo: 'Fiat Uno', categoria: 'popular', ano: 2015, valor: 25000,
        img_url: '/uno.jpg',
        mensagens: [
            'Você sabia? O Uno foi um dos carros mais vendidos da história do Brasil!',
            'Compacto e econômico, ideal para uso urbano.',
            'IPVA e manutenção muito baratos!'
        ],
        descricao: '1.0 FIRE FLEX ATTRACTIVE MANUAL - 70.000km - Branco - 2021'
    },
    {
        modelo: 'Chevrolet Onix', categoria: 'popular', ano: 2020, valor: 90000,
        img_url: '/onix.jpg',
        mensagens: [
            'O Onix liderou o ranking de vendas por anos seguidos.',
            'Esse modelo 2020 já vem com central multimídia e direção elétrica.',
            'Ótimo consumo de combustível na estrada.'
        ],
        descricao: '1.0 TURBO FLEX PREMIER AUTOMÁTICO - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Chevrolet Camaro', categoria: 'esportivo', ano: 2023, valor: 460000,
        img_url: '/camaro.jpg',
        mensagens: [
            'O Camaro é um ícone dos esportivos americanos!',
            'Esse modelo 2023 vem com motor V8 e câmbio automático de 10 marchas.',
            'Acelera de 0 a 100 km/h em apenas 4 segundos!'
        ],
        descricao: '6.2 V8 16V GASOLINA 2P AUTOMÁTICO - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Toyota Corolla', categoria: 'sedan', ano: 2019, valor: 72000,
        img_url: '/corolla.jpg',
        mensagens: [
            'O Corolla é conhecido pela sua confiabilidade e durabilidade.',
            'Esse modelo tem um ótimo espaço interno e conforto para viagens longas.',
            'IPVA e manutenção muito baratos!'
        ],
        descricao: '1.8 FLEX ALTIS CVT - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Volkswagen T-Cross', categoria: 'SUV', ano: 2021, valor: 89000,
        img_url: '/tcross.jpg',
        mensagens: [
            'O T-Cross é um SUV compacto com ótimo espaço interno.',
            'Esse modelo vem com motor turbo e câmbio automático de 6 marchas.',
            'Ótimo consumo de combustível na cidade.'
        ],
        descricao: '1.0 TURBO FLEX HIGHLINE AUTOMÁTICO - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Jeep Renegade', categoria: 'SUV', ano: 2022, valor: 95000,
        img_url: '/renegade.jpg',
        mensagens: [
            'O Renegade é um SUV com ótimo desempenho off-road.',
            'Esse modelo vem com motor turbo e tração 4x4.',
            'Ótimo consumo de combustível na estrada.'
        ],
        descricao: '1.3 TURBO FLEX LONGITUDE AUTOMÁTICO - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Renault Kwid', categoria: 'popular', ano: 2023, valor: 46000,
        img_url: '/kwid.jpg',
        mensagens: [
            'O Kwid é um dos carros mais econômicos do Brasil!',
            'Esse modelo vem com central multimídia e direção elétrica.',
            'IPVA e manutenção fácil!'
        ],
        descricao: '1.0 FLEX ZEN MANUAL - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Honda Civic', categoria: 'sedan', ano: 2020, valor: 88000,
        img_url: '/civic.jpg',
        mensagens: [
            'O Civic é conhecido pela sua confiabilidade e durabilidade.',
            'Esse modelo tem um ótimo espaço interno e conforto para viagens longas.',
            'IPVA e manutenção muito baratos!'
        ],
        descricao: '1.5 TURBO FLEX EX CVT - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Ford Ka', categoria: 'popular', ano: 2018, valor: 32000,
        img_url: '/ka.jpg',
        mensagens: [
            'O Ka é um carro compacto ideal para o uso urbano.',
            'Esse modelo vem com central multimídia e direção elétrica.',
            'IPVA e manutenção muito baratos!'
        ],
        descricao: '1.0 FLEX SE MANUAL - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Hyundai Creta', categoria: 'SUV', ano: 2022, valor: 104000,
        img_url: '/creta.jpg',
        mensagens: [
            'O Creta é um SUV com ótimo espaço interno e conforto para viagens longas.',
            'Esse modelo vem com motor turbo e câmbio automático de 6 marchas.',
            'Ótimo consumo de combustível na estrada.'
        ],
        descricao: '1.0 TURBO FLEX PULSE AUTOMÁTICO - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Up Tsi', categoria: 'hatch', ano: 2016, valor: 46000,
        img_url: '/up.jpg',
        mensagens: [
            'O Up Tsi é um carro compacto ideal para o uso urbano.',
            'Esse modelo vem com motor turbo e câmbio automático de 6 marchas.',
            'IPVA e manutenção muito baratos!'],
        descricao: '1.0 TURBO FLEX HIGHLINE AUTOMÁTICO - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Ford Mustang', categoria: 'esportivo', ano: 2016, valor: 540000,
        img_url: '/mustang.jpg',
        mensagens: [
            'O Mustang é um ícone dos esportivos americanos!',
            'Esse modelo vem com motor V8 e câmbio automático de 10 marchas.',
            'Acelera de 0 a 100 km/h em apenas 4 segundos!'
        ],
        descricao: '5.0 V8 16V GASOLINA 2P AUTOMÁTICO - 50.000km - Preto - 2020'
    },
    {
        modelo: 'Chevy Impala', categoria: 'colecionador', ano: 1975, valor: 290000,
        img_url: '/impala.jpg',
        mensagens: [
            'O Impala é um clássico dos anos 70!',
            'Esse modelo tem um ótimo espaço interno e conforto para viagens longas.',
            'Isento de IPVA!'
        ],
        descricao: '5.7 V8 16V GASOLINA 4P AUTOMÁTICO - 50.000km - Preto - 2020'
    },
]

onMounted(() => {
    setTimeout(() => {
        relatorio.value = {
            interesses:
                'Cliente demonstrou forte interesse por SUVs automáticos com teto solar, até R$ 95.000. Pesquisou consumo, espaço interno e confiabilidade. Está comparando Jeep Renegade, Hyundai Creta e VW T-Cross.',
            abordagem:
                'Comece ressaltando os diferenciais de conforto, economia e segurança dos SUVs. Foque em modelos com teto solar e câmbio automático. Diga que temos pronta entrega de algumas versões. Ofereça test drive rápido e simulação de financiamento personalizada. Não pressione por decisão imediata.'
        }
    }, 1000)
    $q.dialog({
        title: 'Bem-vindo ao ChatCar IA!',
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
                    messages.value.push({
                        from: 'bot',
                        text: `😕 Não escolheu nenhuma categoria. Veja algumas opções aleatórias na vitrine!`
                    })
                    return
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
                carrossel.value = estoque.filter(carro => preferencias.includes(carro.categoria)).slice(0, 5)
                carrosselIndex.value = 0
                nextTick(() => {
                    mensagensContainer.value.scrollTop = mensagensContainer.value.scrollHeight
                })
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
            text: `😕 Não encontrei resultados com esse termo. Tente algo como "SUV", "Corolla", "2020" ou "50000".`
        })
    }

    nextTick(() => {
        if (mensagensContainer.value) {
            mensagensContainer.value.scrollTop = mensagensContainer.value.scrollHeight
        }
    })
}



watch(interacoes, (val) => {
    if (val === 3) {
        setTimeout(() => {
            messages.value.push({
                from: 'bot',
                text: '🚀 Clique no foguete para ver a sugestão da IA ChatCar personalizada pra você!'
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
