package com.yildiz.sevkiyat;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent i) {
        if (c.getSharedPreferences("app", Context.MODE_PRIVATE).getBoolean("bubble", false)) BubbleService.start(c);
    }
}
