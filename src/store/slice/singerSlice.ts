import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album, Song, User } from "../../interface";
import { dowloadFile, uploadImage, uploadMp3 } from "../../service";
import axiosClient from "../../service/axiosClient";
import { notiError, notiSuccess } from "../../utils/notification";
import { userCheckMe } from "./loginSlice";

export const getDetailSinger = createAsyncThunk(
    "getDetailSinger",
    async (id: number, thunkAPI) => {
        const res = await axiosClient.post(`/api/detail/singer/${id}`, {
            _method: "get",
        });
        return res.data;
    }
);

export const getAllSinger = createAsyncThunk(
    "getAllSinger",
    async (thunkAPI) => {
        const res = await axiosClient.post(`/api/list-singer/`, {
            _method: "get",
        });
        return res.data;
    }
);

export const createSong = createAsyncThunk(
    "createSong",
    async (data: any, thunkAPI) => {
        const { title, description, free, time, id, singers, categories } =
            data;
        console.log(data);

        const imagePath = await uploadImage(data.thumbnailFile);
        const mp3Path = await uploadMp3(data.mp3File);
        singers.push(id);
        const res = await axiosClient.post(`/api/musics`, {
            title,
            description,
            free,
            time,
            thumbnail: imagePath,
            file_path: mp3Path,
            singers,
            categories,
        });
        thunkAPI.dispatch(setReload());
        return res.data;
    }
);

export const updateSong = createAsyncThunk(
    "updateSong",
    async (data: any, thunkAPI) => {
        const { id, idSong, title, description, free, time, singers } = data;

        let updateData = {
            title,
            description,
            free,
            time,
            singers,
            _method: "put",
        };

        let imagePath;

        singers.push(id);
        const res = await axiosClient.post(`/api/musics/${idSong}`, updateData);
        thunkAPI.dispatch(setReload());
        return res.data;
    }
);

export const deleteSong = createAsyncThunk(
    "deleteSong",
    async (id: number, thunkAPI) => {
        const res = await axiosClient.post(`/api/musics/${id}`, {
            _method: "delete",
        });
        thunkAPI.dispatch(setReload());
        return res.data;
    }
);

export const createAlbum = createAsyncThunk(
    "createAlbum",
    async (data: any, thunkAPI) => {
        const { name, musics } = data;
        const imagePath = await uploadImage(data.thumbnailFile);
        const res = await axiosClient.post(`/api/albums`, {
            name,
            musics,
            thumbnail: imagePath,
        });
        thunkAPI.dispatch(setReload());
        return res.data;
    }
);

export const updateAlbum = createAsyncThunk(
    "createAlbum",
    async (data: any, thunkAPI) => {
        const { id, name, musics } = data;
        let updateData = {
            name,
            musics,
            _method: "put",
        };

        let imagePath;
        if (data.thumbnailFile) {
            imagePath = await uploadImage(data.thumbnailFile);
            Object.assign(updateData, { thumbnail: imagePath });
        }
        const res = await axiosClient.post(`/api/albums/${id}`, updateData);
        thunkAPI.dispatch(setReload());
        return res.data;
    }
);

export const deleteAlbum = createAsyncThunk(
    "deleteAlbum",
    async (id: number, thunkAPI) => {
        const res = await axiosClient.post(`/api/albums/${id}`, {
            _method: "delete",
        });
        thunkAPI.dispatch(setReload());
        return res.data;
    }
);

export const updateUserProfile = createAsyncThunk(
    "updateUserProfile",
    async (data: any, thunkAPI) => {
        const { id, name, email, address, date } = data;
        console.log(data);

        const avataPath = await uploadImage(data.avataFile);

        const res = await axiosClient.post(`/api/user/${id}`, {
            name,
            email,
            address,
            date_of_birth: date,
            avatar: avataPath,
            _method: "put",
        });
        thunkAPI.dispatch(userCheckMe());
        return res.data;
    }
);

export const updateUserPass = createAsyncThunk(
    "updateUserPass",
    async (data: any, thunkAPI) => {
        const { id, pass } = data;

        const res = await axiosClient.post(`/api/user/${id}`, {
            password: pass,
            _method: "put",
        });
        return res.data;
    }
);

export const dowload = createAsyncThunk(
    "dowload",
    async (file_path: string) => {
        const res = await dowloadFile(file_path + ".mp3");
        return res;
    }
);

export interface SingerState {
    allSinger: User[];
    singerId: number;
    updateSong: Song;
    updateAlbum: Album;
    detailSinger: any | null;
    loadingApi: boolean;
    loadingCreate: boolean;
    loadingProfile: boolean;
    reload: boolean;
}

const initialState: SingerState = {
    allSinger: [] as User[],
    singerId: 0,
    detailSinger: null,
    loadingApi: false,
    loadingCreate: false,
    loadingProfile: false,
    reload: false,
    updateSong: {} as Song,
    updateAlbum: {} as Album,
};

export const SingerSlice = createSlice({
    name: "SingerSlice",
    initialState,
    reducers: {
        setSingerId: (state, action: PayloadAction<number>) => {
            state.singerId = action.payload;
        },
        setReload: (state) => {
            state.reload = !state.reload;
        },
        setSongUpdate: (state, action: PayloadAction<Song>) => {
            state.updateSong = action.payload;
        },
        setAlbumUpdate: (state, action: PayloadAction<Album>) => {
            state.updateAlbum = action.payload;
        },
    },
    extraReducers: {
        [getDetailSinger.pending.toString()]: (state) => {
            state.loadingApi = true;
        },
        [getDetailSinger.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.detailSinger = action.payload;
            state.loadingApi = false;
        },
        [getDetailSinger.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiError("L???i l???y th??ng tin ngh??? s???.");
        },
        //////////////////////////////////////////////////////////////////
        [createSong.pending.toString()]: (state) => {
            state.loadingCreate = true;
        },
        [createSong.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiSuccess("T???i b??i h??t l??n th??nh c??ng.");
        },
        [createSong.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("T???i b??i h??t l??n th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [updateSong.pending.toString()]: (state) => {
            state.loadingCreate = true;
        },
        [updateSong.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiSuccess("S???a b??i h??t l??n th??nh c??ng.");
        },
        [updateSong.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("S???a b??i h??t l??n th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [deleteSong.pending.toString()]: (state) => {
            state.loadingCreate = true;
        },
        [deleteSong.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiSuccess("X??a b??i h??t l??n th??nh c??ng.");
        },
        [deleteSong.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("X??a b??i h??t l??n th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [createAlbum.pending.toString()]: (state) => {
            state.loadingCreate = true;
        },
        [createAlbum.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiSuccess("T???o album th??nh c??ng.");
        },
        [createAlbum.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("T???o Album th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [updateAlbum.pending.toString()]: (state) => {
            state.loadingCreate = true;
        },
        [updateAlbum.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiSuccess("S???a album th??nh c??ng.");
        },
        [updateAlbum.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("T???o Album th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [deleteAlbum.pending.toString()]: (state) => {
            state.loadingCreate = true;
        },
        [deleteAlbum.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiSuccess("X??a album th??nh c??ng.");
        },
        [deleteAlbum.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("T???o Album th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [updateUserProfile.pending.toString()]: (state) => {
            state.loadingProfile = true;
        },
        [updateUserProfile.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingProfile = false;
            notiSuccess("S???a th??ng tin th??nh c??ng.");
        },
        [updateUserProfile.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingProfile = false;
            notiError("S???a th??ng tin th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [updateUserPass.pending.toString()]: (state) => {
            state.loadingProfile = true;
        },
        [updateUserPass.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingProfile = false;
            notiSuccess("S???a m???t kh???u th??nh c??ng.");
        },
        [updateUserPass.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingProfile = false;
            notiError("S???a m???t kh???u th???t b???i.");
        },
        //////////////////////////////////////////////////////////////////
        [getAllSinger.pending.toString()]: (state) => {},
        [getAllSinger.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.allSinger = action.payload;
        },
        [getAllSinger.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {},
        //////////////////////////////////////////////////////////////////
        [dowload.pending.toString()]: (state) => {},
        [dowload.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {},
        [dowload.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {},
        //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { setSingerId, setReload, setSongUpdate, setAlbumUpdate } =
    SingerSlice.actions;
export default SingerSlice.reducer;
