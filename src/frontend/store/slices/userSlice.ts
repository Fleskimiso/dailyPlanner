import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginUserThunk } from '../thunks/LoginUserThunk';
import { registerUserThunk } from '../thunks/RegisterUserThunk';
import { IDayPlan } from '../../../common/types/Dayplan';
import { logoutUserThunk } from '../thunks/LogoutUserThunk';
import { submitDayPlanThunk } from '../thunks/SubmitDayPlanThunk';

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
    });
    builder.addCase(logoutUserThunk.fulfilled, (state,action) =>{
      if(action.payload === "Ok") {
        state.isLogged = false;
        state.dayPlans.length = 0;
        state.userId = "none";
        state.username = "none";
        state.weekGoals.length = 0;
      }
    });
    builder.addCase(submitDayPlanThunk.fulfilled, (state, action) =>{
      if(action.meta.requestStatus === "fulfilled") {
        if(typeof action.payload !== "string") {
          state.dayPlans.push(action.payload.dayPlan)
        }
      }
    })
  },
 
});