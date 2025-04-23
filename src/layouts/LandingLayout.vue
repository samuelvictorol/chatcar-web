<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar class="container">
        <q-toolbar-title class="text-h6 row items-center"><q-icon class="q-pr-sm" name="directions_car"
            size="md"></q-icon>
          <div class="animate__animated animate__fadeInLeft animate__slower">ChatCar</div>
        </q-toolbar-title>
        <!-- <q-btn label="experimente" icon-right="rocket_launch" color="green-14" class="q-mr-sm " glossy to="/loja" /> -->
        <q-btn color="secondary" class="text-white" label="entrar" icon-right="login" glossy to="/loja" />
      </q-toolbar>
      <q-tabs inline-label v-model="tab" class="text-grey-2 ">
        <q-route-tab class="animate__animated animate__flipInX animate__slower animate__delay-2s row"
          icon="rocket_launch" label="experimente já" to="/free-trial" />

        <q-tab class="animate__animated animate__flipInX animate__slower animate__delay-2s row" label="Planos"
          icon="view_week" name="planos" @click="scrollToSection('planos')" />
      </q-tabs>

    </q-header>

    <q-page-container class="animate__animated animate__fadeIn">
      <div class="w100">
        <q-img src="ia1.png" class="w100" style="position: fixed; z-index: -90" height="50vh">
          <div class="absolute-bottom bg-black text-white q-pa-md">
            <h2 class="text-h4">ChatCar I.A.</h2>
          </div>
        </q-img>
        <q-img src="ia.png" class="w100" style="position: fixed; bottom: 0px; z-index: -90" height="40vh">
          <div class="absolute-bottom bg-black text-white q-pa-md">
            <h2 class="text-h4 w100 text-right row no-wrap justify-end">Vendas Inteligentes</h2>
          </div>
        </q-img>
      </div>
      <!-- HERO Section -->
      <section class="q-pb-xl q-pt-lg  bg-dark text-white text-center">
        <div class="container q-pb-xl">
          <h1 class="text-h3 text-bold "><q-icon name="sms" color="white"
              class="animate__animated animate__zoomIn animate__slower animate__delay-2s"
              size="xl"></q-icon><br>Transforme
            Conversas em Vendas com o ChatCar<br><q-icon name="paid" color="secondary"
              class="animate__animated animate__zoomIn animate__slower animate__delay-3s" size="xl"></q-icon></h1>
          <p class="text-subtitle1  q-px-lg q-mt-md">
            Uma plataforma inteligente para lojistas e concessionárias automatizarem o atendimento e captarem leads
            prontos para comprar.
          </p>
          <q-btn label="CONHEÇA A PLATAFORMA" color="secondary" icon="query_stats" class="q-px-lg  q-mt-lg" to="/free-trial" unelevated size="lg" />
        </div>
      </section>
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
      <section id="planos" class="q-py-xl bg-blue-14 text-white text-center">
        <div class="container">
          <div class="text-h4 text-bold">Promoção por tempo limitado!</div>
          <p class="text-subtitle1 q-mt-sm">De <s>R$ 459,90</s><br>por apenas <strong class="text-h5">R$ 69,90/mês</strong>
          </p>

          <div class="row justify-center q-mt-md">
            <div class="col-auto">
              <div class="text-h6">Oferta termina em:</div>
              <div class="row justify-center items-center q-gutter-sm q-mt-sm">
                <div v-for="(time, label) in countdown" :key="label"
                  class="q-pa-sm bg-white text-blue-14 text-bold rounded-borders">
                  <div class="text-h6">{{ time }}</div>
                  <div class="text-caption">{{ label }}</div>
                </div>
              </div>
            </div>
          </div>

          <q-btn label="Aproveitar agora" color="secondary" glossy class="shadow-1 q-mt-lg" to="/cadastro" size="lg"
            unelevated />
        </div>
      </section>
      <section style="border-bottom: 8px solid grey;" class="q-py-xl bg-grey-2 text-center">
        <div class="container">
          <h2 class="text-h4 text-bold q-mb-xl">Escolha seu Plano</h2>
          <div class="row q-col-gutter-md justify-center">

            <!-- Plano Free Trial -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card class="q-pa-md shadow-2">
                <q-card-section>
                  <div class="text-h5 text-bold">Pacote Básico</div>
                  <div class="text-subtitle2 q-mt-sm">Utilize a plataforma no plano mensal, pague apenas se for utilizar</div>
                  <div class="text-h6 q-my-md text-secondary text-bold">R$ 89,90</div>
                  <ul class="text-left">
                    <li><strong>Captação</strong> de Leads Ilimitados</li>
                    <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat ia da sua loja</li>
                    <li><strong>Chat IA</strong> para seu estoque</li>
                  </ul>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn label="PACOTE MENSAL" color="secondary" glossy @click="openPlanoDialog('mensal')"/>
                </q-card-actions>
              </q-card>
            </div>

            <!-- Plano Básico -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card class="q-pa-md shadow-4 bg-green-1">
                <q-card-section>
                  <div class="text-h5 text-bold">Plano Semestral</div>
                  <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">De R$ 459,90 por</div>
                  <div class="text-h6 q-my-md text-green  text-bold">R$ 69,90/mês</div>
                  <ul class="text-left">
                    <li><strong>6 meses</strong> de <strong>acesso</strong></li>
                    <li>Relatórios com <strong>copys otimizadas</strong> para serem mais <strong>persuasivas</strong> e <strong>matadoras</strong></li>
                    <li><strong>Funcionalidades extras</strong> com IA</li>
                    <li><strong>Linguagem natural</strong> configurável para os veículos</li>
                    <li>Mais <strong>vendido</strong></li>
                    <li><strong>R$ 419,90</strong> em até <strong>10x</strong></li>
                  </ul>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn label="pacote semestral" color="green" glossy @click="openPlanoDialog('semestral')" />
                </q-card-actions>
              </q-card>
            </div>

            <!-- Plano White Label -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card class="q-pa-md shadow-2 bg-blue-1">
                <q-card-section>
                  <div class="text-h5 text-bold">Plano Anual</div>
                  <!-- <div class="text-subtitle2 q-mt-sm">Acesso antecipado à novas funcionalidades</div> -->
                  <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">De R$ 819,90 por</div>
                  <div class="text-h6 q-my-md text-blue-14"><strong>R$ 799,90</strong> em até 10x</div>
                  <ul class="text-left">
                    <li><strong>12 meses</strong> de <strong>acesso</strong></li>
                    <li>Badge <strong>personalizada</strong></li>
                    <li><strong>Inclui</strong> todos os <strong>outros planos</strong></li>
                    <li>Mais <strong>econômico</strong></li>
                  </ul>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn label="Plano Anual" glossy color="blue-14" @click="openPlanoDialog('anual')"/>
                </q-card-actions>
              </q-card>
            </div>

          </div>
        </div>
      </section>

      <div class="w100 bg-grad-landing" style="height: 40vh"></div>
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
          <q-btn label="Entrar em contato via WhatsApp" color="green-14" class="q-mt-md" icon="sms" glossy
            href="https://wa.me/SEUNUMEROAQUI" target="_blank" />
        </div>
      </section>
      <q-dialog v-model="planosDialog.mensal" persistent>
        <PlanoMensal @close="planosDialog.mensal = false" />
      </q-dialog>
      <!-- Rodapé -->
      <q-footer class="bg-grey-9 text-white text-center q-pa-md">
        ChatCar © {{ new Date().getFullYear() }} — Todos os direitos reservados
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PlanoMensal from 'components/PlanoMensal.vue';

const planosDialog = ref({
  mensal: false,
  semestral: false,
  anual: false,
});

function openPlanoDialog(plano) {
  planosDialog.value[plano] = true;
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
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #0000005f, #F5F5F5);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #00000000, #29292971);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
