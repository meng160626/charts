import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
	id: 'main',
	state: () => ({
		theme: 'blue',
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
