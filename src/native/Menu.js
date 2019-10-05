import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styled, { css } from 'styled-components/native';
import MealCard from './MealCard';

const isProductType = desiredType => product => desiredType === product.type
const toProductByIdFrom = productsObj => productId => productsObj[productId] 
const toMealCardFromMealWith = sizeVariants => meal => (
    <MealCard key={meal.id} {...{...meal, sizeVariants}} />
)

const Menu = ({products, ...props}) => (
  <ScrollView contentContainerStyle={{
      padding: 20, 
      display: (props.cartIsNotVisible) ? 'flex' : 'none'
  }}>
    <MenuHed>Menu</MenuHed>
    <Text>Choose from our weekly rotating selection of dishes!</Text>
    <Text>Meals are delivered every Sunday. The next delivery date is Sunday, July 28. Order by 11:59pm Friday, July 26 to receive your delivery this Sunday.</Text>
    <View style={{marginBottom: 100}}>
      {Object.keys(products)
              .map(toProductByIdFrom(products))
              .filter(isProductType('meal'))
              .map(toMealCardFromMealWith(props.productSizeVariants))}
    </View>
  </ScrollView>
);

const MenuHed = styled.Text`
  color: #3E444B;
  font-size: 30px;
  font-weight: bold;
  max-width: 100%;
`;

export default Menu;
// export default styled(Menu)`
//     & {
//         padding: 0 20px;
//         height: 100%;
//     }

//     .MealCard-container {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         margin: 0;
//         flex-wrap: wrap;
//         justify-content: center;
//     }

//     @media screen and (min-width: 1024px) {
//         max-width: 1024px;

//         .MealCard-container {
//             flex-direction: row;
//         }
//     }
// `;