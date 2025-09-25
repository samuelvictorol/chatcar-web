    <script setup>
    import { ref, onMounted } from 'vue'
    import { api } from 'src/boot/axios'
    import { Notify } from 'quasar'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function exportarPagamentosPDF() {
  const doc = new jsPDF()
  const headers = [['Data', 'ID PagarMe', 'Loja', 'Email', 'Telefone', 'Plano Expira']]

  const rows = pagamentos.value.map(p => [
    p.criado_em,
    p.pagarme_payment_id,
    `${p.loja_nome} (${p.loja_login})`,
    p.loja_email,
    p.loja_telefone || 'Não informado',
    p.plano_expira
  ])

  autoTable(doc, {
    head: headers,
    body: rows,
  })

  doc.save('relatorio_pagamentos.pdf')
}

    const userRole = ref('🥇 Plano Anual')
    const editando = ref(false)
    const lojaInfo = ref(null)
    const senha = ref('')
    const confirmarSenha = ref('')
    const mostrarSenha = ref(false)
    const mostrarConfirmarSenha = ref(false)

    const storedLoja = JSON.parse(localStorage.getItem('user'))
    const pagamentos = ref([])
    const dialogPagamentos = ref(false)

    async function get_pagamentos(params) {
        try {
            const response = await api.get('/pagar/get_pagamentos')
            pagamentos.value = response.data.reverse()
            dialogPagamentos.value = true
        } catch (error) {
            console.error('Erro ao buscar pagamentos:', error)
            Notify.create({
                type: 'negative',
                message: 'Erro ao buscar pagamentos. Tente novamente.'
            })
        }
    }

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
        <q-page class="q-pa-md bg-grey-4 column items-stretch full-height">

            <!-- Breadcrumb -->
            <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-md" separator-icon="chevron_right">
                <q-breadcrumbs-el color="teal" icon="store" label="Início" exact />
            </q-breadcrumbs>

            <!-- Botões -->
            <strong class="text-teal">{{ editando ? '' : userRole }}</strong><br />
            <div class="row q-gutter-sm q-mb-md" style="position: relative">
                <q-btn icon="sms" class="bg-blue-grad-2 text-white" label="Meu ChatVitrine" v-if="!editando"
                    :to="'/' + lojaInfo.login" />
                <q-btn icon="currency_exchange" class="bg-blue-grad-2 text-white" label="Renovar" to="/me/planos" v-if="!editando" />
                <q-btn v-if="!editando" class="bg-blue-grad-2 text-white" icon="edit" label="Editar Perfil"
                    @click="editando = true" />
                <q-btn v-else icon="save" label="Salvar Alterações" @click="editarLoja" class="header-2 text-white q-py-lg"
                    style="position: fixed; bottom:0px;left:-8px;z-index: 999; width: 100vw" />
                <q-btn v-if="editando" color="grey-7" icon="cancel" label="Cancelar" @click="editando = false"
                    style="position: fixed; top:42px;left:-8px;z-index: 999; width: 100vw; border-radius: 0px;" />
            </div>

            <!-- Cards -->
            <q-layout-grid class="q-gutter-md" cols="12" sm-cols="6" md-cols="4" lg-cols="3">

                <!-- Card Leads Recentes -->
                <q-card v-if="!editando" class="q-pa-sm full-height bg-blue-grad-2 text-white" flat bordered>
                    <q-card-section>
                        <div class="text-h6 text-bold text-secondary text-center"><q-btn class="header-2 text-white shadow-2"    label="Clientes Recentes" to="/me/leads" icon="groups"></q-btn></div>
                        <q-separator class="q-my-sm" />
                        <div v-for="lead in leadsRecentes" :key="lead.id" class="q-mb-xs text-body1">
                            ✨ {{ lead.nome }} - {{ lead.data }}
                        </div>
                    </q-card-section>
                </q-card>
                 <q-card class="q-pa-sm full-height" flat bordered>
                    <q-card-section>
                        <div class="text-h6 text-bold text-secondary row w100 no-wrap justify-between text-center">
                            {{ editando ? 'Editando Perfil' : 'Meu Perfil' }}
                            <q-img :src="lojaInfo.img_url" alt="Imagem da Loja" height="80px" width="80px"
                                class="rounded-borders shadow-1" />
                        </div>
                        
                        <div class="text-body1 shadow-1 bg-grey-2 q-mb-sm q-pa-xs rounded-borders" style="border-bottom: 2px solid teal;">
                            <strong class="text-teal">{{ !editando ? 'Meu Link: ' : 'Login: ' }} </strong><br>
                            <template v-if="!editando">{{ 'chatcar.me/' + lojaInfo.login }}</template>
                            <template v-if="!editando"><q-btn @click="compartilharChatUrl" dense
                                    icon-right="share" class="q-ml-sm q-my-sm" color="teal"></q-btn></template>
                            <q-input color="teal" v-else placeholder="chatcar.me/seulogin" v-model="lojaInfo.login" dense>
                                <template v-slot:prepend>
                                    <q-icon name="account_circle" color="teal" />
                                </template>
                            </q-input>
                        </div>
                        <div class="text-body1">
                            <strong>Nome: </strong>
                            <template v-if="!editando">{{ lojaInfo.nome }}</template>
                            <q-input color="teal" v-else v-model="lojaInfo.nome" dense>
                                <template v-slot:prepend>
                                    <q-icon name="store" color="teal" />
                                </template>
                            </q-input>
                        </div>
                        <div class="text-body1" v-if="editando">
                            <strong>Imagem de Perfil: </strong>
                            <q-input color="teal" placeholder="Link da imagem" v-model="lojaInfo.img_url" dense>
                                <template v-slot:prepend>
                                    <q-icon name="image" color="teal" />
                                </template>
                            </q-input>
                        </div>
                        <div class="text-body1">
                            <strong>CNPJ: </strong>
                            <template v-if="!editando">{{ lojaInfo.cnpj }}</template>
                            <q-input maxlength="18" color="teal" v-else v-model="lojaInfo.cnpj" dense>
                                <template v-slot:prepend>
                                    <q-icon name="business" color="teal" />
                                </template>
                            </q-input>
                        </div>
                        <div class="text-body1">
                            <strong>Descrição: </strong>
                            <template v-if="!editando">{{ lojaInfo.site }}</template>
                            <q-input color="teal" v-else v-model="lojaInfo.site"
                                placeholder="Use este campo para adicionar suas redes sociais e informações adicionais como formas de pagamentos, contatos, condições, etc."
                                dense type="textarea">
                                <template v-slot:prepend>
                                    <q-icon name="description" color="teal" />
                                </template>
                            </q-input>
                        </div>
                        <div class="text-body1" v-if="editando">
                            <strong>Email: </strong>
                            <q-input color="teal" v-model="lojaInfo.email" dense>
                                <template v-slot:prepend>
                                    <q-icon name="email" color="teal" />
                                </template>
                            </q-input>
                        </div>
                        <div v-if="editando" class="text-body1">
                            <strong>Nova Senha: </strong>
                            <q-input dense color="teal" :type="mostrarSenha ? 'text' : 'password'" v-model="senha"
                                placeholder="Digite a nova senha">
                                <template v-slot:prepend>
                                    <q-icon name="lock" color="teal" />
                                </template>
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
                                <template v-slot:prepend>
                                    <q-icon name="lock" color="teal" />
                                </template>
                                <template v-slot:append>
                                    <q-icon :name="mostrarConfirmarSenha ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer" @click="mostrarConfirmarSenha = !mostrarConfirmarSenha" />
                                </template>
                            </q-input>
                        </div>
                        <div class="text-body1">
                            <strong>Contato: </strong>
                            <template v-if="!editando">{{ lojaInfo.contato }}</template>
                            <q-input color="teal" v-else v-model="lojaInfo.contato" mask="(##) #####-####" dense>
                                <template v-slot:prepend>
                                    <q-icon name="phone" color="teal" />
                                </template>
                            </q-input>
                        </div>

                        <div class="text-body1">
                            <strong>Localização: </strong>
                            <template v-if="!editando">{{ lojaInfo.localizacao }}</template>
                            <q-input color="teal" v-else v-model="lojaInfo.localizacao" densee>
                                <template v-slot:prepend>
                                    <q-icon name="place" color="teal" />
                                </template>
                            </q-input>
                        </div>

                        <div class="text-body1" v-if="!editando">
                            <strong>Vencimento:</strong>
                            Plano ativo até
                            <strong>{{ formatarData(lojaInfo.plano_expira) }}</strong>
                        </div>
                    </q-card-section>
                    <q-separator v-if="!editando" class="q-my-sm" />
                        <div v-if="editando" class="w100 q-py-md text-center">
                            Os seus dados <strong>não sensíveis</strong> serão utilizados pela I.A durante a interação com seu cliente.<br>Preencha os campos abaixo com informações atualizadas:
                            <br>
                        </div>
                        <q-separator v-if="!editando" class="q-my-sm" />
                        <div v-if="editando" class="w100 q-py-md text-center">
                            Os seus dados <strong>não sensíveis</strong> serão utilizados pela I.A durante a interação com seu cliente.<br>Preencha os campos abaixo com informações atualizadas:
                            <br>
                        </div>
                </q-card>
            </q-layout-grid>
            <div class="w100">
                            <q-btn class="q-mt-xl" color="" icon="admin_panel_settings" v-if="!editando && lojaInfo.login.toLowerCase() === 'jatoveiculos'"
                    glossy @click="get_pagamentos()" /> 
            </div>
<q-dialog v-model="dialogPagamentos"  full-width max-width="800px">
  <q-card class="bg-white text-black" style="max-height: 90vh; display: flex; flex-direction: column;">
    
    <!-- Cabeçalho fixo -->
    <q-card-section class="text-h6 text-bold text-secondary text-center bg-grey-2 sticky-top z-top">
      Pagamentos
    </q-card-section>

    <q-separator />

    <!-- Conteúdo scrollável -->
    <q-card-section class="scroll" style="flex: 1; overflow-y: auto;">
      <div v-if="pagamentos.length === 0" class="text-center text-grey-7">
        Nenhum pagamento encontrado.
      </div>
      <div v-for="(pagamento, index) in pagamentos" :key="index"
           class="q-mb-md q-pa-sm bg-grey-2 rounded-borders">
        <div class="text-body2"><strong>Data:</strong> {{ pagamento.criado_em }}</div>
        <div class="text-body2"><strong>ID PagarMe:</strong> {{ pagamento.pagarme_payment_id }}</div>
        <div class="text-body2"><strong>Loja:</strong> {{ pagamento.loja_nome }} ({{ pagamento.loja_login }})</div>
        <div class="text-body2"><strong>Email:</strong> {{ pagamento.loja_email }}</div>
        <div class="text-body2"><strong>Telefone:</strong> {{ pagamento.loja_telefone || 'Não informado' }}</div>
        <div class="text-body2"><strong>Plano expira em:</strong> {{ pagamento.plano_expira }}</div>
      </div>
    </q-card-section>

    <q-separator />

    <!-- Rodapé fixo -->
    <q-card-actions align="between" class="bg-grey-2 q-px-md q-py-sm">
      <q-btn flat label="Exportar PDF" icon="download" color="primary" @click="exportarPagamentosPDF" />
      <q-btn color="teal" label="Fechar" @click="dialogPagamentos = false" />
    </q-card-actions>
  </q-card>
</q-dialog>

            <div class="w100 q-py-lg"></div>
        </q-page>
    </template>
