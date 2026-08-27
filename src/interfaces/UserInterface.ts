export interface UserLoginInterface {
    email: string;
    password: string;
}

export interface UserRegisterInterface extends UserLoginInterface {
    name: string;
}