<template>
    <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="store" label="Início" exact />
        </q-breadcrumbs>

        <div class="text-subtitle1 text-grey-14 w100 row justify-between no-wrap q-mb-md"><img :src="lojaInfo.imgem" alt="Imagem da Loja" class="rounded-borders q-mb-sm shadow-1" width="100" height="100" /><div><strong>{{ userRole }}</strong> </div></div>
        
        <div class="w100 row rounded-borders justify-center align-start">
            <q-card class="w100  q-px-sm q-mb-md" flat bordered>
                <q-card-section class="q-pa-sm">
                    <div class="text-h5 text-center text-bold text-white">Perfil</div>
                    <q-separator class="bg-grey q-my-sm" />
                    <div class="text-h6 text-left q-mb-xs">Nome: {{ lojaInfo.nome }}</div>
                    <div class="text-h6 text-left q-mb-xs">Login: {{ lojaInfo.login }}</div>
                    <div class="text-h6 text-left q-mb-xs">CNPJ: {{ lojaInfo.cnpj }}</div>
                    <div class="text-h6 text-left q-mb-xs">Endereço: {{ lojaInfo.endereco }}</div>
                    <div class="text-h6 text-left q-mb-xs">Telefone: {{ lojaInfo.telefone }}</div>

                </q-card-section>
            </q-card>
            <q-separator class="q-mb-md w100" />
            <div class="w100 row rounded-borders justify-center align-start">
                <q-card class="col-12 col-sm-6 col-md-4 col-lg-3 q-mr-sm q-px-sm q-mb-md" flat bordered>
                    <q-card-section class="q-pa-sm">
                        <div class="w100 row no-wrap justify-between items-center">
                            <div class="text-h5 text-center text-bold text-white">Vendedores</div>
                            <q-btn color="green" icon-right="person_add" label="Adicionar" glossy to="/loja/vendedores/adicionar" />
                        </div>
                        <q-separator class="q-my-sm bg-grey " />
                        <div v-for="vendedor in vendedores" :key="vendedor.id" class="text-h6 text-left q-mb-xs">
                            {{ vendedor.nome }} - {{ vendedor.leadsCount }} leads
                        </div>
                    </q-card-section>
                </q-card>
                <q-card class="col-12 col-sm-6 col-md-4 col-lg-3  q-mr-sm q-mb-md" flat bordered>
                    <q-card-section class="q-pa-sm">
                        <div class="text-h5 text-center text-bold text-white">Leads Recentes</div>
                        <q-separator class="q-my-sm bg-grey " />
                        <div v-for="lead in leadsRecentes" :key="lead.id" class="text-h6 text-left q-px-sm q-mb-xs">
                            ✨ {{ lead.nome }} - {{ lead.data }}
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';

const userRole = ref('Plano Gratuito');

const lojaInfo = ref({
    imgem: 'data:image/png;base64,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',
    nome: 'PRIMAVIA LTDA',
    login: 'primavia',
    cnpj: '12.345.678/0001-90',
    endereco: 'Rua Exemplo, 123 - Centro - Cidade - Estado',
    telefone: '(11) 98765-4321',
});

const vendedores = ref([
    {
        id: 1,
        nome: 'Dagoberto Santos',
        leadsCount: 12,
    },
    {
        id: 2,
        nome: 'Maria Oliveira',
        leadsCount: 21,
    },
]);

const leadsRecentes = ref([
    {
        id: 1,
        nome: 'João Silva',
        data: '21/04/2025',
    },
    {
        id: 2,
        nome: 'Maria Oliveira',
        data: '22/04/2025',
    },
    {
        id: 3,
        nome: 'Carlos Santos',
        data: '23/04/2025',
    },
    {
        id: 4,
        nome: 'Ana Costa',
        data: '24/04/2025',
    },
    {
        id: 5,
        nome: 'Lucas Pereira',
        data: '25/04/2025',
    },
]);

</script>

<style scoped>
.hoverable-card {
    transition: transform 0.2s;
    min-height: 150px;
    /* altura mínima para mobile */
}

.hoverable-card:hover {
    transform: scale(1.03);
}

.q-card {
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.73));
    background-color: #141414dc;
    backdrop-filter: blur(4px);
    border-radius: 8px;
    border-bottom: 3px solid #424242;
    cursor: pointer;
    color: #fff!important;
}
</style>