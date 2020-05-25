import { Repository } from "typeorm";
import { User, IUsersService, UserCreate, UserFind } from "./users.contract";
import { isObject, isString } from "ramda-adjunct";
import { allPass, propIs } from "ramda";
import arrify from "arrify";
import { UserDbEntity } from "./users.dbentity";

const isUserCreateLike = (val: unknown): val is UserCreate => allPass([
    isObject,
    propIs(String, "name")
])(val);

const isUserLike = (val: unknown): val is User => allPass([
    isUserCreateLike,
    propIs(String, "id")
])(val);

export const getIds = (id: string | string[] | User | User[]): string[] => {
    if (isUserLike(id)) {
        return [id.id];
    } else if (isString(id)) {
        return [id];
    } else if (id.every(isUserLike)) {
        return (id as User[]).map(x => x.id);
    } else if (id.every(isString)) {
        return id as string[];
    } else {
        throw new Error(`Invalid arguments passed ${id}`);
    }
}

export class UsersService implements IUsersService {
    constructor (
        private readonly repo: Repository<UserDbEntity>
    ) {}

    get (id: string[]): Promise<User[]>;
    get (id: string): Promise<User | undefined>;
    get(id: string | string[]): Promise<User[]> | Promise<User | undefined> {
        if (Array.isArray(id)) {
            return this.repo.findByIds(id);
        } else {
            return this.repo.findOne(id);
        }
    }

    find(template?: UserFind): Promise<User[]> {
        return this.repo.find({ where: template });
    }

    create (user: UserCreate[]): Promise<User[]>;
    create (user: UserCreate): Promise<User>;
    async create(users: UserCreate | UserCreate[]): Promise<User | User[]> {
        const _users = arrify(users).map(x => ({ ...x, id: "" }));
        const res = await this.repo.insert(_users);

        const inserted = await this.repo.findByIds(res.identifiers.map(x => x.id));

        return Array.isArray(users) ? inserted : inserted[0];
    }

    delete (user: User | User[]): Promise<void>;
    delete (id: string | string[]): Promise<void>;
    async delete(id: string | string[] | User | User[]): Promise<void> {
        await this.repo.delete(getIds(id));
    }
}