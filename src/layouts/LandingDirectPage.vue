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
                <a style="color:#00BFA5;text-decoration: none;" href="https://instagram.com/chatcar.ia"
                    target="_blank">@chatcar.ia</a>
            </q-toolbar>
        </q-header>

        <q-page-container class="q-pa-md relative">
            <!-- Vídeo responsivo -->
            <div class="q-mb-xl q-mt-md">
                <div class="video-container rounded-borders" style="border-bottom:4px solid #00BFA5;">
                    <iframe width="100%" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0"
                        allowfullscreen></iframe>
                </div>
            </div>
            <!-- Copys persuasivas -->
            <div class="text-center q-my-xl">
                <h2 class="text-h4 text-bold text-teal">Por que usar a IA da ChatCar?</h2>

                <p class="text-subtitle1 q-mt-md">
                    📈 Seu estoque vendendo 24h por dia com atendimento automático e inteligente.
                </p>

                <p class="text-subtitle1">
                    🤖 A IA conversa com o cliente, entende o que ele procura, recomenda e mostra veículos do seu
                    estoque com o ChatVitrine em tempo real.
                </p>

                <p class="text-subtitle1">
                    📊 Você recebe leads quentes e resumos das interações dos seus clientes com o chat, além de
                    sugestões de abordagem para fechar mais
                    vendas.
                </p>

                <p class="text-subtitle1">
                    ⚙️ Sem precisar instalar nada. Sem mensalidade. Acesse de qualquer lugar, até pelo celular. Seu
                    estoque atendendo por você com um clique!
                </p>
            </div>

            <!-- Depoimentos dinâmicos -->
            <div class="q-my-xl ">
                <h2 class="text-h5 text-center text-bold q-mb-md">Depoimentos de Clientes</h2>
                <q-carousel v-model="slideAtivoDetalhes" v-if="imagensVeiculoSelecionado.length" swipeable animated
                    class="rounded-borders q-mb-md bg-grey-2" navigation arrows infinite autoplay interval="2000">

                    <q-carousel-slide v-for="(dep, index) in depoimentos" :key="index" :name="index">
                        <div class="q-pa-md text-center">
                            <q-avatar size="100px" class="q-mb-sm q-mt-sm shadow-1">
                                <img :src="dep.foto" style="object-fit: cover;" />
                            </q-avatar>
                            <div class="text-subtitle1 q-mb-xs">
                                <q-icon name="format_quote" /> {{ dep.mensagem }}
                            </div>
                            <div class="text-caption text-grey">- {{ dep.nome }}</div>
                        </div>
                    </q-carousel-slide>
                </q-carousel>

            </div>

            <div style="font-size:2rem;" class="q-pt-sm text-teal text-left text-bold q-mb-md text-shadow">1/2
                Cadastre-se*</div>
            <div class="q-mb-xl bg-grey-1 q-pt-md q-pb-xl rouded-borders shadow-2 q-pl-md"
                style="border-bottom:4px solid teal">
                <q-form @submit.prevent="handleSubmit" class="q-gutter-y-sm q-pr-md"
                    style="max-width: 500px; margin: auto;">
                    <q-input color="teal" outlined maxlength="100" v-model="form.email" label="E-mail*" type="email"
                        required>
                        <template v-slot:append>
                            <q-icon name="email" color="teal" class="cursor-pointer" @click.stop />
                        </template>
                    </q-input>
                    <q-input color="teal" outlined maxlength="100" v-model="form.confirmEmail" label="Confirmar e-mail*"
                        type="email" required>
                        <template v-slot:append>
                            <q-icon name="email" color="teal" class="cursor-pointer" @click.stop />
                        </template>
                    </q-input>
                </q-form>
            </div>

            <!-- Planos -->
            <div id="planos" class="q-my-xl">
                <div style="font-size:2rem;" class="text-teal text-left text-bold q-mb-md">2/2 Escolha seu Plano*</div>
                <div class="row q-col-gutter-md justify-center">
                    <section class="q-pb-xl q-pt-md text-center  q-px-md">
                        <div class="container">
                            <div class="row q-col-gutter-md justify-center">
                                <!-- Plano Free Trial -->
                                <div class="col-12 col-sm-6 col-md-4">
                                    <q-card class="q-pa-md shadow-2">
                                        <q-card-section>
                                            <div class="text-h5 text-bold text-teal">Pacote Básico</div>
                                            <div class="text-h6 q-my-md text-secondary"><strong>R$ 19,90</strong></div>
                                            <ul class="text-left">
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
                                            <q-radio v-model="shape" val="line" checked-icon="task_alt"
                                                unchecked-icon="panorama_fish_eye" left-label class="text-bold"
                                                label="Quero esse plano!" color="teal" />
                                        </q-card-actions>
                                    </q-card>
                                </div>

                                <!-- Plano Básico -->
                                <div class="col-12 col-sm-6 col-md-4">
                                    <q-card class="q-pa-md shadow-4 bg-green-1">
                                        <q-card-section>
                                            <div class="text-h5 text-bold text-green">Plano Semestral</div>
                                            <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">
                                                ⌛ De R$ 129,90
                                                por</div>
                                            <div class="text-h6 q-my-md text-green  text-bold">R$ 89,90/mês</div>
                                            <ul class="text-left">
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
                                            <q-radio v-model="shape" val="line" checked-icon="task_alt"
                                                unchecked-icon="panorama_fish_eye" left-label class="text-bold"
                                                label="Quero esse plano!" color="teal" />
                                        </q-card-actions>
                                    </q-card>
                                </div>
                            </div>
                        </div>
                    </section>
                    <slot name="planos" />
                    <div class="w100 text-center q-pb-xl text-bold text-teal">
                        📩 As instruções de como acessar e utilizar a plataforma serão enviadas para o seu e-mail.
                    </div>
                </div>
            </div>
            <q-btn style="position:fixed;left:0px; bottom:0px" label="Criar Conta" type="submit" color="teal"
                icon-right="person_add" glossy class="w100 q-py-lg" />

        </q-page-container>
    </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
const carouselIndex = ref(0); // índice do slide ativo

const $q = useQuasar();
const form = ref({ email: '', login: '', senha: '', telefone: '' });
const depoimentos = ref([
    { nome: 'Carlos M.', mensagem: 'Fechei 3 carros em 1 semana atendidos pela a IA com o ChatVitrine.', foto: 'https://media.istockphoto.com/id/1473399413/pt/foto/salesman-working-at-a-car-dealership-selling-cars.jpg?s=612x612&w=0&k=20&c=5DCVZYdCRyVagWaO7dWjXi0ihtvEmSmKyakpY8-0RDA=' },
    { nome: 'Juliana R.', mensagem: 'Minha equipe aumentou a conversão em 40% depois que adquiri a ferramenta para eles!', foto: 'https://www.shutterstock.com/image-photo/black-woman-arms-crossed-standing-600nw-2254569139.jpg' },
    { nome: 'Eduardo P.', mensagem: 'Muito mais fácil de configurar e moderno que outras plataformas.', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Zw2TQnR44yKUVXUz-W8Hpo_6gmYtRZjksw&s' },
    {
        nome: 'Larissa T.',
        mensagem: 'Sou vendedora direta e consigo expor veìculos de váriás lojas em um só lugar com meu nome.',
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
    return true;
}

function logout() {
    console.log('Logout');
}
</script>

<style scoped>
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
</style>
