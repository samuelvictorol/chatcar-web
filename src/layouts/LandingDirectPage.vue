<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-dark text-white">
            <q-toolbar class="container">
                <q-toolbar-title class="text-h6 row items-center no-wrap">
                    <q-avatar size="50px" class="">
                        <img src="/logo.jpeg" alt="Logo" />
                    </q-avatar>
                    <div class="animate__animated animate__fadeInLeft animate__slower">ChatCar</div>
                </q-toolbar-title>
                <!-- <a style="color:#00BFA5;text-decoration: none;font-size:.8rem" href="https://instagram.com/chatcar.ia"
                    target="_blank">@chatcar.ia</a> -->
                <q-btn label="Como Funciona?" color="teal" icon-right="contact_support" glossy class="q-ml-sm q-px-sm"
                    dense @click="scrollToRegistrar()"></q-btn>
                <!-- <q-btn label="Saiba Mais" icon-right="contact_support" color="teal" glossy class="q-ml-sm q-px-sm" dense -->
                <!-- @click="scrollToRegistrar()"></q-btn> -->
            </q-toolbar>
            <q-toolbar class="w100 row justify-center items-center">
                <q-form @submit.prevent="handleSubmit" class="shadow-2 q-py-sm "
                    style="max-width: 500px; margin: auto;">
                    <q-input color="teal" style="border-bottom:4px solid #00BFA5" dense outlined maxlength="100"
                        v-model="form.email" placeholder="Cadastre-se na ChatCar!" class=" bg-grey-2 rounded-borders"
                        label="Acesse com seu Email*" type="email" required>
                        <template v-slot:append>
                            <q-icon name="email" color="teal" class="cursor-pointer" @click.stop />
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
            <section class="q-pb-lg q-pt-lg  bg-dark text-white text-center rounded-borders">
                <div class="container rounded-borders">
                    <h1 class="text-h4 text-bold q-px-md"><q-icon name="sms" color="white"
                            class="animate__animated animate__zoomIn animate__slower animate__delay-2s"
                            size="xl"></q-icon><br>TRANSFORME seu <strong class="text-teal-14">ESTOQUE</strong> em um
                        <strong class="text-teal-14">VENDEDOR</strong> por apenas <strong
                            class="text-green-14" style="font-size:2.8rem">R$49,90</strong><br><q-icon name="paid"
                            color="teal-14" class="animate__animated animate__zoomIn animate__slower animate__delay-3s"
                            size="xl"></q-icon>
                    </h1>
                </div>
            </section>
            <!-- Planos -->
            <div id="planos" class="q-mb-xl">
                <div class=" text-teal-2 q-my-md">⌛ O acesso tem duração de <strong>30 dias</strong> e <strong>não será
                        realizada
                        assinatura e nem cobranças automáticas.</strong></div>
                <div class="row justify-center">
                    <section class="q-pb-xl q-pt-md text-center  q-px-sm">
                        <div class="container">
                            <div class="row q-col-gutter-md justify-center">
                                <div class="w50" id="card-plano">
                                    <q-card class="q-pa-xs shadow-4 bg-grey-1"
                                        style="border-bottom:4px solid #00BFA5;border-top:4px solid #00BFA5">
                                        <q-card-section>
                                            <div class="text-h6 text-bold text-teal q-px-xs">📦 O QUE IREI RECEBER ?
                                            </div>
                                            <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">
                                                ⌛ De R$ 99,90
                                                por</div>
                                            <div style="font-size:2.4rem" class=" q-mb-md q-mt-sm text-teal  text-bold">
                                                R$
                                                49,90
                                            </div>
                                            <ul class="text-left column q-gutter-y-sm" style="font-size: 1rem;">
                                                <li>🕐 <strong>Atenda 24h</strong> com o <strong>link</strong> do chat
                                                    IA da sua
                                                    loja – sempre pronto pra fechar negócios.</li>
                                                <li>💾 Armazene <strong>leads simultâneos sem limites</strong> e nunca
                                                    mais
                                                    perca um contato quente.</li>
                                                <li>🤖 <strong>ChatVitrine I.A</strong>: seu vendedor
                                                    incansável, pronto
                                                    pra encantar e converter.</li>
                                                <li>📈 <strong>ChatCar IA</strong> gera <strong>relatórios
                                                        completos</strong>
                                                    com <strong>dicas personalizadas</strong> pra vender muito mais.
                                                </li>
                                                <li>📝 Relatórios com <strong>copys otimizadas</strong>, prontos pra
                                                    persuadir
                                                    de verdade e garantir a conversão.</li>
                                                <li>💬 <strong>Linguagem natural</strong> pra conversar como humano e
                                                    fechar
                                                    como profissional.</li>
                                                <li>🌐 Funciona também como um <strong>site de estoque</strong>,
                                                    perfeito pra
                                                    ser usado como <strong>funil de vendas</strong> em tráfego pago e
                                                    anúncios.
                                                </li>
                                                <li>🔗 Se o cliente demonstrar <strong>interesse real</strong>, ele é
                                                    redirecionado <strong>automaticamente pro seu WhatsApp</strong> –
                                                    você só
                                                    precisa fechar a venda.</li>
                                                <li>🚀 Ideal pra <strong>vendedores</strong>, <strong>times de
                                                        marketing</strong> e <strong>donos de loja</strong> que não
                                                    querem ficar
                                                    pra trás.</li>
                                                <li>🎯 Um só link, <strong>tudo integrado</strong>, sempre vendendo por
                                                    você.
                                                    Não espere – comece hoje!</li>
                                            </ul>
                                        </q-card-section>
                                        <!-- <q-card-actions align="center">
                                            <q-radio size="xl" v-model="selectedPlan" val="333333"
                                                checked-icon="task_alt" unchecked-icon="panorama_fish_eye" left-label
                                                class="text-bold" style="font-size:1.2rem" label="Quero esse plano!"
                                                color="teal" />
                                        </q-card-actions> -->
                                    </q-card>
                                </div>
                            </div>
                            <div id="comofunciona"></div>
                        </div>
                    </section>
                </div>
                <div class="text-h5 q-mb-lg text-bold text-grey-2">🧐 Como Funciona?</div>
                <div class="text-teal q-mb-lg bg-grey-2 q-pa-sm rounded-borders shadow-1">🤗 <strong>FÁCIL</strong> e <strong>RÁPIDO!</strong> Veja <strong>como automatizar seu estoque</strong> em <strong>3</strong> etapas <strong>em menos de UM MINUTO</strong></div>
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
                            <q-icon name="storefront" size="64px" color="secondary" />
                            <h3 class="text-subtitle1 q-mt-sm text-bold">Cadastre seu Estoque</h3>
                            <p style="font-size: 1rem;">
                                <strong>Cadastre-se</strong> e tenha seu <strong>link público</strong>
                                (chatcar.me/sualoja)
                                pronto para receber e encantar seus <strong>clientes em tempo real</strong> com a
                                <strong>IA
                                    que vende por você</strong>.
                            </p>

                        </div>
                        <div class="col-12 col-md-4">
                            <q-icon name="smart_toy" size="64px" color="blue" />
                            <h3 class="text-subtitle1 q-mt-sm text-bold  text-blue">Chat Automatizado</h3>
                            <p style="font-size: 1rem;">
                                Com seu <strong>link público</strong>, o <strong>ChatVitrine</strong> exibe opções em
                                <strong>tempo real</strong>,
                                conversa <strong>24h</strong> e redireciona para o <strong>WhatsApp da sua
                                    loja</strong>,
                                gerando <strong>leads prontos</strong> para <strong>fechar vendas</strong>.
                            </p>

                        </div>
                        <div class="col-12 col-md-4">
                            <q-icon name="list_alt" size="64px" color="orange-14" />
                            <h3 class="text-subtitle1 q-mt-sm text-bold text-orange-14">Relatório Personalizado do
                                Cliente</h3>
                            <p style="font-size: 1rem;">
                                Logo após a conversa no <strong>ChatVitrine</strong>, você recebe um
                                <strong>resumo</strong>
                                da interação com o cliente e <strong>dicas certeiras</strong> para <strong>fechar a
                                    venda</strong>.
                            </p>
                        </div>
                    </div>
                </section>
                <div class="w100 q-px-md text-teal-2 bg-dark q-py-md rounded-borders q-mt-lg"
                    style="border-bottom:4px solid #00BFA5;">
                    <div class="w100 text-grey-3 q-mb-md text-center"><strong>✨ Preencha o campo acima com seu email
                            e clique em "Finalizar Cadastro e Pagar" para ser redirecionado ao ambiente seguro de
                            pagamento.</strong></div>
                    📩 As instruções de como acessar e utilizar a plataforma serão enviadas para o seu e-mail
                </div>
                <div class=" ">
                    <h2 class="text-h5 text-center text-grey-2 text-bold q-mb-md">Depoimentos e Feedback</h2>
                    <q-carousel v-model="slideAtivoDetalhes" v-if="depoimentos.length > 0" swipeable animated
                        style="border-bottom:4px solid #00BFA5;" class="rounded-borders q-mb-sm bg-dark" navigation
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
            <q-separator class="q-mb-md" color="grey-4" />

            <p style="font-size: 1rem;"
                class="text text-teal-14 w100 q-px-md text-center bg-dark q-pa-sm rounded-borders">
                🔥 Seja você <strong>vendedor</strong>, do <strong>marketing</strong> ou <strong>dono da loja</strong>:
                transforme a <strong>curiosidade</strong> do cliente em uma <strong>conversa que vende</strong>,
                <strong>24h por
                    dia</strong>. Mesmo enquanto você dorme!
            </p>
            <h2 class="text-h4 text-bold text-center text-white animate__animated animate__fadeInLeft animate__slower">
                Por que usar a IA da ChatCar?</h2>

            <div class="text-left q-mb-md bg-grey-3 q-py-md rounded-borders q-px-md animate__animated animate__fadeInRight animate__slower"
                style="border-bottom:4px solid #00BFA5; border-top:4px solid #00BFA5;">
                <p style="font-size: 1rem;" class="text-grey-3 text-center bg-dark rounded-borders q-pa-md q-mt-md">
                    💡 Porque não é só um chat: é a solução que te coloca à frente, cuidando de cada lead e não deixando
                    ninguém
                    escapar.
                    Você transforma seu estoque num <strong>site interativo</strong> e num <strong>funil de vendas
                        automático</strong> que encanta e converte — e ainda funciona como um <strong>CRM</strong> que
                    guarda
                    tudo que você precisa pra vender mais.
                </p>

                <ul class="text-left column q-gutter-y-sm" style="font-size: 1rem;">
                    <li>⚡️ <strong>Atendimento 24h</strong> sem precisar de vendedor online</li>
                    <li>📈 <strong>Seu estoque vira um site</strong> de vendas interativo</li>
                    <li>🔗 <strong>Funil de vendas automático</strong> e pronto pra tráfego pago</li>
                    <li>🤝 <strong>CRM integrado</strong> que salva contatos e interesses</li>
                    <li>📲 <strong>ChatVitrine I.A</strong> atende e recomenda veículos certos</li>
                    <li>📝 <strong>Relatórios completos</strong> e <strong>dicas personalizadas</strong> pra fechar a
                        venda</li>
                    <li>💬 <strong>Leads salvos</strong> e redirecionados pro WhatsApp prontos pra conversão</li>
                    <li>🌟 <strong>Sem instalação</strong> e <strong>sem mensalidade</strong>, só resultado real</li>
                </ul>

                <p style="font-size: 1rem;" class="text-left q-mt-md text-bold text-orange-14">
                    🚀 Não fique pra trás enquanto outros já estão vendendo 24h.<br>
                    📲 Transforme curiosidade em conversa, conversa em venda — e venda em relacionamento!
                </p>

            </div>

            <div class="w100 row no-wrap justify-between">
                <img src="porque.png" width="50%" alt="">
                <img src="cowboy.png" width="50%" alt="">
            </div>
            <div class="w100">
                <img src="provend.png" width="50%" alt="">
                <img src="chatvitrine.png" width="50%" alt="">
                <div class="q-py-md"></div>
            </div>
            <section class="q-py-xl q-mb-xl bg-dark text-white">
                <div class="container text-center">
                    <h2 class="text-h5 text-bold q-mb-md">Quer saber mais?</h2>
                    <p>Fale com nosso time agora mesmo</p>
                    <div class="w100 text-center text-teal-2 q-pt-lg text-bold">
                        chatcar.suporte@gmail.com
                    </div>
                    <div class="w100 text-center text-teal-2 q-pt-sm text-bold">
                        Instagram e TikTok: @chatcar.ia
                    </div>
                    <div class="w100 text-center text-teal-2 q-pt-md text-bold">
                        <q-btn label="Chatcar.me" glossy color="teal" icon="directions_car" to="/"></q-btn>
                    </div>
                </div>
            </section>
            <div class="w100 q-py-xl"></div>
            <q-btn style="position:fixed;left:0px; bottom:0px" v-if="isFormValid()"
                :label="isFormValid() ? 'Finalizar Cadastro e Pagar' : 'Informe seu email para continuar'"
                @click="openPagarMeLinkUrl()" type="submit" :color="isFormValid() ? 'green' : 'blue-14'"
                :icon-right="isFormValid() ? 'shopping_cart_checkout' : 'east'" glossy
                class="w100 q-py-xl animate__animated animate__fadeInUp animate__slower" />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

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

function scrollToPlanos() {
    if (form.value.email.toLowerCase().includes('@') && form.value.email.length >= 5 && form.value.email.includes('.')) {
        const el = document.getElementById('planos');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        $q.notify({
            color: 'teal',
            icon: 'paid',
            message: 'Para continuar, clique em Finalizar Cadastro e Pagar 🛒',
            position: 'top'
        });
    }
    return
}

function scrollToRegistrar() {
    $q.notify({
        color: 'teal',
        icon: 'paid',
        message: 'Preencha seu email para receber as instruções de uso e acesso da plataforma 🚀',
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
    background: #414141;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #414141, #474747);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #414141, #474747);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
        height: 350px;
        /* altura fixa no desktop */
    }

    .video-container iframe {
        height: 350px;
        /* altura fixa no desktop */
    }
}

@media (min-width: 800px) {
    .q-page-container {
        padding: 0 200px;
    }
}
</style>