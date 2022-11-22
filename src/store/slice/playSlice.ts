import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../interface";
import axiosClient from "../../service/axiosClient";

export const getPlaySong = createAsyncThunk(
    "getPlaySong",
    async (id: number, thunkAPI) => {
        const res = await axiosClient.post(`/api/musics/${id}`, {
            _method: "get",
        });
        return res.data;
    }
);

export interface PlayState {
    listSongPlay: Song[];
    songActive: number;
}

const initialState: PlayState = {
    listSongPlay: [] as Song[],
    songActive: 0,
};

export const PlaySlice = createSlice({
    name: "playSlice",
    initialState,
    reducers: {
        setSongList: (state, action: PayloadAction<Song[]>) => {
            state.listSongPlay = action.payload;
            state.songActive = 0;
        },
        pushSongList: (state, action: PayloadAction<Song>) => {
            state.listSongPlay.push(action.payload);
        },
        concatSongList: (state, action: PayloadAction<Song[]>) => {
            state.listSongPlay = state.listSongPlay.concat(action.payload);
        },
        setSongActive: (state, action: PayloadAction<number>) => {
            state.songActive = action.payload;
        },
    },
    extraReducers: {
        [getPlaySong.pending.toString()]: (state) => {},
        [getPlaySong.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {},
        [getPlaySong.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {},
        //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { setSongList, pushSongList, concatSongList, setSongActive } =
    PlaySlice.actions;
export default PlaySlice.reducer;
