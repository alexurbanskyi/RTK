import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const carApi = createApi({
   reducerPath: 'carApi',
   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
   tagTypes: ['car'],
   endpoints: (build) => ({
      getCar: build.query({
         query: (limit = '') => `cars?${limit && `_limit=${limit}`}`,
         providesTags: (result) =>
         result
           ? [...result.map(({ id }) => ({ type: 'Cars', id })), 
               {type: 'car', id: 'LIST'}
             ]
           : [{type: 'car', id: 'LIST'}],
      }),
      addCar: build.mutation({
         query: (body) => ({
            url: 'cars',
            method: 'POST',
            body,
         }),
         invalidatesTags: [{type: 'car', id: 'LIST'}]
      }),
      deleteCar: build.mutation({
         query: (id) => ({
            url: `cars/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: [{type: 'car', id: 'LIST'}]
      })
   })
});

export const {useGetCarQuery, useAddCarMutation, useDeleteCarMutation} = carApi