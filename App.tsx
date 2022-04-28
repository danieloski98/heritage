import React from 'react';
import { QueryClientProvider, QueryClient} from 'react-query'
import Navigation from './src/Navigation'
import { Provider } from 'react-redux'
import Store from './src/store';
import {AppState} from 'react-native';

export const queryClient = new QueryClient();

export default function App() {
  return (
      <Provider store={Store}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </Provider>
  );
}

