import { Outlet } from 'react-router-dom'
import Navbar from './shared/navbar'

const App = () => {
	return (
		<div className='bg-[linear-gradient(135deg,#ffffff_0%,#f8f6ff_25%,#e9d5ff_60%,#dbeafe_85%,#ffffff_100%)]'>
			<div>
				<div className='block '>
					<Navbar />
				</div>
				<Outlet />
			</div>
		</div>
	)
}

export default App
