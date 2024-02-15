import AppContainer from 'components/AppContainer';
import AppNavigator from 'navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import {Provider} from 'react-redux';
import store from 'src/store';

const queryClient = new QueryClient()

const App = () => {
  
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </QueryClientProvider>
    </Provider>
  );
};

export default App;
