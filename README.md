STEPS

.- npm update
.- cd android; gradle wrapper
.- npm run android
.- cd android
.- gradle bundleRelease
.- del .\app\build\outputs\bundle\release\release.apks;java -jar .\bundletool-all-1.13.1.jar build-apks --bundle=.\app\build\outputs\bundle\release\app-release.aab --output=.\app\build\outputs\bundle\release\release.apks --ks=c:\IT\repos\React\ductFITools\android\key.keystore --ks-key-alias=Francisco --ks-pass=pass:04062020
.- java -jar .\bundletool-all-1.13.1.jar install-apks --apks=.\app\build\outputs\bundle\release\release.apks
"# app" 
"# app" 
