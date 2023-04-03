<template>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<script setup lang='ts'>
</script>

<style lang="scss">
@import './scss/btn.scss';
@import './scss/custom-editor.scss';
@import './scss/scroll.scss';
@font-face {
    font-family: 'PangMenZhengDao';
    src: url('assets/fonts/PangMenZhengDao.ttf');
}

@font-face {
    font-family: 'HuXiaoBo-NanShen';
    src: url('assets/fonts/HuXiaoBo-NanShen.otf');
}

@font-face {
    font-family: 'AliHYAiHei';
    src: url('assets/fonts/AliHYAiHei.ttf');
}

@font-face {
    font-family: 'YouSheBiaoTiHei';
    src: url('assets/fonts/YouSheBiaoTiHei.ttf');
}

@font-face {
    font-family: 'ZhenyanGB';
    src: url('assets/fonts/ZhenyanGB.ttf');
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
.scroll-y {
    height: 100%;
    overflow-y: scroll;
}
.module {
    .title {
        font-size: 30px;
        font-family: var(--fontFamily);
        display: flex;
        gap: .6em;

        &::before {
            display: inline-block;
            width: 8px;
            height: 30px;
            content: '';
            background: #2260ff;
        }
    }
}
</style>