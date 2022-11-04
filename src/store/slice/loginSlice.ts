import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interface";
import { getStoreLocal, removeStoreLocal } from "../../utils/localStore";

export const test = createAsyncThunk("test", async (data: any, thunkAPI) => {
    try {
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error });
    }
});

export interface LoginState {
    isLogin: boolean;
    user: User;
    token: string;
}

const initialState: LoginState = {
    isLogin: false,
    user: {
        id: "11111",
        email: "giang@gmail.com",
        name: "giang",
    } as User,
    token: getStoreLocal("token") ? "" : (getStoreLocal("token") as string),
};

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logOut: (state) => {
            removeStoreLocal("token");
            state.isLogin = false;
            state.user = {} as User;
        },
    },
    extraReducers: {
        // [test.pending.toString()]: (state) => {
        //     state.loadingLogin = true;
        // },
        // [test.fulfilled.toString()]: (
        //     state,
        //     action: PayloadAction<any>
        // ) => {},
        // [test.rejected.toString()]: (
        //     state,
        //     action: PayloadAction<any>
        // ) => {},
        // //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { logOut } = LoginSlice.actions;
export default LoginSlice.reducer;
