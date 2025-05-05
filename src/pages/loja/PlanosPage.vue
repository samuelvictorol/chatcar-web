<template>
    <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el class="text-teal" icon="store" label="Início" to="/loja" />
            <q-breadcrumbs-el icon="currency_exchange" label="Planos" exact />
        </q-breadcrumbs>

        <div class="w100 row justify-between q-mb-sm">
            <div class="text-h5 text-left text-bold text-dark">Planos de Acesso</div>
            <div class="text-left text-teal text-bold">Plano Atual: {{ sobreLoja.plano }}</div>
        </div>
        <section class="q-pb-xl q-pt-md text-center  q-px-md">
            <div class="container">
                <h2 class="text-h4 text-bold q-mb-xl">Escolha seu Plano</h2>
                <div class="row q-col-gutter-md justify-center">

                    <!-- Plano Free Trial -->
                    <div class="col-12 col-sm-6 col-md-4">
                        <q-card class="q-pa-md shadow-2">
                            <q-card-section>
                                <div class="text-h5 text-bold text-teal">Pacote Básico</div>
                                <div class="text-subtitle2 q-mt-sm">Utilize a plataforma no plano mensal, pague apenas
                                    se for utilizar
                                </div>
                                <div class="text-h6 q-my-md text-secondary"><strong>R$ 19,90</strong><br>⌛ tempo
                                    limitado</div>
                                <ul class="text-left">
                                    <li><strong>Captação</strong> de Leads limitados</li>
                                    <li><strong>Linguagem natural</strong> configurável para os veículos</li>
                                    <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat ia da sua loja
                                    </li>
                                    <li><strong>ChatCar IA</strong> para geração de relatórios com dicas de abordagem
                                        personalizadas</li>
                                </ul>
                            </q-card-section>
                            <q-card-actions align="center">
                                <q-btn label="PACOTE MENSAL" color="secondary" glossy
                                    @click="openPagarMeLinkUrl('222222')" />
                            </q-card-actions>
                        </q-card>
                    </div>

                    <!-- Plano Básico -->
                    <div class="col-12 col-sm-6 col-md-4">
                        <q-card class="q-pa-md shadow-4 bg-green-1">
                            <q-card-section>
                                <div class="text-h5 text-bold text-green">Plano Semestral</div>
                                <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">De R$ 459,90
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
                                <q-btn label="pacote semestral" color="green" glossy
                                    @click="openPagarMeLinkUrl('333333')" />
                            </q-card-actions>
                        </q-card>
                    </div>

                    <!-- Plano White Label -->
                    <div class="col-12 col-sm-6 col-md-4">
                        <q-card class="q-pa-md shadow-2 bg-blue-1">
                            <q-card-section>
                                <div class="text-h5 text-bold text-blue-14">Plano Profissional</div>
                                <!-- <div class="text-subtitle2 q-mt-sm">Acesso antecipado à novas funcionalidades</div> -->
                                <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">De R$ 1899,90
                                    por</div>
                                <div class="text-h6 q-my-md text-blue-14"><strong>R$ 1599,90</strong> em até 12x</div>
                                <ul class="text-left">
                                    <li>Até <strong>1000</strong> leads Inteligentes simultâneos</li>
                                    <li><strong>12 meses</strong> de <strong>acesso</strong></li>
                                    <li>Para empresas de <strong>alto padrão</strong></li>
                                    <li>Funcionalidades <strong>extras</strong> e atualizações sem custo adicional</li>
                                    <li><strong>Inclui</strong> todos os <strong>outros planos</strong></li>
                                    <li>Mais <strong>otimizado</strong> e completo em funcionalidades</li>
                                </ul>
                            </q-card-section>
                            <q-card-actions align="center">
                                <q-btn label="Plano Anual" glossy color="blue-14"
                                    @click="openPagarMeLinkUrl('444444')" />
                            </q-card-actions>
                        </q-card>
                    </div>

                </div>
            </div>
        </section>
    </q-page>
</template>

<script setup>

import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted } from 'vue';
const sobreLoja = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
const $q = useQuasar()

async function openPagarMeLinkUrl(planoId) {
    await api.post('/pagar/criar-link', {
        login: sobreLoja.login,
        plano_id: planoId
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


onMounted(()=>{
    $q.notify({
            color: 'teal',
            icon: 'currency_exchange',
            message: 'As vezes é necessário relogar após adquirir um plano ✨',
            position: 'bottom'
        });
})

</script>

<style scoped></style>