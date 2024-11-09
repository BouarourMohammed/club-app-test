import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import { RootState } from "../store";
import PlayerCard from "../components/PlayerCard";
import { useAppDispatch } from "../store/hooks";
import { fetchClubPlayers } from "../store/thunks/dataThunks";

const currentYear = new Date().getFullYear();
const currentSeason = { startYear: currentYear - 1, endYear: currentYear };

const ClubDetailsScreen: React.FC = () => {
  const { clubId } = useRoute<any>().params;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  // Select club and player data from Redux
  const club = useSelector((state: RootState) =>
    state.clubs.clubs.find((c) => c.id === clubId)
  );
  const {
    players,
    loading: playersLoading,
    error: playersError,
  } = useSelector((state: RootState) => state.players);

  // Fetch players when component mounts or clubId changes
  useEffect(() => {
    dispatch(fetchClubPlayers(clubId));
  }, [clubId]);

  // Memoized title for the season to avoid re-calculating on each render
  const seasonTitle = useMemo(
    () => `Saison ${currentSeason.startYear}-${currentSeason.endYear}`,
    []
  );

  return (
    <View style={styles.container}>
      {/* Header with club information */}
      <View style={[styles.header, { paddingTop: top + 16 }]}>
        <Image
          source={{ uri: club?.logoUrl }}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.clubName}>{club?.name}</Text>
        <Text style={styles.country}>{club?.country}</Text>
        <View style={styles.seasonBadge}>
          <Text style={styles.seasonText}>{seasonTitle}</Text>
        </View>
      </View>

      {/* Loading, Error, or Player List based on state */}
      {playersLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={Platform.OS === "ios" ? "#000" : "#4f46e5"}
          />
          <Text style={styles.loadingText}>Chargement des données...</Text>
        </View>
      ) : playersError ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{playersError}</Text>
          <TouchableOpacity
            onPress={() => dispatch(fetchClubPlayers(clubId))}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>
            Effectif ({players.length} joueurs)
          </Text>
          <FlatList
            data={players}
            renderItem={({ item }) => (
              <PlayerCard player={item} clubId={clubId} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* Back Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={navigation.goBack}
        style={[styles.backButton, { marginBottom: bottom + 16 }]}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 8,
  },
  clubName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  country: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  seasonBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
  },
  seasonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    margin: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: "50%",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#4f46e5",
    borderRadius: 8,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 16,
    textAlign: "center",
    padding: 16,
  },
  backButton: {
    marginTop: 16,
    marginHorizontal: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
  },
  backButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
});

export default ClubDetailsScreen;
