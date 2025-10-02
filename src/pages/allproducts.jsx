import {
	CheckOutlined,
	EyeFilled,
	ShoppingCartOutlined,
} from '@ant-design/icons'
import { Button, Empty, Image, Input, Pagination, Select } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/loading'
import { useCategoriyesQuery, useProductsGetQuery } from '../services/api'
import { addProduct, removeProduct } from '../services/products'

const { Search } = Input

const Allproducts = () => {
	const [current, setCurrent] = useState(1)
	const [category, setCategory] = useState('')
	const [searchText, setSearchText] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const items = useSelector(state => state.products.items)
	console.log(items)

	// API chaqirish
	const { data, isLoading } = useProductsGetQuery({
		page: current,
		search: searchText,
		category: category,
	})

	console.log(current, searchText, category)

	const { data: datas, isLoading: Loaders } = useCategoriyesQuery()

	if (isLoading || Loaders) {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<Loader />
			</div>
		)
	}

	// Pagination o‘zgarishi
	const onChange = page => {
		setCurrent(page)
	}

	const handleAdd = id => {
		const finded = data?.results?.find(item => {
			return item.id == id
		})
		if (navigator.vibrate) {
			navigator.vibrate(200) // 200ms vibratsiya
		}
		dispatch(addProduct(finded))
	}
	const handleProductsdeleteLocaleStorege = id => {
		const dataProducts = items?.find(item => {
			return item.id == id
		})
		dispatch(removeProduct(dataProducts.id))
	}

	return (
		<div className='w-full mx-auto h-auto py-10 px-5 pb-30'>
			<h1 className='text-3xl text-center font-bold text-blue-500'>
				Barcha maxsulotlar
			</h1>
			<p className='text-center mt-3 text-black/70'>
				Bizning dokonimizdagi eng sara va eng zamonaviy o'yinchoqlarimiz bilan
				tanishing
			</p>

			{/* Filter va Search panel */}
			<div className='flex flex-col md:flex-row gap-4 justify-between items-center mt-6'>
				<Search
					placeholder='Mahsulot qidirish...'
					allowClear
					onSearch={value => {
						setSearchText(value)
						setCurrent(1) // qidiruvda pagination reset
					}}
					onChange={e => {
						setSearchText(e.target.value)
						setCurrent(1)
					}}
					style={{ width: 300 }}
					value={searchText}
				/>
				<Select
					value={category}
					style={{ width: 300 }}
					onChange={value => {
						setCategory(value)
						setCurrent(1) // kategoriya o‘zgarsa ham reset
					}}
					options={[
						{ label: 'Barchasi', value: '' },
						...(datas || []).map(cat => ({
							label: cat.name,
							value: cat.id,
						})),
					]}
				/>
			</div>

			{/* Mahsulotlar grid */}
			<div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-5 py-10'>
				{data?.results?.length > 0 ? (
					data?.results?.map(item => (
						<div
							key={item?.id}
							className='md:h-[500px] xl:h-[400px] h-[250px] rounded-lg flex flex-col items-center overflow-hidden shadow-lg shadow-gray-300'
						>
							<div className='w-full h-[60%] overflow-hidden relative'>
								<Image
									src={item?.images[0]?.image}
									alt={item?.name}
									height='100%'
									width='100%'
									className='w-full h-full bg-cover rounded-lg'
								/>
							</div>
							<div className='w-full h-[50%] bg-white p-2 flex justify-between pb-2 md:pb-3 items-start flex-col'>
								<p className='text-blue-500 font-bold text-xs md:text-lg'>
									{item?.discounted_price} So'm
								</p>
								<h2 className='text-black font-bold md:text-[16px] text-[10px] md:block hidden'>
									{item?.category}
								</h2>
								<h2 className='font-bold text-[11px] block md:hidden '>
									{' '}
									{item?.category?.length > 20
										? item?.category?.substring(0, 20) + '...'
										: item?.category}
								</h2>
								<p className='font-bold md:text-[16px] text-[10px] md:block hidden '>
									{' '}
									{item?.name?.length > 30
										? item?.name?.substring(0, 30) + '...'
										: item?.name}
								</p>
								<p className='font-bold  text-[10px] block md:hidden '>
									{' '}
									{item?.name?.length > 20
										? item?.name?.substring(0, 20) + '...'
										: item?.name}
								</p>
								<p className='text-gray-400 font-bold text-[10px] md:text-xs'>
									{item?.quantity} dona qoldi
								</p>
								<div className='w-full justify-center md:flex-row flex-col gap-2 items-center md:flex hidden'>
									{items.some(p => p.id === item.id) ? (
										<Button
											variant='solid'
											// disabled
											color='green'
											icon={<CheckOutlined />}
											className='w-full'
											onClick={() => {
												handleProductsdeleteLocaleStorege(item.id)
											}}
										>
											Qo‘shilgan
										</Button>
									) : (
										<Button
											type='primary'
											icon={<ShoppingCartOutlined />}
											className='w-full'
											onClick={() => handleAdd(item.id)}
											size={window.innerWidth >= 768 ? 'middle' : 'small'}
										>
											Savatga qo‘shish
										</Button>
									)}

									<Button
										variant='solid'
										color='volcano'
										icon={<EyeFilled />}
										className='w-full'
										size={window.innerWidth >= 768 ? 'middle' : 'small'}
										onClick={() => navigate(`/maxsulotlar-kabinet/${item.id}`)}
									>
										Ko‘rish
									</Button>
								</div>
								{/* mobile */}
								<div className='w-full flex justify-end gap-2 items-center md:hidden'>
									{items.some(p => p.id === item.id) ? (
										<Button
											variant='solid'
											size='small'
											// disabled
											color='green'
											icon={<CheckOutlined />}
											className='w-full'
											onClick={() => {
												handleProductsdeleteLocaleStorege(item.id)
											}}
										>
											Qo‘shilgan
										</Button>
									) : (
										<Button
											type='primary'
											icon={<ShoppingCartOutlined />}
											className='w-full'
											onClick={() => handleAdd(item.id)}
											size={window.innerWidth >= 768 ? 'middle' : 'small'}
										>
											Savatga
										</Button>
									)}

									<Button
										variant='solid'
										color='volcano'
										icon={<EyeFilled />}
										className='w-full'
										onClick={() => navigate(`/maxsulotlar-kabinet/${item.id}`)}
										style={{
											padding:
												window.innerWidth >= 768 ? '0px 0px' : '0px 10px',
										}}
										size={window.innerWidth >= 768 ? 'middle' : 'small'}
									></Button>
								</div>
							</div>
						</div>
					))
				) : (
					<div className='w-full col-span-4 min-h-40 flex justify-center items-center'>
						<Empty />
					</div>
				)}
			</div>

			{/* Pagination */}
			<div className='text-center'>
				<Pagination current={current} onChange={onChange} total={data?.count} />
			</div>
		</div>
	)
}

export default Allproducts
