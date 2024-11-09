import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useController, useFormContext } from "react-hook-form";
import { Image } from "expo-image";
import { useCallback } from "react";

interface FormImageSelectorProps extends ViewProps {
  name: string;
  errorSpacing?: boolean;
}

const FormImageSelector: React.FC<FormImageSelectorProps> = ({
  name,
  errorSpacing,
  style,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      field.onChange(result.assets[0].uri);
    }
  }, [field]);

  return (
    <View style={style}>
      <View style={styles.container} {...rest}>
        <Image
          source={{ uri: field.value }}
          contentFit="contain"
          style={styles.selectedImage}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={pickImage}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Pick image</Text>
        </TouchableOpacity>
      </View>
      {(errorSpacing || fieldState.error?.message) && (
        <Text style={styles.error}>{fieldState.error?.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submitButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#455505",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#dc2626",
  },
  selectedImage: {
    width: 120,
    height: 120,
    backgroundColor: "#ccc",
  },
});

export default FormImageSelector;
