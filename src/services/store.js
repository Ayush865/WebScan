import {configureStore} from  '@reduxjs/toolkit'
import { articleApi } from './article'
//store is a global state which stores entire information about the state of our app
// but in most cases we don't need the entire state we need to reduce it to specifuc slice of a pie
//in this case its article api=>we just wanna get something from this api
export const store=configureStore({
    reducer:{
        [articleApi.reducerPath]:articleApi.reducer
    },
    middleware:
    (getDeafualtMiddleware)=>
    getDeafualtMiddleware().concat(articleApi.middleware)
    //we pass something inside the concat which will make the reducer work..here that something is know as article which we are going to create
})