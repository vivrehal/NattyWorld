import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const getUserData=async()=>{
try {
        const userData= await fetch('/api/v1/users/getAuthStatus',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        if(userData.status===200){
            const data=await userData.json();
            return data;
        }
        else{
            return null;
        };
} catch (error) {
    console.log(error);
    alert("Some error occured while checking user authoriazation")
}
}

const logoutUser=async()=>{
    try {
        const userData= await fetch('/api/v1/users/logout',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        if(userData.status===200){
            useNavigate('/login');
            return true;
        }
        else{
            return false;
        };
} catch (error) {
    console.log(error);
    alert("Some error occured while logging out user")
}

}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkLogin: async(state)=>{
        const data=await getUserData();
        if(data){
            state.isAuthenticated = true;
            state.user = data;
        }
        else{
            const ifUserLoggedOut=logoutUser()
            if(ifUserLoggedOut){
                state.isAuthenticated = false;
                state.user = null;
            }
            else{
                console.log("error while logging out user")
                alert("error while logging out user")
            }
        }

    }
  },
});

export const { checkLogin } = authSlice.actions;
export default authSlice.reducer;
