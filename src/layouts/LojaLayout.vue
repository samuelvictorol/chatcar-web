<template>
    <q-layout view="hHh lpR fFf">

        <q-header class="bg-dark text-white">
            <q-toolbar>
                <q-toolbar-title>
                    PRIMAVIA
                </q-toolbar-title>
                <div class="row no-wrap items-center">
                    <q-btn label="sair" color="grey-4" flat class="full-width" to="/" />
                    <q-btn color="white" glossy class="text-black q-ml-md" icon="menu"
                        @click="rightDrawerOpen = !rightDrawerOpen" />
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="rightDrawerOpen" side="left" bordered class="relative bg-grey-1">
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
            <q-separator />
            <div class="w100 text-right q-px-sm q-py-md text-grey-7">
                ChatCar IA®
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
import { ref } from 'vue'
const rightDrawerOpen = ref(false)
const menuOptions = ref([
    {
        label: 'Início',
        icon: 'store',
        to: '/loja'
    },
    {
        label: 'Leads Captados',
        icon: 'groups',
        to: '/loja/leads'
    },
    {
        label: 'Estoque',
        icon: 'directions_car',
        to: '/loja/estoque'
    },

    {
        label: 'Ajuda',
        icon: 'contact_support',
        to: '/loja/ajuda'
    },

])

</script>