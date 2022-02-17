<template>
  <form @submit.prevent="submit">
    <p v-if="store.isSaving">
      SAVING! (2 Second delay)
    </p>
    <p v-else-if="store.error">
      ERROR: {{ store.error }}
    </p>
    <p v-else-if="result">
      {{ result }}
    </p>
    <p>
      Is Dirty? {{ store.isDirty ? 'Yes' : 'No' }}
    </p>
    <p>
      <b>Foo:</b><br />
      <input type="text" v-model="testModel" />
    </p>
    <p>
      <button type="submit">Submit</button> &nbsp;
      <button type="button" @click.prevent="submitError">Submit & error</button>
    </p>

  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import usePickupFormStore from '@/store/pickupFormStore';

const store = usePickupFormStore();

const result = ref('');

const testModel = computed({
  get() {
    return store.foo;
  },
  set(value: string) {
    console.log('PING');
    store.foo = value;
  },
});

const submit = async () => {
  const res = await store.submit();
  result.value = JSON.stringify(res);
};

const submitError = async () => {
  store.causeError = true;
  const res = await store.submit();
  result.value = JSON.stringify(res);
};

</script>
