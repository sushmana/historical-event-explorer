import {createSlice} from '@reduxjs/toolkit'

export const HistoricalSlice = createSlice({
      name:'eventSlice',
      initialState:{
            events:[],
            births:[],
            deaths:[]
      },
      reducers:{
            getEvent:(state, action)=>{
                  
            },
            setEvent:(state, action)=>{
                  state.events.push(action.payload.events);
            },
            getBirth:(state, action)=>{
                  
            },
            setBirth:(state, action)=>{
                  state.births.push(action.payload.births);
            }

      }
});

export const {getEvent, setEvent, getBirth, setBirth} = HistoricalSlice.actions;

export default HistoricalSlice.reducer;
