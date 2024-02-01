import React from 'react';
import {OsmiProvider} from 'osmicsx';
import {Provider as ReduxProvider} from 'react-redux';
import theme from '../osmi.config.js';
import {store} from './configs/redux-store.config';
import MyNavigationContainer from './navigations';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <OsmiProvider theme={theme}>
          <MyNavigationContainer />
        </OsmiProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
