import { SearchButton } from "@/components/headerButtons/SearchButton";
import useThemeColor from "@/hooks/useThemeColor";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerContent } from "@/components/drawer/DrawerContent";

export default function authLayout() {
  const { colors } = useThemeColor();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName="index" drawerContent={() => <DrawerContent/>}>
        <Drawer.Screen
          name="index"          
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: {
              backgroundColor: colors.headerBc,
            },
            headerRight: () => <SearchButton />,
            headerLeft: () => <DrawerToggleButton tintColor="#687076"/>,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
