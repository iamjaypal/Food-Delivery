import React, { createContext, useContext, useReducer } from "react";
const CartstateContext = createContext();
const CartdispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, img: action.img, price: action.price, }]
        case "REMOVE":
            const newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case "UPDATE":
            const arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price, img: action.img }
                }
                return arr
            })
            return arr
        case "DROP":
            const emparr=[];
            return emparr;
        default:
            console.log("Error in Reducer");
    }

}
export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartstateContext.Provider value={state}>
            <CartdispatchContext.Provider value={dispatch}>
                {children}
            </CartdispatchContext.Provider>
        </CartstateContext.Provider>
    )
}

export const useCart = () => useContext(CartstateContext);
export const useDispatchCart = () => useContext(CartdispatchContext)