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
