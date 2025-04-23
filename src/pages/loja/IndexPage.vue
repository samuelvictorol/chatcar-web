<template>
    <q-page class="q-pa-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-md" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="store" label="Início" exact />
        </q-breadcrumbs>
        <!-- Botões -->
        <strong class="text-teal">{{ userRole }}</strong><br>
        <div class="row q-gutter-sm q-mb-md">
            <q-btn color="secondary" icon="sms" icon-right="link" label="Meu Chat" glossy to="/free-trial" />
            <q-btn color="orange-14" glossy icon="edit" label="Editar Perfil" to="/loja/perfil/editar" />
        </div>

        <!-- Cards em Grid -->
        <q-layout-grid class="q-gutter-md" cols="12" sm-cols="6" md-cols="4" lg-cols="3">

            <!-- Card Perfil -->
            <q-card class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-bold text-secondary row w100 no-wrap justify-between text-center">Perfil<q-img :src="lojaInfo.imgem" alt="Imagem da Loja" height="80px" width="80px"
                        class="rounded-borders shadow-1" /></div>
                    
                    <q-separator class="q-my-sm" />
                    <div class="text-body1"><strong>Nome:</strong> {{ lojaInfo.nome }}</div>
                    <div class="text-body1"><strong>Login:</strong> {{ lojaInfo.login }}</div>
                    <div class="text-body1"><strong>CNPJ:</strong> {{ lojaInfo.cnpj }}</div>
                    <div class="text-body1"><strong>Endereço:</strong> {{ lojaInfo.endereco }}</div>
                    <div class="text-body1"><strong>Telefone:</strong> {{ lojaInfo.telefone }}</div>
                </q-card-section>
            </q-card>

            <!-- Novo Card com Gráfico -->
            <q-card class="q-pa-sm full-height" flat bordered style="">
                <q-card-section>
                    <div class="text-h6 text-bold text-secondary text-center">Leads por Vendedor</div>
                    <q-separator class="q-my-sm" />
                    <div style="position: relative; height: 250px; width: 100%;">
                        <canvas ref="graficoLeads" style="width: 100%; height: 100%"></canvas> <!-- Ajuste no canvas -->
                    </div>
                </q-card-section>
            </q-card>


            <!-- Card Vendedores (sem leads) -->
            <q-card class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="row items-center justify-between q-mb-sm">
                        <div class="text-h6 text-bold text-secondary">Vendedores</div>
                        <q-btn round dense flat color="secondary" icon="person_add" to="/loja/vendedores/adicionar" />
                    </div>
                    <q-separator />
                    <div v-for="vendedor in vendedores" :key="vendedor.id" class="q-mt-sm text-body1">
                        {{ vendedor.nome }}
                    </div>
                </q-card-section>
            </q-card>

            <!-- Card Leads Recentes -->
            <q-card class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-bold text-secondary text-center">Leads Recentes</div>
                    <q-separator class="q-my-sm" />
                    <div v-for="lead in leadsRecentes" :key="lead.id" class="q-mb-xs text-body1">
                        ✨ {{ lead.nome }} - {{ lead.data }}
                    </div>
                </q-card-section>
            </q-card>

        </q-layout-grid>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js'

// Registra os componentes necessários do Chart.js
Chart.register(BarController, BarElement, CategoryScale, LinearScale)

// Dados iniciais
const userRole = ref('Plano Gratuito')

const lojaInfo = ref({
    imgem: '/logo.jpg',
    nome: 'Minha Loja',
    login: 'loja123',
    cnpj: '12.345.678/0001-99',
    endereco: 'Rua Exemplo, 123',
    telefone: '(11) 91234-5678'
})

const vendedores = ref([
    { id: 1, nome: 'João', leadsCount: 12 },
    { id: 2, nome: 'Maria', leadsCount: 8 }
])

const leadsRecentes = ref([
    { id: 1, nome: 'Carlos', data: '2025-04-20' },
    { id: 2, nome: 'Ana', data: '2025-04-21' }
])

// Referência ao canvas do gráfico
const graficoLeads = ref(null)

onMounted(() => {
    // Garantindo que o gráfico seja desenhado após o componente ser montado
    const ctx = graficoLeads.value.getContext('2d')

    // Criando o gráfico com Chart.js
    new Chart(ctx, {
        type: 'bar',  // Gráfico de barras
        data: {
            labels: vendedores.value.map(v => v.nome),
            datasets: [{
                label: 'Leads',
                data: vendedores.value.map(v => v.leadsCount),
                backgroundColor: ['#2196f3', '#ff9800']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
})

</script>
