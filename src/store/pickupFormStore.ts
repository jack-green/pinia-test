import { defineStore } from 'pinia';

const usePickupFormStore = defineStore('pickupFormStore', {
  formStore: true,
  state: () => ({
    foo: 'bar',
    causeError: false,
  }),
  actions: {
    submit() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.causeError) {
            reject(new Error('This is a test error'));
          } else {
            resolve(this.$state);
          }
        }, 2000);
      });
    },
  },
});

export default usePickupFormStore;
