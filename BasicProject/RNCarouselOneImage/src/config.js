import { Dimensions } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

export const cardPerSlide = 1
export const cardPadding = 50
export const paddingAround = cardPadding * 2 // slide horizontal padding
export const totalPadding = paddingAround
export const imageWidth = (screenWidth - totalPadding) / cardPerSlide
export const imageHeight = (imageWidth / (2 / 3))