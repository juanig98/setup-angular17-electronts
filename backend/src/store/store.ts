import Store from 'electron-store';

export const initStores = () => {
  const store = new Store();

  console.log(store);
  if (!store.get('userPreferences')) {
    store.set('userPreferences', {});
  }
}


