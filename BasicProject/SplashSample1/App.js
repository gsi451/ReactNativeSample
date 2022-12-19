/**
 * Splash 샘플
 * https://github.com/gsi451/ReactNativeSample/tree/main/BasicProject/SplashSample1
 * 안드로이드 네이티브 모듈을 직접 구현한 Splash 샘플 예제
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
} from 'react-native';

const {GsiSplash} = NativeModules;

const App: () => Node = () => {

  useEffect(() => {
       GsiSplash.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Android Splash Sample</Text>      
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
