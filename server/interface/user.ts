import { UserTypes } from "../model/types";

export interface IProfile {
    avater : [],
    filename: string,  
}

export interface IUnique {
    uniqueId : string
}

export interface IUser {
    user: UserTypes,
    token : any,
    userId? : string,
}