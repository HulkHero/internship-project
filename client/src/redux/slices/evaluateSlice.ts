import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface Evaluate {
    kpiName:string;
    kpiWeight:number;
    kpiThreshold:number;
    kpiScore:number;
}
interface initialState {
    index:number;
    value:Evaluate[]
}

const initialState:initialState={

    index:0,
    value:[{
        kpiName:"",
        kpiWeight:0,
        kpiThreshold:0,
        kpiScore:0

    }]

}
export const evaluateSlice = createSlice({
  name: "evaluate",
  initialState,
  reducers: {
    next: (state,) => {
        if(state.index<state.value.length){
            state.index=state.index+1;
        }
    },
    prev: (state,) => {
        if(state.index>0){
            state.index=state.index-1;
        }
    },
    addKpi: (state, action: PayloadAction<Evaluate>) => {
        state.value=state.value.concat(action.payload);
    },
    reset: (state,) => {
        state.index=0;
        state.value=[{
            kpiName:"",
            kpiWeight:0,
            kpiThreshold:0,
            kpiScore:0
    
        }]
    },
  },
});
export const { next,addKpi,prev,reset } =
  evaluateSlice.actions;
export const evaluateSelector = (state: RootState) => state.evaluateReducer;
export default evaluateSlice.reducer;