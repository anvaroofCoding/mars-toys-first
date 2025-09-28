import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
import './index.css'
import Allproducts from './pages/allproducts'
import Order from './pages/order'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />}>
						<Route path='/barcha-maxsulotlar' element={<Allproducts />} />
						<Route path='/buyurtmalar' element={<Order />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
