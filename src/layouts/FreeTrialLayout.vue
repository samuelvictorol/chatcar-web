<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-dark text-white">
            <q-toolbar>
                <q-toolbar-title class="row no-wrap w100 items-center">
                    <!-- <q-avatar>
                        <q-icon name="sms" size="lg" to="/" />
                    </q-avatar> -->
                    <div class="q-pl-sm animate__animated animate__fadeInLeft animate__slower">
                        ChatCars Store
                    </div>
                </q-toolbar-title>
                <q-btn class="q-mr-sm" color="grey-2" to="/loja" flat icon="logout" />
                <!-- <q-btn class="q-mr-sm" glossy color="blue-14" icon="psychology" @click="showDialog = !showDialog" /> -->
                <q-btn glossy color="secondary" icon="store" @click="toggleEstoqueDrawer" />
            </q-toolbar>
        </q-header>

        <!-- Menu lateral com estoque completo -->
        <q-drawer v-model="showEstoqueDrawer" side="right" bordered>
            <q-toolbar class="bg-dark text-white">
                <q-toolbar-title>Estoque</q-toolbar-title>
                <q-btn flat round icon="close" @click="showEstoqueDrawer = false" />
            </q-toolbar>
            <q-input v-model="filtroEstoque" color="secondary" @update:model-value="filtrarMenuEstoque()" outlined label="Filtrar estoque..." dense debounce="300"
                class="q-pa-sm relative">
                <template v-slot:append>
                    <q-btn icon='search' name="search"  @click="filtrarMenuEstoque()"  class="cursor-pointer absolute-right" color="secondary" />
                </template>
            </q-input>
            <q-list>
                <q-item id="item-estoque" v-for="(carro, i) in estoqueFiltrado" :key="i">
                    <q-item-section style="border-bottom: 1px solid #26A69A ;" class="q-pb-sm">
                        <div class="row w100 no-wrap items-center">
                            <div class="column text-bold">
                                <q-item-label>{{ carro.modelo }} - {{ carro.ano }}</q-item-label>
                                <q-item-label caption>{{ carro.categoria.label }}</q-item-label>
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
                <div class="bg-dark sticky-top">
                    <div class="w100 row no-wrap items-center justify-between q-px-md q-pt-sm">
                        <div class="text-h6 text-white q-pt-sm q-mb-sm">Vitrine</div>
                        <div class="text-h6 text-white q-pt-sm q-mb-sm"><q-btn label="sobre a loja"
                                icon-right="contact_support" color="" @click="openInfoLoja()"
                                style="border:2px solid #26A69A" dense flat></q-btn></div>

                    </div>

                    <div class="q-mx-auto" style="max-width: 700px;">
                        <q-carousel v-if="carrossel.length" v-model="carrosselIndex" navigation
                            navigation-color="secondary" arrows height="250px"
                            class="bg-dark sticky text-white q-pb-md">
                            <q-carousel-slide v-for="(carro, i) in carrossel" :name="i" :key="i"
                                class="relative-position">
                                <q-img :src="carro.img_url" :alt="carro.modelo" class="fit"
                                    style="object-fit: cover; border-radius: 12px;">
                                    <div class="absolute-bottom text-white q-pa-sm"
                                        style="background: #070707a2; backdrop-filter: blur(2px);">
                                        <div class="text-subtitle1 text-weight-bold">{{ carro.modelo }}</div>
                                        <div class="text-caption">{{ carro.categoria.label }} - {{ carro.ano }}</div>
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
                            <q-card-section class="row items-center q-pb-none no-wrap w100">
                                <q-icon name="psychology" size="md" color="blue-14" />
                                <div class="text-h6 q-ml-sm">Sugestão IA ChatCar</div>
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
                            <q-card-actions align="right">
                                <q-btn flat label="Fechar" color="grey-14" v-close-popup />
                                <q-btn glossy label="Fale Conosco" color="secondary" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    <!-- Dialog de detalhes -->
                    <q-dialog v-model="dialogAberto">
                        <q-card class="q-pa-md" style="width: 100%; max-width: 500px;">
                            <q-card-section>
                                <div class="text-h6">{{ carroSelecionado.modelo }}<br>R$ {{ carroSelecionado.preco }}
                                </div>
                                <div class="text-caption q-mb-sm">{{ carroSelecionado.categoria.label }} - {{
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

                <!-- Container de mensagens -->
                <div class="col column no-wrap" style="overflow: hidden;">
                    <div ref="mensagensContainer" class="col scroll q-pa-md q-gutter-sm" style="overflow-y: auto;">
                        <q-chat-message v-for="(msg, index) in messages" :key="index" :sent="msg.from === 'user'"
                            class="animate__animated animate__zoomIn" :text="[msg.text]"
                            :name="msg.from === 'user' ? 'Você' : 'ChatCars Store'"
                            :bg-color="msg.from === 'user' ? 'green-11' : 'grey-3'" />
                    </div>
                </div>
                <div class="w100" style="height:10px"></div>
                <!-- Input fixo no final -->
                <div class="q-pa-md bg-white row items-center"
                    style="flex-shrink: 0; z-index: 9; position: sticky; bottom: 0; left: 0; width: 100%;">
                    <q-input filled v-model="input" color="secondary" class="col"
                        placeholder="Ex: sedan, up tsi, 2020..." @keyup.enter="sendMessage" />
                    <!-- <q-btn v-if="interacoes >= 3" icon="rocket" color="orange-14" class="q-mx-sm" glossy round
                        @click="iaDialogVisible = true" /> -->
                    <q-btn icon="send" color="secondary" flat round @click="sendMessage" />
                </div>
            </q-page>


        </q-page-container>
    </q-layout>
</template>
<script setup>
import { ref, computed, onMounted, watch, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios';

const showDialog = ref(false)
const router = useRouter()

const sobreLoja = ref({
    nome: 'ChatCars Store',
    cnpj: '12.345.678/0001-99',
    endereco: 'Av. das Inovações, 1234 - Centro, São Paulo - SP',
    telefone: '(11) 98765-4321',
    email: ''
})
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
const userLogado = JSON.parse(localStorage.getItem("user"))
const estoque_id = userLogado.estoque
const loja_id = userLogado._id

async function carregarEstoque() {
    try {
        const { data } = await api.get('/meu-estoque', {
            params: { estoque_id, loja_id }
        })
        estoque.value = data.estoque.veiculos
        estoqueFiltrado.value = [...estoque.value];
    } catch (err) {
        console.error('Erro ao buscar estoque', err)
        $q.notify({
            type: 'negative',
            message: 'Erro ao buscar estoque'
        })
    }
}

function openInfoLoja() {
    infoLojaVisible.value = true
}

const estoqueFiltrado = ref([])

function abrirDialog(carro) {
    while (carro.mensagens.length > 0) {
        messages.value.push({
            from: 'bot',
            text: carro.mensagens.pop()
        })
    }
    nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })
    carroSelecionado.value = carro
    setTimeout(() => {
        dialogAberto.value = true
    }, 1000)
}

function selecionarCarro(carro) {
    // Atualiza carrossel com apenas o carro selecionado
    carrossel.value = [carro]
    carrosselIndex.value = 0

    messages.value.push({
        from: 'bot',
        text: '🚗 Aqui está ' + carro.modelo + ', para saber mais clique em 🔍Ver Detalhes.'
    })

    nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })

    showEstoqueDrawer.value = false
}

const estoque = ref([])


onMounted(() => {
    messages.value.push({
        from: 'bot',
        text: '✨ Seja bem-vindo(a) à nossa loja!'
    })
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
        persistent: true,
        ok: {
            label: 'Continuar',
            color: 'secondary',
            glossy: true
        },
        cancel: {
            label: 'voltar',
            color: 'dark',
            flat: true
        }
    }).onCancel(() => {
        router.push('/loja')
    })
        .onOk(nome => {
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
                ok: {
                    label: 'Continuar',
                    color: 'secondary',
                    glossy: true
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

                const categoriasUnicas = Array.from(
                    new Set(
                        estoque.value
                            .map(carro => carro.categoria?.label)
                            .filter(Boolean)
                    )
                );

                const categoriaOptions = categoriasUnicas.map(cat => {
                    if (cat == null) {
                        return { label: '', value: cat };
                    }
                    const categoriaStr = String(cat);
                    return {
                        label: categoriaStr.charAt(0).toUpperCase() + categoriaStr.slice(1),
                        value: cat
                    };
                });

                $q.dialog({
                    title: 'Preferências',
                    message: 'Quais tipos de veículo você mais se interessa?',
                    options: {
                        type: 'checkbox',
                        model: [],
                        color: 'secondary',
                        items: categoriaOptions
                    },
                    ok: {
                        label: 'Continuar',
                        color: 'secondary',
                        glossy: true
                    },
                    persistent: true
                }).onOk(preferencias => {
                    if (!preferencias.length) {
                        const totalCarros = estoque.value.length;
                        const quantidade = totalCarros >= 5 ? 5 : totalCarros;
                        const randomCarros = [...estoque.value]
                            .sort(() => 0.5 - Math.random())
                            .slice(0, quantidade);
                        carrossel.value = randomCarros;
                        messages.value.push({
                            from: 'bot',
                            text: `${usuario.value.nome}, veja algumas opções na nossa vitrine!⬆️`
                        });
                        return;
                    }

                    usuario.value.preferencias = preferencias;

                    const carrosFiltrados = estoque.value.filter(carro => preferencias.includes(carro.categoria.label));
                    const quantidade = carrosFiltrados.length >= 5 ? 5 : carrosFiltrados.length;
                    carrossel.value = [...carrosFiltrados]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, quantidade);
                    carrosselIndex.value = 0;

                    messages.value.push({
                        from: 'bot',
                        text: `${usuario.value.nome}, somos a ${sobreLoja.value.nome}! Aqui estão algumas opções do nosso estoque⬆`
                    });
                    messages.value.push({
                        from: 'bot',
                        text: `Se quiser ver mais opções, clique no ícone de "estoque" 🏪 na parte superior.`,
                    });

                    nextTick(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                    });
                }).onOk(descricao => {
                    $q.dialog({
                        title: 'Nos conte mais...',
                        message: 'Se quiser, descreva em poucas palavras como pretende usar o carro (uso urbano, família, trabalho, etc). Isso nos ajuda a entender melhor seu perfil:',
                        prompt: {
                            model: '',
                            type: 'textarea',
                            color: 'secondary',
                            isValid: val => true // não obrigatório
                        },
                        ok: {
                            label: 'Continuar',
                            color: 'secondary',
                            glossy: true
                        },
                        persistent: false
                    })
                }).onOk(sobreUsuario => {
                    usuario.value.preferencias.push(sobreUsuario)
                })
            })
        })
    messages.value.push({
        from: 'bot',
        text: `😁 Qual veículo você busca? Poderia me informar o modelo, ano, categoria ou preço?`
    })
})

function toggleEstoqueDrawer() {
    showEstoqueDrawer.value = !showEstoqueDrawer.value
}

function sendMessage() {
    if (!input.value.trim()) return;

    const texto = input.value.trim();
    messages.value.push({ from: 'user', text: texto });
    interacoes.value++;

    input.value = '';  // Limpa o campo de entrada

    const termo = texto.toLowerCase();

    // Filtra os carros no estoque com base no termo de busca
    const resultado = estoque.value.filter(carro => {
        return (
            carro.modelo.toLowerCase().includes(termo) ||
            carro.categoria.label.toLowerCase().includes(termo) ||
            carro.ano.toString().includes(termo) ||
            (carro.descricao && carro.descricao.toLowerCase().includes(termo)) ||
            (carro.mensagens && carro.mensagens.some(msg => msg.toLowerCase().includes(termo)))
        );
    });

    setTimeout(() => {
        if (resultado.length) {
            // Se encontrou carros, exibe o resultado
            messages.value.push({
                from: 'bot',
                text: `🔍 Encontrei ${resultado.length} carro(s) que podem te interessar. Veja na vitrine acima!`
            });
            carrossel.value = resultado; // Atualiza o carrossel com os resultados encontrados
        } else {
            // Se não encontrou, exibe uma mensagem dizendo que não há resultados
            messages.value.push({
                from: 'bot',
                text: `😕 Não encontrei resultados com esse termo. Tente algo como "SUV", "Corolla", "2020" ou algo relacionado à descrição dos veículos.`
            });
        }

        // Rola a página até a parte inferior para ver as mensagens
        nextTick(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }, 500);  // Delay de 500ms para uma transição mais suave
}


function filtrarMenuEstoque() {
    if (!filtroEstoque.value.trim()) {
        estoqueFiltrado.value = estoque.value
    }

    const texto = filtroEstoque.value.trim();
    interacoes.value++;

    
    const termo = texto.toLowerCase();
    
    const resultado = estoque.value.filter(carro => {
        return (
            carro.modelo.toLowerCase().includes(termo) || 
            carro.ano.toString().includes(termo)
        )
    });
    estoqueFiltrado.value = resultado
}

watch(interacoes, (val) => {
    if (val === 3) {
        // setTimeout(() => {
        //     messages.value.push({
        //         from: 'bot',
        //         text: '🚀 Clique no foguete para ver a sugestão da IA ChatCar personalizada pra você!'
        //     })
        // }, 600)
        setTimeout(() => {
            messages.value.push({
                from: 'bot',
                text: '✨ Em breve, um de nossos atendentes irá entrar em contato com você para uma conversa personalizada!'
            })
        }, 600)
        nextTick(() => {
            window.scrollTo(0, document.body.scrollHeight)
        })
    }
})

onBeforeMount(async () => {
    await carregarEstoque()
})
</script>
<style scoped>
.sticky-top {
    position: sticky;
    top: 50px;
    z-index: 10;
    background-color: #1a1a1a;
    /* Cor de fundo para destacar a vitrine fixa */
}

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
