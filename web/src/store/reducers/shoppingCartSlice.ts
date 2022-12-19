import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ICartProducts {
    produtoId: string;
    nome: string;
}

interface ICartQuantities {
    produtoId: string;
    quantidade: number;
}

interface IShoppingCart {
    produtos: ICartProducts[];
    quantidade: ICartQuantities[];
    total_produtos: number;
    total_pedido: number;
}

const initialState: IShoppingCart = {
    produtos: [],
    quantidade: [],
    total_produtos: 0,
    total_pedido: 0
}

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addCartProduct(state, { payload }) {
           
        },

        removeCartProduct(state, { payload }) {

        }
    }
})

export const {addCartProduct, removeCartProduct} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
export const selectShoppingCart = (state: RootState) => state.shoppingCart;