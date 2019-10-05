import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../common/actions';
import styled from 'styled-components/native';
import RadioButtons from './RadioButtons';

const MealCard = ({veggie, ...props}) => {

    const [state, setState] = useState({
        size: 'reg',
        quantity: 1,
    });

    const { id } = props;
    const { size, quantity } = state;
    const sizeDetails = Object.keys(props.sizeVariants)
        .map(key => props.sizeVariants[key])
        .filter(sizeVariant => (
            sizeVariant.productId === id
            && sizeVariant.size === size
        ))[0];
    const { cal, car, fat, pro } =  sizeDetails.nutrition;

    const mergeState = newState => setState({
        ...state,
        ...newState
    })

    // const handleChange = key => e => mergeState({[key]: e.target.value})
    const handleChange = key => e => null;

    // const handleQuantityChange = ({ target: { value } }) => {
    //     let newValue = '';
    //     if ( /^\d+$/.test(value) ) newValue = Math.abs(Number(value))
    //     mergeState({
    //         quantity: newValue
    //     })
    // }
    const handleQuantityChange = () => null

    const toggle = key => () => mergeState({
        [key]: !state[key]
    })

    const dispatch = useDispatch();
    const addToCart = () => dispatch(addItemToCart({
        productId: id,
        name: props.productName,
        itemPrice: sizeDetails.price,
        size: state.size,
        veggie: veggie,
        qty: state.quantity
    }))

    return (
      <MealCardView>
        <Meal>
          <MealImageWrapper className="meal-img-wrapper">
            <Text>[Image]</Text>
              {/* <img className="meal-img" src={`/img/${props.imageUrl}`} /> */}
          </MealImageWrapper>
          <MealDetails>
            <Hed>{props.productName}</Hed>
            <Dek>{props.dek}</Dek>
            <SizeVegetarianGroup>
              <SizeButtonGroup>
                {/* <label htmlFor={`${props.id}-size-reg`} >
                      <input 
                          type="radio" 
                          value="reg"
                          onChange={handleChange('size')}
                          checked={state.size === 'reg'}
                          id={`${props.id}-size-reg`} />
                      <Text>Regular</Text>
                  </label>
                  <label htmlFor={`${props.id}-size-lg`}>
                      <input 
                          type="radio" 
                          value="lg"
                          onChange={handleChange('size')}
                          checked={state.size === 'lg'}
                          id={`${props.id}-size-lg`} />
                      <Text>Large</Text>
                  </label> */}
                <RadioButton title="Reg" />
                <RadioButton title="Lrg" />
              </SizeButtonGroup>
              {(veggie) && <Text>Vegetarian</Text>}
            </SizeVegetarianGroup>
            <QuantityPriceGroup>
              <QuantityEditGroup>
                {/* <label>Quantity&nbsp;</label>
                <input type="text" 
                        pattern="[0-9]*" 
                        placeholder="0"
                        value={state.quantity} 
                        onChange={handleQuantityChange} />  */}
                <Text>Quantity</Text>
                {/* <Input /> */}
              </QuantityEditGroup>
              <Text>${(sizeDetails.price * quantity).toFixed(2)}</Text>
            </QuantityPriceGroup>
          </MealDetails>
        </Meal>
        {/* <button onClick={addToCart}>
              <FontAwesomeIcon
                  icon={faCartPlus}
                  size="1x"
                  color="#FFF" />
          </button> */}
        <AddToCartButton title="Add to cart" />
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
  align-items: center;
`;

const Meal = styled.View`
  flex-direction: row;
  max-width: 100%;
`;

const MealImageWrapper = styled.View`
  height: 100px;
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
`;

const Hed = styled.Text`
  color: black;
  max-width: 100%;
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
`;

const SizeButtonGroup = styled.View`
  max-width: 100%;
  flex-direction: row;
`;

const QuantityPriceGroup = styled.View`
  max-width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const QuantityEditGroup = styled.View`
  max-width: 100%;
  flex-direction: row;
`;

const AddToCartButton = styled.Button`
  max-width: 100%;
  color: green;
`;

const CalorieInfo = styled.Text`
  max-width: 100%;
  color: grey;
`;

export default MealCard;
// export default styled(MealCard)`
//     & {
//         box-sizing: content-box;
//         display: flex;
//         flex-direction: column;
//         margin: 10px 0;
//         background-color: #FFF;
//         border-radius: 5px;
//         box-shadow: 0 3px 6px rgba(0,0,0,0.16);
//         padding: 10px;
//     }

//     & h3 {
//         font-size: 12px;
//         margin: 5px;
//         font-weight: normal;
//     }

//     .meal-details {
//         display: flex;
//         flex-shrink: 3;
//         ${'' /* display: inline-block; */}
//         flex-direction: column;
//         padding: 0 5px;
//     }

//     .meal-info-options p:last-child {
//         color: #24b47e;
//         margin: 0 5px 0 auto;
//         line-height: 19px;
//     }

//     & .meal-info-options p {
//         font-size: 11px;
//         font-style: italic;
//         color: grey;
//         margin: 0 5px;
//     }

//     .meal-info-options input[type="radio"] {
//         vertical-align: middle;
//     }

//     .options-container {
//         display: flex;

//     }

//     & label {
//         font-size: 11px;
//         vertical-align: middle;
//         line-height: 19px;
//         ${'' /* display: inline-block; */}
//     }

//     .top-row {
//         display: flex;
//         justify-content: flex-start;
//     }

//     .meal-img {
//         position: absolute;
//         top: -100%;
//         right: -100%;
//         bottom: -100%;
//         left: -100%;
//         height: 100%;
//         display: inline;
//         margin: auto;
//     }

//     .meal-img-wrapper {
//         ${'' /* display: inline-block; */}
//         position: relative;
//         flex: 0 0 auto;
//         width: 100px;
//         height: 100px;
//         border-radius: 5px;
//         overflow: hidden;
//         text-align: center;
//     }

//     .meal-quantity-price {
//         display: flex;
//         justify-content: flex-end;
//     }

//     .meal-quantity-price input {
//         width: 33%;
//         border: 1px solid grey;
//         border-radius: 3px;
//         max-width: 30px;
//         margin-right: auto;
//         text-align: right;
//     }

//     .meal-add-cart,
//     .meal-nutrition {
//         text-align: center;
//     }

//     .meal-nutrition {
//         font-size: 11px;
//         p {
//             color: #A7A5A5;
//             margin: 0;
//         }
//     }

//     button {
//         background: #23B47E;
//         border: none;
//         color: white;
//         border-radius: 2px;
//         width: 100%;
//         height: 30px;
//         margin-top: 10px;
//         cursor: pointer;
//     }

//     hr {
//         width: 100%;
//         border: 0.75px solid #f1f1f1;
//     }

//     @media screen and (min-width: 1024px) {
//         & {
//             margin: 5px;
//         }
//     }
// `;