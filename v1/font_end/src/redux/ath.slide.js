const { createSlice } = require("@reduxjs/toolkit");
const athSlide =createSlice({
    name:"ath",
    initialState:{
        login:{
            curentUser: null,
            isFeching: false,
           error: false
        },register:{
            curentUser: null,
            isFeching: false,
           error: false
        }
    },
    reducers:{
        loginstart:(state)=>{
             state.login.isFeching = true
        },
        loginsucess:(state,action)=>{
            state.login.isFeching = false;
            state.login.curentUser = action.payload;
       },
       loginerrr:(state)=>{
            state.login.isFeching = false;
            state.login.isFeching = true
       },
      registerstart:(state)=>{
            state.register.isFeching = true
       },
      registersucess:(state,action)=>{
           state.register.isFeching = false;
           state.register.curentUser = action.payload;
      },
     registererrr:(state)=>{
          state.register.isFeching = false;
          state.register.isFeching = true
  }
    }
});

export const {
    loginstart,loginsucess,loginerrr,
    registerstart,registersucess,registererrr
} = athSlide.actions

export default athSlide.reducer