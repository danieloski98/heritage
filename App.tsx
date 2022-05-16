import React from 'react';
import { QueryClientProvider, QueryClient} from 'react-query'
import Navigation from './src/Navigation'
import { Provider } from 'react-redux'
import Store from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const queryClient = new QueryClient();

export default function App() {
  return (
      <Provider store={Store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </Provider>
  );
}

