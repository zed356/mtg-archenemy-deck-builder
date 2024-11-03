import { Fragment, useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { defaultColors } from "@/constants/Colors";
import { ScryfallCard } from "@scryfall/api-types";
import CheckBoxButton from "../button/CheckBoxButton";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../button/CustomButton";
import Spacer from "../style-elements/Spacer";

interface FilterProps {
  cards: ScryfallCard.Scheme[];
  setDisplayedCards: (cards: ScryfallCard.Scheme[]) => void;
  filterIconActiveColor?: string;
  filterIconInactiveColor?: string;
}

interface ICheckBoxFilter {
  showSchemes: boolean;
  showOngoingSchemes: boolean;
}

const Filter: React.FC<FilterProps> = ({
  cards,
  setDisplayedCards,
  filterIconActiveColor,
  filterIconInactiveColor,
}) => {
  const [cardNameFilter, setCardNameFilter] = useState<string>("");
  const [cardOracleTextFilter, setCardOracleTextFilter] = useState<string>("");
  const [checkBoxFilter, setCheckBoxFilter] = useState<ICheckBoxFilter>({
    showSchemes: true,
    showOngoingSchemes: true,
  });
  const [filtersAreShown, setFiltersAreShown] = useState<boolean>(false);

  const filteredCards = cards.filter((card) => {
    if (!checkBoxFilter.showSchemes && card.type_line === "Scheme") {
      return false;
    }

    if (!checkBoxFilter.showOngoingSchemes && card.type_line === "Ongoing Scheme") {
      return false;
    }

    if (
      cardNameFilter.length !== 0 &&
      !card.name.toLowerCase().includes(cardNameFilter.trim().toLowerCase())
    ) {
      return false;
    }

    if (
      cardOracleTextFilter.length !== 0 &&
      !card.oracle_text.toLowerCase().includes(cardOracleTextFilter.trim().toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    setDisplayedCards(filteredCards);
  }, [cardNameFilter, checkBoxFilter, cardOracleTextFilter]);

  const content = filtersAreShown ? (
    <Fragment>
      <View style={styles.filterWrapper}>
        <TextInput
          style={styles.textInput}
          value={cardNameFilter}
          onChangeText={(text) => setCardNameFilter(text)}
          placeholder="Search name"
          placeholderTextColor={defaultColors.grey}
          multiline={true}
          maxLength={85}
        />
        <TextInput
          style={styles.textInput}
          value={cardOracleTextFilter}
          onChangeText={(text) => setCardOracleTextFilter(text)}
          placeholder="Search description"
          placeholderTextColor={defaultColors.grey}
          multiline={true}
          maxLength={85}
        />
      </View>
      <View style={styles.checkBoxButtonContainer}>
        <CheckBoxButton
          text="Ongoing schemes"
          onCheckChange={(newState) =>
            setCheckBoxFilter((prev) => ({ ...prev, showOngoingSchemes: newState }))
          }
          inactiveColor={filterIconInactiveColor || defaultColors.grey}
        />
        <CheckBoxButton
          text="Schemes"
          onCheckChange={(newState) =>
            setCheckBoxFilter((prev) => ({ ...prev, showSchemes: newState }))
          }
          inactiveColor={filterIconInactiveColor || defaultColors.grey}
        />
      </View>
    </Fragment>
  ) : null;

  return (
    <Fragment>
      <View style={styles.container}>
        <Spacer />
        {filtersAreShown && (
          <Fragment>
            <CustomButton
              type="neutral"
              text="Reset filters"
              onPress={() => {
                setCardNameFilter("");
                setCardOracleTextFilter("");
                setCheckBoxFilter({
                  showSchemes: true,
                  showOngoingSchemes: true,
                });
              }}
            />
          </Fragment>
        )}
        <FontAwesome
          name="filter"
          size={35}
          style={{ alignSelf: "flex-end", marginRight: 15 }}
          onPress={() => setFiltersAreShown((prev) => !prev)}
          color={
            filtersAreShown
              ? filterIconActiveColor || defaultColors.gold
              : filterIconInactiveColor || defaultColors.grey
          }
        />
      </View>
      {content}
    </Fragment>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterWrapper: {
    alignItems: "center",
    padding: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: defaultColors.gold,
    backgroundColor: "#590080",
    padding: 10,
    marginRight: 10,
    color: defaultColors.gold,
    width: "96%",
    marginVertical: 5,
  },
  checkBoxButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    width: "100%", // odd, but nice styling if only this element has 100%
  },
});