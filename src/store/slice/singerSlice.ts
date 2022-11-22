import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, User } from "../../interface";
import { uploadImage, uploadMp3 } from "../../service";
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
        const {
            idSong,
            title,
            description,
            free,
            time,
            id,
            singers,
            categories,
        } = data;

        let updateData = {
            title,
            description,
            free,
            time,
            singers,
            categories,
            _method: "put",
        };

        let imagePath;
        if (data.thumbnailFile) {
            imagePath = await uploadImage(data.thumbnailFile);
            Object.assign(updateData, { thumbnail: imagePath });
        }

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

export interface SingerState {
    allSinger: User[];
    singerId: number;
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
            notiError("Lỗi lấy thông tin nghệ sỹ.");
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
            notiSuccess("Tải bài hát lên thành công.");
        },
        [createSong.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("Tải bài hát lên thất bại.");
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
            notiSuccess("Sửa bài hát lên thành công.");
        },
        [updateSong.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("Sửa bài hát lên thất bại.");
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
            notiSuccess("Xóa bài hát lên thành công.");
        },
        [deleteSong.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("Xóa bài hát lên thất bại.");
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
            notiSuccess("Tạo album thành công.");
        },
        [createAlbum.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("Tạo Album thất bại.");
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
            notiSuccess("Sửa album thành công.");
        },
        [updateAlbum.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("Tạo Album thất bại.");
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
            notiSuccess("Xóa album thành công.");
        },
        [deleteAlbum.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCreate = false;
            notiError("Tạo Album thất bại.");
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
            notiSuccess("Sửa thông tin thành công.");
        },
        [updateUserProfile.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingProfile = false;
            notiError("Sửa thông tin thất bại.");
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
            notiSuccess("Sửa mật khẩu thành công.");
        },
        [updateUserPass.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingProfile = false;
            notiError("Sửa mật khẩu thất bại.");
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
    },
});

// Action creators are generated for each case reducer function
export const { setSingerId, setReload } = SingerSlice.actions;
export default SingerSlice.reducer;
