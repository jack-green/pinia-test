import { PiniaPluginContext } from 'pinia';

interface FormStoreOptions<Store> {
  enableDirtyWarning?: boolean;
  onSubmit?: (options: Store) => void;
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    submit: () => void;
  }

  export interface PiniaCustomStateProperties<S> {
    isSaving: boolean;
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

  // assign some state
  context.store.isSaving = false;

  // assign some methods
  context.store.submit = async () => {
    if (!options.onSubmit) {
      alert('Error: Not submit handler specified in form options');
      return;
    }

    context.store.isSaving = true;

    // todo: validattion?

    try {
      await options.onSubmit(context.store);
    } catch (error) {
      context.store.error = (error as Error).message;
      throw (error);
    } finally {
      context.store.isSaving = false;
    }
  };

  /* eslint-enable no-param-reassign */
}
