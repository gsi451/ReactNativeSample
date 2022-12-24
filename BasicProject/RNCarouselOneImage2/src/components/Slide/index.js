import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './style';
/*
class CarouselSlide extends Component {
  render() {
    const { cards } = this.props
    console.log('draw card:' + cards);
    return <View style={styles.slide}>
      {cards.map((card, index) => {
        return <Image source={{ uri: card.url }} style={styles.imageCard} key={index} />
      })}
    </View>

  }
}
*/

class CarouselSlide extends Component {
  onPress = () => {
    console.log('버튼 클릭 : ');
  };

  render() {
    const {job} = this.props;
    //console.log('draw card:' + job);
    return (
      <View style={[styles.slide]}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 14, color: '#000'}}>{job[0].pos}</Text>
          </View>
          <TouchableOpacity
            key={job[0].key}
            onPress={this.onPress}
            style={[styles.button]}>
            <Text style={{fontSize: 13, color: '#303441', fontWeight: '400'}}>
              Click
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CarouselSlide;
