<template>
  <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
    <!-- Breadcrumb -->
    <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="store" label="Início" to="/loja" />
      <q-breadcrumbs-el icon="groups" label="Leads" exact />
    </q-breadcrumbs>

    <div class="w100 row justify-between no-wrap q-mb-sm">
      <div class="text-h5 text-left text-bold text-dark">Clientes e Leads</div>
    </div>

    <div class="w100 q-mt-lg">
      <q-card class="q-pa-md full-height">
        <q-card-section class="q-pa-none">
          <div class="q-table__container q-table--horizontal-separator" style="overflow-x: auto;">
            <q-table :rows="leads" :columns="columns" row-key="id" :pagination="{ rowsPerPage: 10 }" :filter="''"
              class="my-table">
              <!-- Cabeçalho -->
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th v-for="col in props.cols" :key="col.name" :props="props" class="bg-teal text-white text-bold"
                    style="font-size: 1rem;">
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body-cell-name="props">
                <q-td :props="props" class="sticky-col text-white bg-dark">
                  <span>
                    {{ formatBigName(props.row.name) }}
                    <q-tooltip anchor="top middle" self="bottom middle">
                      {{ props.row.name }}
                    </q-tooltip>
                  </span>
                </q-td>
              </template>
              <template v-slot:body-cell-contato="props">
                <q-td :props="props" class="text-center">
                  {{ props.row.contato }}
                </q-td>
              </template>
              <template v-slot:body-cell-acoes="props">
                <q-td :props="props" class="text-center">
                  <q-btn v-if="!props.row.relatorioIA" dense icon-right="download" label="gerar relatório" glossy
                    color="green" @click="gerarRelatorio(props.row)" />
                  <q-btn v-else dense icon-right="description" label="ver relatório" glossy color="secondary"
                    @click="verRelatorio(props.row)" />
                </q-td>
              </template>
            </q-table>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Diálogo do Relatório -->
    <q-dialog v-model="showDialog" persistent transition-show="fade" transition-hide="fade">
      <div v-if="loading" class="w100 q-py-xl row justify-center items-center">
        <q-spinner-ball color="teal" size="4em" />
        <q-spinner-ball color="teal" size="4em" />
        <q-spinner-ball color="teal" size="4em" />
      </div>
      <q-card v-else style="width: 100%; max-width: 600px;">
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
import { ref, onMounted } from "vue";
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios'; // ajuste o caminho se precisar
import RelatorioIA from 'components/RelatorioIA.vue';

const $q = useQuasar();

const leads = ref([]);
const loading = ref(false);
const vendedores = [
  { label: 'Dagoberto', value: 'Dagoberto' },
  { label: 'Maria', value: 'Maria' },
  { label: 'João', value: 'João' }
];
const columns = [
  { name: 'name', label: 'Nome Cliente', align: 'left', field: 'name' },
  //   { name: 'vendedor', label: 'Vendedor', align: 'center', field: 'vendedor' },
  { name: 'contato', label: 'Contato', align: 'center', field: 'contato' },
  // { name: 'status', label: 'Status', align: 'center', field: 'status' },
  { name: 'acoes', label: 'Ações', align: 'center' }
];

const showDialog = ref(false);
const leadSelecionado = ref(null);

async function gerarRelatorio(lead) {
  loading.value = true
  showDialog.value = true;
  if (!lead.relatorioIA) {
    try {
      const loja = JSON.parse(localStorage.getItem('user'));
      const payload = {
        login: loja.login,
        token: loja.token,
        lead: lead.id
      };

      const { data } = await api.post('/gerar-relatorio', payload);

      lead.relatorioIA = data.relatorio;

      $q.notify({
        color: 'teal',
        icon: 'directions_car',
        position: 'top',
        message: 'Relatório gerado com sucesso!'
      });

    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
      return $q.notify({
        type: 'negative',
        message: 'Erro ao gerar relatório!'
      });
    } finally {
        loading.value = false
    }
  }

  leadSelecionado.value = lead;
}


function confirmarContato(row) {
  $q.dialog({
    title: 'Status Atendimento',
    message: 'Deseja marcar este lead como "Contato Efetuado"?',
    cancel: true,
    persistent: true,
    ok: { color: 'teal', glossy: true },
    cancel: { color: 'teal', flat: true }
  }).onOk(() => {
    row.status = 'Contato Efetuado';
    $q.notify({
      color: 'teal',
      icon: 'phone',
      position: 'top',
      message: 'Status atualizado para Contato Efetuado'
    });
  });
}

function formatBigName(str) {
  if (str.length > 12) {
    return str.slice(0, 12) + '...';
  }
  return str;
}

// Buscando os leads no mounted
onMounted(async () => {
  try {
    const loja = JSON.parse(localStorage.getItem('user'));

    const { data } = await api.post('/buscar-leads', {
      id: loja._id,
      token: loja.token
    });

    leads.value = data.leads;
  } catch (error) {
    console.error('Erro ao carregar leads:', error);
    $q.notify({
      type: 'negative',
      message: 'Erro ao buscar leads!'
    });
  }
});
function verRelatorio(lead) {
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
