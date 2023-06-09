import * as React from "react";
import { View } from "react-native";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";

const AppointmentMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider theme={{ version: 2 }}>
      <View
        style={{
          paddingTop: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}
        >
          <Menu.Item
            onPress={() => {
              alert();
            }}
            title="Item 1"
          />
          <Menu.Item
            onPress={() => {
              alert();
            }}
            title="Item 2"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              alert();
            }}
            title="Item 3"
          />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default AppointmentMenu;
