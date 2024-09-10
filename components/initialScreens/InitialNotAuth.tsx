import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function InitialNotAuth() {
  const marginLeft = useSharedValue(0);
  const navigation = useNavigation();
  navigation.setOptions({
    headerShown: false
  })

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
      <TouchableOpacity style={styles.button}>
        <Text>Start</Text>
        <Animated.View style={{ marginLeft }}>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>
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
