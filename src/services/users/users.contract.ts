export interface User {
    id: string;
    name: string;
}

export type UserCreate = Omit<User, "id">;
export type UserFind = Partial<User>;

export interface IUsersService {
    get (id: string[]): Promise<User[]>;
    get (id: string): Promise<User | undefined>;

    find (template?: UserFind): Promise<User[]>;

    create (user: UserCreate[]): Promise<User[]>;
    create (user: UserCreate): Promise<User>;

    delete (user: User | User[]): Promise<void>;
    delete (id: string | string[]): Promise<void>;
}