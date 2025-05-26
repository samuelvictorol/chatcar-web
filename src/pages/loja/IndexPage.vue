<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
// import { Chart, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js'

// Chart.register(BarController, BarElement, CategoryScale, LinearScale)

const userRole = ref('🥇 Plano Anual')
const editando = ref(false)
const lojaInfo = ref(null)
const senha = ref('')
const confirmarSenha = ref('')
const mostrarSenha = ref(false)
const mostrarConfirmarSenha = ref(false)

const storedLoja = JSON.parse(localStorage.getItem('user'))

if (storedLoja) {
    lojaInfo.value = storedLoja
    userRole.value = storedLoja.plano
}

function compartilharChatUrl() {
    const url = `https://chatcar.me/${lojaInfo.value.login}`;
    const texto = `Confira nossa vitrine inteligente: ${url}`;

    if (navigator.share) {
        navigator.share({
            title: 'Chat Estoque',
            text: texto,
            url
        }).catch((err) => {
            console.warn('Erro ao compartilhar:', err);
            Notify.create({
                type: 'warning',
                message: 'Falha ao abrir o menu de compartilhamento.'
            });
        });
    } else {
        navigator.clipboard.writeText(texto).then(() => {
            Notify.create({
                type: 'positive',
                message: 'Link copiado para a área de transferência!'
            });
        }).catch(() => {
            Notify.create({
                type: 'negative',
                message: 'Erro ao copiar o link.'
            });
        });
    }
}


function formatarData(data) {
    if (!data) return ''
    const d = new Date(data)
    const dia = String(d.getDate()).padStart(2, '0')
    const mes = String(d.getMonth() + 1).padStart(2, '0')
    const ano = d.getFullYear()
    return `${dia}/${mes}/${ano}`
}

// const vendedores = ref([
//     { id: 1, nome: 'Amanda', leadsCount: 12 },
//     { id: 2, nome: 'João', leadsCount: 15 },
//     { id: 3, nome: 'Sebastião', leadsCount: 25 },
//     { id: 4, nome: 'Maria', leadsCount: 43 },
// ])

const leadsRecentes = ref([])

// const graficoLeads = ref(null)

const editarLoja = async () => {
    try {
        if (senha.value || confirmarSenha.value) {
            if (senha.value !== confirmarSenha.value) {
                Notify.create({
                    position: 'top',
                    icon: 'lock',
                    type: 'dark',
                    message: 'As senhas não coincidem.'
                })
                return
            }
            lojaInfo.value.password = senha.value // Envia nova senha
        }

        const response = await api.put(`/editar-loja/${lojaInfo.value._id}`, lojaInfo.value)

        Notify.create({
            position: 'top',
            icon: 'edit',
            type: 'teal',
            message: 'Loja editada com sucesso!'
        })
        lojaInfo.value.token = response.data.loja.password
        delete lojaInfo.value.password
        localStorage.setItem('user', JSON.stringify(lojaInfo.value))
        editando.value = false
        senha.value = ''
        confirmarSenha.value = ''
    } catch (error) {
        console.error('Erro ao editar a loja:', error)
        Notify.create({
            type: 'negative',
            message: 'Erro ao editar a loja. Tente novamente.'
        })
    }
}

onMounted(async () => {
    await api.get('/leads-recentes/' + storedLoja.login).then(response => {
        leadsRecentes.value = response.data.leads
    })
    // const ctx = graficoLeads.value.getContext('2d')
    //     new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: vendedores.value.map(v => v.nome),
    //             datasets: [{
    //                 label: 'Leads',
    //                 data: vendedores.value.map(v => v.leadsCount),
    //                 backgroundColor: ['#44B1A7', '#275CF0']
    //             }]
    //         },
    //         options: {
    //             responsive: true,
    //             plugins: {
    //                 legend: { display: false }
    //             },
    //             scales: {
    //                 y: { beginAtZero: true }
    //             }
    //         }
    //     })
})
</script>


<template>
    <q-page class="q-pa-md column items-stretch full-height">

        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-md" separator-icon="chevron_right">
            <q-breadcrumbs-el color="teal" icon="store" label="Início" exact />
        </q-breadcrumbs>

        <!-- Botões -->
        <strong class="text-teal">{{ editando ? 'Editando Perfil' : userRole }}</strong><br />
        <div class="row q-gutter-sm q-mb-md" style="position: relative">
            <q-btn color="teal" icon="sms" icon-right="directions_car" label="Chat Estoque" v-if="!editando" glossy
                :to="'/' + lojaInfo.login" />
            <q-btn color="blue-14" icon="currency_exchange" label="Planos" glossy to="/loja/planos" v-if="!editando" />
            <q-btn v-if="!editando" color="orange-14" glossy icon="edit" label="Editar Perfil"
                @click="editando = true" />
            <q-btn v-else color="green" glossy icon="save" label="Salvar Alterações" @click="editarLoja" class="q-py-lg" style="position: fixed; bottom:0px;left:-8px;z-index: 999; width: 100vw" />
            <q-btn v-if="editando" color="negative" glossy icon="cancel" label="Cancelar" @click="editando = false" style="position: fixed; top:42px;left:-8px;z-index: 999; width: 100vw" />
        </div>

        <!-- Cards -->
        <q-layout-grid class="q-gutter-md" cols="12" sm-cols="6" md-cols="4" lg-cols="3">

            <!-- Card Perfil -->
            <q-card class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-bold text-secondary row w100 no-wrap justify-between text-center">
                        Perfil
                        <q-img :src="lojaInfo.img_url" alt="Imagem da Loja" height="80px" width="80px"
                            class="rounded-borders shadow-1" />
                    </div>

                    <q-separator class="q-my-sm" />

                    <div class="text-body1">
                        <strong>Nome: </strong>
                        <template v-if="!editando">{{ lojaInfo.nome }}</template>
                        <q-input color="teal" v-else v-model="lojaInfo.nome" dense />
                    </div>

                    <div class="text-body1">
                        <strong>CNPJ: </strong>
                        <template v-if="!editando">{{ lojaInfo.cnpj }}</template>
                        <q-input maxlength="18" color="teal" v-else v-model="lojaInfo.cnpj" dense />
                    </div>
                    <div class="text-body1">
                        <strong>Redes Sociais: </strong>
                        <template v-if="!editando">{{ lojaInfo.site }}</template>
                        <q-input color="teal" v-else v-model="lojaInfo.site" placeholder="Use este campo para adicionar suas redes sociais e informações adicionais" dense type="textarea" />
                    </div>
                    <div class="text-body1" v-if="editando"> 
                        <strong>Email: </strong>
                        <q-input color="teal"  v-model="lojaInfo.email" dense />
                    </div>

                    <div class="text-body1">
                        <strong>{{ !editando ? 'ChatUrl: ' : 'Login: ' }} </strong>
                        <template v-if="!editando">{{ 'chatcar.me/' + lojaInfo.login }}</template>
                        <template v-if="!editando"><br><q-btn label="compartilhar" @click="compartilharChatUrl" dense
                                icon-right="share" class="q-my-sm" color="teal"></q-btn></template>
                        <q-input color="teal" v-else v-model="lojaInfo.login" dense />
                    </div>
                    <div v-if="editando" class="text-body1">
                        <strong>Nova Senha: </strong>
                        <q-input dense color="teal" :type="mostrarSenha ? 'text' : 'password'" v-model="senha"
                            placeholder="Digite a nova senha">
                            <template v-slot:append>
                                <q-icon :name="mostrarSenha ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                    @click="mostrarSenha = !mostrarSenha" />
                            </template>
                        </q-input>
                    </div>

                    <div v-if="editando" class="text-body1">
                        <strong>Confirmar Nova Senha: </strong>
                        <q-input dense color="teal" :type="mostrarConfirmarSenha ? 'text' : 'password'"
                            v-model="confirmarSenha" placeholder="Confirme a nova senha">
                            <template v-slot:append>
                                <q-icon :name="mostrarConfirmarSenha ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer" @click="mostrarConfirmarSenha = !mostrarConfirmarSenha" />
                            </template>
                        </q-input>
                    </div>
                    <div class="text-body1">
                        <strong>Contato: </strong>
                        <template v-if="!editando">{{ lojaInfo.contato }}</template>
                        <q-input color="teal" v-else v-model="lojaInfo.contato" mask="(##) #####-####"  dense />
                    </div>

                    <div class="text-body1" v-if="editando">
                        <strong>Imagem de Perfil: </strong>
                        <q-input color="teal" v-model="lojaInfo.img_url" dense />
                    </div>

                    <div class="text-body1">
                        <strong>Localização: </strong>
                        <template v-if="!editando">{{ lojaInfo.localizacao }}</template>
                        <q-input color="teal" v-else v-model="lojaInfo.localizacao" dense />
                    </div>

                    <div class="text-body1" v-if="!editando">
                        <strong>Vencimento:</strong>
                        Plano ativo até
                        <strong>{{ formatarData(lojaInfo.plano_expira) }}</strong>
                    </div>

                </q-card-section>
            </q-card>

            <!-- Card Leads por Vendedor -->
            <!-- <q-card class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-bold text-secondary text-center">Leads por Vendedor</div>
                    <q-separator class="q-my-sm" />
                    <div style="position: relative; height: 250px; width: 100%;">
                        <canvas ref="graficoLeads" style="width: 100%; height: 100%"></canvas>
                    </div>
                </q-card-section>
            </q-card> -->

            <!-- Card Vendedores -->
            <!-- <q-card class="q-pa-sm full-height" flat bordered>
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
            </q-card> -->

            <!-- Card Leads Recentes -->
            <q-card v-if="!editando" class="q-pa-sm full-height" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-bold text-secondary text-center">Clientes Recentes</div>
                    <q-separator class="q-my-sm" />
                    <div v-for="lead in leadsRecentes" :key="lead.id" class="q-mb-xs text-body1">
                        ✨ {{ lead.nome }} - {{ lead.data }}
                    </div>
                </q-card-section>
            </q-card>

        </q-layout-grid>
        <div class="w100 q-py-lg"></div>
    </q-page>
</template>
