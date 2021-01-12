import * as React from 'react';
import { Button, View, Text, Icon } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Route from './Route';

function App() {
  return (
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
  );
}

export default App;