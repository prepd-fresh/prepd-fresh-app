import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../common/actions';
import styled from 'styled-components/native';
import RadioButtons from './RadioButtons';

const MealCard = ({veggie, ...props}) => {

    const [size, setSize] = useState('reg');
    const [quantity, setQuantity] = useState(1);

    const { id } = props;
    const sizeDetails = Object.keys(props.sizeVariants)
        .map(key => props.sizeVariants[key])
        .filter(sizeVariant => (
            sizeVariant.productId === id
            && sizeVariant.size === size
        ))[0];
    const { cal, car, fat, pro } =  sizeDetails.nutrition;

    const handleQuantityChange = val => setQuantity(
      /^\d+$/.test(val) 
        ? Math.abs(Number(val)) 
        : ''
    )

    const dispatch = useDispatch();

    const selectSizeRadioButton = val => () => setSize(val);

    const addToCart = () => dispatch(addItemToCart({
        productId: id,
        name: props.productName,
        itemPrice: sizeDetails.price,
        size: size,
        veggie: veggie,
        qty: quantity
    }));

    const sizeRadioButtons = {
      radioGroupId: 'size',
      selected: size,
      selectRadioButton: selectSizeRadioButton,
      btns: [ 
        { id: 'reg', label: "Regular" }, 
        { id: 'lg', label: "Large" } 
      ]
    };

    return (
      <MealCardView>
        <Meal>
          <MealDetails>
            <MealImageWrapper className="meal-img-wrapper">
              <Text>[Image]</Text>
                {/* <img className="meal-img" src={`/img/${props.imageUrl}`} /> */}
            </MealImageWrapper>
            <Hed>{props.productName}</Hed>
            <Dek>{props.dek}</Dek>
            <SizeVegetarianGroup>
              <SizeButtonGroup>
                <RadioButtons {...sizeRadioButtons} />
                {/* <label htmlFor={`${props.id}-size-reg`} >
                      <input 
                          type="radio" 
                          value="reg"
                          onChange={setSize('size')}
                          checked={size === 'reg'}
                          id={`${props.id}-size-reg`} />
                      <Text>Regular</Text>
                  </label>
                  <label htmlFor={`${props.id}-size-lg`}>
                      <input 
                          type="radio" 
                          value="lg"
                          onChange={setSize('size')}
                          checked={size === 'lg'}
                          id={`${props.id}-size-lg`} />
                      <Text>Large</Text>
                  </label> */}
              </SizeButtonGroup>
              {(veggie) && <Text>Vegetarian</Text>}
            </SizeVegetarianGroup>
            <QuantityPriceGroup>
              <QuantityEditGroup>
                {/* <label>Quantity&nbsp;</label>
                <input type="text" 
                        pattern="[0-9]*" 
                        placeholder="0"
                        value={quantity} 
                        onChange={handleQuantityChange} />  */}
                <Text style={{fontSize: 17, alignSelf: 'center', paddingRight: 5}}>Quantity</Text>
                <QuantityButton backgroundColor="#D52626"><Text style={{color: 'white', fontWeight: 'bold'}}>-</Text></QuantityButton>
                <TextInput 
                    selectTextOnFocus
                    pattern="[0-9]*" 
                    keyboardType="numeric"
                    type="text" 
                    style={{borderColor: '#AAA', paddingLeft: 5, width: 25, borderWidth: 1, marginLeft: 5, marginRight: 5}}
                    // value={cartItem.qty} 
                    value={String(quantity)}
                    onChangeText={setQuantity}/>
                <QuantityButton backgroundColor="#23B47E"><Text style={{color: 'white', fontWeight: 'bold'}}>+</Text></QuantityButton>
                {/* <Input /> */}
              </QuantityEditGroup>
              <PriceText>${(sizeDetails.price * quantity).toFixed(2)}</PriceText>
            </QuantityPriceGroup>
          </MealDetails>
        </Meal>
        {/* <button onClick={addToCart}>
              <FontAwesomeIcon
                  icon={faCartPlus}
                  size="1x"
                  color="#FFF" />
          </button> */}
        <AddToCartButton onPress={addToCart}>
          <AddToCartButtonText>ADD TO CART</AddToCartButtonText>
        </AddToCartButton>
        <CalorieInfo>{`Cal ${cal * quantity} - Carbs ${car * quantity}g - Fat ${fat * quantity}g - Protein ${pro * quantity}g`}</CalorieInfo>
      </MealCardView>
    )
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
  background: #FFF;
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

// const MealImageWrapper = styled.View`
//   height: 100px;
//   width: 100px;
//   background-color: #DDD;
//   border-radius: 5px;
//   overflow: hidden;
//   flex-grow: 0;
//   flex-shrink: 0;
//   max-width: 100%;
// `;

const MealImageWrapper = styled.View`
  width: 100px;
  background-color: #DDD;
  border-radius: 5px;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
  max-width: 100%;
`;

const MealDetails = styled.View`
  align-items: flex-start;
  flexShrink: 1;
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
  background-color: #23B47E;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const AddToCartButtonText = styled.Text`
  color: #FFF;
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