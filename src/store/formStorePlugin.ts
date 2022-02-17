import { PiniaPluginContext } from 'pinia';

interface FormStoreOptions<Store> {
  enableDirtyWarning?: boolean;
  onSubmit?: (options: Store) => void;
}

declare module 'pinia' {
  // export interface PiniaCustomProperties {
  //   // todo
  // }

  export interface PiniaCustomStateProperties<S> {
    isSaving: boolean;
    isDirty: boolean;
    error: string | undefined;
  }

  export interface DefineStoreOptionsBase<S, Store> {
    formStore: boolean | FormStoreOptions<Store>;
  }
}

export default function formStorePlugin(context: PiniaPluginContext): void {
  /* eslint-disable no-param-reassign */
  if (!context.options.formStore) return; // do nothing.

  const options = context.options.formStore === true ? {} : context.options.formStore;
  const { store } = context;

  // assign some state
  store.isSaving = false;
  store.isDirty = false;
  store.error = undefined;

  // subscriptions
  store.$subscribe((mutation, newState) => {
    // react to store changes
    store.isDirty = true;
  });

  store.$onAction(({
    name, store: s, after, onError,
  }) => {
    if (name === 'submit') {
      s.isSaving = true;
      after(() => {
        // success!
        s.isSaving = false;
        s.isDirty = false;
      });
      onError((error) => {
        s.error = (error as Error).message;
        s.isSaving = false;
      });
    }
  });

  /* eslint-enable no-param-reassign */
}
