import React from 'react';
import { QueryClientProvider, QueryClient} from 'react-query'
import { RecoilRoot } from 'recoil'
import Navigation from './src/Navigation'

export const queryClient = new QueryClient();

export default function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

