import { Loader } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import { useNewProductsGetQuery } from './services/api'
import Navbar from './shared/navbar'

const App = () => {
	const { data, isLoading } = useNewProductsGetQuery()
	if (isLoading) {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<Loader />
			</div>
		)
	}
	console.log(data)
	return (
		<div className='bg-[linear-gradient(135deg,#ffffff_0%,#f8f6ff_25%,#e9d5ff_60%,#dbeafe_85%,#ffffff_100%)]'>
			<div>
				<div className='block xl:hidden'>
					<Navbar />
				</div>
				<Outlet />
				<Header />
			</div>
		</div>
	)
}

export default App
