export interface UserLoginInterface {
    email: string;
    password: string;
}
export interface UserStoreInterface extends UserLoginInterface {
    name: string;
    user_role: number;
    user_appointment: number;
}
export type UserType = Omit<UserStoreInterface, 'user_role' | 'user_appointment'> & {
    id: number,
    email_verified_at: string | null,
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