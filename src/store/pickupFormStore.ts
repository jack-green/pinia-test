import { defineStore } from 'pinia';

const usePickupFormStore = defineStore('pickupFormStore', {
  formStore: {
    onSubmit: () => new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('This is a test error'));
      }, 2000);
    }),
  },
  state: () => ({
    foo: 'bar',
  }),
});

export default usePickupFormStore;
