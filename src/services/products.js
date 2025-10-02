import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	items: [], // productlar ro‘yxati
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.items.push(action.payload)
		},
		removeProduct: (state, action) => {
			state.items = state.items.filter(item => item.id !== action.payload)
		},
		clearProducts: state => {
			state.items = []
		},
	},
})

export const { addProduct, removeProduct, clearProducts } =
	productsSlice.actions
export default productsSlice.reducer
