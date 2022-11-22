import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album, Song, User } from "../../interface";
import axiosClient from "../../service/axiosClient";
import { notiError } from "../../utils/notification";

export const getListSongSlide = createAsyncThunk(
    "getListSongSlide",
    async (thunkAPI) => {
        const res = await axiosClient.post("/api/top-5-songs", {
            _method: "get",
        });
        return res.data;
    }
);

export const getListSongHome = createAsyncThunk(
    "getListSongHome",
    async (thunkAPI) => {
        const res = await axiosClient.post("api/musics", {
            _method: "get",
        });
        return res.data;
    }
);

export const getListAlbumHome = createAsyncThunk(
    "getListAlbumHome",
    async (thunkAPI) => {
        const res = await axiosClient.post("api/albums", {
            _method: "get",
        });
        return res.data;
    }
);

export const userSearch = createAsyncThunk(
    "userSearch",
    async (query: string, thunkAPI) => {
        const res = await axiosClient.post("/api/search", {
            key: query,
            _method: "get",
        });
        return res.data;
    }
);

export const getListSongHomeBXH = createAsyncThunk(
    "getListSongHomeBXH",
    async (thunkAPI) => {
        const res = await axiosClient.post("api/musics", {
            _method: "get",
        });
        return res.data;
    }
);

export interface LoginState {
    listSongSlide: Song[];
    listSongSearch: Song[];
    listSingerSearch: User[];
    listSongHome: Song[];
    listSongBXH: Song[];
    listAlbumHome: Album[];
    loadingSearch: boolean;
}

const initialState: LoginState = {
    listSongSlide: [] as Song[],
    listSongSearch: [] as Song[],
    listSingerSearch: [] as User[],
    listSongHome: [] as Song[],
    listSongBXH: [] as Song[],
    listAlbumHome: [] as Album[],
    loadingSearch: false,
};

export const HomeSlice = createSlice({
    name: "HomeSlice",
    initialState,
    reducers: {
        test1: (state) => {},
    },
    extraReducers: {
        [getListSongSlide.pending.toString()]: (state) => {},
        [getListSongSlide.fulfilled.toString()]: (
            state,
            action: PayloadAction<Song[]>
        ) => {
            state.listSongSlide = action.payload;
        },
        [getListSongSlide.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiError("Lỗi lấy danh sách slide.");
        },
        //////////////////////////////////////////////////////////////////
        [userSearch.pending.toString()]: (state) => {
            state.loadingSearch = true;
        },
        [userSearch.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingSearch = false;
            state.listSongSearch = action.payload.musics;
            state.listSingerSearch = action.payload.user;
        },
        [userSearch.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingSearch = false;
        },
        //////////////////////////////////////////////////////////////////
        [getListSongHome.pending.toString()]: (state) => {},
        [getListSongHome.fulfilled.toString()]: (
            state,
            action: PayloadAction<Song[]>
        ) => {
            state.listSongHome = action.payload;
        },
        [getListSongHome.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiError("Lỗi lấy danh sách bài hát trang home.");
        },
        //////////////////////////////////////////////////////////////////
        [getListAlbumHome.pending.toString()]: (state) => {},
        [getListAlbumHome.fulfilled.toString()]: (
            state,
            action: PayloadAction<Album[]>
        ) => {
            state.listAlbumHome = action.payload;
        },
        [getListAlbumHome.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiError("Lỗi lấy danh sách album trang home.");
        },
        //////////////////////////////////////////////////////////////////
        [getListSongHomeBXH.pending.toString()]: (state) => {},
        [getListSongHomeBXH.fulfilled.toString()]: (
            state,
            action: PayloadAction<Song[]>
        ) => {
            state.listSongBXH = action.payload;
        },
        [getListSongHomeBXH.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiError("Lỗi lấy danh sách bài hát trang bxh.");
        },
        //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { test1 } = HomeSlice.actions;
export default HomeSlice.reducer;
