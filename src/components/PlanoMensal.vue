<template>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto">
        <q-card-section>
            <div class="text-h5 text-bold">Pacote Básico</div>
            <div class="text-subtitle2 q-mt-sm">
                Utilize a plataforma no plano mensal, pague apenas se for utilizar
            </div>
            <div class="text-h6 q-my-md text-secondary text-bold">R$ 89,90</div>
            <ul class="text-left">
                <li><strong>Captação</strong> de Leads Ilimitados</li>
                <li><strong>Atenda 24h</strong> com <strong>link</strong> do chat IA da sua loja</li>
                <li><strong>Chat IA</strong> para seu estoque</li>
            </ul>
        </q-card-section>

        <q-separator />

        <q-card-section v-if="step === 1">
            <q-input filled color="secondary" v-model="formPayer.customer_name" label="Nome do Responsável*" />
            <q-input filled color="secondary" v-model="formPayer.login" label="Login da Loja*" class="q-mt-sm" />
            <q-input filled color="secondary" v-model="formPayer.password" type="password" label="Senha*"
                class="q-mt-sm" />
            <q-input filled color="secondary" v-model="formPayer.customer_email" label="E-mail*" class="q-mt-sm" />
            <q-input filled color="secondary" v-model="formPayer.customer_cellphone" label="Telefone*"
                class="q-mt-sm" />
            <q-input filled color="secondary" v-model="formPayer.cnpj" label="CNPJ*" class="q-mt-sm" />
        </q-card-section>

        <q-card-section v-else>
            <q-input filled color="secondary" v-model="formPayer.address_cep" label="CEP*" />
            <q-input filled color="secondary" v-model="formPayer.address_number" label="Número*" class="q-mt-sm" />
            <q-input filled color="secondary" v-model="formPayer.address_complement" label="Complemento"
                class="q-mt-sm" />
        </q-card-section>

        <q-card-actions align="center" class="q-mt-md">
            <q-btn v-if="step === 1" label="Próximo" color="secondary" glossy :disable="!isStepOneValid"
                @click="step++" />
            <q-btn v-else label="Área de Pagamento" color="secondary" glossy :disable="!isStepTwoValid"
                :href="urlInfinitePayDinamic" target="_blank" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(1)

const formPayer = ref({
    user_id: '123456789',
    customer_name: '',
    login: '',
    password: '',
    cnpj: '',
    customer_email: '',
    customer_cellphone: '',
    address_cep: '',
    address_complement: '',
    address_number: '',
})

const items = [
    {
        name: 'Plano Mensal - ChatCar IA',
        amount: 8990,
        quantity: 1,
    },
]

const inifityHandle = ref('samuelvictorol')

const isStepOneValid = computed(() => {
    const f = formPayer.value
    return (
        f.customer_name.trim() &&
        f.login.trim() &&
        f.password.trim() &&
        f.customer_email.trim() &&
        f.customer_cellphone.trim() &&
        f.cnpj.trim()
    )
})

const isStepTwoValid = computed(() => {
    const f = formPayer.value
    return (
        isStepOneValid.value &&
        f.address_cep.trim() &&
        f.address_number.trim()
    )
})

const urlInfinitePayDinamic = computed(() => {
    const f = formPayer.value
    const baseUrl = `https://checkout.infinitepay.io/${inifityHandle.value}`
    const params = new URLSearchParams({
        items: JSON.stringify(items),
        order_nsu: f.user_id,
        redirect_url: 'https://chatcar.netlify.app',
        customer_name: f.customer_name,
        customer_email: f.customer_email,
        customer_cellphone: f.customer_cellphone,
        address_cep: f.address_cep,
        address_complement: f.address_complement,
        address_number: f.address_number,
    }).toString()
    return `${baseUrl}?${params}`
})
</script>