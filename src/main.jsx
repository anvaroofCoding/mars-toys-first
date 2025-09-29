import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
import Header from './components/header'
import './index.css'
import Allproducts from './pages/allproducts'
import Login from './pages/login'
import Order from './pages/order'
import ProductsDetail from './pages/productsDetail'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />}>
						<Route path='/' element={<Header />} />
						<Route path='/barcha-maxsulotlar' element={<Allproducts />} />
						<Route path='/buyurtmalar' element={<Order />} />
						<Route path='/shaxsiy-kabinet' element={<Login />} />
						<Route
							path='/maxsulotlar-kabinet/:id'
							element={<ProductsDetail />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
