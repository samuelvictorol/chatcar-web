<template>
    <q-layout view="hHh lpR fFf">

        <q-header class="bg-blue-grad-2 text-white">
            <q-toolbar>
                <q-toolbar-title class="text-h6 row items-center no-wrap">
                    <q-avatar size="38px" class="cursor-pointer text-black animate__animated animate__zoomIn animate__slower animate__delay-1s">
                        <img :src="user.img_url ? user.img_url : '/logo.jpeg'" alt="Logo" @click="router.push('/')"/>
                    </q-avatar>
                </q-toolbar-title>
                <div class="row no-wrap items-center">
                    <q-btn color="grey-4" @click="logout()" dense class="text-white q-mr-sm" flat
                    icon-right="login" label="Sair" />
                    <q-btn   class="text-white header-2 text-white" icon="menu" label="menu"
                        @click="rightDrawerOpen = !rightDrawerOpen" />
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered class="relative bg-grey-1">
            <div class="w100 text-h6 row no-wrap justify-between q-px-sm q-py-md">
                <div>MENU</div>
                <q-btn icon="close" dense @click="rightDrawerOpen = !rightDrawerOpen"></q-btn>
            </div>
            <q-separator />
            <q-list class="q-py-sm q-px-sm">
                <q-item v-for="(option, index) in menuOptions" :key="index" :to="option.to" class="q-pl-sm q-py-xs">
                    <q-item-section avatar>
                        <q-icon :name="option.icon" size="2em" color="dark" />
                    </q-item-section>
                    <q-item-section>
                        {{ option.label }}
                    </q-item-section>
                </q-item>
            </q-list>
            <q-separator />
            <div class="w100 column q-mt-md">
                <div class="w50">
                    <q-btn to="/me/planos" class="bg-blue-grad-2 q-px-sm text-white q-mb-sm q-ml-md "
                    icon-right="currency_exchange" label="Renovar" />
                    <q-btn to="/me/ajuda" class="bg-blue-grad-2 q-ml-md  q-mb-md q-px-sm text-white"
                    icon-right="contact_support" label="Ajuda" />
                </div>
            </div>
            <q-separator />
            <div v-if="user" class="w100 text-left q-px-sm q-py-md text-grey-7">
                🔗 chatcar.me/{{ user.login }}
            </div>
            <!-- <div class="w100 text-right q-px-sm q-pt-md text-grey-7">
                @chatcar.ia
            </div> -->
        </q-drawer>

        <q-page-container class="bg-grey-4">
            <router-view />
            <footer class="w100 text-center q-py-md bg-blue-grad text-white">
                <a class="text-white" style="text-decoration: none;opacity: .7;" href="chatcar.me">ChatCar IA ® - chatcar.suporte@gmail.com</a>
            </footer>
        </q-page-container>

    </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const rightDrawerOpen = ref(true)
const $q = useQuasar()
const router = useRouter()
const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
const menuOptions = ref([
    {
        label: 'Início',
        icon: 'store',
        to: '/me'
    },
    {
        label: 'Estoque',
        icon: 'directions_car',
        to: '/me/estoque'
    },
    {
        label: 'Clientes e Leads',
        icon: 'groups',
        to: '/me/leads'
    },

])
function logout() {
    const confirm = window.confirm('Deseja realmente encerrar a sessão no ChatCar?')
    if (confirm) {
        localStorage.clear()
        window.open('https://chatcar.me', '_self');
    }
}
onBeforeMount(() => {
    const user = localStorage.getItem('user')
    if (!user) {
        $q.notify({
            color: 'dark',
            position: 'top',
            message: 'Você deve estar logado para acessar o seu painel.',
            icon: 'account_circle',
        })
        router.push('/login')
    }
})

</script>