import * as React from "react";
import { StyleSheet } from "react-native";
import { Surface, Text, TextProps } from "react-native-paper";

function ToolbarText({ style, ...rest }: TextProps<string>) {
  return <Text variant="labelLarge" style={[styles.text, style]} {...rest} />;
}

export default function Toolbar(
  props: React.PropsWithChildren<Record<never, never>>
) {
  return (
    <Surface mode="flat" elevation={1} style={styles.surface}>
      {props.children}
    </Surface>
  );
}

Toolbar.Text = ToolbarText;

const styles = StyleSheet.create({
  surface: {
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 8,
  },
});
