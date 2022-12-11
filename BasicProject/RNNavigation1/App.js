import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// https://code-masterjung.tistory.com/126
// Navigation의 navigate(), push() 2개의 차이
// navigate() 는 새로 이동할 화면이 현재 화면과 같으면 새로운 화면을 쌓지 않고 파라미터만 변경한다.
// 따라서 화면 전환효과도 없고 뒤로 가기를 눌렀을때 스택으로 안쌓고 있기 때문에 처음 진입 화면으로 돌아 간다.
// push() 는 navigate()와 반대이다.

// pop() : 뒤로 가기 (이전화면으로 이동)
// popToTop() : 뒤로 가기 (가장 첫 번째 화면으로 이동)

// route라는 Props도 받아온다.
// navigation.push('Detail', {id: 1}) 라고 되어 있으면
// Detail 화면에서 {route.params.id} 로 값을 사용할 수 있다.

// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Text>HomeScreen</Text>
      <Button
        title="Go to HomeScreen2"
        onPress={ () => navigation.navigate('Home2')}
      />
    </View>
  )
}

const HomeScreen2 = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Text>HomeScreen2</Text>
      <Button
        title="Go to HomeScreen2"
        onPress={ () => navigation.push('Home2')}
      />
      <Button 
        title="Go to Home"
        onPress={ () => navigation.navigate('Home')}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

const DetailsScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.push('Details2')}
      />
    </View>
  )
}

const DetailsScreen2 = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Text>Details Screen2</Text>
      <Button
        title="Go to Details2 again"
        onPress={ () => navigation.push('Details2')}
      />
      <Button 
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      <Button 
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  )
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Home2" component={HomeScreen2} />
    </HomeStack.Navigator>
  )
}

const DetailStack = createStackNavigator();
function DetailStackScreen() {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen name="Details" component={DetailsScreen} />
      <DetailStack.Screen name="Details2" component={DetailsScreen2} />
    </DetailStack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>        
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Details" component={DetailStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App;