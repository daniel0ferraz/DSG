import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {THEME} from './src/styles/theme';
import Routes from './src/routes';
import {RealmProvider} from './src/databases/realm';

function App(): JSX.Element {
  return (
    <RealmProvider>
      <NativeBaseProvider theme={THEME}>
        <Routes />
      </NativeBaseProvider>
    </RealmProvider>
  );
}

export default App;
