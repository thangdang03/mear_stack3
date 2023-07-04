import {configureStore} from "@reduxjs/toolkit"
import autreducer from "./ath.slide";

const store =configureStore({
    reducer:{
       auth : autreducer,
    }
})
export {store}