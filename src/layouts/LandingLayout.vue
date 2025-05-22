<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar class="container">
        <q-toolbar-title class="text-h6 row items-center no-wrap">
          <q-avatar size="50px" class="q-mr-sm">
            <img src="/logo.jpeg" alt="Logo" />
          </q-avatar>
          <div class="animate__animated animate__fadeInLeft animate__slower">
            ChatCar
          </div>
        </q-toolbar-title>
        <!-- <q-btn label="experimente" icon-right="rocket_launch" color="green-14" class="q-mr-sm " glossy to="/loja" /> -->
        <q-btn v-if="!storedLoja" color="teal" glossy dense class="q-px-sm text-white" label="Iniciar Sessão"
          icon-right="login" to="/login" />
        <div v-else>
          <q-btn color="teal" @click="logout()" dense class="q-px-sm text-white q-mr-xs" flat label="sair" />
          <q-btn color="teal" dense class="q-px-sm text-white" label="Meu Painel" icon-right="store" glossy
            to="/loja" />
        </div>
      </q-toolbar>
      <q-tabs inline-label v-model="tab" class="text-grey-2 ">
        <q-route-tab class="animate__animated animate__flipInX animate__slower animate__delay-2s row"
          icon="rocket_launch" label="experimente já" to="/chatcars" />

        <q-tab class="animate__animated animate__flipInX animate__slower animate__delay-2s row" label="Planos"
          icon="view_week" name="planos" @click="scrollToSection('planos')" />
      </q-tabs>

    </q-header>

    <q-page-container class="animate__animated animate__fadeIn">
      <div class="w100">
        <q-img src="/logo.jpeg" class="w100" style="object-fit: cover;position: fixed; bottom: 0px; z-index: -90"
          height="100vh">
          <!-- <div class="absolute-bottom bg-black text-white q-pa-md">
            <h2 class="text-h4 w100 text-right row no-wrap justify-end">ChatCar IA</h2>
          </div> -->
        </q-img>
      </div>
      <!-- HERO Section -->
      <section class="q-pb-xl q-pt-lg  bg-dark text-white text-center">
        <div class="container q-pb-xl">
          <h1 class="text-h3 text-bold "><q-icon name="sms" color="white"
              class="animate__animated animate__zoomIn animate__slower animate__delay-2s"
              size="xl"></q-icon><br>Transforme
            Conversas em Vendas com o ChatCar<br><q-icon name="paid" color="teal-14"
              class="animate__animated animate__zoomIn animate__slower animate__delay-3s" size="xl"></q-icon></h1>
          <p class="text-subtitle1  q-px-lg ">
            Atenda 24 horas, aumente a experiência do seu cliente e gere leads com i.a.
          </p>
          <q-btn label="CONHEÇA A PLATAFORMA" color="teal" icon="query_stats" class="q-px-md q-mt-lg" to="/login"
            unelevated size="lg" />
        </div>
      </section>
      <div class="w100 row no-wrap justify-between">
        <img src="porque.png" width="50%" alt="">
        <img src="cowboy.png" width="50%" alt="">
      </div>
      <!-- Como Funciona -->
      <section class="bg-grey-2 q-py-xl container text-center">
        <h2 class="text-h4 text-bold q-pb-lg">Como Funciona?</h2>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-icon name="storefront" size="64px" color="secondary" />
            <h3 class="text-subtitle1 q-mt-sm">Cadastre sua Loja</h3>
            <p>Registre sua loja e seu estoque com facilidade na plataforma.</p>
          </div>
          <div class="col-12 col-md-4">
            <q-icon name="smart_toy" size="64px" color="secondary" />
            <h3 class="text-subtitle1 q-mt-sm">Chat Automatizado</h3>
            <p>Seu cliente é atendido 24h com IA, recebe informações e gera interesse.</p>
          </div>
          <div class="col-12 col-md-4">
            <q-icon name="phone_in_talk" size="64px" color="secondary" />
            <h3 class="text-subtitle1 q-mt-sm">Receba Leads Quentes</h3>
            <p>O ChatCar te entrega contatos com intenção real de compra e sugestões de abordagem.</p>
          </div>
        </div>
      </section>
      <div class="w100 bg-grad-landing" style="height: 40vh"></div>
      <!-- Benefícios -->
      <section class="bg-grey-2 q-py-xl text-center">
        <div class="">
          <h2 class="text-h4 text-bold q-pb-lg">Por que usar o ChatCar?</h2>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-3">
              <q-icon name="attach_money" size="48px" color="green" />
              <p class="q-mt-sm">Baixo custo por lead</p>
            </div>
            <div class="col-12 col-md-3">
              <q-icon name="chat" size="48px" color="blue" />
              <p class="q-mt-sm">Atendimento 100% digital</p>
            </div>
            <div class="col-12 col-md-3">
              <q-icon name="bolt" size="48px" color="orange" />
              <p class="q-mt-sm">Rápida implementação</p>
            </div>
            <div class="col-12 col-md-3">
              <q-icon name="insights" size="48px" color="purple" />
              <p class="q-mt-sm">Dados inteligentes e IA</p>
            </div>
          </div>
        </div>
      </section>
      <div class="w100 row justify-between no-wrap">
        <img src="modelo1.png" width="50%" alt="">
        <img src="modelo2.png" width="50%" alt="">
      </div>

      <section id="planos" class="q-py-xl bg-teal text-white text-center">
        <div class="container">
          <div class="text-h4 text-bold">Promoção por tempo limitado!</div>
          <p class="text-subtitle1 q-mt-sm">De <s>R$ 459,90</s><br>por apenas <strong class="text-h5">R$
              69,90/mês</strong>
          </p>

          <div class="row justify-center q-mt-md">
            <div class="col-auto">
              <div class="text-h6">Oferta termina em:</div>
              <div class="row justify-center items-center q-gutter-sm q-mt-sm">
                <div v-for="(time, label) in countdown" :key="label"
                  class="q-pa-sm bg-white text-teal text-bold rounded-borders">
                  <div class="text-h6">{{ time }}</div>
                  <div class="text-caption">{{ label }}</div>
                </div>
              </div>
            </div>
          </div>

          <q-btn label="Aproveitar agora" color="teal-14" glossy class="shadow-1 q-mt-lg" @click="routerPush('agora')"
            size="lg" unelevated />
        </div>
      </section>

      <section class="q-pb-xl q-pt-md bg-grey-2 text-center">
        <div class="container">
          <h2 class="text-h4 text-bold q-mb-sm">Escolha seu Plano</h2>
          <div class="w100 text-subtitle1 q-mt-sm q-mb-xl "> ✅ Utilize a plataforma no plano mensal e pague apenas se for utilizar sem
            cobranças ou assinaturas.</div>

          <div class="row q-col-gutter-md justify-center">
            <div class="col-12 col-sm-6 col-md-4">
              <q-card class="q-pa-md shadow-2">
                <q-card-section>
                  <div class="text-h5 text-bold">Pacote Básico</div>
                  <div class="text-h6 q-my-md text-secondary"><strong>R$ 19,90</strong></div>
                                <ul class="text-left">
                                    <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat ia da sua loja
                                    </li>
                                    <li><strong>ChatCar IA</strong> para geração de relatórios com dicas de abordagem
                                        personalizadas</li>
                                    <li>ChatVitrine <strong>3.5-turbo</strong></li>
                                    <li><strong>Linguagem natural</strong> para o atendimento das informações dos seus
                                        veículos</li>
                                    <li><strong>Armazenamento de Leads</strong> limitados (até <strong>50</strong> leads
                                        simultâneos)</li>
                                </ul>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn label="PACOTE MENSAL" color="secondary" glossy @click="routerPush('mensal')" />
                </q-card-actions>
              </q-card>
            </div>

            <!-- Plano Básico -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card class="q-pa-md shadow-4 bg-green-1">
                <q-card-section>
                  <div class="text-h5 text-bold">Plano Profissional</div>
                  <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">⌛ De R$ 129,90 por</div>
                  <div class="text-h6 q-my-md text-green  text-bold">R$ 89,90/mês</div>
                  <ul class="text-left">
                    <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat ia da sua loja
                    </li>
                    <li>Armazenamento de leads simultâneos <strong>sem limites</strong>.</li>
                    <li>ChatVitrine <strong>4.0</strong>.</li>
                    <li><strong>ChatCar IA</strong> para geração de relatórios com dicas de abordagem
                      personalizadas</li>
                    <li>Relatórios com <strong>copys otimizadas</strong> para serem mais
                      <strong>persuasivas</strong> e <strong>matadoras.</strong>
                    </li>
                    <li><strong>Linguagem natural</strong> para o atendimento das informações dos seus
                      veículos</li>
                    <li>Mais <strong>vendido</strong></li>
                  </ul>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn label="pacote semestral" color="green" glossy @click="routerPush('semestral')" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </section>
      <q-dialog v-model="mostrarCarousel" maximized transition-show="slide-up" transition-hide="slide-down">
        <q-card class="bg-white text-dark q-pa-none" style="max-width: 100vw; max-height: 100vh;">
          <q-bar class="bg-white">
            <div class="text-h6">Conheça a plataforma</div>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup />
          </q-bar>

          <q-carousel animated v-model="slide" control-color="teal" arrows swipeable infinite class="q-mb-sm">
            <q-carousel-slide name="1" class="flex flex-center bg-white">
              <img src="/e1.png" style="max-width: 100%; max-height: 90vh; object-fit: cover;" />
            </q-carousel-slide>

            <q-carousel-slide name="2" class="flex flex-center bg-white">
              <img src="/e2.png" style="max-width: 100%; max-height: 90vh; object-fit: cover;" />
            </q-carousel-slide>

            <q-carousel-slide name="3" class="flex flex-center bg-white">
              <img src="/e3.png" style="max-width: 100%; max-height: 90vh; object-fit: cover;" />
            </q-carousel-slide>
          </q-carousel>

          <q-card-actions align="center">
            <q-btn flat color="teal" label="Fechar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>


      <section class="q-py-xl bg-grey-1 text-center">
        <div class="container q-px-md">
          <h2 class="text-h4 text-bold q-mb-md">IA Superinteligente Integrada à OpenAI</h2>
          <p class="text-subtitle1 q-mt-md">
            Utilizamos a mais avançada versão do ChatGPT, desenvolvida pela OpenAI, para automatizar conversas com
            altíssima
            precisão, empatia e poder de persuasão.
          </p>
          <p class="text-body1 q-mt-sm">
            A inteligência artificial do ChatCar entende as necessidades dos seus clientes, responde com linguagem
            natural e
            personalizada, e direciona cada conversa para uma captação de lead superqualificado.
          </p>
          <p class="text-body1 q-mt-sm">
            Além disso, nossa IA analisa o comportamento dos visitantes e otimiza as interações em tempo real para
            <strong>maximizar a conversão em vendas</strong>, garantindo o melhor custo-benefício do mercado.
          </p>
        </div>
      </section>
      <div class="w100 row justify-between no-wrap">
        <img src="iamodel.png" width="50%" alt="">
        <img src="sistema.png" width="50%" alt="">
      </div>
      <!-- Sobre -->
      <section class="bg-grey-3 q-py-xl container text-center">
        <h2 class="text-h4 text-bold q-pb-lg">Sobre o ChatCar</h2>
        <p class="text-body1 q-px-md">
          O ChatCar foi criado por especialistas em tecnologia e vendas, com foco em transformar o processo de
          atendimento automotivo. Nossa missão é simplificar o caminho entre sua loja e o comprador, otimizando o tempo
          e maximizando as conversões.
        </p>
      </section>

      <!-- Contato -->
      <section class="q-py-xl bg-dark text-white">
        <div class="container text-center">
          <h2 class="text-h5 text-bold q-mb-md">Quer saber mais?</h2>
          <p>Fale com nosso time agora mesmo</p>
          <q-btn label="Entrar em contato via WhatsApp" color="secondary" class="q-mt-md q-py-xl" icon="sms" glossy
            @click="solicitarContatoWpp()" target="_blank" />
          <div class="w100 text-center text-teal-2 q-pt-lg text-bold">
            chatcar.suporte@gmail.com
          </div>
          <div class="w100 text-center text-teal-2 q-pt-sm text-bold">
            Instagram e TikTok: @chatcar.ia
          </div>
        </div>
        <!-- <div class="w100 row justify-between q-pt-xl q-px-xl rounded-borders no-wrap">
          <img src="modelo3.png" width="100%" class="rounded-borders shadow-1" alt="">
        </div> -->
      </section>
      <q-dialog v-model="planosDialog.mensal">
        <PlanoMensal @close="planosDialog.mensal = false" />
      </q-dialog>
      <q-dialog v-model="planosDialog.semestral">
        <PlanoSemestral @close="planosDialog.semestral = false" />
      </q-dialog>
      <q-dialog v-model="planosDialog.anual">
        <PlanoAnual @close="planosDialog.anual = false" />
      </q-dialog>
      <!-- Rodapé -->
      <q-footer class="bg-glass-dark text-white text-center q-pa-sm">
        chatcar.me ® - 2025
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PlanoMensal from 'components/PlanoMensal.vue';
import PlanoSemestral from 'components/PlanoSemestral.vue';
import PlanoAnual from 'components/PlanoAnual.vue';
import { useRouter } from 'vue-router';
const mostrarCarousel = ref(false);
const slide = ref("1");

const chatcarsWpp = '61981748795'
const text = 'Olá, Gostaria de saber mais sobre como o ChatCars IA pode empolgar meus clientes com uma vitrine e chat inteligente do meu estoque, atendendo-os automatizadamente 24 horas e gerando leads e sugestões de abordagem personalizadas de acordo com a interação do cliente com I.A., resumindo tudo isso e os dados dos clientes em um relatório pronto pro vendedor.'
const storedLoja = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
const router = useRouter()
function solicitarContatoWpp() {
  const numero = chatcarsWpp
  const mensagem = encodeURIComponent(text)
  const link = `https://wa.me/${numero}?text=${mensagem}`
  window.open(link, '_blank')
}

const planosDialog = ref({
  mensal: false,
  semestral: false,
  anual: false,
});

function routerPush(plano) {
  if (storedLoja) {
    router.push('/loja/planos')
  } else {
    router.push('/ia')
  }
}

function logout() {
  const confirm = window.confirm('Deseja realmente encerrar a sessão no ChatCar?')
  if (confirm) {
    localStorage.clear()
    window.location.reload()
  }
}

const countdown = ref({
  dias: '00',
  horas: '00',
  minutos: '00',
  segundos: '00',
});
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 2); // Promoção por 2 dias

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdown.value = { dias: '00', horas: '00', minutos: '00', segundos: '00' };
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  countdown.value = {
    dias: String(d).padStart(2, '0'),
    horas: String(h).padStart(2, '0'),
    minutos: String(m).padStart(2, '0'),
    segundos: String(s).padStart(2, '0'),
  };
}

let timer;
onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});

</script>

<style scoped>
.bg-grad-landing {
  background: #000;
  background: -webkit-linear-gradient(to bottom, #0000005f, #565656);
  background: linear-gradient(to bottom, #00000000, #29292971);
}

.bg-glass-dark {
  background: #000000c8;
  background: -webkit-linear-gradient(to bottom, #000000c8, #141414d5);
  background: linear-gradient(to bottom, #000000c8, #141414d5);
  backdrop-filter: blur(4px);
}
</style>
