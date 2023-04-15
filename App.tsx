import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {THEME} from './src/styles/theme';
import Routes from './src/routes';

function App(): JSX.Element {
  return (
    <NativeBaseProvider theme={THEME}>
      <Routes />
    </NativeBaseProvider>
  );
}

export default App;
