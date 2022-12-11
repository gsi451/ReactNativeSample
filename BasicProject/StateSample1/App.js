/**
 * State 샘플 
 */

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import BlinkEx from './BlinkEx';
import StateTest from './StateTest';

const Blink = (props) => {
  const [isShowingText, setIsShowingText] = useState(true);

  useEffect(() => {
    const toggle = setInterval(() => { setIsShowingText(!isShowingText); }, 1000)

    return () => clearInterval(toggle);
  });

  if (!isShowingText) {
    return null;
  }

  return (
    <Text style={[props.style, {color: props.color}]}>{props.text}</Text>
  );
};

const BlinkApp = () => {

  const [value, setValue] = useState('Hello');
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <StateTest/>

      <Text>{count}</Text>
      <Button title="useState 변경(+1)" onPress={() => setCount(count + 1)}/>

      <Text>{value}</Text>
      <Button title="값 변경(Hello -> World!)" onPress={() => {setValue((value == 'Hello') ? 'World!' : 'Hello')}}/>
      
      <Blink style={styles.blink} color='red' text='Blink 1' />
      <BlinkEx style={styles.blink} color='blue' text='Blink 2' />      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  blink: {
    fontSize: 20,
  },
});

export default BlinkApp;