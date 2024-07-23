import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";
import { getDefaultNormalizer } from "@testing-library/react";

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath] : articleApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})