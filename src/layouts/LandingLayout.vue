<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER -->
    <q-header class="bg-blue-grad backdrop-blur-md q-py-sm">
      <q-toolbar class="container" dense>
        <div class="row items-center no-wrap full-width">
          <div class="col-auto row items-center">
            <img :src="withBase('logo.jpeg')" alt="ChatCar" height="38" class=" rounded-borders cursor-pointer  animate__animated animate__fadeInLeft animate__slower" @click="goHome" />
          </div>
          <div class="col row justify-end items-center">
            <q-btn unelevated class="bg-blue-grad-2" label="Página inicial" @click="goHome" />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="bg-grad-direct text-white q-pa-lg q-pa-xl-md">
        <!-- GRID PRINCIPAL -->
        <div class="container-grid">
          <!-- COLLAGE DAS TELAS (CLICÁVEL) -->
          <section class="collage-area">
            <div v-for="(s, i) in slides" :key="s.key" class="card-shot" :class="s.posClass" @click="openCarousel(i)"
              :title="s.title">
              <q-img :src="withBase(s.file)" class="shot-img" fit="cover" basic :no-spinner="true"
                :no-transition="true" />
              <div class="shot-title">{{ s.title }}</div>
            </div>
            <div class="aura"></div>
          </section>

          <!-- PASSO A PASSO -->
          <aside class="steps-area">
            <div class="steps-card glass">
              <h2 class="steps-title">Como funciona</h2>
              <div class="step">
                <div class="step-bullet">1</div>
                <div class="step-text"><span class="arrow">➜</span> cadastre seu estoque e dados relevantes</div>
              </div>
              <div class="step">
                <div class="step-bullet">2</div>
                <div class="step-text">
                  <span class="arrow">➜</span> compartilhe seu link público e aguarde a automação com WhatsApp
                </div>
              </div>
              <div class="step">
                <div class="step-bullet">3</div>
                <div class="step-text"><span class="arrow">➜</span> receba um resumo dos clientes e texto de abordagem
                </div>
              </div>
            </div>

            <!-- MINI GRID LEGENDAS -->
            <div class="mini-legend-grid">
              <div class="mini-legend" v-for="s in slides" :key="s.key">
                <div class="mini-title">{{ s.title }}</div>
                <div class="mini-desc">{{ s.desc }}</div>
              </div>
            </div>
          </aside>
        </div>

        <!-- DIALOG FULLSCREEN COM CAROUSEL -->
        <q-dialog v-model="dialog" maximized transition-show="slide-up" transition-hide="slide-down" persistent>
          <q-card class="bg-black text-white">
            <q-bar class="bg-black text-white q-px-md q-py-sm">
              <div class="text-subtitle2">{{ slides[active].title }} - {{ slides[active].desc }}</div>
              <q-space />
              <q-btn flat round dense icon="close" v-close-popup aria-label="Fechar" />
            </q-bar>

            <div class="q-pa-sm">
              <q-carousel v-model="active" swipeable animated infinite control-color="white" arrows
                transition-prev="slide-right" transition-next="slide-left" class="fullscreen-carousel">
                <q-carousel-slide v-for="(s, i) in slides" :name="i" :key="s.key"
                  class="column items-center justify-center q-pa-none">
                  <q-img :src="withBase(s.file)" fit="contain" class="fs-img" img-class="zoomable" basic
                    :no-spinner="true" :no-transition="true" />
                </q-carousel-slide>

                <!-- navegação por miniaturas -->
                <template #control>
                  <div class="thumbs row no-wrap q-gutter-sm items-center justify-center">
                    <q-btn v-for="(s, i) in slides" :key="s.key" :flat="active !== i" :unelevated="active === i"
                      size="sm" class="thumb-btn" @click="active = i">
                      <img :src="withBase(s.file)" alt="" />
                    </q-btn>
                  </div>
                </template>
              </q-carousel>
            </div>
          </q-card>
        </q-dialog>
        
        <iframe width="100%" height="500" class="video" src="https://www.youtube.com/embed/y2Qka6CeEVg" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const BASE = import.meta.env.BASE_URL || '/'
const withBase = (p) => `${BASE}${p}`

const slides = ref([
  { key: 'see', file: 'home-desk-1.png', title: 'Rastreamento de Leads', desc: 'Conheça a plataforma por dentro.', pos: 'shot-see' },
  { key: 'home', file: 'home.png', title: 'Home', desc: 'Visão geral limpa para navegação rápida.', posClass: 'shot-home' },
  { key: 'chatvitrine', file: 'chatvitrine.png', title: 'ChatVitrine', desc: 'Apresentação pública pronta para tráfego.', posClass: 'shot-chatvitrine' },
  { key: 'estoque', file: 'estoque.png', title: 'Estoque', desc: 'Organize veículos e detalhes essenciais.', posClass: 'shot-estoque' },
  { key: 'leads', file: 'leads.png', title: 'Leads', desc: 'Captação e acompanhamento dos interessados.', posClass: 'shot-leads' },
  { key: 'relatorio', file: 'relatorio.png', title: 'Relatório', desc: 'Resumo objetivo para decidir e agir.', posClass: 'shot-relatorio' },
  { key: 'rel', file: 'rel.png', title: 'Rastreamento de Leads', desc: 'Trackeamento da origem do lead', pos: 'shot-rel' },
])

const dialog = ref(false)
const active = ref(0)

const openCarousel = (index) => {
  active.value = index
  dialog.value = true
}

const router = useRouter()
const goHome = () => {
  try { router.push('/') } catch { window.scrollTo({ top: 0, behavior: 'smooth' }) }
}
</script>

<style scoped>
/* ====== FUNDO ====== */
.bg-grad-direct {
  min-height: 100vh;
  background:
    radial-gradient(1200px 600px at 10% 0%, rgba(0, 214, 208, 0.10), transparent 55%),
    radial-gradient(900px 500px at 100% 20%, rgba(9, 97, 105, 0.25), transparent 60%),
    linear-gradient(180deg, #03181B 0%, #062529 60%, #041114 100%);
}

/* ====== GRID ====== */
.container-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 32px;
  align-items: center;
}

@media (max-width: 1180px) {
  .container-grid {
    grid-template-columns: 1fr;
  }

  .steps-area {
    order: -1;
  }
}

/* ====== COLLAGE ====== */
.collage-area {
  position: relative;
  min-height: 560px;
  display: grid;
  place-items: center;
}

.card-shot {
  position: absolute;
  width: clamp(240px, 40vw, 520px);
  aspect-ratio: 16/10;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  cursor: zoom-in;
  transition: transform .3s ease, box-shadow .3s ease, filter .3s ease;
  border: 1px solid rgba(0, 214, 208, 0.18);
  backdrop-filter: blur(8px);
}

.card-shot:hover {
  transform: translateY(-6px) scale(1.02) rotate(var(--rot, 0deg));
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
}

.shot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: rgba(3, 24, 27, 0.6);
}

.shot-title {
  position: absolute;
  left: 12px;
  bottom: 10px;
  padding: 6px 10px;
  font-weight: 700;
  border-radius: 10px;
  background: rgba(9, 97, 105, 0.75);
  border: 1px solid rgba(0, 214, 208, 0.35);
  font-size: 12.5px;
}

/* POSIÇÕES */
.shot-home {
  z-index: 3;
  --rot: 0deg;
  transform: rotate(var(--rot));
}

.shot-estoque {
  z-index: 3;
  --rot: -6.5deg;
  transform: translate(-22%, -32%) rotate(var(--rot));
  width: clamp(220px, 32vw, 440px);
}

.shot-leads {
  z-index: 3;
  --rot: 7deg;
  transform: translate(24%, -34%) rotate(var(--rot));
  width: clamp(220px, 32vw, 440px);
}

.shot-relatorio {
  z-index: 2;
  --rot: -3.5deg;
  transform: translate(-26%, 34%) rotate(var(--rot));
  width: clamp(220px, 30vw, 420px);
}

.shot-chatvitrine {
  z-index: 3;
  --rot: 4deg;
  transform: translate(26%, 36%) rotate(var(--rot));
  width: clamp(220px, 30vw, 420px);
}

.shot-rel {
  z-index: 2;
  --rot: 4deg;
  transform: translate(16%, 16%) rotate(var(--rot));
  width: clamp(220px, 30vw, 420px);
}

.shot-see {
  z-index: 4;
  --rot: 4deg;
  transform: translate(19%, 19%) rotate(var(--rot));
  width: clamp(220px, 30vw, 520px);
}

/* GLOW */
.aura {
  position: absolute;
  inset: 0;
  margin: auto;
  width: min(72vw, 900px);
  height: min(72vw, 900px);
  filter: blur(70px);
  background: radial-gradient(closest-side, rgba(0, 214, 208, 0.18), transparent 70%),
    radial-gradient(closest-side, rgba(9, 97, 105, 0.22), transparent 75%);
  pointer-events: none;
}

/* ====== STEPS ====== */
.steps-area {
  display: grid;
  gap: 18px;
}

.glass {
  background: linear-gradient(180deg, rgba(9, 97, 105, 0.22) 0%, rgba(3, 24, 27, 0.45) 100%);
  border: 1px solid rgba(0, 214, 208, 0.22);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.35);
  border-radius: 18px;
}

.steps-card {
  padding: 22px 22px 8px;
}

.steps-title {
  margin: 0 0 12px;
  font-size: clamp(18px, 3vw, 22px);
  font-weight: 800;
  color: #e9fbfb;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-radius: 12px;
}

.step+.step {
  margin-top: 6px;
}

.step-bullet {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-weight: 800;
  background: rgba(0, 214, 208, 0.18);
  border: 1px solid rgba(0, 214, 208, 0.35);
  color: #bcffff;
}

.step-text {
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.35;
  color: #e8ffff;
  font-size: 15px;
}

.step-text .arrow {
  opacity: .9;
}

/* MINI LEGEND */
.mini-legend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 600px) {
  .mini-legend-grid {
    grid-template-columns: 1fr;
  }
}

.mini-legend {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(3, 24, 27, 0.35);
  border: 1px solid rgba(0, 214, 208, 0.16);
}

.mini-title {
  font-weight: 800;
  letter-spacing: .2px;
  color: #d8ffff;
}

.mini-desc {
  font-size: 12.5px;
  opacity: .85;
  margin-top: 2px;
}

/* ====== FULLSCREEN CAROUSEL ====== */
.fullscreen-carousel {
  height: calc(100vh - 84px);
  /* barra superior ~84px */
  background: #000;
}

.fs-img {
  max-height: 100%;
  background: #000;
}

.zoomable {
  cursor: grab;
}

/* MINIATURAS NO CAROUSEL */
.thumbs {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
}

.thumb-btn {
  padding: 0;
  width: 64px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, .08);
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.bg-transp {
  background-color: #041114;
}
</style>
