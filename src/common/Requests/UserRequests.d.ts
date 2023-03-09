export interface ILoginRequest {
    username: string,
    password: string
}
export interface IRegisterRequest extends ILoginRequest{}