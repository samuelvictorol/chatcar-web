<template>
    <q-layout view="hHh lpR fFf">
        <q-header v-if="!loading" elevated class="bg-dark text-white">
            <q-toolbar>
                <q-toolbar-title class="row no-wrap w100 items-center">
                    <!-- <q-avatar>
                        <q-icon name="sms" size="lg" to="/" />
                    </q-avatar> -->
                    <div v-if="!loading" class="q-pl-sm animate__animated animate__fadeInLeft animate__slower">
                        <q-avatar size="40px" class="q-mr-sm">
                            <img :src="sobreLoja.img_url ? sobreLoja.img_url : '/logo.jpeg'" alt="Logo" />
                        </q-avatar>
                    </div>
                </q-toolbar-title>
                <q-btn class="q-mr-sm" color="grey-2" @click="confirmExit()" flat icon="logout" />
                <!-- <q-btn class="q-mr-sm" glossy color="blue-14" icon="psychology" @click="showDialog = !showDialog" /> -->
                <q-btn color="teal" label="estoque" icon="store" @click="toggleEstoqueDrawer" />
            </q-toolbar>
        </q-header>

        <!-- Menu lateral com estoque completo -->
        <q-drawer v-model="showEstoqueDrawer" side="right" bordered>
            <q-toolbar class="bg-dark text-white">
                <q-toolbar-title>Estoque</q-toolbar-title>
                <q-btn flat round icon="close" @click="showEstoqueDrawer = false" />
            </q-toolbar>

            <q-input v-model="filtroEstoque" color="secondary" @update:model-value="filtrarMenuEstoque()" outlined
                label="Filtrar estoque..." dense debounce="300" class="q-pa-sm relative">
                <template v-slot:append>
                    <q-btn icon='search' name="search" @click="filtrarMenuEstoque()"
                        class="cursor-pointer absolute-right" color="secondary" />
                </template>
            </q-input>
            <q-separator />
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
            <div class="q-pb-md w100 text-right q-px-sm text-grey-7">
                Powered by: <a href="chatcar.me" target="_blank" class="text-teal">chatcar.me</a>
            </div>

        </q-drawer>

        <!-- Página principal do chat -->
        <q-page-container class="bg-dark" v-if="!loading">
            <q-page class="q-pa-none bg-grey-4 column full-height relative">
                <!-- Vitrine fixa -->
                <div class="bg-dark sticky-top"
                    style="border-bottom-right-radius: 12px;border-bottom-left-radius: 12px">
                    <div class="w100 row no-wrap items-center justify-between q-px-md">
                        <div class="text-h6 text-white q-pt-sm ">{{ sobreLoja.nome }}</div>
                        <div class="text-h6 text-white q-pt-sm "><q-btn class="q-px-sm" label="contato"
                                icon-right="contact_support" color="" @click="openInfoLoja()"
                                style="border:2px solid white" dense flat></q-btn></div>

                    </div>

                    <div style="border-radius: 12px">
                        <q-carousel style="border-radius: 24px!important" navigation v-if="carrossel.length"
                            v-model="carrosselIndex" height="300px" class="bg-dark sticky text-white q-pb-sm" autoplay
                            interval="9000">
                            <template v-slot:control>
                                <div class="absolute-left q-pa-xs" style="top:45%">
                                    <q-btn icon="chevron_left" color="white" unelevated round dense size="lg"
                                        class="bg-black mid" style="opacity:.85"
                                        @click="carrosselIndex = (carrosselIndex - 1 + carrossel.length) % carrossel.length" />
                                </div>
                                <div class="absolute-right q-pa-xs" style="top:45%">
                                    <q-btn icon="chevron_right" color="white" unelevated round dense size="lg"
                                        class="bg-black mid" style="opacity:.85"
                                        @click="carrosselIndex = (carrosselIndex + 1) % carrossel.length" />
                                </div>
                            </template>

                            <q-carousel-slide v-for="(carro, i) in carrossel" :name="i" :key="i"
                                class="relative-position">
                                <q-img @click="abrirDialog(carro)" :src="carro.img_url" :alt="carro.modelo"
                                    class="fit relative rounded-borders" style="object-fit: cover;">
                                    <div class="absolute-bottom text-white shadow-2">
                                        <div style="background: #070707a2; backdrop-filter: blur(4px);"
                                            class=" text-center text-subtitle1 text-weight-bold">{{
                                                carro.modelo
                                            }}</div>
                                        <div style="background: #070707a2; backdrop-filter: blur(4px);"
                                            class="text-center text-caption">{{ carro.categoria.label }}
                                            - {{
                                                carro.ano }}</div>
                                    </div>
                                </q-img>
                                <q-btn icon-right="search" color="blue" glossy dense
                                    class="q-mx-md rounded-borders q-mt-md absolute-top" label="Detalhes"
                                    @click="abrirDialog(carro)" style="width: 40%;z-index: 99999999999!important;" />
                            </q-carousel-slide>
                        </q-carousel>

                    </div>
                    <!-- Dialog com informações da loja -->
                    <q-dialog v-model="infoLojaVisible">
                        <q-card class="q-pa-md" style="min-width: 350px; max-width: 90vw">
                            <q-card-section class="row items-center q-pb-none">
                                <div class="row justify-between no-wrap w100">
                                    <div class="text-h6">Sobre a {{ sobreLoja?.nome }}</div><br>
                                    <q-img :src="sobreLoja.img_url" alt="Logo da loja" class="rounded-borders"
                                        width="100px" height="100px" />
                                </div>
                                <q-space />
                            </q-card-section>
                            <q-card-section>
                                <q-list bordered padding class="rounded-borders">
                                    <q-item>
                                        <q-item-section>
                                            <!-- descrição -->
                                            <q-item-label caption>{{ sobreLoja?.site }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label class="text-subtitle1">Endereço:</q-item-label>
                                            <q-item-label caption>{{ sobreLoja?.localizacao }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label class="text-subtitle1">Contato:</q-item-label>
                                            <q-item-label caption>{{ sobreLoja?.contato }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label class="text-subtitle1">Email:</q-item-label>
                                            <q-item-label caption>{{ sobreLoja?.email }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                            <q-card-actions align="right">
                                <q-btn flat label="Fechar" color="grey-14" v-close-popup />
                                <q-btn label="fale conosco" glossy icon-right="sms"
                                    @click="sendWppMessage('seu estoque de veículos')" color="secondary"
                                    v-close-popup />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    <!-- Dialog de detalhes -->
                    <q-dialog v-model="dialogAberto">
                        <q-card class="q-pa-none" style="width: 100%; max-width: 500px;">

                            <!-- Conteúdo com scroll -->
                            <div style="max-height: 95vh; overflow-y: auto;" class="">
                                <q-card-section class="relative">
                                    <div class="text-center text-white bg-teal rounded-borders shadow-1 q-mb-sm text-bold"
                                        style="font-size:1.2rem">
                                        {{ carroSelecionado.modelo }}
                                    </div>

                                    <q-carousel v-model="slideAtivoDetalhes" v-if="imagensVeiculoSelecionado.length"
                                        swipeable animated class="rounded-borders q-mb-md bg-grey-2" navigation arrows
                                        infinite>
                                        <q-carousel-slide class="bg-dark"
                                            v-for="(img, index) in imagensVeiculoSelecionado" :key="index"
                                            :name="index">
                                            <q-img :src="img" fit="contain" class="rounded-borders w100 cursor-pointer"
                                                style="border-bottom: 4px solid teal; border-top: 4px solid teal; height: 100%;"
                                                @click="abrirZoom(img)" />
                                        </q-carousel-slide>
                                    </q-carousel>

                                    <div class="text-caption q-mb-sm">
                                        <strong class="text-orange-14">{{ carroSelecionado?.ano }}</strong> -
                                        <strong class="text-purple-14">{{ carroSelecionado.categoria?.label }}</strong>
                                        -
                                        <strong class="text-teal">{{ carroSelecionado?.cor.toUpperCase() }}</strong> -
                                        <strong class="text-blue-14">{{ carroSelecionado?.km }}km</strong>
                                    </div>

                                    <q-separator class="q-my-xs" />

                                    <div v-if="carroSelecionado.descricao" class="text-body2">
                                        {{ carroSelecionado?.descricao }}
                                    </div>
                                </q-card-section>
                            </div>

                            <!-- Ações fixas -->
                            <q-card-actions align="right" class="q-pa-sm bg-grey-2"
                                style="position: sticky; bottom: 0; z-index: 1;">
                                <div v-if="carroSelecionado.preco" class="text-body2 text-bold q-pr-xl text-teal"
                                    style="font-size: 1rem;">
                                    R$ {{ carroSelecionado?.preco }}
                                </div>
                                <q-btn label="Contato" glossy icon-right="sms"
                                    @click="sendWppMessage(carroSelecionado.modelo)" color="blue" v-close-popup />
                            </q-card-actions>
                        </q-card>
                        <div class="w100 text-center">
                            <q-btn label="fechar" @click="dialogAberto = !dialogAberto" flat></q-btn>
                        </div>
                    </q-dialog>


                </div>
                <q-dialog v-model="dialogZoom" persistent>
                    <div style="height:100vh" class="column w100 relative">
                        <q-img :src="zoomImagemUrl" fit="contain" class="rounded-borders"
                            style="max-height: 100vh; max-width: 100%; object-fit: contain; border-bottom: 4px solid teal" />

                        <!-- Botão para voltar -->
                        <q-btn icon="chevron_left" color="teal" glossy dense @click="imagemAnteriorZoom"
                            class="absolute-left" style="top: 60%; background: rgba(0,0,0,0.4);" />

                        <!-- Botão para avançar -->
                        <q-btn icon="chevron_right" color="teal" glossy dense @click="proximaImagemZoom"
                            class="absolute-right" style="top: 60%; background: rgba(0,0,0,0.4);" />

                        <q-btn label="Fechar" color="teal" flat @click="fecharZoom"
                            class="absolute-bottom q-mx-sm q-mb-md" />
                    </div>
                </q-dialog>


                <!-- Container de mensagens -->
                <div class="col column no-wrap" style="overflow: hidden;">
                    <div ref="mensagensContainer" class="col scroll q-pa-md q-gutter-sm" style="overflow-y: auto;">
                        <q-chat-message style="font-size:.9rem" v-for="(msg, index) in messages" :key="index"
                            :sent="msg.from === 'user'" class="animate__animated animate__zoomIn" :text="[msg.text]"
                            :name="msg.from === 'user' ? 'Você' : sobreLoja.login"
                            :bg-color="msg.from === 'user' ? 'green-11' : 'grey-3'" />
                    </div>
                </div>
                <div class="w100" style="height:10px"></div>
                <!-- Input fixo no final -->
                <div class="q-pa-md bg-white row items-center"
                    style="flex-shrink: 0; z-index: 9; position: sticky; bottom: 0; left: 0; width: 100%;">
                    <q-input filled v-model="input" label="Digite sua mensagem" maxlength="100" color="secondary" class="col"
                        placeholder="Ex: 'SUV até R$ 350.000', 'Qual o motor desse veículo?'" @keyup.enter="sendMessage" />
                    <!-- <q-btn v-if="interacoes >= 3" icon="rocket" color="orange-14" class="q-mx-sm" glossy round
                        @click="iaDialogVisible = true" /> -->
                    <q-btn v-if="!loadingIA" icon="send" color="teal" flat round class="q-pl-sm" @click="sendMessage" />
                    <q-spinner-comment v-else color="teal" class="q-pl-sm" size="2em" />
                </div>
            </q-page>
        </q-page-container>
        <q-page-container v-else class="bg-dark" style="height: 100vh">
            <div class="w100 q-py-xl row justify-center items-center">
                <q-spinner-ball color="teal" size="4em" />
                <q-spinner-ball color="teal" size="4em" />
                <q-spinner-ball color="teal" size="4em" />
            </div>
        </q-page-container>
    </q-layout>
</template>
<script setup>
import { ref, computed, onMounted, watch, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from 'src/boot/axios';

const showDialog = ref(false)
const router = useRouter()

const sobreLoja = ref(null)
const loading = ref(true)
const loadingIA = ref(false)
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
const route = useRoute()
const usuario = ref({
    nome: '',
    telefone: '',
    info: '',
    preferencias: [],
})
const leadId = ref(null)
const lead = ref(null)

const dialogZoom = ref(false)
const slideAtivoDetalhes = ref(0)
const zoomImagemUrl = ref(null)

// Métodos
const abrirZoom = (imgUrl) => {
    zoomImagemUrl.value = imgUrl
    dialogZoom.value = true
}

const fecharZoom = () => {
    zoomImagemUrl.value = null
    dialogZoom.value = false
}

const enviarMensagemWhatsApp = (modelo) => {
    const mensagem = `Olá, tenho interesse no ${modelo}!`
    const numero = 'SEU_NUMERO_WHATSAPP'
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
}

function fecharDetalhes() {
    dialogAberto.value = false
    slideAtivoDetalhes.value = 0
}
async function gerarLead() {
    // Detectar a origem do tráfego
    const ref = document.referrer;
    let origem = '';

    if (ref.includes("instagram.com")) origem = "Instagram";
    else if (ref.includes("facebook.com")) origem = "Facebook";
    else if (ref.includes("google.com")) origem = "Google";
    else if (ref.includes("whatsapp.com")) origem = "WhatsApp";
    else if (ref.includes("youtube.com")) origem = "YouTube";
    else if (ref.includes("t.me") || ref.includes("telegram.org")) origem = "Telegram";
    else if (ref.includes("linkedin.com")) origem = "LinkedIn";
    else if (ref.includes("tiktok.com")) origem = "TikTok";
    else if (ref === "") origem = "ChatCar";
    else origem = "ChatCar";

    await api.post('/gerar-lead', {
        login_loja: route.params.login,
        cliente: usuario.value,
        respostasCliente: [],
        origem: origem // 👈 envia origem pro backend
    }).then(response => {
        leadId.value = response.data.leadId;
        $q.notify({
            color: 'teal',
            position: 'top',
            icon: 'directions_car',
            message: 'Seja bem-vindo(a)!'
        });
    });
}

const imagensVeiculoSelecionado = computed(() => {
    if (!carroSelecionado.value) return []
    const lista = []

    if (carroSelecionado.value.img_url?.trim()) {
        lista.push(carroSelecionado.value.img_url)
    }

    if (Array.isArray(carroSelecionado.value.mensagens)) {
        lista.push(...carroSelecionado.value.mensagens.filter(msg => msg?.trim()))
    }

    return lista
})
const proximaImagemZoom = () => {
    slideAtivoDetalhes.value = (slideAtivoDetalhes.value + 1) % imagensVeiculoSelecionado.value.length
    zoomImagemUrl.value = imagensVeiculoSelecionado.value[slideAtivoDetalhes.value]
}

const imagemAnteriorZoom = () => {
    slideAtivoDetalhes.value =
        (slideAtivoDetalhes.value - 1 + imagensVeiculoSelecionado.value.length) %
        imagensVeiculoSelecionado.value.length
    zoomImagemUrl.value = imagensVeiculoSelecionado.value[slideAtivoDetalhes.value]
}

async function carregarEstoque() {
    try {
        if (route.params.login === 'jatoveiculos') {
            $q.notify({
                color: 'teal',
                icon: 'directions_car',
                position: 'top',
                message: 'Esse é o nosso estoque de testes! É assim que seus clientes serão atendidos 24 horas!'
            });
        }
        const { data } = await api.get('/estoque-publico/' + route.params.login);
        sobreLoja.value = data.loja;
        estoque.value = data.estoque;
        estoqueFiltrado.value = [...estoque.value];
        if (estoque.value == [] || estoque.value.length == 0) {
            $q.notify({
                color: 'teal',
                icon: 'directions_car',
                position: 'top',
                message: 'Esse estoque ainda não possui veículos cadastrados'
            });
            setTimeout(() => window.location.href = '/', 2000)
        }
    } catch (err) {
        console.error('Erro ao buscar estoque', err);
        $q.notify({
            color: 'dark',
            icon: 'error',
            position: 'top',
            message: err.response?.data?.error
        });
        setTimeout(() => {
            router.push('/')
        }, 1000)
    }
}

function openInfoLoja() {
    infoLojaVisible.value = true
}

const estoqueFiltrado = ref([])

function abrirDialog(carro) {
    // console.log(carro)
    usuario.value.preferencias.push(carro.modelo)
    interacoes.value++;
    nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })
    carroSelecionado.value = carro
    setTimeout(() => {
        dialogAberto.value = true
    }, 1000)
}

function sendWppMessage(modelo) {
    // Extrai apenas os números do telefone
    const numeroFormatado = sobreLoja.value.contato.replace(/\D/g, '');
    const text = `Olá! Gostaria de saber mais sobre ${modelo}.`;
    const mensagem = encodeURIComponent(text);
    const link = `https://wa.me/${numeroFormatado}?text=${mensagem}`;
    window.open(link, '_blank');
}

function selecionarCarro(carro) {

    const indexExistente = carrossel.value.findIndex(c => c.id === carro.id)
    if (indexExistente !== -1) {
        carrossel.value.splice(indexExistente, 1) // remove se já existe
    }
    carrossel.value.splice(0, 0, carro) // insere na posição 1

    carrosselIndex.value = 0
    messages.value.push({
        from: 'bot',
        text: '🚗 Aqui está ' + carro.modelo + ', para mais informações clique 🔍Ver Detalhes. Ou me pergunte o que quiser sobre este veículo 😃.'
    })

    nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })

    showEstoqueDrawer.value = false
}

const estoque = ref([])

onBeforeMount(async () => {
    await carregarEstoque()
    setTimeout(() => {
        loading.value = false
    }, 2000)

    $q.dialog({
        html: true,
        title: `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <img src="${sobreLoja.value.img_url}" alt="Logo" style="width: 32px; height: 32px; border-radius: 50%;" />
      <span>${sobreLoja.value.nome}:</span>
    </div>
  `,
        message: `Bem-vindo(a)! Pra iniciar, poderia nos informar o seu nome?`,
        prompt: {
            model: '',
            type: 'text',
            color: 'secondary',
            placeholder: 'Digite seu nome...',
            outlined: true,
            isValid: val => val && val.trim().length >= 3,
            validateInput: true
        },
        persistent: true,
        ok: {
            label: 'Continuar',
            color: 'secondary',
            glossy: true
        },
        cancel: {
            label: 'Voltar',
            color: 'dark',
            flat: true
        }
    }).onCancel(() => {
        router.push('/')
    }).onOk(nome => {
        usuario.value.nome = nome

        $q.dialog({
            title: '📲 Para ver nosso estoque de veículos, informe seu whatsapp:',
            message: `${usuario.value.nome}, digite seu número com DDD:`,
            prompt: {
                model: '',
                type: 'tel',
                mask: '(##) #####-####',
                color: 'secondary',
                placeholder: '(12) 34567-8910',
                outlined: true,
                isValid: val => val && val.trim().length === 15,
                validateInput: true
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
                    message: '⚠️ O telefone é obrigatório!'
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
            )

            const categoriaOptions = categoriasUnicas.map(cat => ({
                label: String(cat).charAt(0).toUpperCase() + String(cat).slice(1),
                value: cat
            }))

            $q.dialog({
                title: '⚙️ Preferências',
                message: 'Quais tipos de veículo você mais se interessa?',
                options: {
                    type: 'checkbox',
                    model: [],
                    color: 'secondary',
                    items: categoriaOptions
                },
                ok: {
                    label: 'Avançar',
                    color: 'secondary',
                    glossy: true
                },
                persistent: true
            }).onOk(preferencias => {
                usuario.value.preferencias = preferencias

                const carrosFiltrados = estoque.value.filter(carro =>
                    preferencias.includes(carro.categoria.label)
                )

                const lista = carrosFiltrados.length ? carrosFiltrados : estoque.value
                const quantidade = lista.length >= 5 ? 5 : lista.length

                carrossel.value = [...lista].sort(() => 0.5 - Math.random()).slice(0, quantidade)
                carrosselIndex.value = 0


                messages.value.push({
                    from: 'bot',
                    text: `Para ver todas as opções disponíveis, clique no Botão "estoque" na lateral superior direita.`
                })
                messages.value.push({
                    from: 'bot',
                    text: `${usuario.value.nome}, Aqui estão algumas opções do nosso estoque, qual o tipo de veículo você procura?`
                })

                nextTick(() => {
                    window.scrollTo(0, document.body.scrollHeight)
                })
            })
            gerarLead()
        })
    })
})


function toggleEstoqueDrawer() {
    showEstoqueDrawer.value = !showEstoqueDrawer.value
}
async function sendMessage() {
    const texto = input.value.trim();
    if (!texto) return;

    // Adiciona mensagem do usuário
    messages.value.push({ from: 'user', text: texto });
    interacoes.value++;
    input.value = '';

    await nextTick();
    scrollToBottom();

    try {
        loadingIA.value = true;

        const vitrineAtualIds = carrossel.value.map(v => v.id);

        const response = await api.post('/chatvitrine', {
            login: sobreLoja.value.login,
            lead: leadId.value,
            mensagem: texto,
            vitrineAtual: vitrineAtualIds
        });
        const { chatvitrine } = response.data;

        const sugeridos = estoque.value.filter(veiculo =>
            chatvitrine.estoque.includes(veiculo.id)
        );
        carrosselIndex.value = 0;
        carrossel.value = sugeridos;

        let delayCount = 200
        for (const msg of chatvitrine.mensagens) {
            messages.value.push({ from: 'bot', text: msg });
            await nextTick();
            await delay(delayCount);
            scrollToBottom();
            delayCount += 600
        }

    } catch (error) {
        console.error('Erro no chat vitrine:', error);
        messages.value.push({
            from: 'bot',
            text: '⚠️ Algo deu errado ao buscar os veículos. Tente novamente mais tarde.'
        });
        await nextTick();
        scrollToBottom();
    } finally {
        loadingIA.value = false;
    }
}

function confirmExit() {
    $q.dialog({
        title: 'Sair do chat',
        message: 'Você tem certeza que deseja sair do chat?',
        cancel: true,
        persistent: true,
        ok: {
            label: 'Sair',
            color: 'negative'
        }
    }).onOk(() => {
        router.push('/')
    }).onCancel(() => {
        // Do nothing, user cancelled
    });
}

// Função utilitária para delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}


function filtrarMenuEstoque() {
    const texto = filtroEstoque.value.trim();
    if (!texto) {
        estoqueFiltrado.value = estoque.value;
        return;
    }
    usuario.value.preferencias.push(texto)
    interacoes.value++;

    const termo = texto.toLowerCase();
    const resultado = estoque.value.filter(carro => {
        return (
            carro.modelo?.toLowerCase().includes(termo) ||
            carro.ano?.toString().includes(termo)
        )
    });
    estoqueFiltrado.value = resultado;
}
async function atualizarLead() {
    if (!leadId.value) return; // Se ainda não criou o lead, não atualiza

    try {
        // Agora só pega mensagens enviadas pelo us uário
        const respostasCliente = messages.value
            .filter(msg => msg.from === 'user') // pega apenas quem é 'user'
            .map(msg => msg.text);

        await api.put(`/atualizar-lead/${leadId.value}`, {
            cliente: usuario.value,
            respostasCliente: respostasCliente
        });

        // console.log('Lead atualizado com sucesso após interação!');
    } catch (err) {
        // console.error('Erro ao atualizar lead:', err);
    }
}

watch(interacoes, async (val) => {
    if (val > 0 && val % 1 === 0) {
        await atualizarLead();
    }
});

</script>
<style scoped>
.q-page-container {}

.sticky-top {
    position: sticky;
    top: 50px;
    z-index: 10;
}

.q-img__content>div {
    background: none !important;
}

#item-estoque {
    cursor: pointer;
    transform: all 0.2s linear;
}

#item-estoque:hover {
    background-color: #26A69A !important;
    color: white !important;
}

@media (min-width: 900px) {
    .q-page-container {
        padding: 0 250px 0 250px;
    }
}

@media (min-width: 1600px) {
    .q-page-container {
        padding: 0 500px 0 500px;
    }
}

.scroll {
    scroll-behavior: smooth;
}
</style>
