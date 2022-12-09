## React Native 설치 및 셋팅자료

### 이미 설치된 자료들
```
Node.js 설치됨
Python 설치됨
Android Studio 설치됨
```

### React Native CLI 설치

- npm install -g react-native-cli
- npm install -g react-native
- 를 사용해서 설치를 합니다.
- npx react-native --version
- 버전을 확인합니다.

### JDK 설치

- choco install -y jdk8
- 를 사용해서 JDK 를 설치함니다.
- java -version
- 버전을 확인합니다.
- javac -version
- 자바 컴파일러도 잘 설치되었는지 확인합니다.

### 안드로이드 스튜디오 SDK 설정

- Settings form New Projects 창에서
- Android SDK 항목을 선택하고
- Android 9.0 (Pie) 항목의 세부 내용을 체크 한다.  (안보이면 Show Package Details 를 체크 한다.)
- Android SDK Platform 28
- Intel x86 Atom System Image
- Google APIs Intel x86 Atom System Image
- Google APIs Intel x86 Atom_64 System Image

### 안드로이드 스튜디오 환경 변수 설정

- 환경 변수 황목에 **ANDROID_HOME** 에 **c:\users\gsi451\AppData\Local\Android\Sdk** 를 추가한다.
- Path 항목에 **C:\Users\gsi451\AppData\Local\Android\Sdk\platform-tools** 를 추가한다.
- 도스창에서 adb 명령이 입력이 되어야 한다.

### react-native 프로젝트 생성 및 확인

- npx react-native init SampleApp
- 제대로 생성이 안될때가 있다.
- npm uninstall -g react-native-cli
- 언인스톨하고
- npm install -g react-native-cli
- npm install -g react-native
- 다시 설치 했다.
- 아래와 같이 나와야 한다.

```
             ###     ####        ####     ###
            ##          ###    ###          ##
            ##             ####             ##
            ##             ####             ##
            ##           ##    ##           ##
            ##         ###      ###         ##
             ##  ########################  ##
          ######    ###            ###    ######
      ###     ##    ##              ##    ##     ###
   ###         ## ###      ####      ### ##         ###
  ##           ####      ########      ####           ##
 ##             ###     ##########     ###             ##
  ##           ####      ########      ####           ##
   ###         ## ###      ####      ### ##         ###
      ###     ##    ##              ##    ##     ###
          ######    ###            ###    ######
             ##  ########################  ##
            ##         ###      ###         ##
            ##           ##    ##           ##
            ##             ####             ##
            ##             ####             ##
            ##          ###    ###          ##
             ###     ####        ####     ###
               ######                ######


                  Welcome to React Native!
                 Learn once, write anywhere

√ Downloading template
√ Copying template
√ Processing template
√ Installing dependencies


  Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd "E:\GsiProject_2022\2022_00_ReactNativeProject\SampleApp" && npx react-native run-android

  Run instructions for Windows:
    • See https://aka.ms/ReactNativeGuideWindows for the latest up-to-date instructions.



E:\GsiProject_2022\2022_00_ReactNativeProject>

```

### 안드로이드에서 확인

- cd SampleApp
- npm run android

- 오류 내용

```
E:\GsiProject_2022\2022_00_ReactNativeProject\SampleApp>npm run android

> SampleApp@0.0.1 android
> react-native run-android

info Starting JS server...
'"adb"':(��) ���� �Ǵ� �ܺ� ���, ������ �� �ִ� �wα׷�, �Ǵ�
��ġ ������ �ƴմϴ�.
info Launching emulator...
error Failed to launch emulator. Reason: No emulators found as an output of `emulator -list-avds`.
warn Please launch an emulator manually or connect a device. Otherwise app may fail to launch.
info Installing the app...
Starting a Gradle Daemon (subsequent builds will be faster)

이게 에뮬레이터가 없어서 그런듯
에뮬레이터를 다시 추가해도 여전히 문제가 있음
```
- Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8.
- 이 구문이 의심스러워서 보니 일부 설정이 있었다.
- 시스템에 java11은 이미 설치가 되어 있다.
- React Native의 Android 폴더를 안드로이드 스튜디오에서 오픈해서 SDK Location으로 폴더를 11로 지정해줬다.
- 관련 참고자로 : https://hyunjungchoi.tistory.com/127

- 여전히 오류
- This version of the Android Support plugin for IntelliJ IDEA (or Android Studio) cannot open this project, please retry with version 2021.2.1 or newer.
- 안드로이드 스튜디오 버전을 올리기 위해서 최신 버전으로 받음
- https://codinghero.tistory.com/182
- 




