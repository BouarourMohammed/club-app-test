import React from "react";
import {
  Text,
  TextInput as RNTextInput,
  View,
  TextInputProps,
  StyleSheet,
} from "react-native";

export interface InputFieldProps extends TextInputProps {
  // this is used for the label in the top of the input
  label?: string;
  // this is used in the bottom of the input for an example value
  example?: string;
  // this is used to display an error message
  error?: string;
  // this is used reserve the space for the error message and avoid layout
  // jumping when the error message is displayed
  errorSpacing?: boolean;
  containerStyle?: any;
}

const TextInput: React.FC<InputFieldProps> = ({
  label,
  example,
  error,
  errorSpacing,
  containerStyle,
  style,
  ...rest
}) => {
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, style, error ? { borderColor: "#dc2626" } : null]}
        placeholderTextColor={"#ccc"}
        {...rest}
      />
      {example && <Text style={styles.example}>{example}</Text>}
      {(errorSpacing || error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#dc2626",
  },
  example: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "gray",
  },
  input: {
    color: "#000",
    fontSize: 16,
    fontWeight: "400",
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 6,
  },
});

export default TextInput;
