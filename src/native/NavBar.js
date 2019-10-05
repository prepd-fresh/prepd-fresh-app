import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartVisibility } from '../common/actions';
import styled from 'styled-components/native';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faShoppingCart, faCarrot, faBookOpen } from '@fortawesome/free-solid-svg-icons';
// import logo from "../cropped-color_logo_transparent.png";

const NavMenu = ({cartIsVisible, ...props}) => {
    const dispatch = useDispatch();
    const handleCheckoutPanelToggle = () => dispatch(toggleCartVisibility());
    const condHandleCheckoutPanelToggle = () => {
        if (cartIsVisible) handleCheckoutPanelToggle()
    }
    return (
        // <View className={props.className}>
        <NavBarView>
          <Text>Prep'd Fresh</Text>
            {/* <Link to="/" onClick={condHandleCheckoutPanelToggle}>
                <img className="logo" alt="logo" src={logo} />
            </Link>&nbsp;
            <Link to="/meals/" onClick={condHandleCheckoutPanelToggle}>
                <FontAwesomeIcon icon={faCarrot} size="lg" color="#F8951D" />
                <FontAwesomeIcon icon={faBookOpen} size="lg" color="#F8951D" />
                Meals
            </Link> */}
            {/* <Button  className="cartToggleBtn" onClick={handleCheckoutPanelToggle}> */}
            <CartButton title="CART" onPress={handleCheckoutPanelToggle} />
                {/* <FontAwesomeIcon icon={faShoppingCart} size="lg" color="#F8951D" /> */}
        </NavBarView>
    );
}

const NavBarView = styled.View`
  background-color: #FFF;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.16;
  shadow-radius: 6px;
  elevation: 6;
  padding-top: 40px;
  z-index: 9999;
`

const CartButton = styled.Button`
  flex: 0 0 20px;
`

export default NavMenu;
// export default styled(NavMenu)`
//     height: 40px;
//     display: flex;
//     ${'' /* justify-content: space-between; */}
//     justify-content: flex-start;
//     color: #F8951D;
//     box-shadow: 0 3px 6px rgba(0,0,0,0.16);
//     position: fixed;
//     top: 0;
//     width: 100%;
//     background-color: #FFFFFF;
//     z-index: 2;
//     a {
//         text-decoration: none;
//         color: #F8951D;
//     }
//     button {
//         margin-left: auto;
//         outline: none;
//         border: none;
//         background-color: #FFF;
//     }
//     & > * {
//         margin: 10px;
//     }
//     & .logo {
//         width: 30px;
//     }
//     .cartToggleBtn {
//         position: relative;
//         &::after {
//             content: '${props => props.cartItemCount}';
//             background-color: #F00;
//             color: #FFF;
//             height: 15px;
//             width: 15px;
//             border-radius: 50%;
//             top: -5px;
//             right: -5px;
//             position: absolute;
//         }
//     }
// `;