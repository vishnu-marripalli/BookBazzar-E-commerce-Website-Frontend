import { createSlice } from "@reduxjs/toolkit";


const initialState ={

    hamburger : false,

}


const featureSlice = createSlice({
    name:'features',
    initialState,
    reducers:{
        toggleHamburger(state){
            state.hamburger = !state.hamburger;
        }

    }

});

export const {toggleHamburger} = featureSlice.actions;
export default featureSlice.reducer;
