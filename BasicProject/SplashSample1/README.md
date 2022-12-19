## SplashSample1 설명

- 안드로이드 네이티브 모듈을 사용해서 직접 Splash화면을 구현한 예제

### 프로젝트 생성

- npx react-native init SplashSample1 실행
```javascript
> npx react-native init SplashSample1
```

### VSCode 프로젝트 오픈후 App.js 수정
- 네이티브 모듈 이름은 GsiSplash 로 지정
- hide() 함수 사용해서 프로그램 실행시 한번 호출
```javascript
/**
 * Splash 샘플
 * https://github.com/gsi451/ReactNativeSample/tree/main/BasicProject/SplashSample1
 * 안드로이드 네이티브 모듈을 직접 구현한 Splash 샘플 예제
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
} from 'react-native';

const {GsiSplash} = NativeModules;

const App: () => Node = () => {

  useEffect(() => {
       GsiSplash.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Android Splash Sample</Text>      
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

### 안드로이드 프로젝트 실행
- 안드로이드 네이티브 제작을 위해서는 안드로이드 프로젝트를 오픈해야 한다.
- 생성한 프로젝트 폴더 안에 android 폴더를 오픈한다.
- SplashSample1 > app > java > com.splashsample1 에 패키지 GsiSplash를 생성
- GsiSplash 패키지 폴더에 파일 3개를 생성
```javascript
GsiSplash.java
GsiSplashModule.java
GsiSplashPackage.java
```
- 3개의 파일에 아래와 같이 작성

[GsiSplash.java]
```javascript
package com.splashsample1.GsiSplash;

import android.app.Activity;
import android.app.Dialog;
import android.os.Build;

import com.splashsample1.R;

import java.lang.ref.WeakReference;

public class GsiSplash {
    private static Dialog mSplashDialog;
    private static WeakReference<Activity> mActivity;

    public static void show(final Activity activity, final int themeResId) {
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {
                    mSplashDialog = new Dialog(activity, themeResId);
                    mSplashDialog.setContentView(R.layout.launch_screen);
                    mSplashDialog.setCancelable(false);

                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                    }
                }
            }
        });
    }

    public static void show(final Activity activity, final boolean fullScreen) {
        int resourceId = fullScreen ? R.style.GsiSplash_Fullscreen : R.style.GsiSplash_SplashTheme;

        show(activity, resourceId);
    }

    public static void show(final Activity activity) {
        show(activity, false);
    }

    public static void hide(Activity activity) {
        if (activity == null) {
            if (mActivity == null) {
                return;
            }
            activity = mActivity.get();
        }

        if (activity == null) return;

        final Activity _activity = activity;

        _activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    boolean isDestroyed = false;

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                        isDestroyed = _activity.isDestroyed();
                    }

                    if (!_activity.isFinishing() && !isDestroyed) {
                        mSplashDialog.dismiss();
                    }
                    mSplashDialog = null;
                }
            }
        });
    }
}
```
[GsiSplashModule.java]
```javascript
package com.splashsample1.GsiSplash;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import androidx.annotation.NonNull;

public class GsiSplashModule extends ReactContextBaseJavaModule {

    public GsiSplashModule(ReactApplicationContext reactApplicationContext)
    {
        super(reactApplicationContext);
    }

    /*
    @ReactMethod
    public void hide() {
        Log.i("GsiSplash", "Hide 입력됨");
    }
    */

    @ReactMethod
    public void show() {
        GsiSplash.show(getCurrentActivity());
    }

    @ReactMethod
    public void hide() {
        GsiSplash.hide(getCurrentActivity());
    }

    /*
    @ReactMethod
    public void greeting(String name) {
        Log.i("HelloModule", "안녕 : " + name);
    }

    @ReactMethod
    public void listenEvent(Callback event) {
        event.invoke("I've got hello from you");
    }
    */

    @NonNull
    @Override
    public String getName() {
        return "GsiSplash";
    }
}
```
[GsiSplashPackage.java]
```javascript
package com.splashsample1.GsiSplash;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import androidx.annotation.NonNull;

public class GsiSplashPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        return Arrays.asList(new GsiSplashModule(reactApplicationContext));
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
```
### MainApplication 수정
```javascript
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
          
          packages.add(new GsiSplashPackage()); //<-- 여기 추가
          
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };
```

### MainActivity 수정
```javascript
public class MainActivity extends ReactActivity {

  // 이 메소드가 없을수 있다. 없다면 이렇게 그냥 추가
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    GsiSplash.show(this);  // <-- 여기 추가
    super.onCreate(savedInstanceState);
  }
```

### styles.xml 수정
```javascript
<resources>

    <style name="GsiSplash_SplashAnimation">
        <item name="android:windowExitAnimation">@android:anim/fade_out</item>
    </style>

    <style name="GsiSplash_SplashTheme" parent="Theme.AppCompat.NoActionBar">
        <item name="android:windowAnimationStyle">@style/GsiSplash_SplashAnimation</item>
    </style>
    <style name="GsiSplash_Fullscreen" parent="GsiSplash_SplashTheme">
        <item name="android:windowFullscreen">true</item>
    </style>

</resources>
```

### res > layout 폴더에 launch_screen.xml 추가 (layout 폴더가 초기에는 없다. 이럴때는 생성)
```javascript
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#FFC107"
    android:gravity="center"
    android:orientation="vertical">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="GsiSplash"
        android:textAlignment="center"
        android:textSize="20pt"
        android:textStyle="bold" />
</LinearLayout>
```
### apk 만들때 팁
- app > assets 폴더를 생성한다. (나의 경우 이 부분이 없으면 오류가 발생했다.)
- assets 폴더 안에 fonts 폴더를 만들고 안에 폰트를 추가 하였다. (이 부분을 안하면 화면의 글자들이 흰색으로 보이지 않았다.)

### 빌드 테스트
- 이 샘플을 만들고부터는 네이티브 모듈을 사용해서 그런지 에뮬레이터를 안드로이드 스튜디오 안에서 실행해야만 오류가 나지 않았다. 그래서 그 순서를 적도록 한다.
- cmd 창을 열고 SplashSample1의 폴더로 들어간다.
- npx react-native start 를 실행한다. (이 부분이 무조건 실행되어져 있어야 한다.)
- 안드로이드 스튜디오에서 디버깅을 진행한다.

### 결과
![bandicam-2022-12-19-23-02-21-017](https://user-images.githubusercontent.com/119641015/208444546-bfb0a294-10a4-4051-afe7-f255b502b857.gif)






<br/>
<br/>
