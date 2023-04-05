import { createSlice } from '@reduxjs/toolkit'
import { registerUserThunk } from '../thunks/RegisterUserThunk';

export interface UserState {
    userId: string
    username: string,
    isLogged: boolean
}

const initialState: UserState = {
    username: "dummy username",
    userId: "none",
    isLogged: false
}
//configure user slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(registerUserThunk.fulfilled, (state,action) =>{
        if(action.payload){
          state.isLogged = true;
          state.username = action.payload.username;
          state.userId = action.payload.userId;
        }
    })
  },
});