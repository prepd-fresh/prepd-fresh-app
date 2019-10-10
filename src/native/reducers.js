import { combineReducers } from "redux";
import uuidv4 from "uuid/v4";
import {
  ADD_ITEM_TO_CART,
  TOGGLE_CART_VISIBILITY,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM_QTY,
  UPDATE_CART_STATUS,
  RESIZE_WEBVIEW,
  CartStatuses
} from "../common/actions";
const { DEFAULT } = CartStatuses;

function products(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function productSizeVariants(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function cartStatus(state = DEFAULT, action) {
  switch (action.type) {
    case UPDATE_CART_STATUS:
      return action.status;
    default:
      return state;
  }
}

function cartIsVisible(state = false, action) {
  switch (action.type) {
    case TOGGLE_CART_VISIBILITY:
      return !state;
    case UPDATE_CART_STATUS:
      return action.status !== CartStatuses.DEFAULT;
    default:
      return state;
  }
}

function cart(state = {}, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      let { cartItem: aCartItem } = action;
      let similarExistingItem = Object.keys(state)
        .map(id => state[id])
        .filter(
          cartItem =>
            aCartItem.productId === cartItem.productId &&
            aCartItem.size === cartItem.size
        );
      if (similarExistingItem.length) {
        return {
          ...state,
          [similarExistingItem[0].id]: {
            ...similarExistingItem[0],
            qty:
              Number(similarExistingItem[0].qty) + Number(action.cartItem.qty)
          }
        };
      } else {
        let newId = uuidv4();
        return {
          ...state,
          [newId]: {
            ...action.cartItem,
            id: newId
          }
        };
      }
    }
    case REMOVE_ITEM_FROM_CART: {
      const { [action.cartItemId]: remove, ...newState } = state;
      return newState;
    }
    case UPDATE_CART_STATUS:
      return action.status === CartStatuses.SUCCESS ? {} : state;
    case UPDATE_CART_ITEM_QTY: {
      if (Number(action.qty) || action.qty == false) {
        const newState = {
          ...state,
          [action.id]: {
            ...state[action.id],
            qty:
              action.qty !== 0 && action.qty == false
                ? ""
                : Math.abs(Number(action.qty))
          }
        };
        return newState;
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}

function heroImageUrl(state = "", action) {
  switch (action.type) {
    default:
      return state;
  }
}

function infoCards(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function testimonialHeadingImgUrl(state = "", action) {
  switch (action.type) {
    default:
      return state;
  }
}

function testimonials(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function sliderImgUrl(state = "", action) {
  switch (action.type) {
    default:
      return state;
  }
}

function webViewHeight(state = "2000px", action) {
  switch (action.type) {
    case RESIZE_WEBVIEW:
      return action.webViewHeight;
    default:
      return state;
  }
}

const prepdApp = combineReducers({
  products,
  productSizeVariants,
  cartIsVisible,
  cartStatus,
  cart,
  heroImageUrl,
  infoCards,
  testimonialHeadingImgUrl,
  testimonials,
  sliderImgUrl,
  webViewHeight
});

export default prepdApp;
