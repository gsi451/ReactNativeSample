# ReactNativeSample
React Native 공부하면서 나오는 자료 정리

### 안드로이드 폰에서 아이콘 깨지는 문제

- 출처 : https://phant0m.tistory.com/20
- npm install react-native-vector-icons 로 설치 된후 그림이 깨지는 현상이 나옴
- anroid/app/src/main/assets/fonts (assets/fonts 폴더를 생성해야합니다.)
- node_modules에 react-native-vactor-icons에 있는 fonts파일들을 복사 android/app/src/main/assets/fonts 에 붙여넣기
- 위 처럼 fonts를 복사해서 추가한후에 재실행하니 된다.
