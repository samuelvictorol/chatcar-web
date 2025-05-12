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
                <q-btn flat dense class="q-pr-sm text-grey-5" label="sair" to="/" />
                <q-btn color="teal" glossy dense class="q-px-sm text-white" label="Adquira Já" icon-right="paid"
                    to="/login" />
            </q-toolbar>
        </q-header>

        <q-page-container class="q-pa-md relative">
            <!-- Vídeo responsivo -->
            <div class="q-mb-xl q-mt-md">
                <div class="video-container rounded-borders" style="border-bottom:4px solid #00BFA5;">
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0"
                        allowfullscreen></iframe>
                </div>
            </div>

            <!-- Copys persuasivas -->
            <div class="text-center q-my-xl">
                <h2 class="text-h4 text-bold text-teal">Por que usar a ChatCar IA?</h2>
                <p class="text-subtitle1 q-mt-md">Venda 24h por dia com nossa IA configurada para captar, abordar e
                    qualificar seus leads.</p>
                <p class="text-subtitle1">Receba relatórios inteligentes, personalize a comunicação dos veículos e
                    aumente sua taxa de conversão.</p>
                <p class="text-subtitle1">Tudo isso sem depender de ferramentas complicadas ou planos caros.</p>
            </div>

            <!-- Depoimentos dinâmicos -->
            <div class="q-my-xl">
                <h2 class="text-h5 text-center text-bold q-mb-lg">Depoimentos de Clientes</h2>
                <q-carousel animated control-color="teal" arrows swipeable infinite height="200px">
                    <q-carousel-slide v-for="(dep, index) in depoimentos" :key="index">
                        <div class="q-pa-md text-center">
                            <q-avatar size="60px" class="q-mb-sm">
                                <img :src="dep.foto" />
                            </q-avatar>
                            <div class="text-subtitle1 q-mb-xs"><q-icon name="format_quote" /> {{ dep.mensagem }}</div>
                            <div class="text-caption text-grey">- {{ dep.nome }}</div>
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>

            <!-- Formulário de cadastro -->
            <div class="q-my-xl">
                <h2 class="text-h6 text-teal text-left text-bold q-mb-md">1/2 Cadastre-se agora mesmo*</h2>
                <q-form @submit.prevent="handleSubmit" class="q-gutter-y-sm" style="max-width: 500px; margin: auto;">
                    <q-input color="teal" filled v-model="form.email" label="E-mail" type="email" required />
                    <q-input color="teal" filled v-model="form.login" label="Login" required />
                    <q-input color="teal" filled v-model="form.senha" label="Senha" type="password" required />
                    <q-input color="teal" filled v-model="form.telefone" label="Telefone" mask="(##) #####-####"
                        required />
                </q-form>
            </div>

            <!-- Planos -->
            <div id="planos" class="q-my-xl">
                <h2 class="text-h6 text-teal text-left text-bold q-mb-md">2/2 Escolha seu Plano*</h2>
                <div class="row q-col-gutter-md justify-center">
                    <section class="q-pb-xl q-pt-md text-center  q-px-md">
                        <div class="container">
                            <div class="row q-col-gutter-md justify-center">
                                <!-- Plano Free Trial -->
                                <div class="col-12 col-sm-6 col-md-4">
                                    <q-card class="q-pa-md shadow-2">
                                        <q-card-section>
                                            <div class="text-h5 text-bold text-teal">Pacote Básico</div>
                                            <div class="text-subtitle2 q-mt-sm">Utilize a plataforma no plano mensal,
                                                pague apenas
                                                se for utilizar
                                            </div>
                                            <div class="text-h6 q-my-md text-secondary"><strong>R$ 19,90</strong><br>⌛
                                                tempo
                                                limitado</div>
                                            <ul class="text-left">
                                                <li><strong>Captação</strong> de Leads limitados</li>
                                                <li><strong>Linguagem natural</strong> configurável para os veículos
                                                </li>
                                                <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat ia da
                                                    sua loja
                                                </li>
                                                <li><strong>ChatCar IA</strong> para geração de relatórios com dicas de
                                                    abordagem
                                                    personalizadas</li>
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
                                                De R$ 459,90
                                                por</div>
                                            <div class="text-h6 q-my-md text-green  text-bold">R$ 69,90/mês</div>
                                            <ul class="text-left">
                                                <li>Até <strong>100</strong> leads Inteligentes simultâneos</li>
                                                <li><strong>6 meses</strong> de <strong>acesso</strong></li>
                                                <li>Relatórios com <strong>copys otimizadas</strong> para serem mais
                                                    <strong>persuasivas</strong> e
                                                    <strong>matadoras</strong>
                                                </li>
                                                <li>Mais <strong>vendido</strong></li>
                                                <li><strong>R$ 419,90</strong> em até <strong>12x</strong></li>
                                            </ul>
                                        </q-card-section>
                                        <q-card-actions align="center">
                                            <q-radio v-model="shape" val="line" checked-icon="task_alt"
                                                unchecked-icon="panorama_fish_eye" left-label class="text-bold"
                                                label="Quero esse plano!" color="teal" />
                                        </q-card-actions>
                                    </q-card>
                                </div>

                                <!-- Plano White Label -->
                                <div class="col-12 col-sm-6 col-md-4">
                                    <q-card class="q-pa-md shadow-2 bg-blue-1">
                                        <q-card-section>
                                            <div class="text-h5 text-bold text-blue-14">Plano Profissional</div>
                                            <!-- <div class="text-subtitle2 q-mt-sm">Acesso antecipado à novas funcionalidades</div> -->
                                            <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">
                                                De R$ 1899,90
                                                por</div>
                                            <div class="text-h6 q-my-md text-blue-14"><strong>R$ 1599,90</strong> em até
                                                12x</div>
                                            <ul class="text-left">
                                                <li>Até <strong>1000</strong> leads Inteligentes simultâneos</li>
                                                <li><strong>12 meses</strong> de <strong>acesso</strong></li>
                                                <li>Para empresas de <strong>alto padrão</strong></li>
                                                <li>Funcionalidades <strong>extras</strong> e atualizações sem custo
                                                    adicional</li>
                                                <li><strong>Inclui</strong> todos os <strong>outros planos</strong></li>
                                                <li>Mais <strong>otimizado</strong> e completo em funcionalidades</li>
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
                </div>
            </div>
            <q-btn style="position:fixed;left:0px; bottom:0px" label="Criar Conta"  type="submit" color="teal"
                icon-right="person_add" glossy class="w100 q-py-md" />

        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const storedLoja = false;
const form = ref({ email: '', login: '', senha: '', telefone: '' });
const depoimentos = ref([
    { nome: 'Carlos M.', mensagem: 'Fechei 3 carros em 1 semana usando a IA.', foto: 'https://i.pravatar.cc/60?img=1' },
    { nome: 'Juliana R.', mensagem: 'Aumentei minha conversão em 40% com os relatórios prontos!', foto: 'https://i.pravatar.cc/60?img=2' },
    { nome: 'Eduardo P.', mensagem: 'Muito mais fácil e moderno que outras plataformas.', foto: 'https://i.pravatar.cc/60?img=3' }
]);

function handleSubmit() {
    // Lógica de cadastro aqui
    console.log('Form enviado:', form.value);
}

function logout() {
    console.log('Logout');
}
</script>

<style scoped>
.video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
