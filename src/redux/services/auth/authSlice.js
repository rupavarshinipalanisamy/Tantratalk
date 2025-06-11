import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../../utils/config';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.AUTH_URL }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,  // credentials is the payload sent to the server
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: '/register',
                method: 'GET',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = authApi;
