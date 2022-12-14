import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interface";
import axiosClient from "../../service/axiosClient";
import {
    getStoreLocal,
    removeStoreLocal,
    setStoreLocal,
} from "../../utils/localStore";
import { notiError, notiSuccess } from "../../utils/notification";

export const userRegister = createAsyncThunk(
    "userRegister",
    async (data: any, thunkAPI) => {
        const res = await axiosClient.post("/api/auth/register", data);
        return res.data;
    }
);

export const userLogin = createAsyncThunk(
    "userLogin",
    async (data: any, thunkAPI) => {
        const res = await axiosClient.post("/api/auth/login", data);
        return res.data;
    }
);

export const userCheckMe = createAsyncThunk("userCheckMe", async () => {
    const res = await axiosClient.post("/api/auth/info", {
        _method: "get",
    });
    return res.data;
});

export const userPayVip = createAsyncThunk(
    "userPayVip",
    async (data: any, thunkAPI) => {
        const { cvc, date, name, number } = data;
        const time = date.split("/");

        const res = await axiosClient.post("/api/payment", {
            card_number: number,
            cvc: cvc,
            month: time[0] ? time[0] : 12,
            year: time[1] ? time[1] : 25,
        });
        thunkAPI.dispatch(userCheckMe());
        return res.data;
    }
);

export const userReport = createAsyncThunk(
    "userReport",
    async (data: any, thunkAPI) => {
        const { id, content } = data;
        const res = await axiosClient.post("/api/report", {
            music_id: id,
            message: content,
        });
        return res.data;
    }
);

export interface LoginState {
    loading: boolean;
    navActive: boolean;
    isLogin: boolean;
    user: User | null;
    token: string;
}

const initialState: LoginState = {
    loading: false,
    navActive: true,
    isLogin: false,
    user: null,
    token: getStoreLocal("token") ? "" : (getStoreLocal("token") as string),
};

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logOut: (state) => {
            removeStoreLocal("token");
            state.isLogin = false;
            state.user = null;
        },
        setNav: (state, action: PayloadAction<boolean>) => {
            state.navActive = action.payload;
        },
    },
    extraReducers: {
        [userRegister.pending.toString()]: (state) => {
            state.loading = true;
        },
        [userRegister.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            notiSuccess("????ng k?? th??nh c??ng.");
        },
        [userRegister.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            notiError("????ng k?? th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [userLogin.pending.toString()]: (state) => {
            state.loading = true;
        },
        [userLogin.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            console.log(action.payload);

            const token = action.payload.data.token as string;
            setStoreLocal("token", token);
            state.token = token;
            state.isLogin = true;
            state.user = action.payload.data.user as User;
            notiSuccess("????ng nh???p th??nh c??ng.");
        },
        [userLogin.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            notiError("????ng nh???p th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [userCheckMe.pending.toString()]: (state) => {
            state.loading = true;
        },
        [userCheckMe.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            state.isLogin = true;
            state.user = action.payload as User;
        },
        [userCheckMe.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
        },
        //////////////////////////////////////////////////////////////////
        [userPayVip.pending.toString()]: (state) => {
            state.loading = true;
        },
        [userPayVip.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            if (action.payload === 1) {
                notiSuccess("Thanh to??n g??i vip th??nh c??ng.");
            } else {
                notiError("Thanh to??n th???t b???i.");
            }
        },
        [userPayVip.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
        },
        //////////////////////////////////////////////////////////////////
        [userReport.pending.toString()]: (state) => {},
        [userReport.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiSuccess("G???i b??o c??o th??nh c??ng.");
        },
        [userReport.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiError("G???i b??o c??o th???t b???i.");
        },
    },
});

// Action creators are generated for each case reducer function
export const { logOut, setNav } = LoginSlice.actions;
export default LoginSlice.reducer;
