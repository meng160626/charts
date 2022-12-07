<template>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
        <setting-vue></setting-vue>
    </main>
</template>

<script setup lang='ts'>
import SettingVue from "@/components/set/Setting.vue";
import { useThemeStore } from '@/stores/theme';
import { onMounted, onUnmounted } from "vue";

// 主题控制
const themeStore = useThemeStore();
onMounted(() => {
    // 初始化页面主题
    document.querySelector('#app')?.classList.add(themeStore.theme);
});
</script>

<style lang="scss">
@font-face {
    font-family: 'PangMenZhengDao';
    src: url('assets/fonts/PangMenZhengDao.ttf');
}
main {
	height: 100%;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>