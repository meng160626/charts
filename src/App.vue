<template>
    <main>
		  <router-view />
      <setting-vue></setting-vue>
    </main>
</template>

<script setup lang='ts'>
import SettingVue from "@/components/Setting.vue";

</script>

<style scoped lang="scss">
main {
	height: 100%;
}
</style>