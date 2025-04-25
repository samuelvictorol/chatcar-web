<template>
    <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="store" label="Início" to="/loja" />
            <q-breadcrumbs-el icon="groups" label="Leads" exact />
        </q-breadcrumbs>

        <div class="w100 row justify-between no-wrap q-mb-sm">
            <div class="text-h5 text-left text-bold text-dark">Leads Captados</div>
        </div>

        <div class="w100 q-mt-lg">
            <q-card class="q-pa-md full-height">
                <q-card-section class="q-pa-none">
                    <div class="q-table__container q-table--horizontal-separator" style="overflow-x: auto;">
                        <q-table :rows="leads" :columns="columns" row-key="id" :pagination="{ rowsPerPage: 10 }"
                            :filter="''" class="my-table">
                            <!-- Cabeçalho customizado -->
                            <template v-slot:header="props">
                                <q-tr :props="props">
                                    <q-th v-for="col in props.cols" :key="col.name" :props="props"
                                        class="bg-teal text-white text-bold" style="font-size: 1rem;">
                                        {{ col.label }}
                                    </q-th>
                                </q-tr>
                            </template>
                            <!-- Coluna Vendedor com select sempre visível -->
                            <template v-slot:body-cell-vendedor="props">
                                <q-td :props="props" class="text-center">
                                    <q-select dense outlined v-model="props.row.vendedor" :options="vendedores"
                                        emit-value map-options style="min-width: 160px"
                                        :placeholder="props.row.vendedor === '-' ? 'Vendedor Responsável' : ''" />
                                </q-td>
                            </template>
                            <!-- Coluna Nome com estilo sticky -->
                            <template v-slot:body-cell-name="props">
                                <q-td :props="props" class="sticky-col text-white bg-dark" >
                                    {{ props.value }}
                                </q-td>
                            </template>

                            <!-- Coluna Status -->
                            <template v-slot:body-cell-status="props">
                                <q-td :props="props" class="text-center">
                                    {{ props.row.status }}
                                </q-td>
                            </template>

                            <!-- Coluna Ações -->
                            <template v-slot:body-cell-acoes="props">
                                <q-td :props="props">
                                    <q-btn flat icon="sms" dense color="blue" @click="gerarRelatorio(props.row)" />
                                    <q-btn flat dense icon="assignment" color="secondary"
                                        @click="gerarRelatorio(props.row)" />
                                </q-td>
                            </template>
                        </q-table>
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- Diálogo do Relatório -->
        <q-dialog v-model="showDialog" persistent transition-show="fade" transition-hide="fade">
            <q-card style="width: 100%; max-width: 600px;">
                <q-card-section>
                    <div class="text-h6">Relatório IA - {{ leadSelecionado?.name }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <RelatorioIA :lead="leadSelecionado" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Fechar" color="teal" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script setup>
import { ref } from "vue";
import RelatorioIA from 'components/RelatorioIA.vue';

const leads = ref([
    { id: 1, name: '🟢 José Bueno', vendedor: '-', contato: '61 983314321', status: 'Aguardando contato' },
    { id: 2, name: '🟡 Maria da Silva', vendedor: 'Dagoberto', contato: '61 983314321', status: 'Em progresso' },
    { id: 3, name: '🟡 João da Silva', vendedor: 'Dagoberto', contato: '61 983314321', status: 'Em progresso' },
    { id: 4, name: '🔵 Ana Maria', vendedor: 'Maria', contato: '61 983314321', status: 'Venda Finalizada' },
    { id: 5, name: '🟣 Carlos Alberto', vendedor: 'Maria', contato: '61 983314321', status: 'Atendimento Finalizado' },
]);

const vendedores = [
    { label: 'Dagoberto', value: 'Dagoberto' },
    { label: 'Maria', value: 'Maria' },
    { label: 'João', value: 'João' }
];

const columns = [
    { name: 'name', label: 'Nome', align: 'left', field: 'name' },
    { name: 'vendedor', label: 'Vendedor', align: 'center', field: 'vendedor' },
    { name: 'contato', label: 'Contato', align: 'center', field: 'contato' },
    { name: 'status', label: 'Status', align: 'center', field: 'status' },
    { name: 'acoes', label: 'Ações', align: 'right' },
];

const showDialog = ref(false);
const leadSelecionado = ref(null);

function gerarRelatorio(lead) {
    leadSelecionado.value = lead;
    showDialog.value = true;
}
</script>
<style scoped>
.sticky-col {
    position: sticky;
    left: 0;
    z-index: 2;
}

@media (min-width: 600px) {
    .sticky-col {
        position: relative;
    }
}

.my-table .q-th {
    font-weight: bold;
}
</style>
