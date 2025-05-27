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
        <section class="q-pb-xl q-pt-md text-left  q-px-md">
            <div class="container">
                <div class="text-h6 text-secondary q-mb-xl">⌛ O acesso tem duração de <strong>30 dias</strong> e <strong>não será
                        realizada
                        assinatura e nem cobranças automáticas.</strong></div>

                <div class="row q-col-gutter-md justify-center">
                    <div class="col-12 col-sm-6 col-md-4">
                        <q-card class="q-pa-xs shadow-4 bg-blue-1"
                            style="border-bottom:4px solid #00BFA5;border-top:4px solid #00BFA5">
                            <q-card-section>
                                <div class="text-h6 text-bold text-teal q-px-xs">📦 O QUE VOU RECEBER ?
                                </div>
                                <div class="text-subtitle2 q-mt-sm" style="text-decoration: line-through;">
                                    ⌛ De R$ 99,90
                                    por</div>
                                <div style="font-size:2.4rem" class=" q-mb-md q-mt-sm text-teal  text-bold">
                                    R$
                                    49,90
                                </div>
                                <ul class="text-left column q-gutter-y-sm" style="font-size: 1rem;">
                                    <li>🕐 <strong>Atenda 24h</strong> com o <strong>link</strong> do chat
                                        IA da sua
                                        loja – sempre pronto pra fechar negócios.</li>
                                    <li>💾 Armazene <strong>leads simultâneos sem limites</strong> e nunca
                                        mais
                                        perca um contato quente.</li>
                                    <li>🤖 <strong>ChatVitrine I.A</strong>: seu vendedor digital
                                        incansável, pronto
                                        pra encantar e converter.</li>
                                    <li>📈 <strong>ChatCar IA</strong> gera <strong>relatórios
                                            completos</strong>
                                        com <strong>dicas personalizadas</strong> pra vender muito mais.
                                    </li>
                                    <li>📝 Relatórios com <strong>copys otimizadas</strong>, prontos pra
                                        persuadir
                                        de verdade e garantir a conversão.</li>
                                    <li>💬 <strong>Linguagem natural</strong> pra conversar como humano e
                                        fechar
                                        como profissional.</li>
                                    <li>🌐 Funciona também como um <strong>site de estoque</strong>,
                                        perfeito pra
                                        ser usado como <strong>funil de vendas</strong> em tráfego pago e
                                        anúncios.
                                    </li>
                                    <li>🔗 Se o cliente demonstrar <strong>interesse real</strong>, ele é
                                        redirecionado <strong>automaticamente pro seu WhatsApp</strong> –
                                        você só
                                        precisa fechar a venda.</li>
                                    <li>🚀 Ideal pra <strong>vendedores</strong>, <strong>times de
                                            marketing</strong> e <strong>donos de loja</strong> que não
                                        querem ficar
                                        pra trás.</li>
                                    <li>🎯 Um só link, <strong>tudo integrado</strong>, sempre vendendo por
                                        você.
                                        Não espere – comece hoje!</li>
                                </ul>
                            </q-card-section>
                            <q-btn label="Comprar Acesso" icon="paid" color="teal" glossy class="q-pa-xl w100"
                                @click="openPagarMeLinkUrl('333333')" />
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