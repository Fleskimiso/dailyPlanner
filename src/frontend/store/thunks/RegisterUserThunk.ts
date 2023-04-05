import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, isAxiosError } from "axios";
import {IRegisterRequest} from "../../../common/Requests/UserRequests";
import {IRegisterResponse} from "../../../common/Responses/UserResponse";
import {IErrorResponse} from "../../../common/Responses/ErrorResponse";
import { RootState } from "../store"; 



export const registerUserThunk = createAsyncThunk<IRegisterResponse | void, IRegisterRequest, { state: RootState, rejectValue: string }>("register", async (arg, thunkApi) => {
    try {
        const response = await axios.post<IRegisterResponse & IErrorResponse>("/api/register", {
            username: arg.username,
            password: arg.password
        });
        if(response.data.message) {
            throw new Error(response.data.message);
        }
        return response.data;
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