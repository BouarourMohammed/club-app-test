import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { RootState } from "../store";
import { fetchClubs } from "../store/thunks/dataThunks";
import ClubCard from "../components/ClubCard";
import { useAppDispatch } from "../store/hooks";
import ClubCardSkeleton from "../components/ClubCardSkeleton";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  // Selector for accessing club data, loading, and error states from the store
  const {
    clubs,
    loading: clubsLoading,
    error: clubsError,
  } = useSelector((state: RootState) => state.clubs);

  // Load clubs data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Function to load club data and handle any potential errors
  const loadData = async () => {
    try {
      await dispatch(fetchClubs()).unwrap();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Display an error message and retry button if there was an error fetching data
  if (clubsError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{clubsError}</Text>
        <TouchableOpacity onPress={loadData} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render the main screen with a list of clubs and a floating action button for adding new clubs
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Clubs</Text>
      <FlatList
        data={clubsLoading ? new Array(4).fill(null) : clubs}
        renderItem={({ item }) =>
          clubsLoading ? (
            <ClubCardSkeleton />
          ) : (
            <ClubCard
              club={item}
              onPress={() =>
                navigation.navigate("ClubDetails", { clubId: item.id })
              }
            />
          )
        }
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={clubsLoading}
            onRefresh={loadData}
            colors={["#4f46e5"]} // For Android
            tintColor={Platform.OS === "ios" ? "#000" : "#4f46e5"} // For iOS
          />
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddClub")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 16,
  },
  title: {
    paddingHorizontal: 32,
    fontSize: 24,
    fontWeight: "bold",
    color: "#4f46e5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 16,
    textAlign: "center",
    padding: 16,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#4f46e5",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  addButtonText: {
    fontSize: 32,
    color: "#fff",
    marginTop: -2,
  },
});

export default HomeScreen;
