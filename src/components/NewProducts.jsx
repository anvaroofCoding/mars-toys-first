import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'
import { useNewProductsGetQuery } from '../services/api'
import Loader from './loading'

const NewProducts = () => {
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
		<div className='w-full  mx-auto h-auto py-10 px-5'>
			<h1 className='text-3xl text-center font-bold text-black/70 text-blue-500'>
				Yangi maxsulotlar
			</h1>
			<p className='text-center mt-3 text-black/70'>
				Bizning dokonimizdagi eng sara va eng oxirgi qo'shilgan o'yinchoqlarimiz
				bilan tanishing
			</p>
			<div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-5 py-10'>
				{data?.map(item => {
					return (
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
								<Button
									type='primary'
									icon={<ShoppingCartOutlined />}
									className='w-full'
									size={window.innerWidth >= 768 ? 'large' : 'small'} // md breakpoint = 768px
								>
									Savatga qo'shish
								</Button>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default NewProducts
