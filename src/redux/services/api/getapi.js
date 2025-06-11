import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../../utils/config';

export const backendApi = createApi({
    reducerPath: 'backendApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.BACKEND_BASE_URL }),
    endpoints: (builder) => ({
        addAddress: builder.mutation({
            query: (data) => ({
                url: '/address',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        addCart: builder.mutation({
            query: (data) => ({
                url: '/addToCart',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateCart: builder.mutation({
            query: (data) => ({
                url: '/updateCartItem',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getCartItem: builder.query({
            query: data => ({
                url: '/getCart',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useAddAddressMutation, useAddCartMutation, useUpdateCartMutation, useGetCartItemQuery } = backendApi;
