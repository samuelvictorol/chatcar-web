<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="q-pa-md bg-dark">
                <div v-if="!logado" class="q-gutter-y-md" style="max-width: 400px; margin: auto">
                    <h3 class="text-center text-white">Admin</h3>
                    <q-input color="teal" v-model="form.login" label="Login" outlined
                        class="bg-teal-1 rounded-borders" />
                    <q-input color="teal" v-model="form.senha" label="Senha" type="password" outlined
                        class="bg-teal-1 rounded-borders" />
                    <q-btn label="Entrar" glossy class="w100" color="teal" @click="fazerLogin" />
                </div>

                <div v-else>
                    <h4 class="text-center q-mb-lg text-white">Painel do Administrador</h4>
                    <div class="q-gutter-md row justify-center">
                        <q-btn label="Criar Lojista" color="positive" glossy icon="add" @click="dialogCriarLojista = true" />
                        <q-btn :disabled="true" label="Buscar Lojista" color="teal" glossy icon="search" @click="buscarDialog = true" />
                    </div>

                    <q-dialog v-model="buscarDialog">
                        <q-card style="min-width: 350px">
                            <q-card-section>
                                <div class="text-h6">Buscar Lojista</div>
                            </q-card-section>
                            <q-card-section>
                                <q-input v-model="buscaLogin" label="Login do Lojista" color="teal" />
                            </q-card-section>
                            <q-card-actions align="right">
                                <q-btn flat label="Cancelar" v-close-popup color="teal" />
                                <q-btn label="Buscar" icon-right="search" glossy color="teal" @click="buscarLojista" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>

                    <!-- Dialog com detalhes do lojista -->
                    <q-dialog v-model="detalhesDialog" persistent>
                        <q-card class="w100">
                            <q-card-section>
                                <div class="text-h6">{{ lojistaSelecionado.nome }}</div>
                            </q-card-section>

                            <q-separator />

                            <q-card-section>
                                <q-expansion-item label="Informações Básicas" expand-separator icon="store">
                                    <q-input v-model="lojistaSelecionado.email" label="Email" color="teal" filled
                                        dense />
                                    <q-input v-model="lojistaSelecionado.plano" label="Plano" color="teal" filled
                                        dense />
                                    <q-input v-model="lojistaSelecionado.plano_expira" label="Plano expira em"
                                        color="teal" filled dense />
                                    <q-input v-model="lojistaSelecionado.contato" label="Contato" color="teal" filled
                                        dense />
                                    <q-input v-model="lojistaSelecionado.cnpj" label="CNPJ" color="teal" filled dense />
                                </q-expansion-item>

                                <q-expansion-item label="Leads" icon="list_alt" expand-separator>
                                    <div v-if="lojistaSelecionado.leads.length">
                                        <ul>
                                            <li v-for="(lead, index) in lojistaSelecionado.leads" :key="index">
                                                {{ lead }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-else>Nenhum lead registrado.</div>
                                </q-expansion-item>

                                <q-expansion-item label="Vendedores" icon="people" expand-separator>
                                    <div v-if="lojistaSelecionado.vendedores.length">
                                        <ul>
                                            <li v-for="(vend, i) in lojistaSelecionado.vendedores" :key="i">
                                                {{ vend.nome }} - {{ vend.email }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-else>Nenhum vendedor cadastrado.</div>
                                </q-expansion-item>
                            </q-card-section>

                            <q-card-actions align="right">
                                <div class="w100 row justify-end q-gutter-x-md q-mb-sm">
                                    <q-btn  label="Editar" glossy color="orange" @click="editarLojista" />
                                    <q-btn  label="Gerar Pagamento" color="teal" glossy icon-right="paid" @click="gerarPagamento" /><br>
                                </div>
                                <q-btn  flat label="Fechar" color="teal" v-close-popup />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                </div>
                <q-dialog v-model="dialogCriarLojista" persistent>
                    <q-card style="min-width: 350px; max-width: 90vw">
                      <q-card-section>
                        <div class="text-h6">Cadastrar Novo Lojista</div>
                      </q-card-section>
                  
                      <q-card-section class="q-gutter-md">
                        <q-input color="teal" v-model="novoLojista.nome" label="Nome" filled />
                        <q-input color="teal" v-model="novoLojista.login" label="Login" filled />
                        <q-input color="teal" v-model="novoLojista.password" label="Senha" type="password" filled />
                        <q-input color="teal" v-model="novoLojista.email" label="Email" filled />
                        <q-input color="teal" v-model="novoLojista.cnpj" label="CNPJ" filled />
                        <q-input color="teal" v-model="novoLojista.contato" mask="(##) #####-####" label="Contato" filled />
                  
                        <q-select
                          v-model="novoLojista.plano"
                          label="Plano"
                          color="teal"
                          :options="planos"
                          map-options emit-value
                          filled
                        />
                      </q-card-section>
                  
                      <q-card-actions align="right">
                        <q-btn flat label="Cancelar" color="dark" v-close-popup />
                        <q-btn label="Registrar" color="teal" glossy @click="criarLojista" />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
            </q-page>
            <q-footer class="bg-grey-9 text-white text-center q-pa-xs">
                <q-btn label="ChatCar Homepage" icon="directions_car" color="teal-14" to="/" flat></q-btn>
            </q-footer>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { PlanosEnum } from 'src/enums/PlanosEnum'

const dialogCriarLojista = ref(false)

const novoLojista = ref({
  login: '',
  password: '',
  nome: '',
  email: '',
  cnpj: '',
  contato: '',
  plano: '',
  admin: 'samuel'
})

const planos = [
  { label: PlanosEnum.MENSAL, value: PlanosEnum.MENSAL },
  { label: PlanosEnum.SEMESTRAL, value: PlanosEnum.SEMESTRAL },
  { label: PlanosEnum.ANUAL, value: PlanosEnum.ANUAL }
]

const $q = useQuasar()

// Mock login do admin
const admin = ref({
    login: 'samuel',
    login2: 'miguel',
    senha: 'samiguel'
})

async function criarLojista() {
  if (!validarNovoLojista()) {
    return;
  }

  try {
    await api.post('/registrar', novoLojista.value);
    $q.notify({
      type: 'positive',
      message: 'Lojista criado com sucesso!'
    });
    dialogCriarLojista.value = false;
  } catch (error) {
    console.error(error);
    $q.notify({
      type: 'negative',
      message: 'Erro ao registrar lojista.'
    });
  }
}

function validarNovoLojista() {
  const camposObrigatorios = ['login', 'password', 'nome', 'email', 'cnpj', 'contato', 'plano'];
  
  for (const campo of camposObrigatorios) {
    if (!novoLojista.value[campo] || novoLojista.value[campo].trim() === '') {
      $q.notify({
        type: 'warning',
        position: 'top',
        message: `O campo ${campo.toUpperCase()} é obrigatório!`
      });
      return false;
    }
  }
  
  return true;
}


const form = ref({
    login: '',
    senha: ''
})

const logado = ref(false)
const buscarDialog = ref(false)
const detalhesDialog = ref(false)
const buscaLogin = ref('')
const lojistaSelecionado = ref({})

// Mock de lojistas
const lojistas = ref([
    {
        _id: '680ba2a5b1be6120dc27984b',
        nome: 'ChatCars Store',
        email: 'chatcars@email.com',
        login: 'chatcars',
        password: 'senha123',
        plano: 'Plano Mensal',
        plano_expira: '2025-05-25T14:56:37.973Z',
        site: 'https://chatcar.netlify.app',
        chat_link: 'chatcar.netlify.app/chatcars',
        cnpj: '12.345.678/0001-90',
        contato: '(62) 91234-5678',
        leads: ['lead1', 'lead2'],
        vendedores: [
            { nome: 'João Vendedor', email: 'joao@chatcars.com' },
            { nome: 'Maria Vendedora', email: 'maria@chatcars.com' }
        ]
    }
])

function editarLojista() {
    $q.notify({ type: 'info', message: 'Função de edição em desenvolvimento.' })
}

function gerarPagamento() {
    $q.notify({ type: 'info', message: 'Função de gerar pagamento em breve.' })
}


function fazerLogin() {
    if (
        (form.value.login.toLowerCase() === admin.value.login || form.value.login.toLowerCase() === admin.value.login2) &&
        form.value.senha.toLowerCase() === admin.value.senha
    ) {
        logado.value = true
        localStorage.setItem('admin', form.value.login)
        $q.notify({ position: 'top', color: 'teal', message: 'Login realizado com sucesso!' })
    } else {
        $q.notify({ position: 'top', color: 'dark', message: 'Login ou senha incorretos!' })
    }
}

function buscarLojista() {
    const lojista = lojistas.value.find(l => l.login === buscaLogin.value)
    if (lojista) {
        lojistaSelecionado.value = lojista
        detalhesDialog.value = true
        buscarDialog.value = false
    } else {
        $q.notify({ type: 'warning', message: 'Lojista não encontrado!' })
    }
}
</script>