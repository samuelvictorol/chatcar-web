<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center" style="min-height: 100vh">
                <q-card id="card-login" class="q-px-md q-py-md shadow-10 w100 q-mx-md" style="border-radius: 20px">
                    <q-card-section>
                        <div class="text-h5 text-weight-bold text-center"
                            :class="formType === 'login' ? 'text-teal' : 'text-teal'">
                            {{ formType === 'login' ? 'Login' : 'Criar Conta' }}
                        </div>
                    </q-card-section>

                    <q-form @submit.prevent="handleSubmit">
                        <q-card-section class="">

                            <!-- Nome (registro) -->
                            <q-input v-if="formType === 'register'" v-model="form.name" label="Nome completo" outlined
                                dense color="teal" :rules="[val => !!val || 'Informe seu nome']">
                                <template #prepend>
                                    <q-icon name="person" />
                                </template>
                            </q-input>

                            <!-- E-mail -->
                            <q-input v-model="form.email" label="E-mail" type="email" outlined dense color="teal"
                                :rules="[val => !!val || 'Informe seu e-mail']">
                                <template #prepend>
                                    <q-icon name="mail" />
                                </template>
                            </q-input>

                            <!-- Senha -->
                            <q-input class="" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                label="Senha" outlined dense color="teal"
                                :rules="[val => !!val || 'Informe sua senha']">
                                <template #prepend>
                                    <q-icon name="lock" />
                                </template>
                                <template #append>
                                    <q-icon :name="showPassword ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer" @click="showPassword = !showPassword" />
                                </template>
                            </q-input>

                            <!-- Confirmação de senha (registro) -->
                            <q-input class="" v-if="formType === 'register'" v-model="form.confirmPassword"
                                :type="showPassword ? 'text' : 'password'" label="Confirmar senha" outlined dense
                                color="teal" :rules="[val => val === form.password || 'As senhas não coincidem']">
                                <template #prepend>
                                    <q-icon name="lock_outline" />
                                </template>
                                <template #append>
                                    <q-icon :name="showPassword ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer" @click="showPassword = !showPassword" />
                                </template>
                            </q-input>

                            <!-- Botão de ação -->
                            <q-btn glossy :label="formType === 'login' ? 'Entrar' : 'Registrar'" type="submit"
                                color="secondary" class="w100 q-mt-sm q-pa-md" no-caps />

                            <!-- Link alternar -->
                            <div class="text-caption text-center text-grey-7">
                                <q-btn flat dense no-caps color="secondary" class="q-mt-sm text-bold "
                                    @click="toggleForm">
                                    {{ formType === 'login'
                                        ? 'Ainda não tem conta? Cadastre-se'
                                        : 'Já tem conta? Entrar' }}
                                </q-btn>
                                <br>
                                <q-btn label="voltar" no-caps flat color="primary" dense class="q-mt-sm" to="/" />
                            </div>
                        </q-card-section>
                    </q-form>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const formType = ref('login')
const showPassword = ref(false)

const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
})

function toggleForm() {
    formType.value = formType.value === 'login' ? 'register' : 'login'
    form.value = { name: '', email: '', password: '', confirmPassword: '' }
}

function handleSubmit() {
    if (formType.value === 'login') {
        console.log('Login:', form.value.email, form.value.password)
        // login API call
    } else {
        console.log('Registro:', form.value)
        // register API call
    }
}
</script>

<style scoped>
.q-card {
    border-radius: 20px;
}

.q-page {
    background-image: url('/login.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
}

.q-page::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    /* escurece a imagem de fundo */
    z-index: 0;
}

.q-card {
    position: relative;
    z-index: 1;
    /* para aparecer sobre o overlay */
}

@media (min-width: 700px) {
    #card-login {
        width: 40%;
    }
}

</style>