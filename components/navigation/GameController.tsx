import { SavedDeck } from "@/store/store";
import { ScrollView, StyleSheet, View } from "react-native";
import { Ref, useEffect, useRef, useState } from "react";
import SavedDecks from "./SavedDecks";
import FadeIn from "../style-elements/FadeIn";
import { cardShuffler } from "@/helpers/cardShuffler";
import { ScryfallCard } from "@scryfall/api-types";
import CardInPlayDeck from "../card/CardInPlayDeck";
import { defaultColors } from "@/constants/Colors";
import ShatterButton from "../button/ShatterButton";
import OnGoingScheme from "../card/OnGoingScheme";

const GAME_STATES = {
  DECK_SELECTION: "DECK_SELECTION",
  GAME_START: "GAME_START",
};

interface GameControllerProps {}

const GameController: React.FC<GameControllerProps> = () => {
  const [gameState, setGameState] = useState(GAME_STATES.DECK_SELECTION);
  const [selectedDeck, setSelectedDeck] = useState<SavedDeck | null>(null);
  const [shuffledDeck, setShuffledDeck] = useState<SavedDeck | null>(null);
  const [onGoingSchemes, setOnGoingSchemes] = useState<ScryfallCard.Scheme[]>([]);
  const [discardedCards, setDiscardedCards] = useState<ScryfallCard.Scheme[]>([]);

  const handleShuffleDeck = (deck: SavedDeck) => {
    if (deck) {
      setShuffledDeck(cardShuffler(deck));
    }
  };

  const handleRemoveCardFromShuffledDeck = (card: ScryfallCard.Scheme, discardCard: boolean) => {
    if (shuffledDeck) {
      const newShuffledDeck = shuffledDeck.cards.filter((deckCard) => deckCard.name !== card.name);
      setShuffledDeck((prevShuffledDeck) =>
        prevShuffledDeck ? { ...prevShuffledDeck, cards: newShuffledDeck } : null
      );
      if (discardCard) {
        setDiscardedCards((prevDiscardedCards) => [...prevDiscardedCards, card]);
      }
    }
  };

  const handleDeckSelected = (deck: SavedDeck) => {
    setGameState(GAME_STATES.GAME_START);
    setSelectedDeck(deck);
    handleShuffleDeck(deck);
  };

  const handleAddOnGoingScheme = (card: ScryfallCard.Scheme) => {
    setOnGoingSchemes([...onGoingSchemes, card]);
  };

  const handleRemoveOnGoingScheme = (card: ScryfallCard.Scheme) => {
    const newOnGoingSchemes = onGoingSchemes.filter((scheme) => scheme.name !== card.name);
    setOnGoingSchemes(newOnGoingSchemes);
    setDiscardedCards((prevDiscardedCards) => [...prevDiscardedCards, card]);
  };

  const handleResetGame = () => {
    if (discardedCards.length > 0 && selectedDeck) {
      const newDeck: SavedDeck = { deckName: selectedDeck.deckName, cards: [...discardedCards] };
      handleShuffleDeck(newDeck);
    }
    // clear discarded cards after reshuffle
    setDiscardedCards([]);
  };

  const onGoingSchemesContent = (
    <View style={styles.onGoingSchemeContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {onGoingSchemes.map((card) => (
          <OnGoingScheme
            key={card.name}
            card={card}
            removeOnGoingScheme={() => handleRemoveOnGoingScheme(card)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const playDeckContent = (
    <View style={styles.playCardContainer}>
      {onGoingSchemes.length > 0 && onGoingSchemesContent}
      {shuffledDeck && shuffledDeck.cards.length > 0 ? (
        shuffledDeck.cards.map((card: ScryfallCard.Scheme) => (
          <CardInPlayDeck
            key={card.name}
            card={card}
            addToOnGoingSchemes={handleAddOnGoingScheme}
            removeCardFromDeck={handleRemoveCardFromShuffledDeck}
          />
        ))
      ) : (
        <ShatterButton buttonName={"Reshuffle"} onPlayPress={handleResetGame} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {gameState == "DECK_SELECTION" && (
        <FadeIn>
          <SavedDecks
            canDeleteDeck={false}
            canClearDeckList={false}
            onDeckSelectedForPlay={handleDeckSelected}
          />
        </FadeIn>
      )}
      {gameState == "GAME_START" && playDeckContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  playCardContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  onGoingSchemeContainer: {
    borderWidth: 2,
    borderColor: defaultColors.gold,
    borderRadius: 10,
    width: "95%",
    paddingVertical: 10,
    marginTop: 30,
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    overflow: "hidden",
  },
});

export default GameController;