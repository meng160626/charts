import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
	id: 'main',
	state: () => ({
		theme: 'dew'
	}),
	getters: {
		getTheme: state => state.theme
	},
	actions: {
		changeTheme(theme: string) {
			this.theme = theme;
		}
	}
})
