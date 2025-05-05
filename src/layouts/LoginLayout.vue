<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center" style="min-height: 100vh">
                <q-card id="card-login" class="q-px-md q-py-md shadow-10 w100 q-mx-md" style="border-radius: 20px">
                    <q-card-section>
                        <div class="text-h5 text-weight-bold text-center text-teal">
                            {{ formType === 'login' ? 'Login' : 'Criar Conta' }}
                        </div>
                    </q-card-section>

                    <q-form @submit.prevent="handleSubmit">
                        <q-card-section>
                            <q-input v-model="form.login" label="Login" outlined dense color="teal"
                                :rules="[val => !!val || 'Login é obrigatório']">
                                <template #prepend>
                                    <q-icon name="account_circle" color="teal" />
                                </template>
                            </q-input>

                            <q-input v-if="formType === 'register'" v-model="form.name" label="Nome completo" outlined
                                dense color="teal" :rules="[val => !!val || 'Informe seu nome']">
                                <template #prepend>
                                    <q-icon name="person" color="teal" />
                                </template>
                            </q-input>

                            <q-input v-if="formType === 'register'" v-model="form.email" label="E-mail" type="email"
                                outlined dense color="teal" :rules="[val => !!val || 'Informe seu e-mail']">
                                <template #prepend>
                                    <q-icon name="mail" color="teal" />
                                </template>
                            </q-input>

                            <q-input v-if="formType === 'register'" v-model="form.contato" label="Contato"
                                mask="(##) #####-####" type="tel" outlined dense color="teal"
                                :rules="[val => !!val || 'Informe seu contato']">
                                <template #prepend>
                                    <q-icon name="phone" color="teal" />
                                </template>
                            </q-input>

                            <q-input v-model="form.password" :type="showPassword ? 'text' : 'password'" label="Senha"
                                outlined dense color="teal" :rules="[val => !!val || 'Informe sua senha']">
                                <template #prepend>
                                    <q-icon name="lock" color="teal" />
                                </template>
                                <template #append>
                                    <q-icon :name="showPassword ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer" @click="showPassword = !showPassword" />
                                </template>
                            </q-input>

                            <q-input v-if="formType === 'register'" v-model="form.confirmPassword"
                                :type="showPassword ? 'text' : 'password'" label="Confirmar senha" outlined dense
                                color="teal" :rules="[val => val === form.password || 'As senhas não coincidem']">
                                <template #prepend>
                                    <q-icon name="lock_outline" color="teal" />
                                </template>
                                <template #append>
                                    <q-icon :name="showPassword ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer" @click="showPassword = !showPassword" />
                                </template>
                            </q-input>

                            <q-btn glossy :label="formType === 'login' ? 'Entrar' : 'Registrar'" type="submit"
                                color="teal-14" class="w100 q-mt-sm q-pa-md" no-caps />

                            <q-btn flat dense no-caps color="teal" class="w100 q-mt-sm text-bold" @click="toggleForm">
                                {{ formType === 'login' ? 'Ainda não tem conta? Cadastre-se' : 'Já tem conta? Entrar' }}
                            </q-btn>
                            <q-btn label="Voltar" no-caps flat color="teal" dense class="w100 q-mt-sm" to="/" />
                        </q-card-section>
                        <div v-if="loading" class="w100 q-mb-md row no-wrap items-center justify-center">
                            <q-spinner-ball color="teal" size="2em" />
                            <q-spinner-ball color="teal" size="2em" />
                            <q-spinner-ball color="teal" size="2em" />
                        </div>
                    </q-form>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const formType = ref('login')
const showPassword = ref(false)
const loading = ref(false)

const form = ref({
    login: '',
    name: '',
    email: '',
    contato: '',
    password: '',
    confirmPassword: ''
})

function toggleForm() {
    formType.value = formType.value === 'login' ? 'register' : 'login'
    form.value = { login: '', name: '', email: '', contato: '', password: '', confirmPassword: '' }
}

async function handleSubmit() {
    loading.value = true
    if (formType.value === 'login') {
        try {
            const { data } = await api.post('/login', {
                login: form.value.login,
                password: form.value.password
            })
            const token = data.loja.password
            delete data.loja.password
            data.loja.token = token
            localStorage.setItem('user', JSON.stringify(data.loja))
            $q.notify({
                color: 'teal',
                position: 'top',
                message: 'Bem-vindo, ' + data.loja.login,
                icon: 'directions_car'
            })
            router.push('/loja')
        } catch (err) {
            $q.notify({
                color: 'dark',
                position: 'top',
                message: err.response?.data?.error || 'Erro no login',
                icon: 'report_problem'
            })
        } finally {
            loading.value = false
        }
    } else {
        if (!form.value.login || !form.value.name || !form.value.email || !form.value.contato || !form.value.password) {
            $q.notify({ type: 'warning', message: 'Preencha todos os campos obrigatórios.' })
            loading.value = false
            return
        }
        try {
            const { data } = await api.post('/registrar', {
                login: form.value.login,
                password: form.value.password,
                nome: form.value.name,
                email: form.value.email,
                contato: form.value.contato,
                cnpj: '',
            })
            const token = data.password
            delete data.password
            data.token = token
            localStorage.setItem('user', JSON.stringify(data))

            $q.notify({ color: 'teal', position: 'top', icon: 'person_add', message: 'Conta criada com sucesso!' })
            router.push('/loja')
        } catch (err) {
            $q.notify({
                color: 'dark',
                icon: 'error',
                position: 'top',
                message: err.response?.data?.error || 'Erro ao registrar'
            })
        } finally {
            loading.value = false
        }
    }
}
</script>

<style scoped>
.q-page {
    background-image: url('/login.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    position: relative;
}

.q-page::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 0;
}

.q-card {
    position: relative;
    z-index: 1;
}

@media (min-width: 700px) {
    #card-login {
        width: 40%;
    }
}
</style>