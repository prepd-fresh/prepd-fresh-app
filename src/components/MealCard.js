import React, { useState } from "react";
import Constants from "expo-constants";
import { Text, TextInput, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../actions";
import styled from "styled-components/native";
import RadioButtons from "./RadioButtons";

const MealCard = ({ veggie, ...props }) => {
  const [size, setSize] = useState("Regular");
  const [quantity, setQuantity] = useState(1);

  const { id } = props;
  const sizeDetails = Object.values(props.sizeVariants).filter(
    sizeVariant => sizeVariant.productId === id && sizeVariant.size === size
  )[0];
  const { cal, car, fat, pro } = sizeDetails.nutrition;

  const handleQuantityChange = val =>
    setQuantity(/^\d+$/.test(val) ? Math.abs(Number(val)) : "");

  const increment = () => handleQuantityChange(quantity + 1);
  const decrement = () =>
    handleQuantityChange(quantity - 1 < 1 ? 1 : quantity - 1);

  const dispatch = useDispatch();

  const selectSizeRadioButton = val => () => setSize(val);

  const addToCart = () =>
    dispatch(
      addItemToCart({
        productId: id,
        variantId: sizeDetails.id,
        name: props.productName,
        itemPrice: sizeDetails.price,
        size: size,
        veggie: veggie,
        qty: quantity,
        imageUrl: props.imageUrl
      })
    );

  const sizeRadioButtons = {
    radioGroupId: "size",
    selected: size,
    selectRadioButton: selectSizeRadioButton,
    btns: [
      { id: "Regular", label: "Regular" },
      { id: "Large", label: "Large" }
    ]
  };

  return (
    <MealCardView>
      <Meal>
        <MealDetails>
          <MealImageWrapper
            resizeMode="cover"
            resizeMethod="scale"
            source={{ uri: props.imageUrl }}
          />
          <Hed>{props.productName}</Hed>
          <Dek>{props.dek}</Dek>
          <SizeVegetarianGroup>
            <SizeButtonGroup>
              <RadioButtons {...sizeRadioButtons} />
            </SizeButtonGroup>
            {veggie && <Text>Vegetarian</Text>}
          </SizeVegetarianGroup>
          <QuantityPriceGroup>
            <QuantityEditGroup>
              <Text
                style={{ fontSize: 17, alignSelf: "center", paddingRight: 5 }}
              >
                Quantity
              </Text>
              <QuantityButton onPress={decrement} backgroundColor="#D52626">
                <Text style={{ color: "white", fontWeight: "bold" }}>-</Text>
              </QuantityButton>
              <TextInput
                selectTextOnFocus
                pattern="[0-9]*"
                keyboardType="numeric"
                type="text"
                style={{
                  borderColor: "#AAA",
                  paddingLeft: 5,
                  width: 50,
                  borderWidth: 1,
                  marginLeft: 5,
                  marginRight: 5
                }}
                value={String(quantity)}
                onChangeText={setQuantity}
              />
              <QuantityButton onPress={increment} backgroundColor="#23B47E">
                <Text style={{ color: "white", fontWeight: "bold" }}>+</Text>
              </QuantityButton>
            </QuantityEditGroup>
            <PriceText>${sizeDetails.price.toFixed(2)}</PriceText>
          </QuantityPriceGroup>
        </MealDetails>
      </Meal>
      <AddToCartButton onPress={addToCart}>
        <AddToCartButtonText>ADD TO CART</AddToCartButtonText>
      </AddToCartButton>
      <CalorieInfo>{`Cal ${cal} - Carbs ${car}g - Fat ${fat}g - Protein ${pro}g`}</CalorieInfo>
    </MealCardView>
  );
};

const RadioButton = styled.TouchableOpacity`
  height: 15px;
  width: 15px;
  border: 3px solid white;
  shadow-offset: 0 0;
  shadow-opacity: 1;
  shadow-radius: 2px;
  shadow-color: blue;
  border-radius: 10px;
  background-color: blue;
  margin: 10px;
`;

const MealCardView = styled.View`
  background: #fff;
  border-radius: 5px;
  shadow-opacity: 0.16;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-radius: 6px;
  elevation: 6;
  margin: 10px 0;
  padding: 10px;
  max-width: 100%;
  align-items: stretch;
`;

const Meal = styled.View`
  flex-direction: row;
  max-width: 100%;
`;

const MealImageWrapper = styled.Image`
  border-radius: 5px;
  flex: 1;
  align-self: stretch;
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
`;

const MealDetails = styled.View`
  align-items: stretch;
  flex-shrink: 1;
  max-width: 100%;
  padding: 10px;
`;

const Hed = styled.Text`
  color: black;
  max-width: 100%;
  margin-bottom: 10px;
`;

const Dek = styled.Text`
  max-width: 100%;
  color: grey;
  font-style: italic;
`;

const SizeVegetarianGroup = styled.View`
  max-width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const SizeButtonGroup = styled.View`
  max-width: 100%;
  flex-direction: row;
`;

const QuantityPriceGroup = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const QuantityEditGroup = styled.View`
  max-width: 100%;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
  justify-content: space-between;
  margin-right: 50px;
`;

const QuantityButton = styled.TouchableOpacity`
  width: 20px;
  background-color: ${props => props.backgroundColor};
  padding: 5px;
  border-radius: 5px;
  align-items: center;
`;

const AddToCartButton = styled.TouchableOpacity`
  max-width: 100%;
  background-color: #23b47e;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const AddToCartButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const CalorieInfo = styled.Text`
  max-width: 100%;
  color: grey;
  margin-top: 10px;
`;

const PriceText = styled.Text`
  font-size: 17px;
`;

export default MealCard;
