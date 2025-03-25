import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl:"http://192.168.1.17:5000/api" }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
                headers: {
                    'Content-Type':'application/json',
                },
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: '/auth/register',
                method: 'GET',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = authApi;
