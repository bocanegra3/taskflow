import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../constants/colors"


type ProfileCardProps = {
  name: string;
  role: string;
  image: string;
};

export default function ProfileCard({
  name,
  role,
  image,
}: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.avatar} />

      <View style={styles.information}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 360,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 18,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    elevation: 6,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    marginRight: 18,
    backgroundColor: colors.border,
  },

  information: {
    flex: 1,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },

  role: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});