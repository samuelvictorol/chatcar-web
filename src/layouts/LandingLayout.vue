<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar class="container">
        <q-toolbar-title class="text-h6"><q-icon class="q-pb-xs" name="directions_car" size="md"></q-icon>
          ChatCar</q-toolbar-title>
        <!-- <q-btn label="experimente" icon-right="rocket_launch" color="green-14" class="q-mr-sm " glossy to="/loja" /> -->
        <q-btn color="white" class="text-black" label="iniciar sessão" icon-right="login" glossy to="/loja" />
      </q-toolbar>
      <q-tabs inline-label
        v-model="tab" 
        class="text-secondary"
      >
        <q-tab class="row"  icon="rocket_launch" label="experimente já" />
        <q-tab class="row" label="Planos" icon="view_week" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <div class="w100">
        <q-img src="ia.png" class="w100" style="position: fixed; z-index: -90" height="400px">
          <div class="absolute-bottom bg-black text-white q-pa-md">
            <h2 class="text-h4">ChatCar IA</h2>
          </div>
        </q-img>
      </div>
      <!-- HERO Section -->
      <section class="q-pb-xl q-pt-lg  bg-dark text-white text-center">
        <div class="container q-pb-xl">
          <h1 class="text-h3 text-bold "><q-icon name="sms" color="white" class="" size="xl"></q-icon><br>Transforme
            Conversas em Vendas com o ChatCar</h1>
          <p class="text-subtitle1  q-px-lg q-mt-md">
            Uma plataforma inteligente para lojistas e concessionárias automatizarem o atendimento e captarem leads
            prontos para comprar.
          </p>
          <q-btn label="CONHEÇA A PLATAFORMA" color="secondary" class="q-mt-lg" to="/cadastro" unelevated size="lg" />
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
      <section class="q-py-xl bg-blue text-white text-center">
        <div class="container">
          <div class="text-h4 text-bold">Promoção por tempo limitado!</div>
          <p class="text-subtitle1 q-mt-sm">De <s>R$ 159,99</s> por apenas <strong class="text-h5">R$ 59,90/mês</strong>
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

          <q-btn label="Aproveitar agora" color="green-14" glossy class="shadow-1 q-mt-lg" to="/cadastro" size="lg"
            unelevated />
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

      <!-- Rodapé -->
      <q-footer class="bg-grey-9 text-white text-center q-pa-md">
        ChatCar © {{ new Date().getFullYear() }} — Todos os direitos reservados
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const countdown = ref({
  dias: '00',
  horas: '00',
  minutos: '00',
  segundos: '00',
});

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
