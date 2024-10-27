import GradientBackground from "@/components/style-elements/GradientBackground";
import { defaultColors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import TabsIcon from "@/components/style-elements/TabsIcon";

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="playmode"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
        },
        headerTintColor: defaultColors.gold,
        headerBackground() {
          return <GradientBackground reversed={true} />;
        },
        tabBarBackground() {
          return <GradientBackground reversed={false} />;
        },
        tabBarActiveTintColor: defaultColors.gold,
        tabBarInactiveTintColor: defaultColors.grey,
      }}
    >
      <Tabs.Screen
        name="decks/index"
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          title: "Decks",
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              source={require("../../assets/tab-icons/decks-button.svg")}
              focused={focused}
              right={1.5}
              width={35}
              height={35}
              top={2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="playmode/index"
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          title: "Play",
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              source={require("../../assets/tab-icons/play-button.svg")}
              focused={focused}
              right={1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="deckbuilder/index"
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          title: "Builder",
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              source={require("../../assets/tab-icons/builder-button.svg")}
              focused={focused}
              height={45}
              top={3}
              right={2}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
