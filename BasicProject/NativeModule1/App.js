/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
} from 'react-native';

const {SampleModule} = NativeModules;

const App: () => Node = () => {

  const testCall = () => {
    SampleModule.sendMsg(' 샘플 ');
    SampleModule.listenEvent(msg => {
      console.log(msg);
    });    
  }

  return (
    <View style={styles.container}>
      <Text>Android Native Sample</Text>      
      <Button title="샘플 테스트" onPress={testCall} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
