<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="q-pa-md bg-dark">
                <div v-if="!logado" class="q-gutter-y-md" style="max-width: 400px; margin: auto">
                    <h3 class="text-center text-white">@chatcar.ia</h3>
                    <div class="w100 text-center">
                        <img src="/pq.png" class="rounded-borders" width="300">
                    </div>
                    <q-input color="teal" v-model="form.login" label="Login" outlined
                        class="bg-teal-1 rounded-borders" />
                    <q-input color="teal" v-model="form.senha" label="Senha" type="password" outlined
                        class="bg-teal-1 rounded-borders" />
                    <q-btn label="Entrar" glossy class="w100 q-py-lg q-mb-xl" icon-right="login" color="teal" @click="fazerLogin" />

                </div>

                <div v-else>
                    <h4 class="text-center q-mb-lg text-white">Painel Chatcar</h4>
                    <div class="q-gutter-md row justify-center">
                        <q-btn label="Criar Lojista" color="positive" glossy icon="add"
                            @click="dialogCriarLojista = true" />
                        <q-btn label="Buscar Lojista" color="teal" glossy icon="search" @click="buscarDialog = true" />
                    </div>

                    <q-dialog v-model="buscarDialog">
                        <div class="column w100">
                            <q-card >
                                <q-card-section>
                                    <div class="text-h6">Buscar Lojista</div>
                                </q-card-section>
                                <q-card-section>
                                    <q-input v-model="buscaLogin" label="Login do Lojista" color="teal" />
                                </q-card-section>
                                <q-card-actions align="right">
                                    <q-btn flat label="Cancelar" v-close-popup color="teal" />
                                    <q-btn label="Buscar" icon-right="search" glossy color="teal"
                                        @click="buscarLojaNoServidor()" />
                                </q-card-actions>
                            </q-card>
                            <q-card class="q-mt-md bg-grey-2 text-black w100" v-if="lojaJson">
                                <q-card-section>
                                    <div class="w100">
                                        <q-btn icon-right="send" class="q-mr-md" color="teal" glossy @click="enviarAcesso()" label="Enviar Acesso"></q-btn>
                                        <q-btn :disabled="true" icon-right="edit_note" color="blue-14" label="Alterar Plano"></q-btn>
                                    </div>
                                    <q-separator class="q-my-sm"/>
                                    <div class="text-h6">Dados da Loja (JSON)</div>
                                    <q-input v-model="termoBuscaJson" label="Filtrar JSON por palavra" debounce="300"
                                        color="teal" @update:model-value="filtrarJsonPorTermo" filled class="q-mt-sm" />
                                    <q-separator class="q-my-md" />
                                    <div class="scroll bg-grey-1 text-black q-pa-sm"
                                        style="max-height: 400px; white-space: pre-wrap; font-family: monospace; font-size: 13px"
                                        v-html="highlightedJson" />
                                </q-card-section>
                            </q-card>
                        </div>
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
                                    <q-btn label="Editar" glossy color="orange" @click="editarLojista" />
                                    <q-btn label="Gerar Pagamento" color="teal" glossy icon-right="paid"
                                        @click="gerarPagamento" /><br>
                                </div>
                                <q-btn flat label="Fechar" color="teal" v-close-popup />
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
                            <q-input color="teal" v-model="novoLojista.contato" mask="(##) #####-####" label="Contato"
                                filled />

                            <q-select v-model="novoLojista.plano" label="Plano" color="teal" :options="planos"
                                map-options emit-value filled />
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
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { PlanosEnum } from 'src/enums/PlanosEnum'

const highlightedJson = computed(() => {
    if (!lojaJsonFiltrado.value) return ''
    return `<pre>${JSON.stringify(lojaJsonFiltrado.value, null, 2)}</pre>`
})
const dialogCriarLojista = ref(false)
const lojaJson = ref(null)
const lojaJsonFiltrado = ref(null)
const termoBuscaJson = ref('')

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

function enviarAcesso() {
  const login = lojaJson.value?.login
  if (!login) {
    $q.notify({ type: 'warning', message: 'Login do lojista não encontrado.' })
    return
  }

  const texto = `🚗 Bem-vindo(a) ao ChatCar I.A.\n\n🔑 Login: ${login}\n\n🌐 Acesse seu chat vitrine público:\nchatcar.me/${login}\n\n🔐 Ou entre pelo painel:\nchatcar.me/login`

  navigator.clipboard.writeText(texto).then(() => {
    $q.notify({ color: 'teal', position: 'top', icon: 'directions_car', message: texto })
  }).catch(() => {
    $q.notify({ type: 'negative', message: 'Erro ao copiar o texto.' })
  })
}


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
function deepFilterJson(obj, termo) {
    if (obj === null || obj === undefined) return null;

    const termoLower = termo.toLowerCase();

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
        const valor = obj.toString().toLowerCase();
        return valor.includes(termoLower) ? obj : null;
    }

    if (Array.isArray(obj)) {
        const resultado = obj
            .map(item => deepFilterJson(item, termo))
            .filter(item => item !== null);
        return resultado.length > 0 ? resultado : null;
    }

    if (typeof obj === 'object') {
        const novoObj = {};
        for (const chave in obj) {
            const valor = obj[chave];
            const chaveMatch = chave.toLowerCase().includes(termoLower);
            const valorFiltrado = deepFilterJson(valor, termo);

            if (chaveMatch || valorFiltrado !== null) {
                novoObj[chave] = valorFiltrado !== null ? valorFiltrado : valor;
            }
        }
        return Object.keys(novoObj).length > 0 ? novoObj : null;
    }

    return null;
}

function filtrarJsonPorTermo() {
    if (!termoBuscaJson.value || !lojaJson.value) {
        lojaJsonFiltrado.value = lojaJson.value
        return
    }

    const termo = termoBuscaJson.value.toLowerCase()
    const resultadoFiltrado = deepFilterJson(lojaJson.value, termo)

    lojaJsonFiltrado.value = resultadoFiltrado || { resultado: 'Nada encontrado.' }
}

async function buscarLojaNoServidor() {
    try {
        const { data } = await api.post('/get-loja', {
            login: 'chatcars',
            admin: 'samuel'
        })
        lojaJson.value = data
        lojaJsonFiltrado.value = data
    } catch (err) {
        console.error('Erro ao buscar loja:', err)
        $q.notify({
            type: 'negative',
            message: 'Erro ao buscar loja.'
        })
    }
}


async function criarLojista() {
    if (!validarNovoLojista()) {
        return;
    }

    try {
        await api.post('/registrar', novoLojista.value);
        $q.notify({
            position: 'top',
            color: 'teal',
            icon: 'person_add',
            message: 'Lojista criado com sucesso!'
        });
        dialogCriarLojista.value = false;
    } catch (error) {
        console.error(error);
        $q.notify({
            position: 'top',
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
        $q.notify({ position: 'top', icon: 'admin_panel_settings', color: 'teal', message: 'Login realizado com sucesso' })
    } else {
        $q.notify({ position: 'top', color: 'dark', message: 'Login ou senha incorretos' })
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