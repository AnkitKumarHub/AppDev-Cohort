/** 
import type { ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";
// if not any of the above then it is production

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.ankithub.easdemo.dev";
  if (IS_PREVIEW) return "com.ankithub.easdemo.preview";
  return "com.ankithub.easdemo";
};

const getAppName = () => {
  if (IS_DEV) return "Unitflow-dev";
  if (IS_PREVIEW) return "Unitflow-preview";
  return "Unitflow";
};

// in the same way you can keep the different icons for different variants

export default {
  expo: {
    name: getAppName(),
    slug: "10-expo-application-services",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "10expoapplicationservices",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/expo.icon",
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      package: getUniqueIdentifier(),
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          android: {
            image: "./assets/images/splash-icon.png",
            imageWidth: 76,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "7b30475a-768f-4f2c-b17f-db657ec5b50d",
      },
    },
  } satisfies ExpoConfig,
};

*/
