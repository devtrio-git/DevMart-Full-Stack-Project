import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  isLogin: false,
  email: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state,action) => {
      state.data = action.payload
      state.isLogin = true
    },
    removeUser: (state) => {
      state.data = {}
      state.isLogin = false
    },
    addEmailForOtp: (state,action) =>{
      state.email = action.payload
    },
    removeEmailForOtp: (state) => {
      state.email = ""
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser, addEmailForOtp, removeEmailForOtp} = userSlice.actions

export default userSlice.reducer