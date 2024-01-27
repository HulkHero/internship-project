export interface IAddMember{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    companyName:string,
    systemRole:string,
    techRole:string[]
}

export interface IRole{
    roles:string[]
}
