package org.apache.cordova.plugins;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.net.Uri;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;



public class VPlayer extends Plugin {
    
    @Override
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        try {
            JSONObject jo = args.getJSONObject(0);
            doSendIntent(jo.getString("videopath"));
            return new PluginResult(PluginResult.Status.OK);
        } catch (JSONException e) {
            return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
        }
    }
    
    private void doSendIntent(String videopath) {
        
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(Uri.parse(videopath), "video/mp4");
        this.cordova.startActivityForResult(null,intent,0);
        
    }
    
}

