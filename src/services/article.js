import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const rapidApiKey = '107f70aef5mshc66780cce72c87fp174603jsn92dcfddb6663'

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summerizer.p.rapidapi.com',
    prepareHeaders:(headers) => {
        headers.set('X-RapidAPI-Key', rapidApiKey);
        headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

        return headers;
    }
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
        query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
    })
  })
})

export const { useLazyGetSummaryQuery } = articleApi