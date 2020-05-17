import { GET_CART_LIST, ADD_TO_CART, REMOVE_ITEM, CHANGE_ITEM_QUANTITY } from "../actions/actionTypes";


const initialCartState = {
    cartList: [ ],
       
    cartTotal: 0,
};



const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const item = (action.payload);
            const newList = [...state.cartList];
            if (!newList.find(x => x.id === item.id))
            {newList.push(item);}
            else {
                const ItemIndex = newList.findIndex(x => x.id === item.id);

                newList[ItemIndex] = {
                ...newList[ItemIndex],
                quantity : newList[ItemIndex].quantity + 1,
              };
            };
            
            const newCartTotal = newList.reduce((a,b) => a + (b.quantity * b.price), 0);
            return {
                ...state,
                cartList: newList,
                cartTotal: newCartTotal,
            };
        };

        case REMOVE_ITEM: {
            const itemId = action.payload.itemId;
            const newList = [...state.cartList].filter(item => item.id !== itemId);


            const newCartTotal = newList.reduce((a,b) => a + (b.quantity * b.price), 0);
            return {
                ...state,
                cartList: newList,
                cartTotal: newCartTotal,
            };
        };

        case CHANGE_ITEM_QUANTITY: {
            const itemId = action.payload.itemId;
            const itemQuantity = action.payload.itemQuantity;
            const newCart = [...state.cartList];
            const ItemIndex = newCart.findIndex(item => item.id === itemId);

            newCart[ItemIndex] = {
                ...newCart[ItemIndex],
                quantity: itemQuantity,
              };
            
              const newCartTotal = newCart.reduce((a,b) => a + (b.quantity * b.price), 0);
              
            return {
                ...state,
                cartList: newCart,
                cartTotal: newCartTotal,
            };
        };

        case GET_CART_LIST: {
            return {
              ...state,
            };
          }

        

        default: return state;
    }
};

export default cartReducer;