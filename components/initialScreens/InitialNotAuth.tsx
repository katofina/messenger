import { Entypo } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function InitialNotAuth() {
  const navigation = useNavigation();
  navigation.setOptions({
    headerShown: false
  });

  const marginLeft = useSharedValue(0);
  useEffect(() => {
    marginLeft.value = withTiming(
      40,
      { duration: 1000 },
      () => (marginLeft.value = withSpring(0)),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Welcome to Messenger</Text>
      <Link href='/(sign)/SignUp' asChild>
          <TouchableOpacity style={styles.button}>
          <Text>Start</Text>
          <Animated.View style={{ marginLeft }}>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </Animated.View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  mainText: {
    fontSize: 30,
  },
  button: {
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "grey",
    elevation: 10,
  },
});
