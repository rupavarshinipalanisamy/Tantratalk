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
        getUserAddress: builder.query({
            query: (userId) => ({
                url: `/getUseraddress/${userId}`,
                method: 'GET',
            }),
        }),
        selectAddress: builder.mutation({
            query: (data) => ({
                url: '/selectAddress',
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
                method: 'PUT',
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
        paymentInitiate: builder.mutation({
            query: (data) => ({
                url: '/paymentInitiate',
                method: 'POST',
                body: data,
            }),
        }),
        paymentVerify: builder.mutation({
            query: (data) => ({
                url: '/paymentVerify',
                method: 'POST',
                body: data,
            }),
        }),


    }), 
});

export const {
    useAddAddressMutation,
    useAddCartMutation,
    useSelectAddressMutation,
    useUpdateCartMutation,
    useGetCartItemQuery,
    useGetUserAddressQuery,
    usePaymentInitiateMutation,
    usePaymentVerifyMutation
} = backendApi;
