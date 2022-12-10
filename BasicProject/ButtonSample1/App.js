import React from 'react';
import {Text, View, Button, StyleSheet, Alert} from 'react-native';
import * as OuterFileAlert from './OuterFileAlert';

const OuterAlert = () => {
  Alert.alert("Alert", "App 함수 밖의 Alert창!!")
};

const App = () => {
    capAlert = () => {
      this.alert('내부 함수 Alert창!!')
    }
  
    return (
        <View style={[styles.container]}>
              <Text style={styles.title}>버튼 예제</Text>

              {/* 버튼 onPress에 Alert() 함수를 바로 호출 */}
              <View style={[styles.container2]}>
                <Button title="Button 1" onPress={() => alert('Click !!')} />
              </View>

              {/* App 함수 내부에 capAlert()를 선언하고 호출 */}
              <View style={[styles.container2]}>
                <Button title="Button 2" onPress={this.capAlert} />
              </View>

              {/* App 함수 외부에 OuterAlert()를 선언하고 호출 */}
              <View style={[styles.container2]}>
                <Button title="Button 3" onPress={() => OuterAlert()} />
              </View>              

              {/* OuterFileAlert.js 파일을 생성하고 alert2()함수를 선언하고 호출 */}
              <View style={[styles.container2]}>
                <Button title="Button 4" onPress={() => OuterFileAlert.alert2()} />
              </View>                   
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
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  container2: {
    paddingBottom: 5,
  },
});

export default App;