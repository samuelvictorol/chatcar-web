<template>
    <!-- LandingPro.vue — versão adaptada: copys atualizadas, plano único e captação por e‑mail → link de pagamento -->
    <q-layout view="lHh Lpr lFf" class="bg-dark-900 text-grey-1">
        <!-- Header / Nav -->
        <q-header class="bg-dark-800/80 backdrop-blur-md q-py-sm" :class="{ 'mobile-compact': isMobile }">
            <q-toolbar class="container" dense>
                <div class="row items-center no-wrap full-width">
                    <div class="col-auto row items-center">
                        <img :src="content.brand.logo" alt="logo" height="28" class="cursor-pointer"
                            @click="goHome" />
                        <q-toolbar-title class="text-weight-bold">{{ content.brand.name }}</q-toolbar-title>
                    </div>
                    <div class="col row justify-end items-center nav-actions">
                        <q-btn flat dense class="q-ml-sm" v-for="item in content.nav" :key="item.to" :label="item.label"
                            @click="scrollTo(item.to)" />
                        <q-btn color="teal" class="q-ml-md" label="Quero me Cadastrar" @click="focusEmail" />
                    </div>
                </div>
            </q-toolbar>
            <!-- barra de captura inline (desktop) -->
            <q-toolbar class="container q-pt-none q-pb-sm" v-if="!isMobile">
                <q-form @submit.prevent="onSubmitEmail" class="row items-center full-width">
                    <q-input v-model="form.email" type="email" outlined dense color="primary"
                        class="col-12 col-md-5 bg-grey-2 text-dark rounded-borders" label="Seu melhor e‑mail*"
                        placeholder="nome@empresa.com" ref="emailInputRef">
                        <template v-slot:append>
                            <q-btn unelevated color="teal" icon-right="email"
                                class="text-white q-ml-sm q-mt-sm q-mt-none-md" :disable="!emailValid" label="enviar"
                                @click="onSubmitEmail" />
                        </template>
                    </q-input>

                </q-form>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <q-page>
                <!-- HERO -->
                <section id="hero" class="container q-py-xl">
                    <div class="row items-center q-col-gutter-xl">
                        <div class="col-12 col-md-6">
                            <div class="eyebrow">{{ content.hero.eyebrow }}</div>
                            <h1 class="display">{{ content.hero.title }}</h1>
                            <p class="lead q-mt-sm">{{ content.hero.subtitle }}</p>
                            <div class="row q-gutter-sm q-mt-md">
                                <q-btn unelevated color="teal" size="lg" :label="content.cta.primary"
                                    @click="focusEmail" />
                                <q-btn flat size="lg" :label="content.cta.secondary" icon="play_arrow"
                                    @click="showDemo = true" />
                            </div>
                            <div class="trust q-mt-lg row items-center q-col-gutter-md">
                                <q-avatar size="48px" v-for="(l, i) in content.hero.trust" :key="i">
                                    <img :src="l" style="object-fit: contain;" />
                                </q-avatar>
                                <div class="text-caption opacity-70">{{ content.hero.trustText }}</div>
                            </div>
                            <!-- captura inline (mobile) -->
                            <div class="q-mt-lg" v-if="isMobile">
                                <q-form @submit.prevent="onSubmitEmail">
                                    <q-input v-model="form.email" type="email" outlined dense color="primary"
                                        class="bg-grey-2 text-dark rounded-borders" label="Seu melhor e‑mail*"
                                        placeholder="nome@empresa.com" />
                                    <q-btn unelevated color="teal" class="q-mt-sm full-width" :disable="!emailValid"
                                        :label="content.cta.primary" @click="onSubmitEmail" />
                                </q-form>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="hero-media card-3d">
                                <iframe width="100%" class="video" src="https://www.youtube.com/embed/RPsD5myzNn4?si=m40WFYyPUgDjbtu9"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- VALUE / FEATURES GRID -->
                <section id="features" class="container q-py-xl">
                    <div class="section-head">
                        <h2>{{ content.features.title }}</h2>
                        <p class="subhead">{{ content.features.subtitle }}</p>
                    </div>
                    <div class="row q-col-gutter-lg">
                        <div v-for="(f, i) in content.features.items" :key="i" class="col-12 col-sm-6 col-md-4">
                            <q-card flat bordered class="feature-card">
                                <q-card-section class="row items-start q-col-gutter-sm">
                                    <q-avatar square class="feature-icon" size="36px"><q-icon
                                            :name="f.icon" /></q-avatar>
                                    <div class="col">
                                        <div class="text-subtitle1 text-weight-bold">{{ f.title }}</div>
                                        <div class="text-body2 opacity-80 q-mt-xs">{{ f.desc }}</div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </section>

                <!-- PROBLEM → SOLUTION (PAS) -->
                <section id="pas" class="container  rounded-borders q-py-xl">
                    <div class="row items-stretch q-col-gutter-lg">
                        <div class="col-12 col-md-4" v-for="(col, idx) in pasCols" :key="idx">
                            <q-card flat bordered class="pas-card" :class="col.variant">
                                <q-card-section>
                                    <div class="eyebrow header-2 rounded-borders text-white q-px-sm text-shadow"
                                        :class="col.variant === 'bg-primary text-dark' ? 'text-dark' : ''">{{ col.label
                                        }}</div>
                                    <div class="text-h6 q-mt-xs"
                                        :class="col.variant === 'bg-primary text-dark' ? 'text-white' : ''">{{ col.title
                                        }}
                                    </div>
                                    <p class="q-mt-sm"
                                        :class="col.variant === 'bg-primary text-dark' ? 'text-white text-shadow' : ''">
                                        {{
                                            col.copy
                                        }}</p>
                                    <q-input v-if="col.cta" v-model="form.email" type="email" outlined dense
                                        color="primary" class="col-12 col-md-5 bg-grey-2 text-dark rounded-borders"
                                        label="Seu melhor e‑mail*" placeholder="nome@empresa.com" ref="emailInputRef">
                                        <template v-slot:append>
                                            <q-icon :name="emailValid ? 'person_add' : 'email'"
                                                :color="emailValid ? 'teal' : 'teal'" class="cursor-pointer"
                                                @click="emailValid ? onSubmitEmail() : null" />
                                        </template>
                                    </q-input>
                                    <q-btn v-if="col.cta" color="teal" class="q-mt-md full-width"
                                        :label="content.cta.primary" @click="focusEmail" />
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </section>

                <!-- STEPS / HOW IT WORKS -->
                <section id="steps" class="container q-py-xl">
                    <div class="section-head">
                        <h2>{{ content.steps.title }}</h2>
                        <p class="subhead">{{ content.steps.subtitle }}</p>
                    </div>
                    <div class="row q-col-gutter-lg">
                        <div v-for="(s, i) in content.steps.items" :key="i" class="col-12 col-md-4">
                            <div class="step">
                                <div class="step-number">{{ i + 1 }}</div>
                                <div class="text-subtitle1 text-weight-bold">{{ s.title }}</div>
                                <div class="text-body2 opacity-80 q-mt-xs">{{ s.desc }}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- TESTIMONIALS -->
                <section id="testimonials" class="container  q-py-xl">
                    <div class="section-head">
                        <h2>{{ content.testimonials.title }}</h2>
                        <p class="subhead">{{ content.testimonials.subtitle }}</p>
                    </div>
                    <q-carousel v-model="slide" swipeable animated navigation control-type="flat"
                        class="testimonial-carousel">
                        <q-carousel-slide v-for="(t, i) in content.testimonials.items" :name="i" :key="i">
                            <q-card flat bordered class="q-pa-md header-2">
                                <q-card-section class="row items-center q-col-gutter-md">
                                    <q-avatar size="90px" class="q-mr-md"><img :src="t.avatar"
                                            style="object-fit: cover;" /></q-avatar>
                                    <div class="col">
                                        <div class="text-subtitle1 text-weight-bold">{{ t.name }}</div>
                                        <div class="text-caption opacity-60">{{ t.role }}</div>
                                    </div>
                                </q-card-section>
                                <q-separator />
                                <q-card-section>
                                    <q-icon name="format_quote" size="24px" class="opacity-40 q-mr-sm" />
                                    <span class="text-body1">{{ t.quote }}</span>
                                </q-card-section>
                            </q-card>
                        </q-carousel-slide>
                    </q-carousel>
                </section>

                <!-- PRICING → plano único -->
                <section id="pricing" class="container q-py-xl">
                    <div class="section-head">
                        <h2>{{ content.pricing.title }}</h2>
                        <p class="subhead">{{ content.pricing.subtitle }}</p>
                    </div>
                    <div class="row q-col-gutter-lg justify-center">
                        <div class="col-12 col-sm-10 col-md-6">
                            <q-card flat bordered class="pricing-card featured">
                                <q-card-section>
                                    <div class="text-h6 text-weight-bold">{{ content.pricing.tier.name }}</div>
                                    <div class="price q-mt-xs">{{ content.pricing.tier.price }}</div>
                                    <div class="text-caption opacity-70">{{ content.pricing.tier.note }}</div>
                                </q-card-section>
                                <q-separator />
                                <q-list dense>
                                    <q-item v-for="(f, j) in content.pricing.tier.features" :key="j">
                                        <q-item-section avatar><q-icon name="check_circle" /></q-item-section>
                                        <q-item-section>{{ f }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <q-card-actions align="center" class="q-pa-md">
                                    <q-input v-model="form.email" type="email" outlined dense color="teal"
                                        class="col-12 col-md-5 bg-grey-2 q-mb-md text-dark rounded-borders"
                                        label="Seu melhor e‑mail*" placeholder="nome@empresa.com" ref="emailInputRef">
                                        <template v-slot:append>
                                            <q-icon :name="emailValid ? 'person_add' : 'email'"
                                                :color="emailValid ? 'teal' : 'teal'" class="cursor-pointer"
                                                @click="emailValid ? onSubmitEmail() : null" />
                                        </template>
                                    </q-input>
                                    <q-btn color="teal" unelevated class="full-width" :label="content.cta.primary"
                                        @click="focusEmail" />
                                </q-card-actions>
                            </q-card>
                            <div class="q-mt-sm text-caption opacity-70 text-center">Pagamento único. Sem renovação
                                automática.
                            </div>
                        </div>
                    </div>
                </section>

                <!-- FAQ -->
                <section id="faq" class="container q-py-xl">
                    <div class="section-head">
                        <h2>{{ content.faq.title }}</h2>
                        <p class="subhead">{{ content.faq.subtitle }}</p>
                    </div>
                    <q-list bordered class="rounded-borders">
                        <q-expansion-item v-for="(qItem, i) in content.faq.items" :key="i" expand-icon="add"
                            expanded-icon="remove" :label="qItem.q">
                            <div class="q-pa-md opacity-80">{{ qItem.a }}</div>
                        </q-expansion-item>
                    </q-list>
                </section>

                <!-- FINAL CTA -->
                <section id="final-cta" class="container q-py-xl q-mb-xl">
                    <div class="final-cta row items-center justify-between">
                        <div class="col-12 col-md-8">
                            <h3 class="q-mt-none q-mb-xs">{{ content.finalCta.title }}</h3>
                            <p class="q-mt-none opacity-80">{{ content.finalCta.subtitle }}</p>
                        </div>
                        <div class="col-12 col-md-auto q-mt-md q-mt-none-md">
                            <q-btn color="teal" unelevated size="lg" label="Ativar Agora" icon-right="play_circle"
                                @click="focusEmail" />
                        </div>
                    </div>
                </section>

                <!-- DEMO MODAL -->
                <q-dialog v-model="showDemo" persistent>
                    <q-card style="max-width: 920px; width: 100%">
                        <q-bar>
                            <div class="text-subtitle2">Demo</div>
                            <q-space />
                            <q-btn dense flat icon="close" v-close-popup />
                        </q-bar>
                        <div class="w100">
                            <div class="text-center text-caption opacity-70 q-pa-sm">Veja o passo a passo de como
                                funciona a
                                ChatCar IA em apenas <strong>3 etapas</strong>.
                            </div>
                        </div>
                        <q-card-section>
                            <iframe width="100%" height="100%"
                                src="https://www.youtube.com/embed/y2Qka6CeEVg?si=lPPEuU7iZsQrit-P"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </q-card-section>
                    </q-card>
                </q-dialog>

                <!-- Snackbar/Toast success -->
                <q-dialog v-model="showDialog" persistent>
                    <q-card class="bg-dark-800 text-grey-1">
                        <q-card-section class="text-center">
                            <div class="text-h6 q-mb-md">📩 Quase lá!</div>
                            <div class="opacity-80 q-mb-md">Vamos te redirecionar para o ambiente seguro de pagamento.
                            </div>
                            <q-btn label="Ok" color="primary" unelevated @click="showDialog = false" />
                        </q-card-section>
                    </q-card>
                </q-dialog>

            </q-page>
        </q-page-container>

        <!-- Footer -->
        <q-footer class="bg-dark-800">
            <div class="container row items-center justify-center">
                <div class="text-caption opacity-60 q-py-xs">© {{ new Date().getFullYear() }} {{ content.brand.name }} IA - Desenvolvedor: <a style="text-decoration: none;" target="_blank"
                            href="https://samuelvictorol.github.io/portfolio" class="text-teal-14">Samuel V.</a>
                </div>
            </div>
        </q-footer>

        <!-- Botão fixo (mobile) -->
        <q-btn v-if="isMobile && emailValid" class="fixed-bottom-btn q-py-md" color="primary" unelevated
            :label="content.cta.primary" @click="onSubmitEmail" icon-right="shopping_cart_checkout" />
    </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
// usa seu boot de axios se existir
// evitar async setup: carregue axios dinamicamente apenas quando precisar
const apiRef = { value: null }
async function getApi() {
    if (apiRef.value !== null) return apiRef.value
    try { const mod = await import('src/boot/axios'); apiRef.value = mod.api }
    catch (e) { apiRef.value = null }
    return apiRef.value
}

const $q = useQuasar()
const showDemo = ref(false)
const showDialog = ref(false)
const slide = ref(0)
const isMobile = ref(false)
const emailInputRef = ref(null)
const form = ref({ email: '' })

onMounted(() => { isMobile.value = window.innerWidth <= 550 })

const props = defineProps({
    contentProp: { type: Object, default: null },
    // opcional: passar uma função externa para criar link de pagamento
    createPaymentLink: { type: Function, default: null }
})

function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function goHome() { try { window.location.href = '/' } catch (e) { } }

function focusEmail() {
    scrollTo('pricing')
    setTimeout(() => { emailInputRef.value?.focus() }, 300)
}

const emailValid = computed(() => {
    const v = (form.value.email || '').trim()
    return v.length >= 5 && v.length <= 100 && v.includes('@')
})

async function onSubmitEmail() {
    if (!emailValid.value) {
        return $q.notify({ type: 'negative', message: 'Informe um e‑mail válido.' })
    }
    $q.notify({ color: 'primary', icon: 'paid', message: 'Gerando link de pagamento…', position: 'top' })

    // Preferência: função passada via prop
    if (typeof props.createPaymentLink === 'function') {
        const url = await props.createPaymentLink(form.value.email)
        if (url) return redirectTo(url)
    }

    // Fallback: usar boot axios / ou fetch POST /pagar/criar-link
    try {
        let paymentUrl = null
        const api = await getApi();
        if (api) {
            const { data } = await api.post('/pagar/criar-link', { directLinkEmail: form.value.email, plano_id: '333333' })
            paymentUrl = data?.payment_url
        } else {
            const res = await fetch('/pagar/criar-link', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ directLinkEmail: form.value.email, plano_id: '333333' }) })
            const data = await res.json(); paymentUrl = data?.payment_url
        }
        if (!paymentUrl) throw new Error('payment_url ausente')
        showDialog.value = true
        setTimeout(() => redirectTo(paymentUrl), 1000)
    } catch (err) {
        console.error(err)
        $q.notify({ type: 'negative', message: 'Não foi possível gerar o link. Tente novamente.' })
    }
}

function redirectTo(url) { window.open(url, '_self') }

// === Conteúdo (copys adaptadas) ===
const content = props.contentProp || {
    brand: { name: 'ChatCar', logo: '/logo.jpeg' },
    nav: [
        { label: 'Início', to: 'hero' },
        { label: 'Recursos', to: 'features' },
        { label: 'Como funciona', to: 'steps' },
        { label: 'Clientes', to: 'testimonials' },
        { label: 'Plano', to: 'pricing' },
        { label: 'FAQ', to: 'faq' }
    ],
    cta: { primary: 'Finalizar cadastro e pagar', secondary: 'Ver demo' },
    hero: {
        eyebrow: 'Vitrine digital inteligente',
        title: 'Transforme seu estoque em um vendedor 24h',
        subtitle: 'A ChatCar IA atende, qualifica e encaminha leads com abordagem pronta — integrada ao WhatsApp e pronta para tráfego pago.',
        poster: 'https://placehold.co/960x540/png',
        video: 'https://www.youtube.com/embed/px4S7qbkVSw',
        trust: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl7wjsqAUY-9Cj6sXGdSmE1WDFDuu7sPVQn95X7rfAqXWHgHd3-LpcI0yMEVgQRQSDCyg&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYFwG77rWKmI-QZqXS4-ApcxKf-JQpNLnQCw&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk9ahFvt1PoFsV9q0-VXKfLSA8xYaCsKyU5A&s',
            'https://static.autoconf.com.br/site-irw-motors-1886/build/logo.png',
        ],
        trustText: 'Times de vendas reais usando em produção'
    },
    features: {
        title: 'Recursos que geram conversão',
        subtitle: 'Fluxo enxuto, experiência rápida e dados acionáveis.',
        items: [
            { icon: 'bolt', title: 'Atendimento 24h', desc: 'IA que responde na hora e não perde lead.' },
            { icon: 'smart_toy', title: 'Recomendação por perfil', desc: 'Mostra carros aderentes e tira dúvidas técnicas.' },
            { icon: 'call_made', title: 'Qualificação + WhatsApp', desc: 'Encaminha só quem quer negociar de verdade.' },
            { icon: 'insights', title: 'Resumo do cliente', desc: 'Abordagem personalizada para seu vendedor.' },
            { icon: 'campaign', title: 'Pronto para tráfego pago', desc: 'Link único para anunciar no Insta, Face e TikTok.' },
            { icon: 'track_changes', title: 'Rastreio de origem', desc: 'Saiba de onde vem cada lead (UTM/Referer).' }
        ]
    },
    pas: {
        problem: { title: 'Leads somem sem resposta', copy: 'Demora mata a venda. Enquanto alguém não atende, outro fecha.' },
        agitate: { title: 'Follow‑up manual é caro', copy: 'Planilha paralela e turnos curtos viram gargalo.' },
        solution: { title: 'ChatCar IA faz o primeiro contato', copy: 'Atende, qualifica, registra e entrega a conversa aquecida no seu WhatsApp.' }
    },
    steps: {
        title: 'Como funciona',
        subtitle: 'Ative em minutos e comece a vender sem fricção.',
        items: [
            { title: 'Cadastre seu estoque', desc: 'Cadastre informações básicas e imagens de seus veículos. Gere seu link único.' },
            { title: 'IA ativa 24h', desc: 'Mostra veículos, aquece e qualifica o cliente, tira dúvidas e filtra interessados.' },
            { title: 'Receba leads prontos', desc: 'Resumo + abordagem personalizada para fechar. Rastreamento de Leads' }
        ]
    },
    testimonials: {
        title: 'Quem usa recomenda',
        subtitle: 'Feedback de quem colocou em prática.',
        items: [
            { name: 'Marina Campos', role: 'Gestora •  JHC Seminovos', avatar: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', quote: 'O pré-atendimento 24 horas aumentou em 58% os agendamentos e os tests-drive. A equipe aceitou rapidamente o app.' },
            { name: 'Rafael Diniz', role: 'Diretor • Master Motors', avatar: 'https://images.unsplash.com/photo-1624797432677-6f803a98acb3?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', quote: 'Os relatórios IA reduziram em 2x nosso tempo de reunião e a qualidade das abordagens aos clientes.' },
            { name: 'João Nogueira', role: 'CMO • Jato Veículos', avatar: 'https://images.unsplash.com/photo-1653669486634-cfac2c3f0937?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', quote: 'Esse chatvitrine + o site de estoque inteligente é incrível! O atendimento é tão similar a um humano que mal da pra perceber a diferença.' }
        ]
    },
    pricing: {
        title: 'Plano único',
        subtitle: 'Sem mensalidade. Você paga uma vez e usa por 30 dias.',
        tier: {
            name: 'Profissional',
            price: 'R$ 49,90',
            note: 'Acesso por 30 dias • Sem renovação automática',
            features: [
                'Atendimento IA 24h',
                '1 usuário • 50 conversas/mês',
                'Resumo e abordagem do lead',
                'Rastreio de origem (UTM)',
                'Pronto para anúncios (link único)'
            ]
        }
    },
    faq: {
        title: 'Dúvidas frequentes',
        subtitle: 'Tudo às claras antes de ativar.',
        items: [
            { q: 'Para que serve?', a: 'Vendedor e Vitrine Digital Inteligente que atende, qualifica e encaminha leads com abordagem pronta — integrada ao WhatsApp e pronta para tráfego pago.' },
            { q: 'Serve como site de estoque?', a: 'Sim. É web. Você compartilha o link da sua vitrine interativa.' },
            { q: 'Precisa de cartão? Tem renovação automática?', a: 'Não. Basta informar o seu e‑mail e gerar o link de pagamento seguro que pode ser pago via PIX ou cartão de crédito no valor de R$ 49,90. O pagamento é único por 30 dias de acesso.' },
            { q: 'Posso usar um período de testes?', a: 'Sim! Cadastrando-se em chatcar.me/login você ganha 2 dias grátis para testar.' },
            { q: 'Funciona sem instalar nada?', a: 'Sim. É web. Você compartilha o link da sua vitrine interativa.' },
            { q: 'Dá pra ver de onde o cliente veio?', a: 'Sim. Rastreio de origem do cliente incluído (tiktok, instagram, facebook etc) para você otimizar seus anúncios e trafego pago.' },
            { q: 'Qual o contato para suporte e dúvidas?', a: 'Você pode entrar em conosco via email - chatcar.suporte@gmail.com - ou em nosso Instagram - @chatcar.ia - e em breve um de nossos consultores irá te atender para um atendimento personalizado. Caso queira falar com nossa Atendente Virtual 24h, acesse nosso perfil no instagram.' },
            { q: 'Quem são os Desenvolvedores da ChatCar IA?', a: 'Conheça mais sobre os desenvolvedores da ChatCar, Samuel Victor (Founder e Desenvolvedor) e Igor Thiago (Co-Founder e Desenvolvedor) em: ( samuelvictorol.github.io/portfolio ) e ( linkedin.com/in/igorsantanal ), respectivamente.' }
        ]
    },
    finalCta: {
        title: 'Pronto para ativar sua vitrine inteligente?',
        subtitle: 'Informe seu e‑mail, gere o link e comece a usar hoje.'
    },
    social: [
        { icon: 'mdi-instagram', href: 'https://instagram.com/chatcar.ia' },
        { icon: 'mdi-youtube', href: 'https://youtube.com' },
        { icon: 'mdi-linkedin', href: 'https://linkedin.com' }
    ]
}

const pasCols = [
    { label: 'Problema', title: content.pas.problem.title, copy: content.pas.problem.copy },
    { label: 'Agitação', title: content.pas.agitate.title, copy: content.pas.agitate.copy },
    { label: 'Solução', title: content.pas.solution.title, copy: content.pas.solution.copy, cta: true, variant: 'bg-primary text-dark' }
]
</script>

<style scoped>
/* Container width and rhythm */
.container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 16px;
}

.display {
    font-size: clamp(32px, 5vw, 54px);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
}

.lead {
    font-size: 1.125rem;
    opacity: 0.85;
}

.subhead {
    opacity: 0.75;
}

.eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.75rem;
    opacity: 0.9;
}

.opacity-60 {
    opacity: .6
}

.opacity-70 {
    opacity: .7
}

.opacity-80 {
    opacity: .8
}

/* Hero media */
.hero-media {
    border-radius: 20px;
    overflow: hidden;
    position: relative;
}

.hero-media .video {
    width: 100%;
    display: block;
    aspect-ratio: 16/9;
    object-fit: cover;
}

.card-3d {
    box-shadow: 0 20px 60px rgba(0, 0, 0, .35), inset 0 1px 0 rgba(255, 255, 255, .04);
    border: 1px solid rgba(255, 255, 255, .08);
}

/* Feature cards */
.feature-card {
    border-radius: 16px;
    background: rgba(255, 255, 255, .02);
    border-color: rgba(255, 255, 255, .08)
}

.feature-icon {
    background: rgba(255, 255, 255, .06);
    border-radius: 10px;
}

/* PAS cards */
.pas-card {
    border-radius: 16px;
    background: rgba(255, 255, 255, .02);
    border-color: rgba(255, 255, 255, .08)
}

/* Steps */
.step {
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, .08);
    border-radius: 14px;
    background: rgba(255, 255, 255, .02);
    height: 100%;
}

.step-number {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-bottom: 8px;
    background: rgba(255, 255, 255, .08)
}

/* Testimonials */
.testimonial-carousel {
    border-radius: 16px;
    overflow: hidden;
    background: transparent;
}

/* Pricing */
.pricing-card {
    border-radius: 18px;
    background: rgba(255, 255, 255, .02);
    border-color: rgba(255, 255, 255, .08);
    position: relative;
}

.pricing-card.featured {
    background: linear-gradient(180deg, rgba(20, 185, 155, .25), rgba(10, 80, 70, .25));
    border-color: rgba(38, 226, 192, 0.4);
}

.price {
    font-size: 2.2rem;
    font-weight: 800;
    margin-top: 6px;
}

/* Final CTA */
.final-cta {
    padding: 24px;
    border: 1px dashed rgba(255, 255, 255, .18);
    border-radius: 16px;
    background: rgba(255, 255, 255, .03);
}

/* Dark palette helpers */
.bg-dark-900 {
    background: #0b0e13;
}

.bg-dark-800 {
    background: #121821;
}

.bg-dark-800\/80 {
    background: rgba(18, 24, 33, .8);
}

.text-dark {
    color: #0b0e13;
}

/* Primary color override (teal-ish) */
:deep(.bg-primary) {
    background: #10a29dd7 !important;
}

:deep(.text-primary) {
    color: #14b89b !important;
}

:deep(.q-btn.bg-primary) {
    background: #14b89b !important;
    color: #0b0e13 !important;
    font-weight: 700;
}

/* Elevation polish */
:deep(.q-card) {
    backdrop-filter: saturate(120%) blur(2px);
}

/* Small tweaks */
.trust .q-avatar {
    border: 1px solid rgba(255, 255, 255, .1)
}

.section-head {
    text-align: center;
    margin-bottom: 24px;
}

/* Spacing helpers */
.q-py-xl {
    padding-top: 72px;
    padding-bottom: 72px;
}

.q-mt-none-md {
    margin-top: 0;
}

@media (min-width: 1024px) {
    .q-mt-none-md {
        margin-top: 0;
    }
}

/* Fixed bottom button */
.fixed-bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}

/* Header mobile compact */
.mobile-compact .q-toolbar {
    min-height: 44px;
    padding-left: 8px;
    padding-right: 8px;
}

.mobile-compact .container {
    padding-left: 8px;
    padding-right: 8px;
}

.mobile-compact img[alt="logo"] {
    height: 22px !important;
}

.mobile-compact .q-toolbar__title {
    font-size: 14px;
}

.mobile-compact .nav-actions .q-btn {
    padding: 0 6px;
    min-height: 30px;
    font-size: 12px;
}

.mobile-compact+.q-page-container {
    padding-top: 8px;
}
</style>
