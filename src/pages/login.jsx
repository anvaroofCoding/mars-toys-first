import { SendOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import Cards from '../components/profile'

const Login = () => {
	const [rawPhone, setRawPhone] = useState('') // faqat raqamlar
	const [isVisible, setIsVisible] = useState(false)
	const [load, SetLoad] = useState(false)
	const [loc, Setloc] = useState(false)
	const length = 5 // nechta input bo‘lishini belgilaymiz
	const [values, setValues] = useState(Array(length).fill(''))
	const inputsRef = useRef([])

	useEffect(() => {
		setIsVisible(true)
	}, [])
	const marsToysLetters = [
		{ letter: 'M', color: 'text-blue-500' },
		{ letter: 'A', color: 'text-red-500' },
		{ letter: 'R', color: 'text-yellow-500' },
		{ letter: 'S', color: 'text-green-500' },
		{ letter: ' ', color: '' },
		{ letter: 'T', color: 'text-blue-500' },
		{ letter: 'O', color: 'text-red-500' },
		{ letter: 'Y', color: 'text-yellow-500' },
		{ letter: 'S', color: 'text-green-500' },
	]

	// Formatlash funksiyasi
	const formatPhone = value => {
		let formatted = ''
		if (value.length > 0) {
			formatted = '(' + value.substring(0, 2)
		}
		if (value.length >= 2) {
			formatted += ')-' + value.substring(2, 5)
		}
		if (value.length >= 5) {
			formatted += '-' + value.substring(5, 7)
		}
		if (value.length >= 7) {
			formatted += '-' + value.substring(7, 9)
		}
		return formatted
	}

	// Inputdagi o‘zgarishlarni olish
	const handleChange = e => {
		let value = e.target.value.replace(/\D/g, '') // faqat raqamlar

		if (value.length > 9) {
			value = value.slice(0, 9) // faqat 9 ta raqam
		}

		setRawPhone(value)
	}

	// Backspace bosilganda format belgilaridan "sakrab o‘tish"
	const handleKeyDown = e => {
		if (e.key === 'Backspace') {
			const formatted = formatPhone(rawPhone)
			const cursorPos = e.target.selectionStart

			// Agar kursor format belgisi ustida bo‘lsa, bitta raqamni o‘chir
			if (/[()\-]/.test(formatted[cursorPos - 1])) {
				e.preventDefault() // standart o‘chirishni to‘xtatamiz
				setRawPhone(prev => prev.slice(0, -1)) // oxirgi raqamni o‘chirish
			}
		}
	}

	const SentNumber = async () => {
		SetLoad(true)
		console.log(Number(`998${rawPhone}`))
		try {
			const res = await fetch('https://api.toysmars.uz/users/register/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phone_number: `998${rawPhone}`,
				}),
			})
			if (res.status == 200) {
				Setloc(true)
			}
			console.log(res)
			SetLoad(false)
		} catch (err) {
			console.error('❌ Xato:', err)
		}
	}

	const handleChanges = (e, index) => {
		const val = e.target.value.replace(/\D/g, '') // faqat raqam qabul qiladi
		const newValues = [...values]
		newValues[index] = val.slice(-1) // faqat oxirgi kiritilgan sonni olamiz
		setValues(newValues)

		if (val && index < length - 1) {
			// keyingi inputga o'tkazish
			inputsRef.current[index + 1].focus()
		}
	}

	const handleKeyDowns = (e, index) => {
		if (e.key === 'Backspace') {
			if (values[index]) {
				// shu inputni tozalaymiz
				const newValues = [...values]
				newValues[index] = ''
				setValues(newValues)
			} else if (index > 0) {
				// agar bo‘sh bo‘lsa → oldingisiga o'tadi
				inputsRef.current[index - 1].focus()
			}
		}
	}

	const code = values.join('') // barcha raqamlarni jamlaymiz

	const loginDatas = {
		phone_number: `998${rawPhone}`,
		otp: code,
	}
	const Handlecode = async () => {
		try {
			const res = await fetch(`https://api.toysmars.uz/users/login/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(loginDatas),
			})

			if (!res.ok) throw new Error(`Login failed: ${res.status}`)

			const dataRes = await res.json()
			const access = dataRes.access_token
			const refresh = dataRes.refresh_token

			localStorage.setItem('access_token', access)
			localStorage.setItem('refresh_token', refresh)
			localStorage.setItem('phone', loginDatas.phone_number)

			window.location.href = '/'
		} catch (error) {
			console.error('Login error:', error)
			alert('Login xatolik bilan yakunlandi. Kodni tekshiring.')
		}
	}

	const tokens = localStorage.getItem('access_token')

	return (
		<div
			className={`w-full h-screen flex justify-center items-center flex-col gap-2
		
		`}
		>
			<div
				className={` justify-center flex-col items-center gap-2 ${
					tokens ? 'hidden' : 'flex'
				}`}
			>
				<div className='relative z-10 flex flex-col items-center justify-center px-6 text-center'>
					{/* Animated Title */}
					<div>
						<h1 className='text-5xl md:text-8xl font-bold mb-2 tracking-wider'>
							{marsToysLetters.map((item, index) => (
								<span
									key={index}
									className={`inline-block ${
										item.color
									} transform transition-all duration-1000 ease-out ${
										isVisible
											? 'translate-y-0 opacity-100 scale-100'
											: 'translate-y-20 opacity-0 scale-75'
									}`}
									style={{
										transitionDelay: `${index * 100}ms`,
										animation: `bounce 2s infinite ${index * 0.1}s`,
									}}
								>
									{item.letter}
								</span>
							))}
						</h1>
					</div>
				</div>
				<div className={`${loc ? 'hidden' : 'block'}`}>
					<div className='flex items-center border rounded-lg overflow-hidden w-full max-w-[300px]'>
						{/* Oldindan chiqadigan +998 */}
						<span className='px-3 py-2 text-gray-700 text-md font-medium border-r'>
							+998
						</span>

						{/* Foydalanuvchi yozadigan qismi */}
						<input
							type='tel'
							placeholder='(94)-793-20-05'
							value={formatPhone(rawPhone)}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							className='flex-1 px-2 py-2 outline-none text-gray-800'
						/>
					</div>
					<Button
						size='middle'
						type='primary'
						className='mt-2 w-[300px]'
						onClick={SentNumber}
						loading={load}
					>
						Jo'natish <SendOutlined />
					</Button>
				</div>
				<div className={`${loc ? 'flex' : 'hidden'} flex-col`}>
					<div className='flex justify-center space-x-4'>
						{values.map((val, i) => (
							<input
								key={i}
								type='text'
								maxLength='1'
								value={val}
								onChange={e => handleChanges(e, i)}
								onKeyDown={e => handleKeyDowns(e, i)}
								ref={el => (inputsRef.current[i] = el)}
								className='w-12 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						))}
					</div>
					<div>
						{/* Kod: {code} */}
						<Button
							size='middle'
							type='primary'
							className='mt-2 w-[300px]'
							onClick={Handlecode}
							loading={load}
						>
							Jo'natish <SendOutlined />
						</Button>
					</div>
				</div>
			</div>
			<div
				className={` justify-center flex-col items-center gap-2 ${
					tokens ? 'flex' : 'hidden'
				}`}
			>
				<Cards />
			</div>
			<style>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes bounce {
					0%, 20%, 50%, 80%, 100% {
						transform: translateY(0);
					}
					40% {
						transform: translateY(-10px);
					}
					60% {
						transform: translateY(-5px);
					}
				}
			`}</style>
		</div>
	)
}

export default Login
