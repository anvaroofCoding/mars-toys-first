import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/loading'
import { useProductsDetailQuery } from '../services/api'

const ProductsDetail = () => {
	const { id } = useParams()
	const { data, isLoading } = useProductsDetailQuery(id)
	const [mainImage, setMainImage] = useState(null)
	const [count, setCount] = useState(1)

	if (isLoading) {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<Loader />
			</div>
		)
	}

	if (!data) return <p>Mahsulot topilmadi</p>

	const { name, category, description, price, discounted_price, images } = data

	// Default asosiy rasm
	const activeImage = mainImage || (images.length > 0 ? images[0].image : null)

	return (
		<div className='container mx-auto p-6 pb-30'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Left - Images */}
				<div>
					{/* Asosiy rasm */}
					<div className='w-full h-96 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-100'>
						{activeImage ? (
							<img
								src={activeImage}
								alt={name}
								className='object-contain h-full w-full'
							/>
						) : (
							<p>No Image</p>
						)}
					</div>

					{/* Thumbnail rasmlar */}
					<div className='flex gap-3 mt-4 overflow-x-auto'>
						{images.map(img => (
							<div
								key={img.id}
								className={`w-20 h-20 border rounded-lg cursor-pointer overflow-hidden ${
									activeImage === img.image ? 'ring-2 ring-orange-500' : ''
								}`}
								onClick={() => setMainImage(img.image)}
							>
								<img
									src={img.image}
									alt={name}
									className='object-contain w-full h-full'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Right - Info */}
				<div className='flex flex-col justify-between'>
					<div>
						<h1 className='text-2xl font-bold mb-2'>{name}</h1>
						<p className='text-gray-500 mb-4'>{category}</p>
						<p className='text-gray-700 mb-6'>{description}</p>

						{/* Narx */}
						<div className='flex items-center gap-3 mb-6'>
							<span className='text-2xl font-semibold text-orange-600'>
								{discounted_price} so‘m
							</span>
							{discounted_price !== price && (
								<span className='line-through text-gray-400'>{price} so‘m</span>
							)}
						</div>
					</div>

					{/* Quantity va tugmalar */}
					<div className='mt-6'>
						<div className='flex items-center gap-4 mb-6'>
							<button
								onClick={() => setCount(prev => Math.max(1, prev - 1))}
								className='px-4 py-2 bg-gray-200 rounded-lg'
							>
								-
							</button>
							<span className='text-lg font-semibold'>{count}</span>
							<button
								onClick={() => setCount(prev => prev + 1)}
								className='px-4 py-2 bg-gray-200 rounded-lg'
							>
								+
							</button>
						</div>

						<div className='flex gap-4'>
							<button className='flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition'>
								Savatchaga qo‘shish
							</button>
							<button className='flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition'>
								Hozir sotib olish
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductsDetail
