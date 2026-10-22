package com.yildiz.sevkiyat;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.widget.RemoteViews;

/** Ana ekran widget'ı: yeni sevkiyat ve sesli asistanla yeni sevkiyat. */
public class QuickWidget extends AppWidgetProvider {
    static Intent actIntent(Context c, String a) {
        return new Intent(c, MainActivity.class)
                .setAction(Intent.ACTION_VIEW)
                .setData(Uri.parse("sevkiyat://" + a))
                .putExtra("act", a)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
    }

    static PendingIntent act(Context c, String a, int rc) {
        return PendingIntent.getActivity(c, rc, actIntent(c, a), PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_quick);
        v.setOnClickPendingIntent(R.id.wNew, act(c, "new", 31));
        v.setOnClickPendingIntent(R.id.wVoice, act(c, "voice", 32));
        for (int id : ids) m.updateAppWidget(id, v);
    }
}
