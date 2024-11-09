import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useForm, FieldValues, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddClubSchema } from "../utils/Validations";
import FormTextInput from "../components/form/FormTextInput";
import FormImageSelector from "../components/form/FormImageSelector";
import { addNewClub } from "../store/thunks/dataThunks";
import { useAppDispatch } from "../store/hooks";
import { Club } from "../types";

// Define the form data interface
export interface SignUpUsernameFormData extends FieldValues {
  clubName: string;
  clubCountry: string;
  clubLogo: string;
}

const AddClubScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Initialize form methods with validation schema
  const methods = useForm<SignUpUsernameFormData>({
    defaultValues: {},
    resolver: yupResolver(AddClubSchema),
  });

  // Submit handler for adding a new club
  const onSubmit = useCallback(
    (data: SignUpUsernameFormData) => {
      const newClub: Club = {
        id: uuidv4(), // Generate unique ID for new club
        name: data.clubName,
        logoUrl: data.clubLogo,
        country: data.clubCountry,
      };
      dispatch(addNewClub(newClub)); // Dispatch action to add the club
      navigation.goBack(); // Go back to the previous screen after submission
    },
    [dispatch, navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Club</Text>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView contentContainerStyle={{}}>
          <FormProvider {...methods}>
            {/* Input for club name */}
            <FormTextInput
              containerStyle={{ marginBottom: 8 }}
              label="Club name"
              name="clubName"
              autoCapitalize="none"
              placeholder="Club name"
              errorSpacing={true}
            />
            {/* Input for club country */}
            <FormTextInput
              containerStyle={{ marginBottom: 8 }}
              name="clubCountry"
              label="Club country"
              autoCapitalize="none"
              placeholder="Club country"
              errorSpacing={true}
            />
            {/* Image selector for club logo */}
            <FormImageSelector name="clubLogo" errorSpacing={true} />

            {/* Submit button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={methods.handleSubmit(onSubmit)}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Add club</Text>
            </TouchableOpacity>

            {/* Back button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigation.goBack}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    paddingHorizontal: 32,
    fontSize: 24,
    fontWeight: "bold",
    color: "#4f46e5",
    alignSelf: "center",
  },
  submitButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  backButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
});

export default AddClubScreen;
