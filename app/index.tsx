import React from "react";
import GradientBackground from "@/components/style-elements/GradientBackground";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  // Can't run app without main index.tsx file. Only purpose to redirect to tabs.

  //// TODO ///
  // 1. Play mode gestures to reveal / discard cards!!
  // 3. gamescreen/index goes back using router.push which doesnt reset stack. router.replace does not work..
  // 4. helper funcs to handle state/storage updates in one go,
  //    rather than having to call multiple functions
  // 5. fix loading spinner in Card
  // 6. app loads too fast, cant see splash screen. add delay of like 2s
  // 7. change splash background color, shows white briefly.
  // 8. CHANGE AMOUNT OF CARDS LOADED!!! currently 10...
  // 9. app icon head is cut off... :(
  // 10. DeckBuilder -- FlatList -- potential performance issues re: rendering

  return (
    <GradientBackground>
      <Redirect href="/(tabs)/playmode" />
    </GradientBackground>
  );
}
