import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const signUpFormApi = createApi({
  reducerPath: 'signUpFormApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/',
  }),
  endpoints: (builder) => ({
    getSignUpColors: builder.query({
      query: () => 'colors',
    }),
    submitSignUpForm: builder.mutation({
      query: (body) => ({
        url: '/submit',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        responseHandler: 'text',
      }),
      transformResponse: (response) => response,
    })
  }),
})

export const { useGetSignUpColorsQuery, useSubmitSignUpFormMutation } = signUpFormApi