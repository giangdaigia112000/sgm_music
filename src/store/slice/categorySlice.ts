import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album, Category } from "../../interface";
import axiosClient from "../../service/axiosClient";
import { notiError } from "../../utils/notification";

export const getDetailCategory = createAsyncThunk(
    "getDetailCategory",
    async (id: number, thunkAPI) => {
        const res = await axiosClient.post(`/api/category/${id}`, {
            _method: "get",
        });
        return res.data;
    }
);

export const getAllCategory = createAsyncThunk(
    "getAllCategory",
    async (thunkAPI) => {
        const res = await axiosClient.post(`/api/category`, {
            _method: "get",
        });
        return res.data;
    }
);

export const getCategoryHome = createAsyncThunk(
    "getCategoryHome",
    async (thunkAPI) => {
        const res = await axiosClient.post(`/api/category-music`, {
            _method: "get",
        });
        return res.data;
    }
);

export interface CategoryState {
    categoryId: number;
    detailCategory: Category | null;
    loadingApi: boolean;
    allCategory: Category[];
    categoryHome: Category[];
}

const initialState: CategoryState = {
    categoryId: 0,
    detailCategory: null,
    loadingApi: false,
    allCategory: [] as Category[],
    categoryHome: [] as Category[],
};

export const CategorySlice = createSlice({
    name: "CategorySlice",
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
    },
    extraReducers: {
        [getDetailCategory.pending.toString()]: (state) => {
            state.loadingApi = true;
        },
        [getDetailCategory.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.detailCategory = action.payload;
            state.loadingApi = false;
        },
        [getDetailCategory.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingApi = false;
            notiError("Lỗi lấy thông tin category.");
        },
        //////////////////////////////////////////////////////////////////
        [getAllCategory.pending.toString()]: (state) => {},
        [getAllCategory.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.allCategory = action.payload;
        },
        [getAllCategory.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiError("Lỗi lấy thông tin category.");
        },
        //////////////////////////////////////////////////////////////////
        [getCategoryHome.pending.toString()]: (state) => {},
        [getCategoryHome.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.categoryHome = action.payload;
        },
        [getCategoryHome.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            notiError("Lỗi lấy thông tin category.");
        },
        //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { setCategoryId } = CategorySlice.actions;
export default CategorySlice.reducer;
