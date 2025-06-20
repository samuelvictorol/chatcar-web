<template>
  <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
    <!-- Breadcrumb -->
    <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
      <q-breadcrumbs-el class="text-teal" icon="store" label="Início" to="/me" />
      <q-breadcrumbs-el icon="groups" label="Leads" exact />
    </q-breadcrumbs>

    <div class="w100 row justify-between no-wrap q-mb-sm">
      <div class="text-h5 text-left text-bold text-dark">Clientes e Leads</div>
    </div>

    <div class="q-gutter-md row items-start justify-start">
      <q-input v-model="filtro" label="Buscar cliente" filled dense debounce="300" color="teal" class="w100 q-mx-md"
        clearable placeholder="Digite o nome do cliente">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div v-if="loading" class="w100 q-mb-md row no-wrap items-center justify-center">
        <q-spinner-ball color="teal" size="2em" />
        <q-spinner-ball color="teal" size="2em" />
        <q-spinner-ball color="teal" size="2em" />
      </div>
      <div class="w100 q-mr-md" v-if="leadsFiltrados.length === 0 && !loading">
        <q-card class="" style="width: 100%;border-bottom: 4px solid #00BFA5">
          <q-card-section>
            <div style="font-size: 1.2rem;" class="text-center">🪐 Nenhum lead encontrado</div>
          </q-card-section>
        </q-card>
      </div>
      <q-card id="lead" v-for="lead in leadsFiltrados" :key="lead.id" class="q-pa-md"
        :style="'border-bottom:' + '2px solid ' + (lead.relatorioIA ? '#275DF3' : '#26A69A')">
        <q-card-section>
          <div style="font-size:1.2rem" class=" text-bold row items-center">
            <q-icon name="account_circle" class="q-mr-sm" size="md"></q-icon>
            {{ lead.name }}
          </div>
          <div class="text-caption text-grey-8">Recebido em {{ lead.dataHora }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-mb-sm">
            <div class="text-subtitle2 text-grey-7">Contato:</div>
            <div class="row items-center">
              <span class="text-body1 text-dark">
                {{ lead.mostrarContato ? lead.contato : mascararTelefone(lead.contato) }}
              </span>
              <q-btn size="sm" color="teal" flat round icon="visibility" class="q-ml-sm"
                @click="lead.mostrarContato = !lead.mostrarContato">
                <q-tooltip>
                  {{ lead.mostrarContato ? 'Ocultar' : 'Mostrar' }}
                </q-tooltip>
              </q-btn>
            </div>
          </div>

          <q-btn v-if="!lead.relatorioIA" class="q-px-sm" dense icon-right="download" label="Gerar Relatório" glossy
            color="teal" @click="gerarRelatorio(lead)" />
          <q-btn v-else dense class="q-px-sm" icon-right="description" label="Ver Relatório" glossy color="blue-14"
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
import { ref, onMounted } from "vue";
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import RelatorioIA from 'components/RelatorioIA.vue';
import { computed } from 'vue';

const $q = useQuasar();
const leads = ref([]);
const showDialog = ref(false);
const leadSelecionado = ref(null);
const loading = ref(false);
const filtro = ref('');

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
      $q.notify({ icon: 'paid', position: 'top', type: 'negative', message: err.response?.data?.error || 'Erro ao gerar relatorio IA.' });
      showDialog.value = false;
    } finally {
      loading.value = false;
    }
  }
  leadSelecionado.value = lead;
}
onMounted(async () => {
  loading.value = true;
  try {
    const loja = JSON.parse(localStorage.getItem('user'));
    const { data } = await api.post('/buscar-leads', {
      id: loja._id,
      token: loja.token
    });

    leads.value = data.leads.map((lead) => ({
      ...lead,
      mostrarContato: false,
      dataHora: lead.dataHora
    }));

  } catch (error) {
    console.error('Erro ao carregar leads:', error);
    $q.notify({
      type: 'negative',
      message: 'Erro ao buscar leads!'
    });
  } finally {
    loading.value = false;
  }
});

const leadsFiltrados = computed(() => {
  if (!filtro.value) return leads.value;
  return leads.value.filter(lead =>
    lead.name.toLowerCase().includes(filtro.value.toLowerCase())
  );
});

</script>

<style scoped>
.sticky-col {
  position: sticky;
  left: 0;
  z-index: 2;
}

#lead {
    width: 300px;
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
