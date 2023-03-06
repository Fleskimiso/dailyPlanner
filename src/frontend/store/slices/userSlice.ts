import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
    username: string,
    isLogged: boolean
}

const initialState: UserState = {
    username: "dummy username",
    isLogged: false
}
//configure user slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
});