import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album, Category, Playlist } from "../../interface";
import axiosClient from "../../service/axiosClient";
import { notiError, notiSuccess } from "../../utils/notification";

export const getDetailPlaylist = createAsyncThunk(
    "getDetailPlaylist",
    async (id: number, thunkAPI) => {
        const res = await axiosClient.post(`/api/playlists/${id}`, {
            _method: "get",
        });
        return res.data;
    }
);

export const createPlaylist = createAsyncThunk(
    "createPlaylist",
    async (data: any, thunkAPI) => {
        const { name } = data;
        const res = await axiosClient.post(`/api/playlists`, {
            name,
            description: "rong",
            musics: [],
            _method: "post",
        });
        thunkAPI.dispatch(getAllPlaylist());
        return res.data;
    }
);

export const updatePlaylist = createAsyncThunk(
    "updatePlaylist",
    async (data: any, thunkAPI) => {
        const { id, idSong, music } = data;
        const musicid = music.map((m: any) => m.id);
        const res = await axiosClient.post(`/api/playlists/${id}`, {
            musics: [...musicid, idSong],
            _method: "put",
        });
        thunkAPI.dispatch(getAllPlaylist());
        return res.data;
    }
);

export const updatePlaylistNav = createAsyncThunk(
    "updatePlaylistNav",
    async (data: any, thunkAPI) => {
        const { id, name, music } = data;
        const res = await axiosClient.post(`/api/playlists/${id}`, {
            musics: music,
            name: name,
            _method: "put",
        });
        thunkAPI.dispatch(getAllPlaylist());
        return res.data;
    }
);

export const deletePlaylist = createAsyncThunk(
    "deletePlaylist",
    async (id: number, thunkAPI) => {
        const res = await axiosClient.post(`/api/playlists/${id}`, {
            _method: "delete",
        });
        thunkAPI.dispatch(getAllPlaylist());
        return res.data;
    }
);

export const getAllPlaylist = createAsyncThunk(
    "getAllPlaylist",
    async (thunkAPI) => {
        const res = await axiosClient.post(`/api/playlists`, {
            _method: "get",
        });
        return res.data;
    }
);

export interface PlaylistState {
    playlistId: number;
    detailPlaylist: Playlist | null;
    loadingApi: boolean;
    allPlaylist: Playlist[];
    playlistUpdateId: number;
}

const initialState: PlaylistState = {
    playlistId: 0,
    playlistUpdateId: 0,
    detailPlaylist: null,
    loadingApi: false,
    allPlaylist: [] as Playlist[],
};

export const playlistSlice = createSlice({
    name: "playlistSlice",
    initialState,
    reducers: {
        setPlaylistId: (state, action: PayloadAction<number>) => {
            state.playlistId = action.payload;
        },
        setPlaylistUpdateId: (state, action: PayloadAction<number>) => {
            state.playlistUpdateId = action.payload;
        },
    },
    extraReducers: {
        [getDetailPlaylist.pending.toString()]: (state) => {
            state.loadingApi = true;
        },
        [getDetailPlaylist.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.detailPlaylist = action.payload;
            state.loadingApi = false;
        },
        [getDetailPlaylist.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiError("L???i l???y th??ng tin playlist.");
        },
        //////////////////////////////////////////////////////////////////
        [updatePlaylist.pending.toString()]: (state) => {
            state.loadingApi = true;
        },
        [updatePlaylist.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiSuccess("???? c???p nh???t playlist");
        },
        [updatePlaylist.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiError("L???i c???p nh???t playlist.");
        },
        //////////////////////////////////////////////////////////////////
        [updatePlaylistNav.pending.toString()]: (state) => {
            state.loadingApi = true;
        },
        [updatePlaylistNav.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiSuccess("???? c???p nh???t playlist");
        },
        [updatePlaylistNav.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiError("L???i c???p nh???t playlist.");
        },
        //////////////////////////////////////////////////////////////////

        [deletePlaylist.pending.toString()]: (state) => {
            state.loadingApi = true;
        },
        [deletePlaylist.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiSuccess("X??a playlist th??nh c??ng");
            state.loadingApi = false;
        },
        [deletePlaylist.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiError("X??a playlist th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////

        [createPlaylist.pending.toString()]: (state) => {
            state.loadingApi = true;
        },
        [createPlaylist.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiSuccess("T???o playlist th??nh c??ng");
            state.loadingApi = false;
        },
        [createPlaylist.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiError("T???o playlist th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [getAllPlaylist.pending.toString()]: (state) => {},
        [getAllPlaylist.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.allPlaylist = action.payload;
        },
        [getAllPlaylist.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiError("L???i l???y th??ng tin playlist.");
        },
        //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { setPlaylistId, setPlaylistUpdateId } = playlistSlice.actions;
export default playlistSlice.reducer;
