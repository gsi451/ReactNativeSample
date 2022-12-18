## 안드로이드 네이티브 모듈 샘플

### 프로젝트 생성
```javascript
npx react-native init NativeModule1
```

### app.js 파일을 작성한다. (기존코드 정리)
```javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App: () => Node = () => {
  return (
    <View style={styles.container}>
      <Text>Android Native Sample</Text>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```
### 1차 테스트

- VSCode에서 실행후 에뮬레이터 정상 출력 되는지 확인
- 확인후 에뮬레이터 종료 (디버깅 종료)

### 안드로이드 네이티브 코드 작성

- 안드로이드 스튜디오에서 NativeModule1\android 를 오픈한다.
- Sample1 패키지를 추가한다.
- SampleModule.java 추가
- SamplePackage.java 추가

![image](https://user-images.githubusercontent.com/119641015/208288976-75660946-938f-4433-9a74-93109b1fb70c.png)

> SampleModule.java 내용 추가
```javascript
package com.nativemodule1.Sample1;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import androidx.annotation.NonNull;

public class SampleModule extends ReactContextBaseJavaModule {

    public SampleModule(ReactApplicationContext context)
    {
        super(context);
    }

    @ReactMethod
    public void sendMsg(String msg)
    {
        Log.i("SampleModule", "React Native로 부터 " + msg + " 메시지가 들어왔습니다.");
    }

    @ReactMethod
    public void listenEvent(Callback event)
    {
        event.invoke("콜백신호 보냅니다.");
    }

    @NonNull
    @Override
    public String getName() {
        //(중요!!!)
        // 이 이름이 나중에 RN에서 사용한다.
        // const {SampleModule} = NativeModules; 이런 형태로 가져올때 이름이 맞아야 한다.
        return "SampleModule";
    }
}
```
> SamplePackage.java 내용 추가
```javascript
package com.nativemodule1.Sample1;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import androidx.annotation.NonNull;

public class SamplePackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        return Arrays.asList(new SampleModule(reactApplicationContext));
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
```

### 안드로이드 Package 등록

```javascript
package com.nativemodule1;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.nativemodule1.hello.HelloPackage;
import com.nativemodule1.newarchitecture.MainApplicationReactNativeHost;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:

           packages.add(new SamplePackage());   //<-- SamplePackage 패키지를 등록한다.

          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

      --- 중략 ---
```

### React Native 샘플 코드 작성

```javascript
// 상단 추가
import {NativeModules} from 'react-native';

// 선언
const {SampleModule} = NativeModules;

// 사용(코드 수정)
const App: () => Node = () => {

  const testCall = () => {
    SampleModule.sendMsg(' 샘플 ');
    SampleModule.listenEvent(msg => {
      console.log(msg);
    });
  }

  return (
    <View style={styles.container}>
      <Text>Android Native Sample</Text>      
      <Button title="샘플 테스트" onPress={testCall} />
    </View>
  );
};
```

### 테스트

- 프로젝트 폴더에서 cmd창을 연다.
- npx react-native start 실행해서 서버를 연다. (VSCode 디버깅이 열려 있다면 종료 한다.)
- 안드로이드 프로젝트에서 디버깅을 실행한다. (에뮬레이터가 실행되며 서버에 메시지가 표시 된다.)
- 제대로 실행 안되면 안드로이드 프로젝트에서 Rebuild Project도 실행해봐야 한다.
- 이후 값이 잘 들어 오고 전달이 되는지 확인



<br/><br/>
