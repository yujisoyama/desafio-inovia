import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ICartProducts {
    produtoId: string;
    nome: string;
    quantidade: number;
    preco: number;
    imagem: string;
}

interface ICartQuantities {
    produtoId: string;
    quantidade: number;
}

interface IShoppingCart {
    produtos: ICartProducts[];
    quantidades: ICartQuantities[];
    total_produtos: number;
    total_pedido: number;
}


export const initialState: IShoppingCart = {
    produtos: [],
    quantidades: [],
    total_produtos: 0,
    total_pedido: 0
}

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addCartProduct(state, { payload }) {
            let oldQuantity = 0;

            const productInTheCart = state.produtos.filter(produto => {
                return produto.produtoId === payload.produtoId
            })

            if (productInTheCart.length) {
                state.produtos.forEach(produto => {
                    if (produto.produtoId === payload.produtoId) {
                        oldQuantity = produto.quantidade;
                        produto.quantidade = payload.quantidade
                    }
                });

                state.quantidades.forEach(quantidade => {
                    if (quantidade.produtoId === payload.produtoId) {
                        quantidade.quantidade = payload.quantidade
                    }
                })

                state.total_produtos = state.total_produtos + payload.quantidade - oldQuantity;
                state.total_pedido = state.total_pedido + payload.preco * payload.quantidade - oldQuantity * payload.preco;
                return;
            }

            state.produtos.push({
                produtoId: payload.produtoId,
                nome: payload.nome,
                quantidade: payload.quantidade,
                preco: payload.preco,
                imagem: payload.imagem
            });

            state.quantidades.push({
                produtoId: payload.produtoId,
                quantidade: payload.quantidade
            });

            state.total_produtos += payload.quantidade;
            state.total_pedido += payload.preco * payload.quantidade;

        },

        removeCartProduct(state, { payload }) {
            const index = state.produtos.findIndex(produto => produto.produtoId === payload);

            const removeQuantity = state.produtos[index].quantidade;
            const removePrice = state.produtos[index].preco * removeQuantity;

            state.produtos.splice(index, 1);
            state.quantidades.splice(index, 1);

            state.total_produtos -= removeQuantity;
            state.total_pedido -= removePrice;
        },

        clearShoppingCart() {
            return initialState;
        }
    }
})

export const { addCartProduct, removeCartProduct, clearShoppingCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
export const selectShoppingCart = (state: RootState) => state.shoppingCart;