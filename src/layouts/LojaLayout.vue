<template>
    <q-layout view="hHh lpR fFf">

        <q-header class="bg-dark text-white">
            <q-toolbar>
                <q-toolbar-title class="text-h6 row items-center no-wrap">
                    <q-avatar size="50px" class="q-mr-sm">
                        <img src="/logo.jpeg" alt="Logo" />
                    </q-avatar>
                    <div class="animate__animated animate__fadeInLeft animate__slower">
                        ChatCar
                    </div>
                </q-toolbar-title>
                <div class="row no-wrap items-center">
                    <q-btn label="sair" color="grey-4" flat to="/" />
                    <q-btn color="white" glossy class="text-black q-ml-xs" icon="menu" label="menu"
                        @click="rightDrawerOpen = !rightDrawerOpen" />
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered class="relative bg-grey-1">
            <div class="w100 text-h6 row no-wrap justify-between q-px-sm q-py-md">
                <div>MENU</div>
                <q-btn icon="close" glossy dense @click="rightDrawerOpen = !rightDrawerOpen"></q-btn>
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
            <div v-if="user" class="w100 text-left q-px-sm q-py-md text-grey-7">
                chatcar.me/{{ user.login }}
            </div>
            <q-separator />
            <div class="w100 text-right q-px-sm q-pt-xl text-grey-7">
                @chatcar.ia
            </div>
            <q-separator />
            <div class="w100 text-right q-px-sm q-pt-xl text-grey-7">
                <q-btn color="orange-14" @click="logout()" dense class="q-px-sm text-white q-mr-xs" flat
                    icon-right="logout" label="Logout" />
            </div>
        </q-drawer>

        <q-page-container class="bg-grey-3">
            <router-view />
            <footer class="w100 text-center q-py-md bg-dark text-white">
                ChatCar IA ®<br>
                Todos os direitos reservados<br>
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
        to: '/loja'
    },
    {
        label: 'Estoque',
        icon: 'directions_car',
        to: '/loja/estoque'
    },
    {
        label: 'Clientes e Leads',
        icon: 'groups',
        to: '/loja/leads'
    },
    {
        label: 'Planos',
        icon: 'currency_exchange',
        to: '/loja/planos'
    },
    {
        label: 'Ajuda',
        icon: 'contact_support',
        to: '/loja/ajuda'
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