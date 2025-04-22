<template>
    <q-page class="q-pa-md column items-stretch full-height">

        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-md" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="store" label="Início" exact />
        </q-breadcrumbs>

        <!-- Topo: Imagem e Papel -->
        <div class="row items-center justify-between q-mb-md">
            <q-responsive :ratio="1" style="max-width: 100px">
                <q-img :src="lojaInfo.imgem" alt="Imagem da Loja" class="rounded-borders shadow-1" />
            </q-responsive>
            <div class="text-subtitle1 text-secondary">
                <strong>{{ userRole }}</strong>
            </div>
        </div>

        <!-- Botões -->
        <div class="row q-gutter-sm q-mb-md">
            <q-btn color="primary" icon="sms" icon-right="link" label="Meu Chat" to="/loja/perfil/editar" />
            <q-btn color="secondary" icon="edit" label="Editar Perfil" to="/loja/perfil/editar" />
        </div>

        <!-- Cards em Grid -->
        <q-layout-grid class="q-gutter-md" cols="12" sm-cols="6" md-cols="4" lg-cols="3">

            <!-- Card Perfil -->
            <q-card class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-bold text-primary text-center">Perfil</div>
                    <q-separator class="q-my-sm" />
                    <div class="text-body1"><strong>Nome:</strong> {{ lojaInfo.nome }}</div>
                    <div class="text-body1"><strong>Login:</strong> {{ lojaInfo.login }}</div>
                    <div class="text-body1"><strong>CNPJ:</strong> {{ lojaInfo.cnpj }}</div>
                    <div class="text-body1"><strong>Endereço:</strong> {{ lojaInfo.endereco }}</div>
                    <div class="text-body1"><strong>Telefone:</strong> {{ lojaInfo.telefone }}</div>
                </q-card-section>
            </q-card>

            <!-- Card Vendedores -->
            <q-card class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="row items-center justify-between q-mb-sm">
                        <div class="text-h6 text-bold text-primary">Vendedores</div>
                        <q-btn round dense flat color="secondary" icon="person_add" to="/loja/vendedores/adicionar" />
                    </div>
                    <q-separator />
                    <div v-for="vendedor in vendedores" :key="vendedor.id" class="q-mt-sm text-body1">
                        {{ vendedor.nome }} - {{ vendedor.leadsCount }} leads
                    </div>
                </q-card-section>
            </q-card>

            <!-- Card Leads Recentes -->
            <q-card class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-bold text-primary text-center">Leads Recentes</div>
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
import { ref } from 'vue'

const userRole = ref('Plano Gratuito')

const lojaInfo = ref({
    imgem: 'data:image/png;base64,...',
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
</script>