import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  token: null,
  user: {},
  services:{},
  emailMatch: 0,
  phoneMatch: 0,
  firstNameRedux: '',
  lastNameRedux: '',
  emailId: '',
  phoneNo: ''


}

export const userSlice = createSlice({
  name: 'userauth',
  initialState,
  reducers: {
    setToken: (state,action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.services = action.payload.services;
    },
    setUser: (state,action) => {
      state.user = action.payload;
    },   
    setOnlyToken: (state,action) => {
      state.token = action.payload;
    },
    logout: (state) => {
        state.token = null;
        state.user = {};
    },
    setFirstStep: (state,action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setEmailVerify: (state,action) => {
      state.emailId = action.payload.emailId;
      state.emailMatch = action.payload.emailMatch;
    },
    setPhoneVerify: (state,action) => {
      state.phoneNo = action.payload.phoneNo;
      state.phoneMatch = action.payload.phoneMatch;
    },
    setFirstNameRedux: (state,action) => {
      state.firstNameRedux = action.payload.firstNameRedux;
    },
    setLastNameRedux: (state,action) => {
      state.lastNameRedux = action.payload.lastNameRedux;
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setToken, logout, setUser, setOnlyToken, setEmailVerify, setPhoneVerify, setFirstNameRedux, setLastNameRedux } = userSlice.actions

export default userSlice.reducer