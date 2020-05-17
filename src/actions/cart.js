import { ADD_TO_CART, CHANGE_ITEM_QUANTITY, REMOVE_ITEM } from './actionTypes';


export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  }
}

export const removeItem = (itemId) => {
  return {
    type: REMOVE_ITEM,
    payload: itemId,
  }
}

export const changeItemQuantity = ({itemId, itemQuantity}) => {
  return {
    type: CHANGE_ITEM_QUANTITY,
    payload: {itemId, itemQuantity}
  }
}
