import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {carApi} from './carApi'

export const store = configureStore({
   reducer: {
      [carApi.reducerPath]: carApi.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(carApi.middleware)
});