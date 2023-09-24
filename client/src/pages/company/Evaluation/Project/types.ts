export interface Project {
    _id: string,
    projectName: string,
    teamName: string,
    projectManager: {
      _id: string,
      firstName: string,
      lastName: string,
    },
    projectStatus: string,
    projectDescription: string,
    projectStartDate: string,
    projectEndDate: string,
    projectMembers:string[]
  }
export interface BackendData{
    data:Project[],
    hasMore:boolean
    total:number
    page?:number
}
