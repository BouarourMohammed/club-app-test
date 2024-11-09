import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Player } from "../types";

interface PlayerCardProps {
  player: Player;
  clubId: string;
  showStats?: boolean;
  onPress?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  showStats = true,
  onPress,
}) => {
  const currentClubHistory = player.clubHistory[player.clubHistory.length - 1];
  const CardContainer = (onPress ? TouchableOpacity : View) as any;
  const containerProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <CardContainer {...containerProps} style={styles.touchable}>
      <View style={styles.card}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>#{currentClubHistory.number}</Text>
        </View>
        <View style={styles.playerInfo}>
          <Text style={styles.name}>
            {player.firstName} {player.lastName}
          </Text>
          {showStats && (
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Buts</Text>
                <Text style={styles.statValue}>
                  {currentClubHistory.stats.goalsScored}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Matchs</Text>
                <Text style={styles.statValue}>
                  {currentClubHistory.stats.matchesPlayed}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 6,
    marginHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
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
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  number: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  playerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
});

export default PlayerCard;
