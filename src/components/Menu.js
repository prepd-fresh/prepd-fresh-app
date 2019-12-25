import React from "react";
import { Text, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import MealCard from "./MealCard";

const isProductType = desiredType => product => desiredType === product.type;
const toMealCardFromMealWith = sizeVariants => meal => (
  <MealCard key={meal.id} {...{ ...meal, sizeVariants }} />
);

const Menu = ({ products, nextWeekdayDate, ...props }) => (
  <ScrollView
    contentContainerStyle={{
      padding: 20,
      justifyContent: "flex-start",
      display: props.cartIsNotVisible ? "flex" : "none"
    }}
  >
    <MenuHed>Menu</MenuHed>
    <Text>Choose from our weekly rotating selection of dishes!</Text>
    <Text>
      Meals are delivered every Sunday. The next delivery date is
      {" " + nextWeekdayDate(7)}.
    </Text>
    <View style={{ marginBottom: 100 }}>
      {Object.values(products)
        .filter(isProductType("meal"))
        .map(toMealCardFromMealWith(props.productSizeVariants))}
    </View>
  </ScrollView>
);

const MenuHed = styled.Text`
  color: #3e444b;
  font-size: 30px;
  font-weight: bold;
  max-width: 100%;
`;

export default Menu;
