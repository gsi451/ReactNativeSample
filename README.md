# ReactNativeSample
React Native 공부하면서 나오는 자료 정리

### 설치과정이 궁금하면
- https://github.com/gsi451/ReactNativeSample/blob/main/Settings/React-native-CLI-%EC%84%A4%EC%B9%98%EB%B0%8F%EC%85%8B%ED%8C%85.md

### 안드로이드 폰에서 아이콘 깨지는 문제

- 출처 : https://phant0m.tistory.com/20
- npm install react-native-vector-icons 로 설치 된후 그림이 깨지는 현상이 나옴
- anroid/app/src/main/assets/fonts (assets/fonts 폴더를 생성해야합니다.)
- node_modules에 react-native-vactor-icons에 있는 fonts파일들을 복사 android/app/src/main/assets/fonts 에 붙여넣기
- 위 처럼 fonts를 복사해서 추가한후에 재실행하니 된다.

### 안드로이드 화면 글자가 흰색으로 보이지 않는 문제
```xml
<style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
    <!-- Customize your theme here. -->
    <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
    <item name="android:textColor">#000000</item>
</style>
```
