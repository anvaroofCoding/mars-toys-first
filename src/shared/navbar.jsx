import { House, ListOrdered, Settings, ShoppingCart, User } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
	const params = useLocation()
	const items = useSelector(state => state.products.items)

	// Masalan, buyurtmalar soni:
	const orderCount = 3

	const data = [
		{
			name: 'Bosh sahifa',
			icon: <House className='w-6 h-6' />,
			link: '/',
		},
		{
			name: 'Maxsulotlar',
			icon: <ListOrdered className='w-6 h-6' />,
			link: '/barcha-maxsulotlar',
		},
		{
			name: 'Buyurtmalar',
			icon: <ShoppingCart className='w-6 h-6' />,
			link: '/buyurtmalar',
			badge: orderCount,
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
						className={`relative flex flex-col items-center text-[15px] transition ${
							params.pathname === item.link ? 'text-blue-300' : 'text-white'
						}`}
					>
						{/* Icon qismi */}
						<div className='relative'>
							{item.icon}
							{item.badge && (
								<span className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full'>
									{items?.length}
								</span>
							)}
						</div>
						{/* Matn qismi */}
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
