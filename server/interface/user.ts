export interface Profile {
    avater : [],
    filename: string,  
}

export interface IUser {
    id: number,
    uniqueId : string,
    email : string,
    name : string,
    status: boolean,
    isVerified: boolean,
    active: boolean,
    blocked: boolean,
    createdAt : string,
    updatedAt : string,
    token : any,
    userId? : string,
}