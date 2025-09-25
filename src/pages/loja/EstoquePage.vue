<template>
    <q-page class="q-pa-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 q-mb-md" separator-icon="chevron_right">
            <q-breadcrumbs-el class="text-teal" icon="store" label="Início" to="/me" />
            <q-breadcrumbs-el icon="directions_car" label="Estoque" exact />
        </q-breadcrumbs>

        <div class="row justify-between items-center q-mb-md">
            <div class="text-h5 text-bold text-dark">Estoque</div>
            <q-btn color="teal" label="Adicionar" @click="abrirModalAdicionar" icon-right="add_circle" />
        </div>

        <q-input filled dense debounce="300" color="teal" v-model="buscar" @update:model-value="filtrarVeiculos()"
            label="Buscar" class="q-mb-lg bg-grey-1" clearable placeholder="Digite o nome do veículo">
            <template v-slot:append>
                <q-icon name="search" class="cursor-pointer" color="dark" />
            </template>
        </q-input>
        <div v-if="loading" class="w100 q-mb-md row no-wrap items-center justify-center">
            <q-spinner-ball color="teal" size="2em" />
            <q-spinner-ball color="teal" size="2em" />
            <q-spinner-ball color="teal" size="2em" />
        </div>
        <q-card v-if="!loading" flat bordered class="q-pa-xs">
            <q-card-section>
                <q-row class="row w100 justify-center items-center" v-if="estoque.length">
                    <q-card v-for="item in veiculosFiltrados" :key="item.id" id="card-estoque" bordered flat
                        class="w100 q-hoverable q-ma-sm">
                        <q-img @click="abrirDetalhes(item)" :src="item.img_url" class="rounded-borders w100"
                            height="250px" style="object-fit: cover;" />
                        <q-card-section>
                            <div class="text-subtitle1 text-bold">{{ item.modelo }}</div>
                            <div class="text-subtitle1">{{ item?.ano }} - {{ item?.km }}km</div>
                            <div class="text-body2 text-grey-8">R$ {{ item?.preco ? Utils.toBRLFixedStr(item.preco) : '-' }}</div>
                        </q-card-section>
                        <q-card-actions align="right" class="bg-dark">
                            <q-btn flat color="grey-2" icon="delete" @click="confirmarRemocao(item)" />
                            <q-btn color="grey-7" icon="edit" @click="abrirModalEdicao(item)" />
                            <q-btn color="teal" icon="visibility" @click="abrirDetalhes(item)" />
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
                <q-card-section class="row items-center q-pb-md bg-blue-grad-2 text-white">
                    <div class="text-h6">{{ veiculoSelecionado?.modelo
                        }} - {{
                            veiculoSelecionado?.ano }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <div style="font-size: 1.3rem;" class="text-teal-14 text-bold q-mb-xs">R$ {{
                        veiculoSelecionado?.preco ? Utils.toBRLFixedStr(veiculoSelecionado.preco) : '-' }}
                    </div>
                    <div class="text-body2 q-mb-xs"><strong class="text-bold text-teal" v-if="veiculoSelecionado.cor">{{
                            veiculoSelecionado?.cor.toUpperCase() }}</strong> <strong v-if="veiculoSelecionado.km"
                            class="text-bold text-teal"> - {{ veiculoSelecionado?.km }}km</strong> <strong
                            class="text-bold text-teal" v-if="veiculoSelecionado.combustivel"> - {{
                                veiculoSelecionado?.combustivel.value.toUpperCase() }}</strong> <strong
                            v-if="veiculoSelecionado.cambio" class="text-bold text-teal"> - {{
                                veiculoSelecionado?.cambio.value.toUpperCase() }}</strong></div>
                    <q-separator class="q-my-sm" />
                    <div class="text-body2"><strong>Descrição:</strong> {{ veiculoSelecionado?.descricao }} - {{
                        veiculoSelecionado?.directContact}}</div>
                    <div class="q-pt-md text-body2 text-bold text-teal">{{ veiculoSelecionado?.tipo.label }} - {{
                        veiculoSelecionado?.categoria.label }}</div>
                    <q-carousel v-model="slideAtivoDetalhes" v-if="imagensVeiculoSelecionado.length" swipeable animated
                        class="rounded-borders q-my-md bg-grey-2" navigation arrows infinite>
                        <q-carousel-slide class="bg-dark" v-for="(img, index) in imagensVeiculoSelecionado" :key="index"
                            :name="index">
                            <q-img :src="img" fit="contain" class="rounded-borders w100" height="100%" />
                        </q-carousel-slide>
                    </q-carousel>
                </q-card-section>
                <q-separator />
                <div class="w100 q-mt-md"></div>
            </q-card>
        </q-dialog>
        <q-dialog v-model="dialogAdicionar" persistent>
            <q-card style="min-width: 350px; max-width: 90vw;">
                <q-card-section class="text-white row items-center q-pb-md bg-blue-grad-2">
                    <div class="text-h6 ">{{ modoEdicao ? 'Editar Veículo' : 'Adicionar Veículo' }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <q-input color="teal" v-model="formVeiculo.modelo" label="Modelo"
                        placeholder="Ex: BMW 320i, HYUNDAI HB20" dense outlined class="q-mb-sm">
                        <template v-slot:append>
                            <q-icon name="directions_car" class="cursor-pointer" color="teal" />
                        </template>
                    </q-input>
                    <q-input color="teal" v-model="formVeiculo.descricao"
                        placeholder="Descreva o máximo de informações relevantes sobre o veículo.   " label="Descrição"
                        maxlength="400" type="textarea" dense outlined class="q-mb-sm">
                        <template v-slot:append>
                            <q-icon name="description" class="cursor-pointer" color="teal" />
                        </template>
                    </q-input>
                    <q-input color="teal" v-model="formVeiculo.directContact" placeholder="O telefone dono do veículo."
                        label="Contato" maxlength="200" type="text" mask="(##) #####-####" dense outlined
                        class="q-mb-sm">
                        <template v-slot:append>
                            <q-icon name="phone" class="cursor-pointer" color="teal" />
                        </template>
                    </q-input>
                    <q-select color="teal" v-model="formVeiculo.tipo" :options="tipoVeiculoOptions" label="Tipo" dense
                        outlined class="q-mb-sm">
                        <template v-slot:append>
                            <q-icon name="two_wheeler" class="cursor-pointer" color="teal" />
                        </template>
                    </q-select>
                    <q-select color="teal" v-model="formVeiculo.combustivel" label="Combustível" dense :options="[
                        { label: 'Diesel', value: 'diesel' },
                        { label: 'Gasolina', value: 'gasolina' },
                        { label: 'Álcool', value: 'alcool' },
                        { label: 'Flex', value: 'flex' },
                        { label: 'Elétrico', value: 'eletrico' },
                        { label: 'Híbrido', value: 'hibrido' }]" outlined class="q-mb-sm">
                        <template v-slot:append>
                            <q-icon name="local_gas_station" class="cursor-pointer" color="teal" />
                        </template>
                    </q-select>
                    <q-select color="teal" v-model="formVeiculo.cambio" label="Câmbio" dense :options="[
                        { label: 'Automático', value: 'automatico' },
                        { label: 'Manual', value: 'manual' },
                        { label: 'CVT', value: 'cvt' },
                        { label: 'Dual Clutch', value: 'dual-clutch' },
                        { label: 'Semi-Automático', value: 'semi-automatico' }]" outlined class="q-mb-sm">
                        <template v-slot:append>
                            <q-icon name="route" class="cursor-pointer" color="teal" />
                        </template>
                    </q-select>
                    <q-select color="teal" v-model="formVeiculo.categoria" :options="categoriaVeiculoOptions"
                        label="Categoria" dense outlined class="q-mb-sm">
                        <template v-slot:append>
                            <q-icon name="sports_motorsports" class="cursor-pointer" color="teal" />
                        </template>
                    </q-select>
                    <div class="w100 row no-wrap justify-between">
                        <div class="w50">
                            <q-input color="teal" v-model.number="formVeiculo.km" label="Km"
                                placeholder="Quilometragem (km)" type="number" dense outlined class="q-mb-sm q-mr-md">
                                <template v-slot:append>
                                    <q-icon name="timeline" class="cursor-pointer" color="teal" />
                                </template>
                            </q-input>
                        </div>
                        <div class="w50">
                            <q-input color="teal" v-model.number="formVeiculo.ano" label="Ano" type="number" dense
                                outlined class="q-mb-sm">
                                <template v-slot:append>
                                    <q-icon name="calendar_today" class="cursor-pointer" color="teal" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div class="w100 row no-wrap justify-between">
                        <div class="w50">
                            <q-input color="teal" v-model="formVeiculo.cor" label="Cor"
                                placeholder="Ex: Preto, Branco, Vermelho" dense outlined class="q-mb-sm q-mr-md">
                                <template v-slot:append>
                                    <q-icon name="palette" class="cursor-pointer" color="teal" />
                                </template>
                            </q-input>
                        </div>
                        <div class="w50">
                            <q-input color="teal" v-model="formVeiculo.preco" label="Preço" mask="#.##" fill-mask="0"
                                reverse-fill-mask prefix="R$" input-class="text-right" dense outlined class="q-mb-sm">
                                <template v-slot:append>
                                    <q-icon name="paid" class="cursor-pointer" color="teal" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <q-separator class="q-mt-sm" />
                    <div class="text-subtitle2 q-mb-xs">Imagens</div>
                    <q-input color="teal" v-model="formVeiculo.img_url" label="Imagem Principal Url" dense outlined
                        class="q-mb-md">
                        <template v-slot:append>
                            <q-icon name="image" class="cursor-pointer" color="teal" />
                        </template>
                    </q-input>

                    <div v-for="(msg, index) in formVeiculo.mensagens" :key="index"
                        class="row q-gutter-sm items-center q-mb-sm">
                        <q-input v-model="formVeiculo.mensagens[index]" color="teal" dense outlined
                            placeholder="Cole o link da imagem do veículo" class="col">
                            <template v-slot:append>
                                <q-icon name="image" class="cursor-pointer" color="teal" />
                            </template>
                        </q-input>
                        <q-btn flat dense icon="delete" color="negative" @click="removerMensagem(index)" />
                    </div>
                    <q-btn dense icon="image" v-if="formVeiculo.mensagens.length <= 3" icon-right="add"
                        label="Adicionar imagem" color="teal" @click="adicionarMensagem" />
                </q-card-section>

                <q-separator />
                <q-carousel v-model="slideAtivoAdicionar" v-if="imagensFormVeiculo.length" swipeable animated
                    height="200px" class="rounded-borders q-mb-md bg-grey-2" navigation arrows infinite>
                    <q-carousel-slide class="bg-dark" v-for="(img, index) in imagensFormVeiculo" :key="index"
                        :name="index">
                        <q-img :src="img" fit="cover" class="full-height" />
                    </q-carousel-slide>
                </q-carousel>
                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn color="teal" glossy label="Salvar" icon-right="save" @click="salvarVeiculo">
                        <template>

                        </template>
                    </q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-page>
</template>
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios';
import { TipoVeiculoEnum, CategoriaVeiculoEnum, StatusVeiculoEnum } from 'src/enums/VeiculoEnum';
import { Utils } from "src/Utils";
const tipoVeiculoOptions = Object.entries(TipoVeiculoEnum).map(([value, label]) => ({ label, value }));
const categoriaVeiculoOptions = Object.entries(CategoriaVeiculoEnum).map(([value, label]) => ({ label, value }));
const statusVeiculoOptions = Object.entries(StatusVeiculoEnum).map(([value, label]) => ({ label, value }));

const $q = useQuasar()
const buscar = ref('')
const dialogDetalhes = ref(false)
const veiculoSelecionado = ref(null)
const estoque = ref([])
const dialogAdicionar = ref(false)
const modoEdicao = ref(false);
const idVeiculoEditando = ref(null);
const loading = ref(false)
function abrirModalEdicao(veiculo) {
    slideAtivoAdicionar.value = 0
    modoEdicao.value = true;
    idVeiculoEditando.value = veiculo.id;
    formVeiculo.value = { ...veiculo };
    dialogAdicionar.value = true;
}
const imagensVeiculoSelecionado = computed(() => {
    if (!veiculoSelecionado.value) return []
    const lista = []

    if (veiculoSelecionado.value.img_url?.trim()) {
        lista.push(veiculoSelecionado.value.img_url)
    }

    if (Array.isArray(veiculoSelecionado.value.mensagens)) {
        lista.push(...veiculoSelecionado.value.mensagens.filter(msg => msg?.trim()))
    }

    return lista
})
function abrirModalAdicionar() {
    slideAtivoAdicionar.value = 0
    modoEdicao.value = false;
    idVeiculoEditando.value = null;
    formVeiculo.value = {
        modelo: '',
        tipo: '',
        status: StatusVeiculoEnum.DISPONIVEL,
        km: '',
        cor: '',
        combustivel: '',
        cambio: '',
        categoria: '',
        descricao: '',
        ano: null,
        preco: null,
        img_url: '',
        mensagens: []
    };
    dialogAdicionar.value = true;
}
const slideAtivoDetalhes = ref(0)
const slideAtivoAdicionar = ref(0)

const user = JSON.parse(localStorage.getItem("user"))
const estoque_id = user.estoque
const loja_id = user._id

function confirmarRemocao(veiculo) {
    $q.dialog({
        title: 'Confirmar Remoção',
        message: `Deseja realmente remover o veículo "${veiculo.modelo}"?`,
        cancel: {
            color: 'teal',
            flat: true,
            label: 'Cancelar'
        },
        ok: {
            color: 'teal',
            glossy: true,
            label: 'Remover'
        },
        persistent: true,
    }).onOk(async () => {
        try {
            await api.delete(`/remover-veiculo/${veiculo.id}`, {
                data: { estoque: estoque_id, loja: loja_id }
            });
            $q.notify({ color: 'teal', position: 'top', message: 'Veículo removido com sucesso!', icon: 'delete' });
            await carregarEstoque(); // Atualiza a lista de veículos
        } catch (error) {
            console.error('Erro ao remover veículo:', error);
            $q.notify({ color: 'dark', position: 'top', message: 'Erro ao remover veículo.' });
        }
    });
}

const formVeiculo = ref({
    modelo: '',
    tipo: '',
    status: StatusVeiculoEnum.DISPONIVEL,
    categoria: '',
    descricao: '',
    km: '',
    cor: '',
    directContact: '',
    combustivel: '',
    cambio: '',
    ano: null,
    preco: null,
    img_url: '',
    mensagens: []
})

const imagensFormVeiculo = computed(() => {
    if (!formVeiculo.value) return []
    const imgs = []
    if (formVeiculo.value.img_url) imgs.push(formVeiculo.value.img_url)
    if (Array.isArray(formVeiculo.value.mensagens)) {
        imgs.push(...formVeiculo.value.mensagens.filter(Boolean))
    }
    return imgs
})


function adicionarMensagem() {
    formVeiculo.value.mensagens.push('')
}

function removerMensagem(index) {
    formVeiculo.value.mensagens.splice(index, 1)
}

async function salvarVeiculo() {
    // Validação básica
    if (!formVeiculo.value.modelo?.trim()) {
        $q.notify({
            type: 'warning',
            message: 'O campo "Modelo" é obrigatório.',
            position: 'top'
        });
        return;
    }

    const payload = {
        loja: {
            id: user?._id,
            token: user?.token
        },
        veiculo: { ...formVeiculo.value }
    };

    try {
        if (modoEdicao.value) {
            await api.put(`/editar-veiculo/${idVeiculoEditando.value}`, payload);
            $q.notify({ color: 'teal', position: 'top', icon: 'edit', message: 'Veículo atualizado com sucesso!' });
        } else {
            await api.post("/add-veiculo", { ...payload, estoque: estoque_id });
            $q.notify({ color: 'teal', position: 'top', icon: 'directions_car', message: 'Veículo adicionado com sucesso!' });
        }

        dialogAdicionar.value = false;
        formVeiculo.value = {
            modelo: '',
            tipo: '',
            status: StatusVeiculoEnum.DISPONIVEL,
            categoria: '',
            descricao: '',
            km: '',
            cor: '',
            combustivel: '',
            cambio: '',
            ano: null,
            preco: null,
            img_url: '',
            mensagens: []
        };
        modoEdicao.value = false;
        idVeiculoEditando.value = null;
        await carregarEstoque();
    } catch (err) {
        console.error(err);
        $q.notify({ icon: 'paid', position: 'top', type: 'negative', message: err.response?.data?.error || 'Erro ao salvar veículo.' });
    }
}


function abrirDetalhes(item) {
    veiculoSelecionado.value = item
    slideAtivoDetalhes.value = 0
    dialogDetalhes.value = true
}

const filtrarVeiculos = () => {
    if (!buscar.value) return estoque.value
    const filtro = buscar.value.toLowerCase()
    return estoque.value.filter(v =>
        v.modelo?.toLowerCase().includes(filtro) ||
        v.categoria?.label.toLowerCase().includes(filtro) ||
        v.tipo?.label.toLowerCase().includes(filtro)
    )
}

const veiculosFiltrados = ref([])

watch(buscar, () => {
    veiculosFiltrados.value = filtrarVeiculos()
})

async function carregarEstoque() {
    loading.value = true
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
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await carregarEstoque()
})
</script>


<style scoped>
.estoque-line {
    transition: all 0.3s ease;
}

.estoque-line:hover {
    background-color: #f0f0f0;
    cursor: pointer;
    transition: all 0.2s linear;
}

#card-estoque {
    transition: all 0.3s ease;
    cursor: pointer;
}

#card-estoque:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

@media (min-width: 700px) {
    #card-estoque {
        width: 30%;
    }
}
</style>