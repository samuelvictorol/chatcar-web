<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center" style="min-height: 100vh">
                <q-card id="card-login" class="q-px-md q-py-md shadow-10 w100 q-mx-md" style="border-radius: 20px">
                    <q-card-section>
                        <div class=" text-weight-bold text-center text-teal w100 row no-wrap items-center justify-between">
                             <div class="text-h5">{{ formType === 'login' ? 'Iniciar Sessão' : 'Criar Conta' }} </div>
                             <q-avatar size="50px" class="q-mr-sm">
                                <img src="/logo.jpeg" class="" alt="Logo" />
                            </q-avatar>
                        </div>
                    </q-card-section>

                    <q-form @submit.prevent="handleSubmit">
                        <q-card-section>
                            <q-input v-model="form.login" label="Login"
                                :prefix="(form.login.trim() != '' && formType === 'register') ? 'chatcar.me/' : ''"
                                color="teal" placeholder="Digite seu login público"
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
                                color="teal" :rules="[val => !!val || 'Informe sua senha']">
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
                            <q-toggle v-if="formType === 'register'" v-model="aceitaTermos"
                                label="Li e aceito os termos de uso" color="teal" />

                            <q-btn flat dense color="primary" no-caps @click="mostrarTermos = true"
                                v-if="formType === 'register'">
                                Ver Termos de Uso
                            </q-btn>
                            <q-btn v-if="!loading" :label="formType === 'login' ? 'Entrar' : 'Registrar'"
                                type="submit" color="teal" glossy class="w100 q-mt-md q-pa-md" no-caps />
                            <q-btn v-if="!loading" flat dense no-caps color="teal" class="w100 q-mt-sm text-bold"
                                to="/ia">
                                {{ formType === 'login' ? 'Ainda não tem conta? Cadastre-se' : 'Já tem conta? Entrar' }}
                            </q-btn>
                            <!-- <q-btn v-if="!loading" flat dense no-caps color="teal" class="w100 q-mt-sm text-bold"
                                @click="toggleForm">
                                {{ formType === 'login' ? 'Ainda não tem conta? Cadastre-se' : 'Já tem conta? Entrar' }}
                            </q-btn> -->
                            <q-btn v-if="formType === 'login'" flat dense no-caps color="primary" class="w100 q-mt-sm"
                                @click="mostrarRecuperarSenha = true">
                                Esqueci minha senha
                            </q-btn>
                            <q-btn v-if="!loading && formType == 'login'" label="Voltar" no-caps flat color="teal" dense
                                class="w100 q-mt-sm" to="/" />
                        </q-card-section>
                        <div v-if="loading" class="w100 q-mb-md row no-wrap items-center justify-center">
                            <q-spinner-ball color="teal" size="2em" />
                            <q-spinner-ball color="teal" size="2em" />
                            <q-spinner-ball color="teal" size="2em" />
                        </div>
                    </q-form>
                </q-card>
                <q-dialog v-model="mostrarRecuperarSenha" persistent>
                    <q-card style="min-width: 350px">
                        <q-card-section>
                            <div class="text-h6 text-teal">Redefinir Senha</div>
                            <div class="text-subtitle2">Informe seu e-mail cadastrado na ChatCar:</div>
                        </q-card-section>

                        <q-card-section>
                            <q-input v-model="emailRecuperacao" type="email" label="E-mail" outlined dense color="teal"
                                :rules="[val => !!val || 'Informe um e-mail válido']" >
                                <template #prepend>
                                    <q-icon name="mail" color="teal" />
                                </template>
                            </q-input>
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn flat label="Cancelar" color="teal" v-close-popup />
                            <q-btn label="Enviar" icon-right="send" color="teal" glossy @click="enviarRecuperacaoSenha" :disable="loading" />
                        </q-card-actions>
                    </q-card>
                </q-dialog>

                <q-dialog v-model="mostrarTermos">
                    <q-card style="max-width: 600px;">
                        <q-card-section>
                            <div class="text-h6"> <q-avatar size="50px" class="q-mr-sm">
                                    <img src="/logo.jpeg" class="" alt="Logo" />
                                </q-avatar><br>Termos de Uso da ChatCar</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section class="scroll" style="max-height: 400px; font-size: 0.9rem;">
                            <p>
                                Ao utilizar a plataforma ChatCar, você, usuário, concorda em fornecer seu nome e
                                telefone para que os
                                lojistas
                                possam entrar em contato diretamente com você por meio da plataforma.
                            </p>
                            <p>
                                O lojista se compromete a utilizar essas informações exclusivamente para o fim de
                                realizar abordagens
                                comerciais
                                com o objetivo de vender veículos anunciados em seu estoque.
                            </p>
                            <p>
                                Qualquer outro uso dos dados do usuário por parte do lojista, incluindo spam, revenda de
                                dados ou
                                contatos não relacionados à venda de veículos, é estritamente proibido e constitui
                                violação dos Termos
                                de Uso da ChatCar.
                            </p>
                            <p>
                                A ChatCar se reserva o direito de suspender ou banir lojistas que fizerem uso indevido
                                das informações
                                recebidas
                                por meio da plataforma.
                            </p>
                        </q-card-section>
                        <q-card-actions align="right">
                            <q-btn flat label="Fechar" color="teal" v-close-popup />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
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
const aceitaTermos = ref(false);
const mostrarTermos = ref(false);
const form = ref({
    login: '',
    name: '',
    email: '',
    contato: '',
    password: '',
    confirmPassword: ''
})
const mostrarRecuperarSenha = ref(false)
const emailRecuperacao = ref('')

async function enviarRecuperacaoSenha() {
    if (!emailRecuperacao.value) {
        $q.notify({ type: 'warning', message: 'Informe seu e-mail.' })
        return
    } else if (!emailRecuperacao.value.includes('@')) {
        $q.notify({ type: 'warning', message: 'Informe um e-mail válido.' })
        return
    }

    loading.value = true
    try {
        const { data } = await api.post('/esqueci-senha', {
            email: emailRecuperacao.value
        })

        $q.notify({ color: 'teal', position: 'top', icon: 'mail', message: data.message || 'Verifique seu e-mail.' })
        mostrarRecuperarSenha.value = false
        emailRecuperacao.value = ''
    } catch (err) {
        $q.notify({
            color: 'negative',
            position: 'top',
            icon: 'report_problem',
            message: err.response?.data?.error || 'Erro ao enviar nova senha.'
        })
    } finally {
        loading.value = false
    }
}

function toggleForm() {
    formType.value = formType.value === 'login' ? 'register' : 'login'
    form.value = { login: '', name: '', email: '', contato: '', password: '', confirmPassword: '' }
}

async function recuperarSenha() {
    if (!form.value.login && !form.value.email) {
        $q.notify({
            type: 'warning',
            message: 'Informe seu e-mail para recuperar a senha.'
        });
        return;
    }

    loading.value = true;
    try {
        const { data } = await api.post('/esqueci-senha', {
            email: form.value.email || form.value.login  // login pode ser o e-mail
        });

        $q.notify({
            color: 'teal',
            icon: 'mail',
            message: data.message || 'Verifique seu e-mail.'
        });
    } catch (err) {
        $q.notify({
            color: 'red',
            icon: 'report_problem',
            message: err.response?.data?.error || 'Erro ao recuperar senha.'
        });
    } finally {
        loading.value = false;
    }
}


async function handleSubmit() {
    loading.value = true
    if (!aceitaTermos.value && formType.value != 'login') {
        $q.notify({ type: 'warning', message: 'Você precisa aceitar os termos de uso para continuar.' });
        loading.value = false;
        return;
    }

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
            router.push('/me')
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
            $q.notify({ color: 'teal', position: 'top', icon: 'redeem', message: 'Você recebeu 48 horas de ChatCar de graça 💚' })
            router.push('/me/planos')
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