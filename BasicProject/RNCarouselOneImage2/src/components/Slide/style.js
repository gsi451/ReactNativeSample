import { StyleSheet, Dimensions } from 'react-native'
import { cardparentheight, imageHeight, imageWidth, cardPadding } from '../../config'
const { width: screenWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  slide: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    //paddingHorizontal: cardPadding,
    backgroundColor: '#23af87',
    height: cardparentheight,
  },
  slideitem: {
    flexDirection: 'row',
  },
  imageCard: {
    width: imageWidth,
    height: imageHeight
  },
  button: {
    width: 80,
    height: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#707070',
    //borderStyle: 'dotted',
    //borderStyle: 'dashed',
},
});

export default styles