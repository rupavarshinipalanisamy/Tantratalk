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
        selectRewards: builder.mutation({
            query: (data) => ({
                url: '/Rewardofthismonth',
                method: 'GET',
                body: data,
            }),
        }),
        selectRewards: builder.mutation({
            query: (data) => ({
                url: '/Rewardofthismonth',
                method: 'GET',
                body: data,
            }),
        }),
        //prokerala api
        advancedailyhoroscope: builder.query({
            query: ({ sign }) => ({
                url: `/advancedailyhoroscope?sign=${sign}`,
                method: 'GET',
            }),
        }),
        kundli: builder.query({
            query: ({ coordinates, datetime, la }) => ({
                url: `/kundli?coordinates=${coordinates}&datetime=${encodeURIComponent(datetime)}&la=${la}`,
                method: 'GET',
            }),
        }),

        //common api
        searchCities: builder.query({
            query: (query) => ({
                url: `/searchCity?query=${query}`,
                method: 'GET',
            }),
        }),

        getCoordinates: builder.query({
            query: ({cityname}) => ({
                url: `/getCoordinates?city=${cityname}`,
                method: 'GET',
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
    usePaymentVerifyMutation,
    useAdvancedailyhoroscopeQuery,
    useLazySearchCitiesQuery,
    useKundliQuery,
    useLazyGetCoordinatesQuery
} = backendApi;
