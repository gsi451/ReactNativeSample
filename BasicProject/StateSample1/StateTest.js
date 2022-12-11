import React from 'react';
import {Button, Text, View} from 'react-native';

class StateTest extends React.Component {
    state = { count: 0 };

    change = () => {
        this.setState(previousState => ({ count: previousState.count + 1 }));
    }

    render() {
        return (
            <View>
                <Text>{this.state.count}</Text>
                <Button title="state 변경(+1)" onPress={this.change}/>
                <Button title="state 변경(-1)" onPress={() => this.setState(previousState => ({ count: previousState.count - 1 }))}/>
            </View>
        );
    }
};

export default StateTest;


//이거 git에 올리자
//readme 내용도 추가를 하고