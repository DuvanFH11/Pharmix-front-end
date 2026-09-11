export interface UserLoginInterface {
    email: string;
    password: string;
}
export interface UserStoreInterface extends UserLoginInterface {
    name: string;
    user_role: number;
    user_job_title: number;
}
export type UserType = Omit<UserStoreInterface, 'user_role' | 'user_appointment'> & {
    id: number,
    user_creator: number | null,
    user_role: {
        id: number;
        name: string;
    },
    user_job_title: {
        id: number;
        name: string;
    };
}