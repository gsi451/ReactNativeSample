/**
 * TouchableOpacity를 이용한 버튼 예제
 */

import React, {useState, userEffect, Component} from 'react';
import {TextInput, Button, TouchableOpacity, StyleSheet, Text, View} from 'react-native';

const MyButton = () => {

  state = {
    text: 'Empty',
  }
  
  const [time, setTime] = React.useState(new Date().toLocaleString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());

      // 최초 time의 값만 가져오게 된다.
      //this.state.text = time;

    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  submitBtn = () => {
    /*  // 객체 배열을 이렇게 해서 출력해볼 수 있다.
    for (var key in time) {
        console.log("key: " + key + " / " + time[key])
    }
    */
    // 버튼을 누르면 해당 time의 값을 state에 추가를 하고
    // 그 값을 Alert 에 출력은 가능하다.
    this.state.text = time;
    //console.log(this.state.text);
    alert(this.state.text);
  }

  return (
    <TouchableOpacity
      style = {styles.myButton}
      //onPress = {() => alert({time})}
      onPress = {this.submitBtn}
    >
      <Text style={styles.myButtonText}>{time}</Text>
    </TouchableOpacity>
  );
};

// setState() 함수를 사용할려면 Component를 상속받아서 해야 하나?
//const App = () => {
class App extends Component {
  state = {
    text: '',
    inputText: '' 
  }

  submitBtn = () => {
    console.log(this.state.inputText);
    this.setState({text: this.state.inputText});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          시간값이 표시되는 버튼과 클릭시 Alert 표시
        </Text>
        <MyButton/>
  
        <Text style={styles.title2}>
          TextInput 입력내용 가져오기
        </Text>
        <TextInput
            style={styles.textInput}
            onChangeText={(tinput) => {this.setState({inputText: tinput})}}
            placeholder="값을 입력해주세요."
          />
        <Button title="가져오기" onPress = {this.submitBtn} />
        <Text style = {styles.showText}>{this.state.text}</Text>
      </View>
    );
  }
};

/*
// setState() 함수를 사용할때 이 코드로 하게 되면
// Uncaught Error
// undefined is not a function 이라고 나옴
// Component를 상속 받아야 setState()를 사용할 수 있다.
const App = () => {
    state = {
      text: '',
      inputText: '' 
    }
  
    submitBtn = () => {
      console.log(this.state.inputText);
      this.setState({text: this.state.inputText});
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Button Sample
        </Text>
        <MyButton/>
  
        <Text style={styles.title2}>
          TextInput 입력내용 가져오기
        </Text>
        <TextInput
            style={styles.textInput}
            onChangeText={(tinput) => {this.setState({inputText: tinput})}}
            placeholder="값을 입력해주세요."
          />
        <Button title="가져오기" onPress = {this.submitBtn} />
        <Text style = {styles.showText}>{this.state.text}</Text>
      </View>
    );
  };
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  title2: {
    fontSize: 20,
    marginTop: 20,
  },
  myButton: {
    backgroundColor: '#3490db',
    padding: 14,
    margin: 10,
    borderRadius: 10,
  },
  myButtonText: {
    color: '#fff',
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
});

export default App;