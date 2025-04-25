<template>
    <q-page class="q-pa-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 q-mb-md" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="store" label="Início" to="/loja" />
            <q-breadcrumbs-el icon="directions_car" label="Estoque" exact />
        </q-breadcrumbs>

        <div class="row justify-between items-center q-mb-md">
            <div class="text-h5 text-bold text-dark">Estoque</div>
            <q-btn color="teal" glossy label="Adicionar" @click="dialogAdicionar = true" icon-right="add_circle" />
        </div>

        <q-input outlined dense debounce="300" color="dark" v-model="buscar" label="Buscar" class="q-mb-lg" clearable
            placeholder="Digite o nome do veículo">
            <template v-slot:append>
                <q-icon name="search" class="cursor-pointer" color="dark" />
            </template>
        </q-input>

        <q-card flat bordered class="q-pa-xs">
            <q-card-section>
                <q-row class="row w100 justify-center items-center" v-if="estoque.length">
                    <q-card v-for="item in veiculosFiltrados" :key="item.id" id="card-estoque" bordered flat
                        class="w100 q-hoverable q-ma-sm">
                        <q-img :src="item.img_url" class="rounded-borders w100" height="250px"
                            style="object-fit: cover;" />
                        <q-card-section>
                            <div class="text-subtitle1 text-bold">{{ item.modelo }}</div>
                            <div class="text-subtitle1">{{ item.status }}</div>
                            <div class="text-body2 text-grey-8">R$ {{ item.preco | currency }},00</div>
                        </q-card-section>
                        <q-card-actions align="right">
                            <q-btn flat color="red " icon="delete" />
                            <q-btn color="teal-14   " glossy icon="visibility" label="Detalhes"
                                @click="abrirDetalhes(item)" />
                        </q-card-actions>
                    </q-card>
                </q-row>
                <div v-else class="text-center text-grey-6 q-pt-lg">
                    Nenhum veículo encontrado.
                </div>
            </q-card-section>
        </q-card>
        <q-dialog v-model="dialogDetalhes">
            <q-card style="min-width: 350px; max-width: 90vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Detalhes do Veículo</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <q-img :src="veiculoSelecionado?.img_url" class="q-mb-md rounded-borders" height="200px"
                        fit="contain" />

                    <div class="text-subtitle1 text-bold">{{ veiculoSelecionado?.status }}</div>
                    <div class="text-body2">Modelo: {{ veiculoSelecionado?.modelo }}</div>
                    <div class="text-body2 q-mb-xs">Preço: R$ {{ veiculoSelecionado?.preco | currency }},00</div>
                    <!-- <div class="text-body2">ID: {{ veiculoSelecionado?.id }}</div> -->
                    <!-- Campos adicionais -->
                    <div class="text-body2">Categoria: {{ veiculoSelecionado?.categoria }}</div>
                    <div class="text-body2">Tipo: {{ veiculoSelecionado?.tipo }}</div>
                    <div class="text-body2">Ano: {{ veiculoSelecionado?.ano }}</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <div class="text-subtitle2 text-bold q-mb-sm">Mensagens</div>
                    <q-list bordered separator>
                        <q-item v-for="(mensagem, index) in veiculoSelecionado?.mensagens || []" :key="index">
                            <q-item-section class="row no-wrap">
                                <q-icon name="sms" size="sm" color="teal"></q-icon>{{ mensagem }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="dialogAdicionar">
            <q-card style="min-width: 350px; max-width: 90vw;">
                <q-card-section class="row items-center q-pb-md">
                    <div class="text-h6">Adicionar Veículo</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <q-input v-model="formVeiculo.id" label="ID do Veículo" dense outlined class="q-mb-sm" />
                    <q-input v-model="formVeiculo.modelo" label="Modelo" dense outlined class="q-mb-sm" />
                    <q-input v-model="formVeiculo.tipo" label="Tipo" dense outlined class="q-mb-sm" />
                    <q-input v-model="formVeiculo.status" label="Status" dense outlined class="q-mb-sm" />
                    <q-input v-model="formVeiculo.categoria" label="Categoria" dense outlined class="q-mb-sm" />
                    <q-input v-model.number="formVeiculo.ano" label="Ano" type="number" dense outlined
                        class="q-mb-sm" />
                    <q-input v-model.number="formVeiculo.preco" label="Preço" type="number" prefix="R$" dense outlined
                        class="q-mb-sm" />
                    <q-input v-model="formVeiculo.img_url" label="URL da Imagem" dense outlined class="q-mb-md" />

                    <div class="text-subtitle2 q-mb-xs">Mensagens</div>
                    <div v-for="(msg, index) in formVeiculo.mensagens" :key="index"
                        class="row q-gutter-sm items-center q-mb-sm">
                        <q-input v-model="formVeiculo.mensagens[index]" dense outlined class="col" />
                        <q-btn flat dense icon="delete" color="negative" @click="removerMensagem(index)" />
                    </div>
                    <q-btn flat dense icon="add" label="Adicionar Mensagem" color="primary"
                        @click="adicionarMensagem" />
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn color="teal" glossy label="Salvar" @click="salvarVeiculo" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-page>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios';

const $q = useQuasar()
const buscar = ref('')
const dialogDetalhes = ref(false)
const veiculoSelecionado = ref(null)
const estoque = ref([])
const dialogAdicionar = ref(false)

const formVeiculo = ref({
    id: '',
    modelo: '',
    tipo: '',
    status: '',
    categoria: '',
    ano: null,
    preco: null,
    img_url: '',
    mensagens: []
})

function adicionarMensagem() {
    formVeiculo.value.mensagens.push('')
}

function removerMensagem(index) {
    formVeiculo.value.mensagens.splice(index, 1)
}

async function salvarVeiculo() {
    const user = JSON.parse(localStorage.getItem("user"))
    const payload = {
        loja: {
            id: user?.id,
            token: user?.token
        },
        estoque: estoque_id,
        veiculo: { ...formVeiculo.value }
    }

    try {
        await api.post("/add-veiculo", payload)
        $q.notify({ type: 'positive', message: 'Veículo adicionado com sucesso!' })
        dialogAdicionar.value = false
        formVeiculo.value = {
            id: '',
            modelo: '',
            tipo: '',
            status: '',
            categoria: '',
            ano: null,
            preco: null,
            img_url: '',
            mensagens: []
        }
        carregarEstoque()
    } catch (err) {
        console.error(err)
        $q.notify({ type: 'negative', message: 'Erro ao adicionar veículo.' })
    }
}


// Substitua por IDs reais ou recupere dinamicamente se preferir
const estoque_id = '680ba2a6b1be6120dc27984d'
const loja_id = '680ba2a5b1be6120dc27984b'

function abrirDetalhes(item) {
    veiculoSelecionado.value = item
    dialogDetalhes.value = true
}

const filtrarVeiculos = () => {
    if (!buscar.value) return estoque.value
    const filtro = buscar.value.toLowerCase()
    return estoque.value.filter(v =>
        v.modelo?.toLowerCase().includes(filtro) ||
        v.categoria?.toLowerCase().includes(filtro) ||
        v.tipo?.toLowerCase().includes(filtro) ||
        v.id?.toLowerCase().includes(filtro)
    )
}

const veiculosFiltrados = ref([])

watch(buscar, () => {
    veiculosFiltrados.value = filtrarVeiculos()
})

async function carregarEstoque() {
    try {
        const { data } = await api.get('/meu-estoque', {
            params: { estoque_id, loja_id }
        })
        estoque.value = data.estoque.veiculos
        veiculosFiltrados.value = estoque.value
    } catch (err) {
        console.error('Erro ao buscar estoque', err)
        $q.notify({
            type: 'negative',
            message: 'Erro ao buscar estoque'
        })
    }
}

onMounted(() => {
    carregarEstoque()
})
</script>


<style scoped>
.estoque-line {
    transition: all 0.3s ease;
}

.estoque-line:hover {
    background-color: #f0f0f0;
    cursor: pointer;
}

.q-hoverable:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

@media (min-width: 700px) {
    #card-estoque {
        width: 35%;
    }
}
</style>