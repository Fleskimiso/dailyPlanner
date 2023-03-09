import Joi from 'joi';
import { ILoginRequest, IRegisterRequest } from '../Requests/UserRequests';

export const loginFormSchema = Joi.object<ILoginRequest>({
    username: Joi.string().required().max(50),
    password: Joi.string().required().max(50)
});
export const registerFormSchema = Joi.object<IRegisterRequest>({
    username: Joi.string().required().max(50),
    password: Joi.string().required().max(50)
})