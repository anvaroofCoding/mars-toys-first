import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import Loader from '../components/loading'
import { useProductsDetailQuery } from '../services/api'
import { addProduct } from '../services/products'

const ProductsDetail = () => {
	const { id } = useParams()
	const { tekImg, setTekImg } = useState([])
	const { data, isLoading } = useProductsDetailQuery(id)
	const [mainImage, setMainImage] = useState(null)
	const [count, setCount] = useState(1)
	const items = useSelector(state => state.products.items)
	const dispatch = useDispatch()

	if (isLoading) {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<Loader />
			</div>
		)
	}

	if (!data) return <p>Mahsulot topilmadi</p>

	const finded = items?.find(item => {
		return data.id == item.id
	})

	// function hasCommonElement(arr1, arr2) {
	// 	return arr1.some(el1 => arr2.some(el2 => el1.image.image === el2.image))
	// }

	const { name, category, description, price, discounted_price, images } = data

	// Default asosiy rasm
	const activeImage =
		mainImage || (images?.length > 0 ? images[0]?.image : null)

	// function filteredImages() {
	// 	if (finded) {
	// 		const findedItems = items.find(imgs => {
	// 			return imgs.image.image == activeImage
	// 		})
	// 		if (!findedItems) {
	// 			const findedImage = data?.images?.find(img => {
	// 				return img?.image == activeImage
	// 			})
	// 			if (findedImage) {
	// 				setTekImg(findedImage)
	// 			}
	// 		}
	// 	}
	// }
	console.log(items)

	const handleAdd = () => {
		if (!finded) {
			// yangi product
			if (navigator.vibrate) navigator.vibrate(200)

			const productToSave = {
				id: data.id,
				name: data.name,
				description: data.description,
				price: data.price,
				discount: data.discount,
				discounted_price: data.discounted_price,
				category: data.category,
				average_rating: data.average_rating,
				sold_count: data.sold_count,
				video_url: data.video_url,
				// default faqat 1-rasm
				image: data.images?.[0],
				quantity: 1,
			}

			dispatch(addProduct(productToSave))
		} else {
			// allaqachon qo‘shilgan, lekin boshqa rasm tanlansa
			const findedImage = data?.images?.find(img => img.image === activeImage)

			if (findedImage) {
				if (navigator.vibrate) navigator.vibrate(200)
				const filterYana = items?.find(basItem => {
					return basItem.image.id == findedImage.id
				})
				if (filterYana) {
					toast.warning('Bu sizning savatingizda mavjud!')
					console.log('Bu sizning savatingizda mavjud!')
				} else {
					const productToSave = {
						id: data.id,
						name: data.name,
						description: data.description,
						price: data.price,
						discount: data.discount,
						discounted_price: data.discounted_price,
						category: data.category,
						average_rating: data.average_rating,
						sold_count: data.sold_count,
						video_url: data.video_url,
						image: findedImage, // tanlangan rasm
						quantity: 1,
					}
					dispatch(addProduct(productToSave))
				}
			}
		}
	}

	const handleProductsdeleteLocaleStorege = id => {
		const dataProducts = items?.find(item => {
			return item.id == id
		})
		dispatch(removeProduct(dataProducts.id))
	}

	return (
		<div className='container mx-auto p-6 pb-30'>
			<Toaster position='bottom-center' />
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
							{/* {finded && findedImage ? (
								<button className='flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-vlue-700 transition'>
									Buyurtma berish
								</button>
							) : (
								// <button
								// 	className='flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition'
								// 	onClick={handleAdd}
								// >
								// 	Savatchaga qo‘shish
								// </button>
							)} */}
							{finded ? (
								<div className='flex justify-between items-center'>
									<button className='flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-vlue-700 transition'>
										Buyurtma berish
									</button>
									<button
										className='flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition'
										onClick={handleAdd}
									>
										Savatchaga qo‘shish
									</button>
								</div>
							) : (
								<button
									className='flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition'
									onClick={handleAdd}
								>
									Savatchaga qo‘shish
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductsDetail
