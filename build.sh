#!/bin/bash
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/ant-build
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore stock.keystore CordovaApp-release-unsigned.apk stock
rm stock.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 CordovaApp-release-unsigned.apk stock.apk
