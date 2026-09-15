import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItem } from '../../types';

interface CartState {
  restaurantId: string | null;
  restaurantName: string | null;
  items: OrderItem[];
}

const initialState: CartState = {
  restaurantId: null,
  restaurantName: null,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // An order can only contain meals from a single restaurant — starting a
    // cart for a new restaurant replaces whatever was there before.
    addItem(
      state,
      action: PayloadAction<{
        restaurantId: string;
        restaurantName: string;
        meal: { mealId: string; name: string; price: number };
      }>,
    ) {
      const { restaurantId, restaurantName, meal } = action.payload;
      if (state.restaurantId !== restaurantId) {
        state.restaurantId = restaurantId;
        state.restaurantName = restaurantName;
        state.items = [];
      }
      const existing = state.items.find(i => i.mealId === meal.mealId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...meal, quantity: 1 });
      }
    },
    decrementItem(state, action: PayloadAction<{ mealId: string }>) {
      const existing = state.items.find(i => i.mealId === action.payload.mealId);
      if (!existing) return;
      existing.quantity -= 1;
      if (existing.quantity <= 0) {
        state.items = state.items.filter(i => i.mealId !== action.payload.mealId);
      }
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
    },
    clearCart(state) {
      state.restaurantId = null;
      state.restaurantName = null;
      state.items = [];
    },
  },
});

export const { addItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
