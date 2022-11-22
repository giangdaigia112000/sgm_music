import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import homeReducer from "./slice/homeSlice";
import playReducer from "./slice/playSlice";
import singerReducer from "./slice/singerSlice";
import albumReducer from "./slice/albumSlice";
import categoryReducer from "./slice/categorySlice";
import playlistReducer from "./slice/playlistSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            login: loginReducer,
            home: homeReducer,
            play: playReducer,
            singer: singerReducer,
            album: albumReducer,
            category: categoryReducer,
            playlist: playlistReducer,
        },
    });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;
