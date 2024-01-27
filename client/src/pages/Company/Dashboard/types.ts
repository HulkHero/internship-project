
export interface TopEmployee{
    firstName: string;
    lastName: string;
    systemRole: string;
    techRole: string;
    evaluation: Evaluation[];
    averageScore:number;
}

export interface Evaluation{
    type: string;
    createdAt: string;
    kpis: Kpis[];
    score: number;
    threshold: number;
}

export interface Kpis{
    kpiName: string;
    kpiScore: number;
    kpiThreshold: number;
}