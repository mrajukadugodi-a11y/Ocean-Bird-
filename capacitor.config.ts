import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eastmancreation.oceanbird',
  appName: 'Ocean Bird',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: '#000000',
      androidSpin: true,
      androidSpinColor: '#0284c7',
      iosSpinColor: '#0284c7',
      spinnerColor: '#0284c7',
      showSpinner: true,
      splashFullScreen: true,
      splashImmersive: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#0284c7',
      sound: 'beep',
    },
  },
};

export default config;
