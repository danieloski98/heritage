import React from 'react';
import { QueryClientProvider, QueryClient} from 'react-query'
import { RecoilRoot } from 'recoil'
import Navigation from './src/Navigation'
import { Provider } from 'react-redux'
import Store from './src/store';
import * as Updates from 'expo-updates';

export const queryClient = new QueryClient();

export default function App() {
  React.useEffect(() => {
    (async function() {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        const updated = await Updates.fetchUpdateAsync();
        if (updated.isNew) {
          await Updates.reloadAsync()
        }
      }
    })();
  })
  return (
      <Provider store={Store}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </Provider>
  );
}

