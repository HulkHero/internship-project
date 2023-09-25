
export interface ProjectDetail{
    _id:string,
    projectName:string,
    projectDescription:string,
    projectEndDate:Date,
    projectStartDate:Date,
    projectManager:Member[],
    members:{}[]
  
  }
  
  export interface ProjectMember{
     member:Member,
     isEvaluated:boolean,
     evaluation:string|null
  }
  export interface Member{
    _id:string,
    firstName:string,
    lastName:string,
    techRole:string,
    systemRole:string
  }