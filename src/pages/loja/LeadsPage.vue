<template>
  <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
    <!-- Breadcrumb -->
    <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
      <q-breadcrumbs-el class="text-teal" icon="store" label="Início" to="/me" />
      <q-breadcrumbs-el icon="groups" label="Leads" exact />
    </q-breadcrumbs>

    <!-- Título -->
    <div class="w100 row justify-between no-wrap q-mb-sm">
      <div class="text-h5 text-left text-bold text-dark">Clientes e Leads</div>
    </div>

    <!-- Filtro + Gráfico -->
    <div class="q-mb-md">
      <q-input v-model="filtro" label="Buscar leads" filled dense debounce="300" color="teal" class="w100 bg-grey-1 "
        placeholder="Buscar por nome, telefone ou origem">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div v-if="filtro || statusFilter" class="q-mt-sm row items-center">
        <span class="text-caption text-grey-6">Filtros ativos:</span>
        <q-chip v-if="filtro" class="q-ml-xs" removable removable-icon="close" @remove="filtro = ''" dense outline
          color="teal" text-color="white">
          {{ filtro }}
        </q-chip>
        <q-chip v-if="statusFilter" class="q-ml-xs" removable removable-icon="close" @remove="statusFilter = ''" dense
          outline color="green" text-color="white">
          {{ statusFilter }}
        </q-chip>
      </div>
      <div style="position: relative; width: 100%; height: 300px;" class="q-mt-md">
        <canvas ref="statusChart"></canvas>
      </div>
    </div>

    <!-- Lista de Leads -->
    <div class="q-gutter-md row items-start justify-start">
      <div v-if="loading" class="w100 q-mb-md row no-wrap items-center justify-center">
        <q-spinner-ball color="teal" size="2em" />
        <q-spinner-ball color="teal" size="2em" />
        <q-spinner-ball color="teal" size="2em" />
      </div>

      <div class="w100 q-mr-md" v-if="!loading && leadsFiltrados.length === 0">
        <q-card style="border-bottom: 4px solid #00BFA5; width:100%">
          <q-card-section>
            <div style="font-size: 1.2rem;" class="text-center">🪐 Nenhum lead encontrado</div>
          </q-card-section>
        </q-card>
      </div>

      <q-card id="lead" v-for="lead in leadsFiltrados" :key="lead.id" class="q-pa-md bg-blue-grad-2 text-white"
        :style="'border-bottom: 2px solid ' + (lead.relatorioIA ? '#275DF3' : '#26A69A')">
        <q-card-section>
          <div style="font-size:1.2rem" class="text-bold row items-center">
            <q-icon name="account_circle" class="q-mr-sm" size="md" />
            {{ lead.name }}
          </div>
          <div class="text-caption text-grey-7">
            <strong class="text-teal">{{ lead.status }}</strong> - {{ lead.dataHora }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-mb-sm">
            <div class="row items-center">
              <span class="text-body1 text-grey-1">
                {{ lead.mostrarContato ? lead.contato : mascararTelefone(lead.contato) }}
              </span>
              <q-btn size="sm" color="teal" flat round icon="visibility" class="q-ml-sm"
                @click="lead.mostrarContato = !lead.mostrarContato">
                <q-tooltip>{{ lead.mostrarContato ? 'Ocultar' : 'Mostrar' }}</q-tooltip>
              </q-btn>
            </div>
          </div>

          <q-btn v-if="!lead.relatorioIA" class="q-px-sm" dense icon-right="download" label="Gerar Relatório"
            color="teal" @click="gerarRelatorio(lead)" />
          <q-btn v-else dense class="q-px-sm" icon-right="description" label="Ver Relatório" color="blue-14"
            @click="verRelatorio(lead)" />
        </q-card-section>
      </q-card>
    </div>

    <!-- Diálogo do Relatório -->
    <q-dialog v-model="showDialog" transition-show="fade" transition-hide="fade">
      <div v-if="loading" class="w100 q-py-xl row justify-center items-center">
        <q-spinner-ball color="teal" size="4em" />
        <q-spinner-ball color="teal" size="4em" />
        <q-spinner-ball color="teal" size="4em" />
      </div>
      <q-card v-else style="width: 100%; max-width: 600px;">
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
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import RelatorioIA from 'components/RelatorioIA.vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const $q = useQuasar();
const leads = ref([]);
const loading = ref(false);
const filtro = ref('');
const statusFilter = ref('');
const showDialog = ref(false);
const leadSelecionado = ref(null);

const statusChart = ref(null);
let chartInstance = null;

function mascararTelefone(telefone) {
  if (!telefone || telefone.length < 5) return 'Telefone não informado';
  return telefone.slice(0, 4) + '****' + telefone.slice(-2);
}

function verRelatorio(lead) {
  leadSelecionado.value = lead;
  showDialog.value = true;
}

async function gerarRelatorio(lead) {
  loading.value = true;
  showDialog.value = true;
  if (!lead.relatorioIA) {
    try {
      const loja = JSON.parse(localStorage.getItem('user'));
      const payload = { login: loja.login, token: loja.token, lead: lead.id };
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
      $q.notify({
        icon: 'paid',
        position: 'top',
        type: 'negative',
        message: err.response?.data?.error || 'Erro ao gerar relatorio IA.'
      });
      showDialog.value = false;
    } finally {
      loading.value = false;
    }
  }
  leadSelecionado.value = lead;
}

const statusData = computed(() => {
  const counts = {};
  leads.value.forEach(l => {
    counts[l.status] = (counts[l.status] || 0) + 1;
  });
  return {
    labels: Object.keys(counts),
    counts: Object.values(counts)
  };
});

function createChart() {
  if (!statusChart.value) return;
  if (chartInstance) chartInstance.destroy();

  const ctx = statusChart.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: statusData.value.labels,
      datasets: [{
        data: statusData.value.counts,
        backgroundColor: [
          '#0A6B69', '#2962FF', '#FFCE56', '#4BC0C0', '#36A2EB', '#FF9F40', , '#FFCE56', '#4BC0C0', '#9966FF', '#00A0A0', '#FF9F40',
        ].slice(0, statusData.value.labels.length)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick(evt, elements) {
        if (elements.length) {
          const idx = elements[0].index;
          const clicked = statusData.value.labels[idx];
          statusFilter.value = (statusFilter.value === clicked ? '' : clicked);
        }
      }
    }
  });
}

watch(statusData, () => {
  createChart();
});

onMounted(async () => {
  loading.value = true;
  try {
    const loja = JSON.parse(localStorage.getItem('user'));
    const { data } = await api.post('/buscar-leads', {
      id: loja._id,
      token: loja.token
    });
    leads.value = data.leads.map(lead => ({
      ...lead,
      mostrarContato: false,
      dataHora: lead.dataHora
    }));
    await nextTick();
    createChart();
  } catch (error) {
    console.error('Erro ao carregar leads:', error);
    $q.notify({ type: 'negative', message: 'Erro ao buscar leads!' });
  } finally {
    loading.value = false;
  }
});

const leadsFiltrados = computed(() => {
  const search = filtro.value.trim().toLowerCase();
  return leads.value.filter(lead => {
    const matchesSearch =
      !search ||
      lead.name.toLowerCase().includes(search) ||
      lead.contato.toLowerCase().includes(search) ||
      lead.status.toLowerCase().includes(search);
    const matchesStatus = !statusFilter.value || lead.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});
</script>

<style scoped>
.sticky-col {
  position: sticky;
  left: 0;
  z-index: 2;
}

#lead {
  width: 30%;
}

@media (max-width: 800px) {
  #lead {
    width: 100%;
  }

  .sticky-col {
    position: relative;
  }
}

.my-table .q-th {
  font-weight: bold;
}
</style>
