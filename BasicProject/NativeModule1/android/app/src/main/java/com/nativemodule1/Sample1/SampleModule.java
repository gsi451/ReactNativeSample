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
    public String getName()
    {
        //(중요!!!)
        // 이 이름이 나중에 RN에서 사용한다.
        // const {SampleModule} = NativeModules; 이런 형태로 가져올때 이름이 맞아야 한다.
        return "SampleModule";
    }
}
