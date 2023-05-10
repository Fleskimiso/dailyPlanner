import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, isAxiosError } from "axios";
import {ILoginRequest, IRegisterRequest} from "../../../common/Requests/UserRequests";
import {ILoginResponse, IRegisterResponse} from "../../../common/Responses/UserResponse";
import {IErrorResponse} from "../../../common/Responses/ErrorResponse";
import { RootState } from "../store"; 



export const logoutUserThunk = createAsyncThunk<IErrorResponse | string, void, { state: RootState, rejectValue: string }>("logout", async (arg, thunkApi) => {
    try {
        const response = await axios.get<IErrorResponse>("/api/logout");        
        if(response.data.message === "Logged out successfully") {
            return "Ok";
        }
        throw new Error(response.data.message);
    } catch (e) {
        if (isAxiosError<IErrorResponse>(e)) {
            if (e.response?.status === 401) {
                return thunkApi.rejectWithValue("Incorrect fields");
            }
            if (e.response?.data.message) {
                return thunkApi.rejectWithValue(e.response?.data.message);
            } else {
                return thunkApi.rejectWithValue(e.message);
            }
        } else {
            return thunkApi.rejectWithValue("Unexpected error happened during network request");
        }
    }
})