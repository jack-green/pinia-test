<template>
  <form @submit.prevent="submit">
    <div v-if="store.isSaving">
      SAVING! (2 Second delay)
    </div>
    <div v-if="store.error">
      ERROR: {{ store.error }}
    </div>
    <input type="text" @v-model="testModel" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import usePickupFormStore from '@/store/pickupFormStore';

const store = usePickupFormStore();

const testModel = computed({
  get() {
    return store.foo;
  },
  set(value: string) {
    store.foo = value;
  },
});

const submit = () => {
  store.submit();
};

</script>
