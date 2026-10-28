import { Platform, useWindowDimensions } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ViewNoteDialogProp {
  text: string | null;
  visible: boolean;
  onDismiss: () => void;
}

export default function ViewNoteDialog({
  text,
  visible,
  onDismiss,
}: ViewNoteDialogProp) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const isWeb = Platform.OS === "web";

  return (
    <Portal>
      <Dialog
        style={[
          isWeb && {
            alignSelf: "center",
            width: "100%",
            maxWidth: 768,
          },
        ]}
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Title>Note</Dialog.Title>
        <Dialog.Content>
          <Text>{text ?? "Add a note to see it here."}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
