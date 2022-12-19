import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../../Api";
import { AppDispatch, AppThunk, RootState } from "../store";

interface ICaracteristica {
    nome: string;
    descricao: string;
    valor: string;
}

export interface IProduto {
    _id: string;
    nome: string;
    sobre: string;
    preco: number;
    marca: string;
    imposto: number;
    estoque: number;
    imagem: string;
    caracteristicas: ICaracteristica[];
}

const initialState: IProduto[] = [];

export const allProductsSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {
        addProduct(state, { payload }) {
            state.push(payload);
        },

        clearProducts() {
            return initialState;
        }
    }
})

export function getProducts(): AppThunk {
    return async function (dispatch: AppDispatch) {
        try {
            dispatch(clearProducts());
            const result = await api.get('/produtos');
            result.data.map((product: IProduto) => {
                dispatch(addProduct(product));
            });
        } catch (error) {
            console.log(error);
            toast.error('Falha carregar produtos, tente mais tarde :(', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
}

export const { addProduct, clearProducts } = allProductsSlice.actions;
export default allProductsSlice.reducer;
export const selectAllProducts = (state: RootState) => state.allProducts;