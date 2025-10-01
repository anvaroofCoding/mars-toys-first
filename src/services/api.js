import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.toysmars.uz',
	}),
	tagTypes: ['Posts', 'Post'],
	endpoints: builder => ({
		NewProductsGet: builder.query({
			query: () => '/shop/new-products/',
		}),
		addPost: builder.mutation({
			query: newPost => ({
				url: 'posts',
				method: 'POST',
				body: newPost,
			}),
			invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
		}),
		deletePost: builder.mutation({
			query: id => ({
				url: `posts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
		}),
		ProductsGet: builder.query({
			query: ({ page = 1, search = '', category = '' }) => {
				let url = `/shop/products/?limit=12&page=${page}`

				if (search && search.trim() !== '') {
					url += `&search=${search}`
				}
				if (category && category !== '' && category !== 'all') {
					url += `&category=${category}`
				}

				return url
			},
		}),
		addLogin: builder.mutation({
			query: fullPhone => ({
				url: '/users/register/',
				method: 'POST',
				body: { phone_number: fullPhone },
			}),
		}),
		ProductsDetail: builder.query({
			query: id => `/shop/product-details/?product_id=${id}`,
		}),
		Categoriyes: builder.query({
			query: () => `/shop/categories`,
		}),
	}),
})

export const {
	useCategoriyesQuery,
	useProductsDetailQuery,
	useAddLoginMutation,
	useProductsGetQuery,
	useGetPostsQuery,
	useAddPostMutation,
	useDeletePostMutation,
	useNewProductsGetQuery,
} = api
