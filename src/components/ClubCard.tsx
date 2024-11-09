import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  TouchableOpacityProps,
} from "react-native";
import { Image } from "expo-image";
import { Club } from "../types";

interface ClubCardProps extends TouchableOpacityProps {
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({
  club,
  onPress,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={Platform.select({ ios: 0.7, android: 0.95 })}
      {...rest}
      onPress={onPress}
      style={[styles.touchable, style]}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: club.logoUrl }}
          style={styles.logo}
          contentFit="contain"
        />
        <View style={styles.details}>
          <Text style={styles.name}>{club.name}</Text>
          <Text style={styles.country}>{club.country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 6,
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
  logo: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: "#666",
  },
});

export default ClubCard;
