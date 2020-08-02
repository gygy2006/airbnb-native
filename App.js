import React, { useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Text, Image } from "react-native";

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = async () => {
    const images = [
      require("./assets/loginBg.jpeg"),
      "https://www.mirai.com/files/2018/02/airbnb_logo_small.png",
    ];
    const fonts = [Ionicons.font];
    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  return isReady ? (
    <Text>I'm ready</Text>
  ) : (
    <AppLoading
      onError={console.error}
      onFinish={handleFinish}
      startAsync={loadAssets}
    />
  );
}
