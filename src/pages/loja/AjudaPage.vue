<template>
    <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 q-mb-md" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="store" label="Início" to="/loja" />
            <q-breadcrumbs-el icon="info" label="Ajuda" />
        </q-breadcrumbs>

        <!-- Título da Página -->
        <div class="row items-center justify-between q-mb-md">
            <div class="text-h5 text-bold text-dark">Como Utilizar a IA para Analisar Leads</div>
        </div>

        <!-- Conteúdo -->
        <q-card flat bordered>
            <q-card-section class="q-pa-lg">
                <div class="text-body1 q-mb-md">
                    A funcionalidade de <strong>Relatório IA</strong> permite que você visualize uma análise inteligente
                    de cada lead captado pela sua equipe. Siga o passo a passo abaixo para gerar o relatório com
                    inteligência artificial:
                </div>

                <!-- Etapas -->
                <div class="q-gutter-y-md">
                    <q-timeline color="primary" layout="dense">

                        <q-timeline-entry title="1. Acesse a lista de Leads" icon="groups">
                            Vá até o menu <q-icon name="groups" class="q-mx-xs" /> <strong>Leads</strong> no seu painel
                            de controle.
                        </q-timeline-entry>

                        <q-timeline-entry title="2. Localize o lead desejado" icon="search">
                            Use a tabela para encontrar o lead que você deseja analisar. Você pode utilizar filtros ou
                            rolar a tabela.
                        </q-timeline-entry>

                        <q-timeline-entry title="3. Clique no botão de IA" icon="assignment">
                            Ao lado do lead, clique no botão <q-icon name="assignment" class="q-mx-xs" /> para abrir o
                            relatório gerado por inteligência artificial.
                        </q-timeline-entry>

                        <q-timeline-entry title="4. Visualize o Relatório" icon="description">
                            Um relatório detalhado será exibido com base nos dados captados do lead, fornecendo insights
                            úteis para sua abordagem.
                        </q-timeline-entry>

                        <q-timeline-entry title="5. Feche o relatório" icon="close">
                            Após a leitura, clique em <q-icon name="close" class="q-mx-xs" /> <strong>Fechar</strong>
                            para retornar à lista de leads.
                        </q-timeline-entry>

                    </q-timeline>
                </div>
            </q-card-section>
        </q-card>

        <!-- Sugestão de Suporte -->
        <q-card flat bordered class="q-mt-lg">
            <q-card-section class="q-pa-lg">
                <div class="text-subtitle1 text-bold q-mb-sm">Precisa de ajuda?</div>
                <div class="text-body2">
                    Se você tiver dúvidas ou dificuldades com o uso da IA, entre em contato com nosso time de suporte
                    pelo WhatsApp ou envie um e-mail para <strong>suporte@midnighttickets.com</strong>.
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup>
// Página estática, sem necessidade de lógica por enquanto
</script>