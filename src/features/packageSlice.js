import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  // token: null,
  select_service_Id: [],
  // services:{},
  // emailMatch: 0,
  // phoneMatch: 0,
  // firstNameRedux: '',
  // lastNameRedux: '',
  // emailId: '',
  // phoneNo: ''


}

export const packageSlice = createSlice({
  name: 'packageSelect',
  initialState,
  reducers: {
    setSelectServices: (state,action) => {
      state.select_service_Id = action.payload.select_service_Id;
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setSelectServices } = packageSlice.actions

export default packageSlice.reducer