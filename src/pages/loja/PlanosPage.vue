<template>
    <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el class="text-teal" icon="store" label="Início" to="/me" />
            <q-breadcrumbs-el icon="currency_exchange" label="Planos" exact />
        </q-breadcrumbs>

        <div class="w100 row justify-between q-mb-sm">
            <div class="text-h5 text-left text-bold text-dark">Planos de Acesso</div>
            <div class="text-left text-teal text-bold">Plano Atual: {{ sobreLoja.plano }}</div>
        </div>
        <section class="q-pb-xl q-pt-md text-left row no-wrap q-px-md">
            <iframe width="100%" class="video" src="https://www.youtube.com/embed/xuDQpJHdl-c?si=SLg5fwHvvMHNoOjx"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            <div class="q-ml-md column">
                <q-card class="q-pa-xs shadow-4 bg-blue-grad-2"
                    style="border-bottom:4px solid green">
                    <q-card-section>
                        <div class="text-h6 text-green-14 text-shadow q-px-xs">Acesso Total - ChatCar IA</div>
                        <div class="text-subtitle2 text-grey-4 q-mt-sm" style="text-decoration: line-through;">
                            ⌛ De R$ 99,90
                            por</div>
                        <div style="font-size:2.4rem" class=" q-mb-md q-mt-sm text-green-14 text-shadow  text-bold">
                            R$
                            49,90
                        </div>
                        <q-btn label="Renovar Acesso" icon="paid" color="green" class=" text-white q-mb-md q-pa-xl w100"
                            @click="openPagarMeLinkUrl('333333')" />
                    </q-card-section>
                </q-card>

                <div class="text-teal q-mb-xl q-mt-md">⌛ O acesso tem duração de <strong>30 dias</strong> e
                    <strong>não será
                        realizada
                        assinatura e nem cobranças automáticas.</strong> Só pague quando utilizar! 🤗
                </div>
            </div>

        </section>
        <div class="text-left row text-grey-4 column bg-blue-grad-2 q-pa-xl rounded-borders" style="font-size: 1rem;">
            <div class="text-h6 text-teal-14 text-shadow q-px-xs">🎁 O QUE ESTÁ INCLUSO ?
            </div><br></br>
            <li>🕐 <strong>Atenda 24h</strong> com o <strong>link</strong> do chat
                IA da sua
                loja – sempre pronto pra fechar negócios.</li><br>
            <li>💾 Armazene <strong>leads simultâneos sem limites</strong> e nunca
                mais
                perca um contato quente.</li><br>
            <li>🤖 <strong>ChatVitrine I.A</strong>: seu vendedor digital
                incansável, pronto
                pra encantar e converter.</li><br>
            <li>📈 <strong>ChatCar IA</strong> gera <strong>relatórios
                    completos</strong>
                com <strong>dicas personalizadas</strong> pra vender muito mais.
            </li><br>
            <li>📝 Relatórios com <strong>copys otimizadas</strong>, prontos pra
                persuadir
                de verdade e garantir a conversão.</li><br>
            <li>💬 <strong>Linguagem natural</strong> pra conversar como humano e
                fechar
                como profissional.</li><br>
            <li>🌐 Funciona também como um <strong>site de estoque</strong>,
                perfeito pra
                ser usado como <strong>funil de vendas</strong> em tráfego pago e
                anúncios.
            </li><br>
            <li>🔗 Se o cliente demonstrar <strong>interesse real</strong>, ele é
                redirecionado <strong>automaticamente pro seu WhatsApp</strong> –
                você só
                precisa fechar a venda.</li><br>
            <li>🚀 Ideal pra <strong>vendedores</strong>, <strong>times de
                    marketing</strong> e <strong>donos de loja</strong> que não
                querem ficar
                pra trás.</li><br>
            <li>🎯 Um só link, <strong>tudo integrado</strong>, sempre vendendo por
                você.
                Não espere – comece hoje!</li>
        </div>
    </q-page>
</template>

<script setup>

import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted } from 'vue';
const sobreLoja = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
const $q = useQuasar()

async function openPagarMeLinkUrl(planoId) {
    if (!sobreLoja || !sobreLoja.login || !sobreLoja.email) {
        $q.notify({
            color: 'purple-14',
            icon: 'error',
            message: 'Você precisa configurar um login público e um email válido na página de início para adquirir um plano.',
            position: 'top'
        });
        return;
    }
    await api.post('/pagar/criar-link', {
        login: sobreLoja.login,
        plano_id: planoId,
        directLinkEmail: sobreLoja.email,
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