import React from "react";
import { View, StyleSheet } from "react-native";
import LoadingPlaceholder from "./LoadingPlaceholder";

const ClubCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <LoadingPlaceholder
          width={60}
          height={60}
          style={styles.logoPlaceholder}
        />
        <View style={styles.details}>
          <LoadingPlaceholder
            width={200}
            height={24}
            style={styles.namePlaceholder}
          />
          <LoadingPlaceholder
            width={120}
            height={16}
            style={styles.countryPlaceholder}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#fff",
    elevation: 4, // for Android shadow
  },
  content: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  logoPlaceholder: {
    borderRadius: 30,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  namePlaceholder: {
    marginBottom: 8,
  },
  countryPlaceholder: {
    width: 120,
  },
});

export default ClubCardSkeleton;
