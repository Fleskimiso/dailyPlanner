import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { ISubmitPlanRequest } from "../../../common/Requests/PlanRequests";
import { ISubmitPlanResponse} from "../../../common/Responses/PlanResponses";
import {IErrorResponse} from "../../../common/Responses/ErrorResponse";
import { RootState } from "../store"; 



export const submitDayPlanThunk = createAsyncThunk<ISubmitPlanResponse | string, ISubmitPlanRequest, { state: RootState, rejectValue: string }>("submit", async (arg, thunkApi) => {
    try {
        const response = await axios.post<ISubmitPlanResponse & IErrorResponse>("/api/plan", {
            ...arg
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