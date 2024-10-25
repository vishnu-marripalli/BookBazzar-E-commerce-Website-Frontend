import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    isAuthenticated: false,
    user: {
      accessToken: null,
      refreshToken: null,
      fullName: "",
      email: "",
      userId: "",
      isEmailVerified: false,
      role: "user", // Default role, can be adjusted based on your application logic
      isLoggedIn: false,
    },
    error: null,
  };

const userReducer = createSlice({
    name:"user",
    initialState,
    reducers:{
      login(state, action) {
        const {
          accessToken,
          refreshToken,
          fullName,
          email,
          userId,
          isEmailVerified,
          role,
        } = action.payload.user;
        state.isAuthenticated = true;
  
        // user credentials
        state.user.accessToken = accessToken;
        state.user.refreshToken = refreshToken;
        state.user.fullName = fullName;
        state.user.email = email;
        state.user.userId = userId;
        state.user.isEmailVerified = isEmailVerified;
        state.user.role = role;
        state.user.isLoggedIn = true;
  
        state.error = null;
      },
      loginFailed(state, action) {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = initialState.user;
      },
      logout(state) {
        Object.assign(state, initialState);
      },
      register(state, action) {
          state.user.email = action.payload;
      },
      setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
      },
      setUser(state,action){
        state.user.fullName=action.payload.fullName;
        state.user.email=action.payload.email
      }
    }

})


export const { register, setIsAuthenticated,login,loginFailed,logout,setUser } = userReducer.actions;
export default userReducer.reducer;