import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginUserThunk } from '../thunks/LoginUserThunk';
import { registerUserThunk } from '../thunks/RegisterUserThunk';
import { IDayPlan } from '../../../common/types/Dayplan';

export interface UserState {
  userId: string,
  username: string,
  isLogged: boolean,
  errorMessage: string,
  weekGoals: string[],
  dayPlans: IDayPlan[]
}

const initialState: UserState = {
  username: "dummy username",
  userId: "none",
  isLogged: false,
  errorMessage: "",
  weekGoals: [],
  dayPlans: []
}
//configure user slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    clearError(state, action: PayloadAction<void>) {
      state.errorMessage = "";
    }
  },
  extraReducers(builder) {
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogged = true;
        state.username = action.payload.username;
        state.userId = action.payload.userId;
        state.weekGoals.length = 0;
        state.weekGoals.push(...action.payload.weekGoals);
        state.dayPlans.length = 0;
        state.dayPlans.push(...action.payload.dayPlans);

      }
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogged = true;
        state.username = action.payload.username;
        state.userId = action.payload.userId;
        state.weekGoals.length = 0;
        state.weekGoals.push(...action.payload.weekGoals);
        state.dayPlans.length = 0;
        state.dayPlans.push(...action.payload.dayPlans);
      }
    })
  },
});