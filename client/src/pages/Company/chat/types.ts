
export interface member{
    _id:string,
    firstName:string,
    lastName:string,
    systemRole:string,
    techRole:string,
}

export interface userId{
    userId:string,
}

export interface IChat{
    _id:string,
    members:member[], 
    companyName:string,
}

export interface IReceivedMessage{
      senderId : string
      text: string
      chatId: string,
      createdAt?: string
}

export interface ISendMessage{
    receiverId? : string
    senderId: string
    text: string
    chatId: string|undefined,
    createdAt?: string
}
