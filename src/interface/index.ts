export interface User {
    id: number;
    name: string;
    avatar: string;
    nickname: string;
    email: string;
    active: number;
    date_of_birth: string;
    address: string;
    permissions: string[];
    created_at: string;
    updated_at: string;
    vip: number;
    vip_expried: string;
}
export interface Song {
    id: number;
    title?: string;
    user_upload?: number;
    album_id?: number;
    time?: string;
    description?: string;
    lyrics?: string;
    thumbnail?: string;
    file_path?: string;
    views?: number;
    free: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    music_view_count?: number;
    singer: User[];
}

export interface Category {
    id: number;
    title: string;
}

export interface Album {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    thumbnail: string;
    music: Song[];
    singer: User;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    avatar_path: string;
    music: Song[];
}

export interface Playlist {
    id: number;
    user_id?: number;
    name: string;
    music: Song[];
    created_at: string;
    updated_at: string;
}
