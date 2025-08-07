<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-dark text-white">
            <q-toolbar class="container">
                <q-toolbar-title class="text-h6 row items-center no-wrap">
                    <q-avatar size="50px" class="">
                        <img src="/logo.jpeg" alt="Logo" @click="router.push('/')" class="cursor-pointer" />
                    </q-avatar>
                    <div class="animate__animated animate__fadeInLeft animate__slower">ChatCar</div>
                </q-toolbar-title>
                <!-- <a style="color:#00BFA5;text-decoration: none;font-size:.8rem" href="https://instagram.com/chatcar.ia"
                    target="_blank">@chatcar.ia</a> -->
                <q-btn v-if="!isMobile" label="Como Funciona?" color="teal" icon-right="contact_support"
                    class="q-ml-sm q-px-sm animate__animated animate__fadeInUp animate__slower animate__delay-1s" dense
                    @click="scrollToRegistrar()">
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                        <strong>Como Funciona?</strong>
                    </q-tooltip>
                </q-btn>
                <q-btn v-if="!isMobile" label="Investimento" @click="scrollTo('preco')" color="green" glossy
                    icon-right="paid"
                    class="q-ml-sm q-px-sm animate__animated animate__fadeInUp animate__slower animate__delay-2s"
                    dense>
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                        <strong>Investimento</strong>
                    </q-tooltip>
                </q-btn>
                <q-btn v-if="!isMobile" label="Contato" color="blue" glossy icon-right="call"
                    class="q-ml-sm q-px-sm animate__animated animate__fadeInUp animate__slower animate__delay-3s" dense
                    @click="scrollTo('contato')">
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                        <strong>Contato</strong>
                    </q-tooltip>
                </q-btn>
                <!-- mobile só os botoes com icones -->
                <q-btn v-if="isMobile" icon="contact_support" color="teal"
                    class="q-ml-sm q-px-sm animate__animated animate__fadeInUp animate__slower animate__delay-1s" dense
                    @click="scrollToRegistrar()">
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                        <strong>Como Funciona?</strong>
                    </q-tooltip>
                </q-btn>
                <q-btn v-if="isMobile" icon="paid" @click="scrollTo('preco')" color="green" glossy
                    class="q-ml-sm q-px-sm animate__animated animate__fadeInUp animate__slower animate__delay-2s"
                    dense>
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                        <strong>Investimento</strong>
                    </q-tooltip>
                </q-btn>
                <q-btn v-if="isMobile" icon="call" color="blue" glossy
                    class="q-ml-sm q-px-sm animate__animated animate__fadeInUp animate__slower animate__delay-3s" dense
                    @click="scrollTo('contato')">
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                        <strong>Contato</strong>
                    </q-tooltip>
                </q-btn>
            </q-toolbar>
            <q-toolbar class="w100 row justify-center items-center">
                <q-form @submit.prevent="handleSubmit" class="shadow-2 q-py-sm "
                    style="max-width: 500px; margin: auto;">
                    <q-input color="teal" style="border-bottom:4px solid #00BFA5" dense outlined maxlength="100"
                        v-model="form.email" placeholder="Cadastre-se na ChatCar!" class=" bg-grey-2 rounded-borders"
                        label="Email*" type="email" required>
                        <template v-if="!isFormValid()" v-slot:append>
                            <q-icon name="email" color="teal" class="cursor-pointer" @click.stop />
                        </template>
                        <template v-else v-slot:append>
                            <q-icon name="person_add" color="teal" class="cursor-pointer"
                                @click="openPagarMeLinkUrl()" />
                        </template>
                    </q-input>
                </q-form>
            </q-toolbar>
        </q-header>

        <q-page-container class="q-pa-md relative animate__animated animate__fadeIn">
            <div class="q-mb-md q-mt-md ">
                <div class="video-container rounded-borders" style="border-bottom:4px solid #00BFA5;">
                    <iframe width="100%" src="https://www.youtube.com/embed/px4S7qbkVSw" frameborder="0"
                        allowfullscreen></iframe>
                </div>
            </div>
            <section class="q-pb-lg q-pt-lg  bg-dark  shadow-3 text-white text-center rounded-borders">
                <div class="container rounded-borders ">
                    <h1 class="text-h4 text-bold q-px-md"><q-icon name="sms" color="white"
                            class="animate__animated animate__zoomIn animate__slower animate__delay-2s"
                            size="xl"></q-icon><br>TRANSFORME seu <strong class="text-teal-14">ESTOQUE</strong> em um
                        <strong class="text-teal-14">VENDEDOR</strong> por apenas <strong class="text-green-14"
                            style="font-size:2.8rem">R$49,90</strong><br><q-icon name="paid" color="teal-14"
                            class="animate__animated animate__zoomIn animate__slower animate__delay-3s"
                            size="xl"></q-icon>
                    </h1>
                </div>
            </section>
            <div class="q-mb-xl" id="preco">
                <div class="row justify-center">
                    <section class="q-pb-xl q-pt-md text-center  q-px-sm">
                        <div class="row q-col-gutter-md justify-center">
                            <div class="w50" id="card-plano">
                                <q-card class="q-pa-xs shadow-4 bg-grey-1"
                                    style="border-bottom:4px solid #00BFA5;border-top:4px solid #00BFA5">
                                    <q-card-section>
                                        <div class="text-h5 text-bold text-teal q-px-xs">🤖 Por que usar a I.A. da
                                            ChatCar?
                                        </div>

                                        <p style="font-size: 1rem;"
                                            class="text-grey-3 text-center bg-teal-7 rounded-borders q-px-sm q-py-md q-mt-md">
                                            A <strong>ChatCar</strong> é sua vitrine digital com I.A. que
                                            <strong>atende,
                                                qualifica e envia pro WhatsApp</strong> só quem quer comprar. Com
                                            <strong>resumo
                                                da conversa, sugestão de abordagem</strong> e <strong>rastreio da origem
                                                do
                                                lead</strong> — tudo sem app e sem mensalidade.
                                        </p>

                                        <ul class="text-left column q-gutter-y-sm" style="font-size: 1rem;">
                                            <li>🚀 <strong>Sem instalação e sem mensalidade</strong> — só paga se
                                                for usar
                                            </li>
                                            <li>🔗 <strong>Chega de Curiosos: Qualificação</strong> de visitantes
                                                com
                                                redirecionamento pro WhatsApp</li>
                                            <li>📲 <strong>ChatCar I.A.</strong> recomenda veículos com base no
                                                perfil do cliente</li>
                                            <li>⚡️ <strong>Atendimento 24h com I.A.</strong> — somos seu vendedor
                                                automatizado e
                                                funcionamos até quando você vai dormir</li>
                                            <li>📢 <strong>Funil de captação otimizado</strong> para anúncios com
                                                tráfego pago
                                            </li>
                                            <li>🛰️ <strong>Rastreabilidade dos leads</strong> - veja se o cliente veio
                                                do
                                                instagram, facebook, tiktok etc.</li>
                                            <li>📈 <strong>Estoque publicado como site interativo</strong>, pronto
                                                para
                                                conversão</li>
                                            <li>🤝 <strong>CRM integrado</strong> com histórico, interesses e dados
                                                estratégicos</li>
                                            <li>📝 <strong>Relatórios e dicas personalizadas</strong> para
                                                fechamento de
                                                vendas</li>
                                        </ul>

                                        <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">
                                            ⌛ De R$ 99,90
                                            por</div>
                                        <div style="font-size:2.4rem" class=" q-mb-md q-mt-sm text-teal  text-bold">
                                            R$
                                            49,90
                                        </div>
                                    </q-card-section>
                                </q-card>
                                <div class="bg-dark q-pa-sm rounded-borders text-left text-teal-2 q-my-md">
                                    ✅ Acesso válido por <strong>30 dias</strong>. <br>
                                    🔒 <strong id="comofunciona">Sem assinatura, sem mensalidade e sem cobranças
                                        automáticas.</strong><br>
                                    💰 Você só paga se quiser usar — simples assim!
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
                <div class="w100 row justify-center no-wrap">
                    <div
                        class="text-h4 q-mb-lg text-bold rounded-borders  q-px-sm text-right row no-wrap justify-between text-grey-1">
                        Como Funciona <span>❔</span></div>
                </div>
                <div class="q-mb-lg">
                    <div class="video-container rounded-borders" style="border-bottom:4px solid #00BFA5;">
                        <iframe width="100%" src="https://www.youtube.com/embed/y2Qka6CeEVg" frameborder="0"
                            allowfullscreen></iframe>
                    </div>
                </div>
                <section style="border-bottom:4px solid #00BFA5;border-top:4px solid #00BFA5;"
                    class="bg-grey-1 q-py-lg container text-center q-mt-md q-px-md rounded-borders">
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-4">
                            <q-icon name="storefront" size="64px" color="blue" />
                            <h3 class="text-subtitle1 q-mt-sm text-blue text-bold">1. Cadastre seu Estoque</h3>
                            <p style="font-size: 1rem;">
                                <strong>Cadastre-se via Email</strong> e receba seu acesso e <strong>link
                                    público</strong>
                                exclusivo
                                (<em>chatcar.me/sualoja</em>), pronto para exibir e vender com I.A. de forma automática
                                - você
                                pode alterar o login depois.
                            </p>
                        </div>

                        <div class="col-12 col-md-4">
                            <q-icon name="smart_toy" size="64px" color="teal" />
                            <h3 class="text-subtitle1 q-mt-sm text-bold text-teal">2. Estoque com I.A. 24h</h3>
                            <p style="font-size: 1rem;">
                                A I.A. conversa <strong>24h</strong>, mostra os veículos certos em <strong>tempo
                                    real</strong> e
                                só envia para o <strong>WhatsApp</strong> quem realmente quer negociar.
                            </p>
                        </div>

                        <div class="col-12 col-md-4">
                            <q-icon name="list_alt" size="64px" color="green" />
                            <h3 class="text-subtitle1 q-mt-sm text-bold text-green">3. Receba Leads e Abordagem Pronta
                            </h3>
                            <p style="font-size: 1rem;">
                                Cada conversa gera um <strong>relatório com resumo do cliente</strong> e uma
                                <strong>mensagem
                                    pronta</strong> para você abordar no WhatsApp com muito mais chance de fechar. Além
                                de
                                rastrear de onde o lead veio (Instagram, Facebook, TikTok etc.).
                            </p>
                        </div>

                    </div>
                </section>
                <section id="chatEstoqueTeste" class="q-py-xl bg-grey-3 text-center text-dark">
                    <div class="q-mx-auto" style="max-width: 700px">
                        <h2 class="text-h6 text-bold q-mb-md q-px-xs">🔍 Teste ao Vivo com Estoque de Demonstração</h2>
                        <p class="text-subtitle2 q-px-sm q-mb-md">
                            Veja na prática como seus clientes seriam atendidos pela ChatCar I.A. <br>
                            Interaja com o nosso estoque de testes e experimente o atendimento inteligente em tempo
                            real.
                        </p>
                        <q-btn label="Testar Atendimento I.A." to="/jatoveiculos" color="teal" glossy icon="smart_toy"
                            class="q-mx-md" size="lg" />
                    </div>
                </section>

                <div class="q-pt-sm ">
                    <div class="text-h4 text-center text-grey-2 text-bold q-py-md q-mb-md">Depoimentos e Feedback</div>
                    <q-carousel v-model="slideAtivoDetalhes" v-if="depoimentos.length > 0" swipeable animated
                        style="border-bottom:4px solid #00BFA5;" class="rounded-borders q-mb-sm bg-teal" navigation
                        arrows infinite autoplay interval="2000">
                        <q-carousel-slide v-for="(dep, index) in depoimentos" :key="index" :name="index">
                            <div class="q-pa-md text-center">
                                <q-avatar size="140px" class="q-mb-sm q-mt-sm shadow-1">
                                    <img :src="dep.foto" style="object-fit: cover;border-bottom:4px solid #00BFA5;" />
                                </q-avatar>
                                <div class="text-subtitle1 q-mb-xs text-grey-2">
                                    <q-icon name="format_quote" /> {{ dep.mensagem }}
                                </div>
                                <div class="text-caption text-teal text-bold">- {{ dep.nome }}</div>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                </div>
            </div>
            <!-- <div class="relative bg-dark q-pa-sm rounded-borders q-mt-md text-bold text-left bg-dark text-grey-4"
                style="position: relative!important;">✅ Automatize seu
                estoque em 2 etapas:
                <div id="registrar" class="q-py-md w50 absolute" style="z-index: -9999!important;top:-60px"></div>
            </div> -->
            <p style="font-size: 1rem;"
                class="text text-teal-1 w100 q-px-md text-center bg-teal q-pa-sm rounded-borders">
                🚀 Seja você <strong>vendedor</strong>, <strong>profissional de marketing</strong> ou <strong>dono da
                    loja</strong>: transforme a <strong>curiosidade em conversa</strong> — e conversa em
                <strong>venda</strong>.<br><br>
                A I.A. da ChatCar atende, qualifica e converte <strong>24h por dia</strong>, até quando você está
                offline.
            </p>
            <!-- DEVELOPER SECTION -->
            <section class="q-py-xl bg-dark text-white text-center">
                <div class="q-mx-auto" style="max-width: 600px">
                    <h2 class="text-h5 text-bold q-mb-md">Sobre o Desenvolvedor</h2>
                    <q-avatar size="120px" class="q-mb-sm">
                        <img src="/dev.jpeg" alt="Avatar do Desenvolvedor" />
                    </q-avatar>
                    <p class="text-subtitle2 q-px-sm q-my-md">
                        Arquitetura, Engenharia e Desenvolvimento de Software, Modelagem de dados, Criação de
                        Serviços/Automações na
                        Nuvem e integração com OpenAI por <a style="text-decoration: none;" target="_blank"
                            href="https://samuelvictorol.github.io/portfolio" class="text-teal-14">S.V</a><br><br><span
                            class="text-blue-4 q-px-sm">Acesse o portfólio profissional para conhecer mais projetos e
                            soluções.</span>
                    </p>
                    <q-btn label="SV Software" type="a" target="_blank"
                        href="https://samuelvictorol.github.io/portfolio/" icon="open_in_new" color="teal-14" flat />
                </div>
            </section>
            <div class="w100 row no-wrap justify-between">
                <img src="porque.png" width="50%" alt="">
                <img src="cowboy.png" width="50%" alt="">
            </div>
            <div class="w100">
                <img src="provend.png" width="50%" alt="">
                <img src="chatvitrine.png" width="50%" alt="">
                <div class="q-py-md"></div>
            </div>
            <section class="q-py-xl q-mb-xl bg-teal text-white" id="contato">
                <div class="container text-center">
                    <h2 class="text-h5 text-bold q-mb-md">Quer saber mais?</h2>
                    <p>Fale com nosso time agora mesmo</p>
                    <div class="w100 text-center text-teal-1 q-pt-lg text-bold">
                        chatcar.suporte@gmail.com
                    </div>
                    <div class="w100 text-center text-teal-1 q-pt-sm text-bold">
                        Instagram e TikTok: @chatcar.ia
                    </div>
                    <div class="w100 text-center q-gutter-xs q-px-md q-pt-lg text-bold">
                        <q-btn label="Chatcar.me" glossy color="teal" icon="directions_car" to="/"></q-btn>
                        <q-btn label="Iniciar Sessão" glossy color="green" icon="login" to="/login"></q-btn>
                        <q-btn label="Atendimento 24h" glossy color="blue" icon="live_help" type="a"
                            href="https://aistudio.instagram.com/ai/9859811457475171/?utm_source=mshare"
                            target="_blank" />

                    </div>
                </div>
            </section>
            <div class="w100 q-px-md text-teal-2 bg-dark q-py-md rounded-borders q-mt-lg q-mb-lg"
                style="border-bottom:4px solid #00BFA5;">
                <div class="w100 text-grey-3 q-mb-md text-center"><strong>✨ Preencha o campo acima com seu email
                        e clique em "Finalizar Cadastro e Pagar" para ser redirecionado ao ambiente seguro de
                        pagamento.</strong></div>
                📩 As instruções de como acessar e utilizar a plataforma serão enviadas para o seu e-mail
            </div>
            <q-footer class="bg-dark text-grey-4 text-center q-pa-sm">
                chatcar.me - <a href="https://samuelvictorol.github.io/portfolio/" class="text-teal-14"
                    target="_blank">59.905.708/0001-34</a>
            </q-footer>
            <div class="w100 q-py-xl"></div>
            <q-btn style="position:fixed;left:0px; bottom:0px;z-index: 9999!important" v-if="isFormValid()"
                :label="isFormValid() ? 'Finalizar Cadastro e Pagar' : 'Informe seu email para continuar'"
                @click="openPagarMeLinkUrl()" type="submit" :color="isFormValid() ? 'green' : 'blue-14'"
                :icon-right="isFormValid() ? 'shopping_cart_checkout' : 'east'"
                class="w100 q-py-xl animate__animated animate__fadeInUp animate__slower" />
            <q-dialog v-model="dialog" class="animate__animated animate__fadeIn animate__slower"
                style="backdrop-filter: blur(12px);">
                <q-card class="bg-dark text-white">
                    <q-card-section class="text-center">
                        <div class="text-h6 q-mb-md">📩 Registre-se com seu Email</div>
                        <p class="q-px-md">Cadastre-se informando seu <strong class="text-teal-14">e-mail</strong> e
                            clicando em
                            <strong class="text-teal-14">"Finalizar Cadastro e Pagar"</strong> para ser redirecionado ao
                            ambiente seguro de pagamento.
                        </p>
                        <p>Após a compra, você receberá um e-mail com as <strong class="text-orange-4">instruções de uso
                                e
                                acesso da plataforma</strong>.</p>
                        <q-btn label="Continuar" glossy color="teal" @click="dialog = false" />
                    </q-card-section>
                </q-card>
            </q-dialog>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// inicializa se for mobile ou nao
const isMobile = window.innerWidth <= 550;
const slideAtivoDetalhes = ref(0); // índice do slide ativo
const selectedPlan = ref(null);
const $q = useQuasar();
const form = ref({ email: '', login: '', senha: '', telefone: '' });
const depoimentos = ref([
    { nome: 'Carlos M.', mensagem: 'Fechei 3 carros em 1 semana atendidos pela a IA com o ChatVitrine.', foto: 'https://media.istockphoto.com/id/1473399413/pt/foto/salesman-working-at-a-car-dealership-selling-cars.jpg?s=612x612&w=0&k=20&c=5DCVZYdCRyVagWaO7dWjXi0ihtvEmSmKyakpY8-0RDA=' },
    { nome: 'Juliana R.', mensagem: 'Minha equipe aumentou a conversão em 40% depois que adquiri a ferramenta para eles!', foto: 'https://www.shutterstock.com/image-photo/black-woman-arms-crossed-standing-600nw-2254569139.jpg' },
    { nome: 'Eduardo P.', mensagem: 'Muito mais fácil de configurar e moderno que outras plataformas.', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Zw2TQnR44yKUVXUz-W8Hpo_6gmYtRZjksw&s' },
    {
        nome: 'Larissa T.',
        mensagem: 'Sou vendedora direta e consigo expor veículos de váriás lojas em um só lugar com meu nome.',
        foto: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
        nome: 'Marcos L.',
        mensagem: 'O atendimento automático agilizou muito a minha vida junto com o texto de abordagem pronto.',
        foto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
]);

const dialog = ref(false);
openDialog();
function openDialog() {
    setTimeout(() => {
        dialog.value = true;
    }, 3100);
}

function handleSubmit() {
    console.log('Form enviado:', form.value);
}

function isFormValid() {
    // Validação do email
    if (!form.value.email || !form.value.email.includes('@')) {
        return false;
    } else if (form.value.email.length < 5) {
        return false;
    } else if (form.value.email.length > 100) {
        return false;
    }
    return true;
}

function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToRegistrar() {
    $q.notify({
        color: 'teal',
        icon: 'email',
        message: 'Digite seu email para ir para o ambiente seguro de pagamento e receber as instruções de uso e acesso da plataforma 🚀',
        position: 'top'
    });

    const el = document.getElementById('comofunciona');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}


async function openPagarMeLinkUrl() {
    await api.post('/pagar/criar-link', {
        directLinkEmail: form.value.email,
        // plano_id: selectedPlan.value,
        plano_id: '333333',
    }).then(response => {
        $q.notify({
            color: 'teal',
            icon: 'paid',
            message: 'Você será redirecionado ao ambiente seguro de pagamento 😉',
            position: 'top'
        });

        setTimeout(() => {
            window.open(response.data.payment_url, '_self'); // Abrir na mesma guia
        }, 1000);
    });
}

function logout() {
    console.log('Logout');
}
</script>

<style scoped>
.q-page-container {
    background: #00bfa5;
    /* fallback */
    background: -webkit-linear-gradient(to top right, #004e64, #00bfa5, #a8f0d4);
    background: linear-gradient(to top left, teal, #1BBAB9, #014C5A);
}

.video-container {
    position: relative;
    padding-bottom: 56.25%;
    overflow: hidden;
    max-width: 900px;
    /* largura máxima no desktop */
    margin: 0 auto;
    /* centraliza */
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.text-subtitle1 {
    font-size: 1.2rem;
}

@media (max-width: 550px) {
    #card-plano {
        width: 100%;
    }
}

@media (min-width: 550px) {
    .video-container {
        padding-bottom: 0;
        /* remove a altura proporcional */
        height: 450px;
        /* altura fixa no desktop */
    }

    .video-container iframe {
        height: 450px;
        /* altura fixa no desktop */
    }

    #card-plano {
        width: 80%;
    }
}

@media (min-width: 800px) {
    .q-page-container {
        padding: 0 200px;
    }
}
</style>