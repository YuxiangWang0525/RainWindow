import { defineStore } from 'pinia';

export const useKeyStore = defineStore('key', {
    state: () => ({
        key: localStorage.getItem('key') || ''
    }),
    actions: {
        setKey(newKey) {
            this.key = newKey;
            localStorage.setItem('key', newKey);
        }
    },
});