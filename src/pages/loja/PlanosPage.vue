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
                <div class="text-h6 text-secondary q-mb-xl">✅ Os planos têm duração de 30 dias e não será realizada
                    cobranças e nem assinatura.</div>

                <div class="row q-col-gutter-md justify-center">
                    <div class="col-12 col-sm-6 col-md-4">
                        <q-card class="q-pa-md shadow-2">
                            <q-card-section>
                                <div class="text-h5 text-bold text-teal">Pacote Básico</div>
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
                                <q-btn label="PACOTE MENSAL" color="secondary" glossy
                                    @click="openPagarMeLinkUrl('222222')" />
                            </q-card-actions>
                        </q-card>
                    </div>

                    <!-- Plano Básico -->
                    <div class="col-12 col-sm-6 col-md-4">
                        <q-card class="q-pa-md shadow-4 bg-green-1">
                            <q-card-section>
                                <div class="text-h5 text-bold text-green">Plano Profissional</div>
                                <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">⌛ De R$ 129,90
                                    por</div>
                                <div class="text-h6 q-my-md text-green  text-bold">R$ 89,90/mês</div>
                                <ul class="text-left">
                                    <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat ia da sua loja
                                    </li>
                                    <li>Armazenamento de leads simultâneos <strong>sem limites</strong>.</li>
                                    <li>ChatVitrine <strong>4.0</strong>.</li>
                                    <li><strong>ChatCar IA</strong> para geração de relatórios com dicas de abordagem
                                        personalizadas</li>
                                    <li>Relatórios com <strong>copys otimizadas</strong> para serem mais
                                        <strong>persuasivas</strong> e <strong>matadoras.</strong></li>
                                    <li><strong>Linguagem natural</strong> para o atendimento das informações dos seus
                                        veículos</li>
                                </ul>
                            </q-card-section>
                            <q-card-actions align="center">
                                <q-btn label="pacote semestral" color="green" glossy
                                    @click="openPagarMeLinkUrl('333333')" />
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


onMounted(() => {
    $q.notify({
        color: 'teal',
        icon: 'currency_exchange',
        message: 'As vezes é necessário relogar após adquirir um plano ✨',
        position: 'bottom'
    });
})

</script>

<style scoped></style>