import { BoxIcon, Home } from 'lucide-react'

const Cards = () => {
	const chiqish = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('phone')
		localStorage.removeItem('refresh_token')
	}
	return (
		<div className='w-[300px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_15px_15px_-6px_rgba(0,0,0,0.06)] transition-all duration-300'>
			<div className='px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-blue-600'>
				<p className='text-xs font-medium text-blue-200 uppercase tracking-wider'>
					Sizning profil raqamingiz
				</p>
				<div className='flex items-center mt-1'>
					<div className='bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2'>
						<svg
							fill='currentColor'
							viewBox='0 0 20 20'
							className='h-4 w-4'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								clipRule='evenodd'
								d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
								fillRule='evenodd'
							/>
						</svg>
					</div>
					<p className='text-sm font-medium text-white truncate hover:after:w-full relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#2b6cb0] after:transition-all after:duration-300'>
						+{localStorage.getItem('phone')}
					</p>
				</div>
			</div>
			<div className='py-1.5'>
				<a
					href='#'
					className='group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200'
				>
					<div className='absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80' />
					<div className='w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200'>
						<Home className='text-blue-500' />
					</div>
					<span className='font-medium text-gray-700 group-hover:text-[#1a365d]'>
						Bosh sahifa
					</span>
					<svg
						fill='currentColor'
						viewBox='0 0 20 20'
						className='h-3 w-3 text-gray-400 ml-auto group-hover:text-[#2b6cb0]'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							clipRule='evenodd'
							d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
							fillRule='evenodd'
						/>
					</svg>
				</a>
				<a
					href='#'
					className='group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200'
				>
					<div className='absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80' />
					<div className='w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200'>
						<BoxIcon className='text-blue-500' />
					</div>
					<span className='font-medium text-gray-700 group-hover:text-[#1a365d]'>
						Barcha mahsulotlar
					</span>
					<svg
						fill='currentColor'
						viewBox='0 0 20 20'
						className='h-3 w-3 text-gray-400 ml-auto group-hover:text-[#2b6cb0]'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							clipRule='evenodd'
							d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
							fillRule='evenodd'
						/>
					</svg>
				</a>
				<a
					href='#'
					onClick={chiqish}
					className='group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200'
				>
					<div className='absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80' />
					<div className='w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200'>
						<svg
							fill='currentColor'
							viewBox='0 0 20 20'
							className='h-5 w-5 text-red-500 group-hover:text-red-600'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								clipRule='evenodd'
								d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
								fillRule='evenodd'
							/>
						</svg>
					</div>
					<span className='font-medium text-gray-700 group-hover:text-red-600'>
						Logout
					</span>
					<svg
						fill='currentColor'
						viewBox='0 0 20 20'
						className='h-3 w-3 text-gray-400 ml-auto group-hover:text-red-500'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							clipRule='evenodd'
							d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
							fillRule='evenodd'
						/>
					</svg>
				</a>
			</div>
		</div>
	)
}

export default Cards
