
export interface Manager {
    firstName: string;
    lastName: string;
    projectsSize: number;
   
}

export interface Project {
    projectName: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    employeesSize: number;
    completed: boolean;
}