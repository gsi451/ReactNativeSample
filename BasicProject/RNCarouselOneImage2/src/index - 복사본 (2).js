import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import styles from './style';
import {cardPerSlide} from './config';
import CarouselSlide from './components/Slide';
import movies from './data';

const {width: screenWidth} = Dimensions.get('window');

const jobsrchs = [
  {
    key: 1,
    pos: '사무관리(중개,컨설팅) > 사무보조 > 기타',
    evalprice: '8,000',
    hopeprice: '9,100',
  },
  {
    key: 2,
    pos: '사무관리(중개,컨설팅) > 사무보조 > 기타',
    evalprice: '9,000',
    hopeprice: '10,100',
  },
];

export default class MovieHome extends Component {
  constructor(props) {
    super(props);

    // Initially state
    this.state = {
      totalSlide: 0,
      currentSlide: 1,
      isNext: false,
      isPrev: false,
    };
  }

  // function will find out total no of slide and set to state
  setTotalSlides = contentWidth => {
    const {totalSlide, currentSlide} = this.state;
    // contentWidth received from onContentSizeChange
    if (contentWidth !== 0) {
      const approxSlide = contentWidth / screenWidth;
      if (totalSlide !== parseInt(approxSlide)) {
        this.setState({
          totalSlide: parseInt(Math.ceil(approxSlide.toFixed(2))),
        });
        this.calculateNextPrev(parseInt(approxSlide), currentSlide);
      }
    }
  };

  setCurrentSlide = currentSlide => {
    this.setState({
      currentSlide,
    });
  };

  // function will identify current slide visible on screen
  // Also maintaining current slide on carousel swipe.
  handleScrollEnd = e => {
    if (!e) {
      return;
    }
    const {nativeEvent} = e;
    const {totalSlide} = this.state;
    if (nativeEvent && nativeEvent.contentOffset) {
      let currentSlide = 1;
      if (nativeEvent.contentOffset.x === 0) {
        this.setCurrentSlide(currentSlide);
      } else {
        const approxCurrentSlide = nativeEvent.contentOffset.x / screenWidth;
        currentSlide = parseInt(Math.ceil(approxCurrentSlide.toFixed(2)) + 1);
        this.setCurrentSlide(currentSlide);
      }
      this.calculateNextPrev(totalSlide, currentSlide);
    }
  };

  goToNext = () => {
    console.log("next click");
    const {currentSlide} = this.state;
    if (this.stepCarousel) {
      const scrollPoint = currentSlide * screenWidth;
      this.stepCarousel.scrollTo({x: scrollPoint, y: 0, animated: true});
      // following condition is for android only because in android onMomentumScrollEnd doesn't
      // call when we scrollContent with scroll view reference.
      if (Platform.OS === 'android') {
        this.handleScrollEnd({
          nativeEvent: {contentOffset: {y: 0, x: scrollPoint}},
        });
      }
    }
  };

  goToPrev = () => {
    const {currentSlide} = this.state;
    if (this.stepCarousel) {
      const pageToGo = currentSlide - 2;
      const scrollPoint = pageToGo * screenWidth;
      this.stepCarousel.scrollTo({x: scrollPoint, y: 0, animated: true});
      // following condition is for android only because in android onMomentumScrollEnd doesn't
      // call when we scrollContent with scrollview reference.
      if (Platform.OS === 'android') {
        this.handleScrollEnd({
          nativeEvent: {contentOffset: {y: 0, x: scrollPoint}},
        });
      }
    }
  };

  setNext = status => {
    console.log("setNext");    
    const {isNext} = this.state;
    if (status !== isNext) {
      this.setState({
        isNext: status,
      });
    }
  };

  setPrev = status => {
    console.log("setPrev");    
    const {isPrev} = this.state;
    if (status !== isPrev) {
      this.setState({
        isPrev: status,
      });
    }
  };

  calculateNextPrev = (totalPage, currentPage) => {
    if (totalPage > currentPage) {
      this.setNext(true);
    }
    if (currentPage === 1) {
      this.setPrev(false);
    }
    if (currentPage === totalPage) {
      this.setNext(false);
    }
    if (currentPage > 1) {
      this.setPrev(true);
    }
  };

  render() {
    const {totalSlide, currentSlide, isNext, isPrev} = this.state;
    const noOfSlides = Math.ceil(jobsrchs.length / cardPerSlide);
      
    console.log(this.state);    

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={styles.navBarTitle}>MOVIES</Text>
        </View>
        <View style={[styles.scrollParentView]}>
          <ScrollView
            style={{zIndex: 0}}
            ref={ref => {
              this.stepCarousel = ref;
            }}
            contentContainerStyle={styles.scrollViewContainerStyle}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToAlignment={'center'}
            onContentSizeChange={this.setTotalSlides}
            onMomentumScrollEnd={this.handleScrollEnd}>
            {[...Array(noOfSlides)].map((e, i) => {
              const startPosition = i;
              const endPosition = i + 1;
              //console.log('start:' + startPosition + ', end:' + endPosition);
              return (
                <CarouselSlide
                  key={i}
                  job={jobsrchs.slice(startPosition, endPosition)}
                />
              );
            })}
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              //width: '100%',
              height: '100%',
              zIndex: 1,
              backgroundColor: '#0D280D',
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
            }}>
            <TouchableOpacity
              style={[styles.button, !isPrev && styles.disable]}
              onPress={this.goToPrev}
              disabled={!isPrev}>
              <Text style={styles.buttonText}>{'<'}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: 'absolute',
              //width: '100%',
              height: '100%',
              zIndex: 1,
              backgroundColor: '#0D280D',
              alignItems: 'center',
              justifyContent: 'center',
              right: 0,
            }}>
            <TouchableOpacity
                style={[styles.button, !isNext && styles.disable]}
                onPress={this.goToNext}
                disabled={!isNext}>
                <Text style={styles.buttonText}>{'>'}</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
