import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.toysmars.uz/shop',
	}),
	tagTypes: ['Posts', 'Post'],
	endpoints: builder => ({
		NewProductsGet: builder.query({
			query: () => '/new-products/',
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
			query: () => '/products/',
		}),
	}),
})

export const {
	useProductsGetQuery,
	useGetPostsQuery,
	useAddPostMutation,
	useDeletePostMutation,
	useNewProductsGetQuery,
} = api
