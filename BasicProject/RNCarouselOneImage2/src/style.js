import { StyleSheet } from 'react-native'
import { cardparentheight, imageHeight } from './config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    width: '100%',
    height: 70,
    backgroundColor: '#0D0D0D',
    alignContent: 'center',
    justifyContent: 'center'
  },
  navBarTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: 'center'
  },
  scrollParentView: {
    backgroundColor: '#450162',
    height: cardparentheight,
  },  
  scrollViewContainerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: cardparentheight,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: '#0D0D0D',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  disable: {
    opacity: 0.5
  }
});

export default styles