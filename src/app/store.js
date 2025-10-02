import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../services/api'
import productsReducer from '../services/products'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// persist config
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['products'], // faqat products localStorage’da saqlansin
}

// root reducer
const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer, // RTK Query
	products: productsReducer, // Products slice
})

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false, // persist uchun shart
		}).concat(api.middleware),
})

// persistor
export const persistor = persistStore(store)

setupListeners(store.dispatch)
