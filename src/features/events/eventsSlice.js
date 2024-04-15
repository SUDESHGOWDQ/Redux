import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchData = createAsyncThunk('data/fetchData',async ()=>{
    const response = await axios.get('http://localhost:3000/events')
    const data = response.data
    console.log(data);
    return data

})

export const deleteTask = createAsyncThunk('data/deleteTask', async (id) => {
  await axios.delete(`http://localhost:3000/events/${id}`);
  return id;
});

const initialState = {
    events:[],
    filter:'all'
}

const eventSlice = createSlice({
    name:'events',
    initialState,
    reducers:{setFilter(state,action){state.filter = action.payload}},
    extraReducers:(builder)=>{
      builder.addCase(fetchData.fulfilled,(state,action)=>{state.events = action.payload})
      builder.addCase(deleteTask.fulfilled, (state, action) => { state.events = state.events.filter(event=> event.id !== action.payload)})
  }
})


export const selectedFilter = (state)=>{
    const {events,filter} = state.events

    if (filter === 'upcoming') {
        return events.filter((event) => event.status === 'upcoming');
      }
      
      if (filter === 'completed') {
        return events.filter((event) => event.status === 'completed');
      }
      return events
}



export const {setFilter} = eventSlice.actions
export default eventSlice.reducer