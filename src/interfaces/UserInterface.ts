export interface UserInterface {
    id: number,
    name: string,
    email: string,
    age: number,
    email_verified_at: null,
    last_connection: string,
    created_at: string,
    updated_at: string,
    user_creator: string | null,
    user_role: {
        id: number;
        name: string;
    },
    user_appointment: {
        id: number;
        name: string;
    };

}

export interface UserLoginInterface {
    email: string;
    password: string;
}

export interface UserRegisterInterface {
    name: string;
}