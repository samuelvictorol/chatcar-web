<template>
  <q-layout view="lHh Lpr lFf">
    <!-- NAVBAR -->
    <q-header elevated class="bg-dark q-py-xs text-white">
      <q-toolbar class="container">
        <q-toolbar-title class="text-h6 row items-center no-wrap">
          <q-avatar size="50px" class="q-mr-sm">
            <img src="/logo.jpeg" alt="Logo" />
          </q-avatar>
          <div class="text-weight-bold animate__animated animate__fadeInLeft animate__slower">ChatCar</div>
        </q-toolbar-title>

        <q-btn :label="isUserLoggedIn ? 'Meu Perfil' : 'Entrar'" color="teal" glossy :icon-right="isUserLoggedIn ? 'account_box' : 'login'" :to="isUserLoggedIn ? '/me' : '/login'" />
      </q-toolbar>
    </q-header>

    <!-- HERO SECTION -->
    <q-page-container class="bg-dark q-pa-none hero-container text-white">
      <div class="hero-background"></div>
      <div class="q-px-md">
        <div
          class="shadow-4 glass-card text-center q-mx-auto animate__animated animate__fadeIn animate__slower animate__delay-3s">

          <div style="font-size: 2.5rem; line-height: 1.2;"
            class="text-bold animate__animated  animate__fadeInLeft animate__slower animate__delay-3s font-orbitron q-pb-sm">
            ChatCar
            I.A</div>
          <q-btn label="Iniciar Agora" color="teal-14" size="lg" icon="rocket_launch"
            class="animate__animated animate__zoomIn animate__slower animate__delay-4s q-mt-lg" :to="isUserLoggedIn ? '/me' : '/ia'" />

        </div>
      </div>
    </q-page-container>


    <!-- BENEFITS SECTION -->
    <section class="q-pa-xl text-white bg-dark text-center">
      <div class="q-gutter-lg row justify-center">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-icon name="bolt" size="48px" color="teal" />
          <p class="q-mt-sm">Implementação Rápida</p>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-icon name="chat" size="48px" color="teal" />
          <p class="q-mt-sm">Atendimento 24h com IA</p>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-icon name="insights" size="48px" color="teal" />
          <p class="q-mt-sm">Captação Qualificada</p>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-icon name="attach_money" size="48px" color="teal" />
          <p class="q-mt-sm">Custo-benefício Incrível</p>
        </div>
      </div>
    </section>

    <!-- VALUE PROPOSITION -->
    <section class="q-py-xl text-center bg-grey-2">
      <div class="glass-card q-pa-xl q-mx-auto">
        <p class="text-subtitle1 text-dark">
          Muito além de um ChatBot: é seu <strong>estoque online, funil de vendas e vitrine para tráfego pago</strong>,
          tudo em um só lugar — com leads qualificados chegando direto no seu WhatsApp.
        </p>

        <div class="text-h6 q-mt-md bg-dark text-grey-2 q-pa-xs rounded-borders">Acesso por 30 dias — <strong
            class="text-green">sem assinatura</strong>, <strong>sem cobranças automáticas</strong>.</div>
        <div class="text-caption q-mt-md">Investimento único de <strong>R$49,90</strong>, somente se for utilizar.</div>
      </div>
    </section>
    <!-- CTA FINAL -->
    <section class="q-py-xl bg-teal-7 text-white text-center">
      <h2 class="text-h5 text-bold q-mb-md">Pronto para Começar?</h2>
      <p class="q-mb-md">Ative sua vitrine agora mesmo e comece a captar leads com I.A.</p>
      <q-btn label="Ativar Agora" to="/ia" color="green" size="lg" icon="play_circle" glossy />
    </section>
    <!-- SUPPORT SECTION -->
    <section class="q-py-xl bg-teal-8 text-white text-center">
      <div class="q-mx-auto" style="max-width: 700px">
        <h2 class="text-h5 text-bold q-mb-sm">Suporte Rápido e Humanizado</h2>
        <p class="text-subtitle2 q-px-sm q-mb-md">Tem dúvidas? Nosso time responde rápido, com atenção de verdade e foco
          em resolver. Atendimento direto, simples e transparente — do jeito que você merece!</p>
        <q-icon name="email" size="36px" color="white" class="q-mb-sm" />
        <div class="text-subtitle1 text-bold">chatcar.suporte@gmail.com</div>
      </div>
    </section>
    <!-- DEVELOPER SECTION -->
    <section class="q-py-xl bg-dark text-white text-center">
      <div class="q-mx-auto" style="max-width: 600px">
        <h2 class="text-h5 text-bold q-mb-md">Sobre o Desenvolvedor</h2>
        <q-avatar size="120px" class="q-mb-sm">
          <img src="/dev.jpeg" alt="Avatar do Desenvolvedor" />
        </q-avatar>
        <p class="text-subtitle2 q-px-sm q-my-md">
          Arquitetura, Engenharia e Desenvolvimento de Software, Modelagem de dados, Criação de Serviços/Automações na
          Nuvem e integração com OpenAI por <a style="text-decoration: none;" target="_blank"
            href="https://samuelvictorol.github.io/portfolio" class="text-teal-14">S.V</a><br><br><span
            class="text-blue-4 q-px-sm">Acesse o portfólio profissional para conhecer mais projetos e soluções.</span>
        </p>
        <q-btn label="SV Software" type="a" target="_blank" href="https://samuelvictorol.github.io/portfolio/"
          icon="open_in_new" color="teal-14" flat />
      </div>
    </section>
    <div class="w100 q-py-md bg-teal-7">
    </div>
    <!-- FOOTER -->
    <q-footer class="bg-dark text-grey-4 text-center q-pa-sm">
      chatcar.me ® - 59.905.708/0001-34
    </q-footer>
  </q-layout>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
const isUserLoggedIn = ref(false);

onBeforeMount(() => {
  // Check if user is logged in
  const user = localStorage.getItem('user');
  if (user) {
    isUserLoggedIn.value = true;
  }
});

</script>
<style scoped>
.bg-grad-direct{

}

.hero-container {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/home-desk.png');
  background-size: cover;
  background-position: center;
  z-index: 0;
  animation: zoomInOut 20s ease-in-out infinite;
}

@media (max-width: 768px) {
  .hero-background {
    background-image: url('/home-mobile.png');
  }
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-bottom: 2px solid rgb(0, 117, 128);
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  z-index: 1;
  position: relative;
  padding: 2rem;
}
</style>
