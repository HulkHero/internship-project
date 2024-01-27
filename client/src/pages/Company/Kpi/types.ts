
export interface Ikpi {
    kpiName: string;
    kpiWeight: number;
    kpiThreshold: number;
}

export interface IForm {
    techRole: string;
    kpis: Ikpi[];

}


export interface SForm extends IForm{
    companyName:string
}