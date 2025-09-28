import { House, ListOrdered, Settings, ShoppingCart, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
	const params = useLocation()
	console.log(params.pathname)

	const data = [
		{
			name: 'Bosh sahifa',
			icon: <House className='w-6 h-6' />,
			link: '/',
		},
		{
			name: 'Maxsulotlar',
			icon: <ShoppingCart className='w-6 h-6' />,
			link: '/barcha-maxsulotlar',
		},
		{
			name: 'Buyurtmalar',
			icon: <ListOrdered className='w-6 h-6' />,
			link: '/buyurtmalar',
		},
		{
			name: 'Sozlamalar',
			icon: <Settings className='w-6 h-6' />,
			link: '/sozlamalar',
		},
		{
			name: 'Profil',
			icon: <User className='w-6 h-6' />,
			link: '/shaxsiy-kabinet',
		},
	]

	return (
		<div className='fixed bottom-0 z-50 w-full bg-blue-400 rounded-t-2xl shadow-lg'>
			<div className='flex justify-around items-center h-16'>
				{data.map(item => (
					<Link
						key={item.name}
						to={item.link}
						className={`flex flex-col items-center text-[15px] transition ${
							params.pathname === item.link ? 'text-blue-300' : 'text-white'
						}`}
					>
						{item.icon}
						<span
							className={`text-[10px] mt-1 ${
								params.pathname === item.link ? 'text-blue-300' : 'text-white'
							}`}
						>
							{item.name}
						</span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Navbar
