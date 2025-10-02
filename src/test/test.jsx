import { useDispatch, useSelector } from 'react-redux'
import {
	addProduct,
	clearProducts,
	removeProduct,
} from './features/productsSlice'

const ProductComponent = () => {
	const dispatch = useDispatch()
	const products = useSelector(state => state.products.items)

	const handleAdd = () => {
		dispatch(addProduct({ id: 1, name: 'iPhone 16', price: 1200 }))
	}

	const handleRemove = () => {
		dispatch(removeProduct(1))
	}

	const handleClear = () => {
		dispatch(clearProducts())
	}

	return (
		<div>
			<button onClick={handleAdd}>➕ Add Product</button>
			<button onClick={handleRemove}>🗑 Remove Product</button>
			<button onClick={handleClear}>❌ Clear All</button>

			<pre>{JSON.stringify(products, null, 2)}</pre>
		</div>
	)
}
