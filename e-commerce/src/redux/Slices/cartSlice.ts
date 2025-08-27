import { productData } from "@/components/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    items: productData[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<productData>) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const existing = state.items.find(item => item.id === action.payload);
            if (existing) {
                if (existing.quantity && existing.quantity > 1) {
                    existing.quantity = existing.quantity - 1;
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload);
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
