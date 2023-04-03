import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIdentityStore = defineStore({
    id: 'identity',
	state: () => ({
		status: true
	}),
	getters: {
		getStatus: state => state.status
	},
	actions: {
		success() {
			this.status = true;
		}
	}
})
