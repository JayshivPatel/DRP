import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import Config from "../Config";

import MaterialColors from "../../material-colors.json";

export default function Container(props: React.PropsWithChildren<Record<never, never>>) {
  return (
    <Config>
      <View style={styles.container}>
        <PaperProvider
          theme={{
            ...DefaultTheme,
            ...MaterialColors,
          }}
        >
          {props.children}
        </PaperProvider>
      </View>
    </Config>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    ...(Platform.OS == "web" && { height: "100vh" }),
  },
});
