import React from 'react';
import { QueryClientProvider, QueryClient} from 'react-query'
import Navigation from './src/Navigation'
import { Provider } from 'react-redux'
import Store from './src/store';
import {AppState} from 'react-native';

export const queryClient = new QueryClient();

export default function App() {
  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    }
  }, []);
  // React.useEffect(() => {
  //   (async function() {
  //     const update = await Updates.checkForUpdateAsync();
  //     if (update.isAvailable) {
  //       const updated = await Updates.fetchUpdateAsync();
  //       if (updated.isNew) {
  //         await Updates.reloadAsync()
  //       }
  //     }
  //   })();
  // })
  const _handleAppStateChange = (nextState) => {
    console.log(AppState.currentState);
  }
  return (
      <Provider store={Store}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </Provider>
  );
}

