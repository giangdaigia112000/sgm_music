import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../../interface";
import axiosClient from "../../service/axiosClient";
import { notiError } from "../../utils/notification";

export const getDetailAlbum = createAsyncThunk(
    "getDetailAlbum",
    async (id: number, thunkAPI) => {
        const res = await axiosClient.post(`/api/albums/${id}`, {
            _method: "get",
        });
        return res.data;
    }
);

export interface AlbumState {
    allAlbum: Album[];
    albumId: number;
    detailAlbum: Album | null;
    loadingApi: boolean;
}

const initialState: AlbumState = {
    allAlbum: [] as Album[],
    albumId: 0,
    detailAlbum: null,
    loadingApi: false,
};

export const AlbumSlice = createSlice({
    name: "SingerSlice",
    initialState,
    reducers: {
        setAlbumId: (state, action: PayloadAction<number>) => {
            state.albumId = action.payload;
        },
    },
    extraReducers: {
        [getDetailAlbum.pending.toString()]: (state) => {
            state.loadingApi = true;
        },
        [getDetailAlbum.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.detailAlbum = action.payload;
            state.loadingApi = false;
        },
        [getDetailAlbum.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiError("Lỗi lấy thông tin album.");
        },
        //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { setAlbumId } = AlbumSlice.actions;
export default AlbumSlice.reducer;
