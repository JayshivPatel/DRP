import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function ConfirmDialog(props: {
  visible: boolean;
  title: string;
  children: string | JSX.Element | JSX.Element[];
  onDismiss: () => void;
  onConfirm: () => void;
}) {
  const content =
    typeof props.children === "string" ? (
      <Text>{props.children}</Text>
    ) : (
      props.children
    );

  return (
    <Portal>
      <Dialog
        visible={props.visible}
        onDismiss={props.onDismiss}
        style={{ alignSelf: "center" }}
      >
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Content>{content}</Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.onDismiss}>Cancel</Button>
          <Button onPress={props.onConfirm}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
