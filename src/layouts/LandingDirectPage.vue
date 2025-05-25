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
                <a style="color:#00BFA5;text-decoration: none;font-size:.8rem" href="https://instagram.com/chatcar.ia"
                    target="_blank">@chatcar.ia</a>
                <q-btn label="Cadastre-se" color="teal" glossy class="q-ml-sm q-px-sm" dense
                    @click="scrollToRegistrar()"></q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container class="q-pa-md relative animate__animated animate__fadeIn">
            <div class="q-mb-md q-mt-md ">
                <div class="video-container rounded-borders" style="border-bottom:4px solid #00BFA5;">
                    <iframe width="100%" src="https://www.youtube.com/watch?v=px4S7qbkVSw" frameborder="0"
                        allowfullscreen></iframe>
                </div>
            </div>
            <section class="q-pb-lg q-pt-lg  bg-dark text-white text-center rounded-borders">
                <div class="container rounded-borders">
                    <h1 class="text-h4 text-bold q-px-md"><q-icon name="sms" color="white"
                            class="animate__animated animate__zoomIn animate__slower animate__delay-2s"
                            size="xl"></q-icon><br>Faça com que seu ESTOQUE seja um VENDEDOR que nunca dorme!<br><q-icon
                            name="paid" color="teal-14"
                            class="animate__animated animate__zoomIn animate__slower animate__delay-3s"
                            size="xl"></q-icon></h1>
                </div>
            </section>
            <section class="bg-grey-4 q-py-xl container text-center q-mt-md q-px-md rounded-borders">
                <h2 class="text-h4 text-bold q-pb-lg">Como Funciona?</h2>
                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-4">
                        <q-icon name="storefront" size="64px" color="secondary" />
                        <h3 class="text-subtitle1 q-mt-sm text-bold">Cadastre seu Estoque</h3>
                        <p style="font-size: 1rem;">
                            <strong>Cadastre-se</strong> e tenha seu <strong>link público</strong> (chatcar.me/sualoja)
                            pronto para receber e encantar seus <strong>clientes em tempo real</strong> com a <strong>IA
                                que vende por você</strong>.
                        </p>

                    </div>
                    <div class="col-12 col-md-4">
                        <q-icon name="smart_toy" size="64px" color="secondary" />
                        <h3 class="text-subtitle1 q-mt-sm text-bold">Chat Automatizado</h3>
                        <p style="font-size: 1rem;">
                            Com seu <strong>link público</strong>, o <strong>ChatVitrine</strong> exibe opções em
                            <strong>tempo real</strong>,
                            conversa <strong>24h</strong> e redireciona para o <strong>WhatsApp da sua loja</strong>,
                            gerando <strong>leads prontos</strong> para <strong>fechar vendas</strong>.
                        </p>

                    </div>
                    <div class="col-12 col-md-4">
                        <q-icon name="list_alt" size="64px" color="secondary" />
                        <h3 class="text-subtitle1 q-mt-sm text-bold">Relatório Personalizado do Cliente</h3>
                        <p style="font-size: 1rem;">
                            Logo após a conversa no <strong>ChatVitrine</strong>, você recebe um <strong>resumo</strong>
                            da interação com o cliente e <strong>dicas certeiras</strong> para <strong>fechar a
                                venda</strong>.
                        </p>
                    </div>
                </div>
            </section>
            <div class="relative bg-dark q-pa-sm rounded-borders q-mt-md text-bold text-left bg-dark text-grey-4"
                style="position: relative!important;">✅ Automatize seu
                estoque em 2 etapas:
                <div id="registrar" class="q-py-md w50 absolute" style="z-index: -9999!important;top:-60px"></div>
            </div>
            <div style="font-size:2rem;" class="q-pt-sm text-grey-2 text-left text-bold q-my-md text-shadow">1/2
                Cadastre-se*</div>
            <div class="q-mb-xl q-pt-md rounded-bordersq-pl-md">
                <q-form @submit.prevent="handleSubmit" class="shadow-2 q-gutter-y-sm q-pa-md rounded-borders bg-grey-2"
                    style="max-width: 500px; margin: auto;border-bottom:4px solid #00BFA5">
                    <q-input color="teal" outlined maxlength="100" v-model="form.email" label="E-mail*" type="email"
                        required>
                        <template v-slot:append>
                            <q-icon name="email" color="teal" class="cursor-pointer" @click.stop />
                        </template>
                    </q-input>
                    <q-input color="teal" outlined maxlength="100" v-model="form.confirmEmail"
                        @update:model-value="scrollToPlanos()" label="Confirmar e-mail*" type="email" required>
                        <template v-slot:append>
                            <q-icon name="email" color="teal" class="cursor-pointer" @click.stop />
                        </template>
                    </q-input>
                </q-form>
            </div>

            <!-- Planos -->
            <div id="planos" class="q-mb-xl">
                <div style="font-size:2rem;" class="text-grey-2 text-left text-bold q-mb-md">2/2 Escolha seu Plano*
                </div>
                <div class=" text-teal-2 q-mb-md">⌛ Os planos têm duração de 30 dias e não será realizada
                    cobranças e nem assinatura.</div>
                <div class="row justify-center">
                    <section class="q-pb-xl q-pt-md text-center  q-px-md">
                        <div class="container">
                            <div class="row q-col-gutter-md justify-center">
                                <!-- Plano Free Trial -->
                                <div class="w50" id="card-plano">
                                    <q-card class="q-pa-sm shadow-2 bg-grey-2"
                                        style="border-bottom:4px solid #00BFA5;border-top:4px solid #00BFA5">
                                        <q-card-section>
                                            <div class="text-h5 text-bold text-teal">Pacote Básico</div>
                                            <div class="text-h6 q-my-md text-secondary"><strong>R$ 19,90</strong></div>
                                            <ul class="text-left" style="font-size: 1rem;">
                                                <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat ia da
                                                    sua loja
                                                </li>
                                                <li><strong>ChatCar IA</strong> para geração de relatórios com dicas de
                                                    abordagem
                                                    personalizadas</li>
                                                <li>ChatVitrine <strong>3.5-turbo</strong></li>
                                                <li><strong>Linguagem natural</strong> para o atendimento das
                                                    informações dos seus
                                                    veículos</li>
                                                <li><strong>Armazenamento de Leads</strong> limitados (até
                                                    <strong>50</strong> leads
                                                    simultâneos)
                                                </li>
                                            </ul>
                                        </q-card-section>
                                        <q-card-actions align="center">
                                            <q-radio size="xl" v-model="selectedPlan" val="222222"
                                                checked-icon="task_alt" unchecked-icon="panorama_fish_eye" left-label
                                                class="text-bold" style="font-size:1.2rem" label="Quero esse plano!"
                                                color="teal" />
                                        </q-card-actions>
                                    </q-card>
                                </div>
                                <div class="w50" id="card-plano">
                                    <q-card class="q-pa-md shadow-4 bg-green-1"
                                        style="border-bottom:4px solid #4caf50;border-top:4px solid #4caf50">
                                        <q-card-section>
                                            <div class="text-h5 text-bold text-green">Plano Profissional</div>
                                            <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">
                                                ⌛ De R$ 129,90
                                                por</div>
                                            <div class="text-h5 q-my-md text-green  text-bold">R$ 89,90</div>
                                            <ul class="text-left" style="font-size: 1rem;">
                                                <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat ia da
                                                    sua loja
                                                </li>
                                                <li>Armazenamento de leads simultâneos <strong>sem limites</strong>.
                                                </li>
                                                <li>ChatVitrine <strong>4.0</strong>.</li>
                                                <li><strong>ChatCar IA</strong> para geração de relatórios com dicas de
                                                    abordagem
                                                    personalizadas</li>
                                                <li>Relatórios com <strong>copys otimizadas</strong> para serem mais
                                                    <strong>persuasivas</strong> e <strong>matadoras.</strong>
                                                </li>
                                                <li><strong>Linguagem natural</strong> para o atendimento das
                                                    informações dos seus
                                                    veículos</li>
                                            </ul>
                                        </q-card-section>
                                        <q-card-actions align="center">
                                            <q-radio size="xl" v-model="selectedPlan" val="333333"
                                                checked-icon="task_alt" unchecked-icon="panorama_fish_eye" left-label
                                                class="text-bold" style="font-size:1.2rem" label="Quero esse plano!"
                                                color="teal" />
                                        </q-card-actions>
                                    </q-card>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="w100 q-px-md text-bold text-teal bg-grey-2 q-py-md rounded-borders q-mx-md"
                        style="border-bottom:4px solid #00BFA5;">
                        <div class="w100 text-black q-mb-md">✅ Preencha o campo com seu email, marque o plano desejado
                            e clique em "Finalizar Cadastro e Pagar" para ser redirecionado ao ambiente seguro de
                            pagamento.</div>
                        📩 As instruções de como acessar e utilizar a plataforma serão enviadas para o seu e-mail.
                    </div>
                    <div class="w100 bg-teal q-pb-xs q-mt-lg rounded-borders"></div>
                    <div class=" ">
                        <h2 class="text-h5 text-center text-grey-2 text-bold q-mb-md">Depoimentos e Feedback</h2>
                        <q-carousel v-model="slideAtivoDetalhes" v-if="depoimentos.length > 0" swipeable animated
                            style="border-bottom:4px solid #00BFA5;" class="rounded-borders q-mb-sm bg-dark" navigation
                            arrows infinite autoplay interval="2000">
                            <q-carousel-slide v-for="(dep, index) in depoimentos" :key="index" :name="index">
                                <div class="q-pa-md text-center">
                                    <q-avatar size="140px" class="q-mb-sm q-mt-sm shadow-1">
                                        <img :src="dep.foto"
                                            style="object-fit: cover;border-bottom:4px solid #00BFA5;" />
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
            </div>
            <q-separator class="q-mb-md" color="grey-4" />
            <h2 class="text-h4 text-bold text-center text-white animate__animated animate__fadeInLeft animate__slower">
                Por que usar a IA da ChatCar?</h2>
            <div class="w100 row no-wrap justify-between">
                <img src="porque.png" width="50%" alt="">
                <img src="cowboy.png" width="50%" alt="">
            </div>
            <div class="w100">
                <img src="provend.png" width="50%" alt="">
                <img src="chatvitrine.png" width="50%" alt="">
                <div class="q-py-md"></div>
            </div>

            <div class="text-left q-mb-md bg-grey-3 q-py-md rounded-borders q-px-md animate__animated animate__fadeInRight animate__slower"
                style="border-bottom:4px solid #00BFA5; border-top:4px solid #00BFA5;">

                <p style="font-size: 1rem;" class="text-grey-3 text-center bg-dark rounded-borders q-pa-md q-mt-md">
                    🚀 Além de ser <strong>fácil</strong> e <strong>rápido</strong> de configurar, você terá um
                    <strong>vendedor
                        24h</strong> com o <strong>ChatVitrine</strong> encantando seus clientes, aumentando as vendas e
                    criando
                    <strong>abordagens personalizadas</strong>. Seu cliente pode entrar em contato como um <strong>lead
                        quente</strong> ou, mesmo que não entre, o sistema salva tudo: <strong>dados de contato</strong>
                    e
                    <strong>interesse</strong>, prontos para o próximo passo.
                </p>


                <p style="font-size: 1rem;">
                    🤖 A <strong>IA do ChatCar</strong> atende e entende o que seu cliente quer, recomenda o carro certo
                    do seu
                    estoque e conecta diretamente no WhatsApp – tudo de forma <strong>automática e 24 horas por
                        dia</strong>.
                </p>

                <p style="font-size: 1rem;">
                    📲 Você recebe <strong>leads qualificados</strong> prontos para fechar, com nome, veículo desejado,
                    interação
                    completa e <strong>dicas de abordagem</strong> personalizadas para
                    <strong>conversão</strong>.<strong>Receba o
                        cliente direto no seu
                        WhatsApp</strong> com o lead personalizado.
                </p>

                <p style="font-size: 1rem;">
                    ⚙️ <strong>Sem instalação!</strong>. <strong>Sem mensalidade</strong>. Funciona no <strong>celular,
                        no desktop,
                        onde quiser</strong>. Um único
                    link e sua
                    <strong>loja inteira atendendo</strong>, <strong>mostrando todo o estoque</strong> e
                    <strong>centralizando o
                        contato</strong> com o cliente.
                </p>
            </div>
            <q-separator class="q-mb-md" color="grey-4" />
            <p style="font-size: 1rem;" class="text-bold text-secondary w100 q-px-md text-center">
                💥 Seja você um vendedor, um time de marketing ou o dono da loja: transforme curiosidade em conversa
                e conversa
                em venda. Mesmo fora do horário comercial.
            </p>
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
            <q-btn style="position:fixed;left:0px; bottom:0px" label="Finalizar Cadastro e Pagar" v-if="isFormValid()"
                @click="openPagarMeLinkUrl()" type="submit" color="green" icon-right="shopping_cart_checkout" glossy
                class="w100 q-py-xl" />
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
    if (!form.value.email || !form.value.confirmEmail) {
        return false;
    } else if (!form.value.email.includes('@')) {
        return false;
    } else if (form.value.email.length < 5) {
        return false;
    } else if (form.value.email.length > 100) {
        return false;
    }
    if (form.value.email !== form.value.confirmEmail) {
        return false;
    }
    if (!selectedPlan.value || selectedPlan.value.trim() === '') {
        return false;
    }
    return true;
}

function scrollToPlanos() {
    if (form.value.email.toLowerCase() == form.value.confirmEmail.toLowerCase()) {
        const el = document.getElementById('planos');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        $q.notify({
            color: 'teal',
            icon: 'paid',
            message: 'Para continuar, selecione um plano 🚀',
            position: 'top'
        });
    }
    return
}

function scrollToRegistrar() {
    $q.notify({
        color: 'teal',
        icon: 'paid',
        message: 'Preencha seu email e selecione um plano 🚀',
        position: 'top'
    });

    const el = document.getElementById('registrar');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}


async function openPagarMeLinkUrl() {
    await api.post('/pagar/criar-link', {
        directLinkEmail: form.value.email,
        plano_id: selectedPlan.value,
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
    background: #323232;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #323232, #282828);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #323232, #282828);
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

#card-plano {
    transition: all 0.1s ease;
    cursor: pointer;
    filter: brightness(.8);
}

#card-plano:hover {
    filter: brightness(1);
}
</style>