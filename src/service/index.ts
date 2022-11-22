import axios from "axios";

export const uploadImage = async (file: any) => {
    const bodyData = new FormData();
    bodyData.append("file", file);
    const res = await axios.post(
        `${process.env.HOST_NAME_STREAM}/image`,
        bodyData
    );
    return res.data.filename;
};

export const uploadMp3 = async (file: any) => {
    const bodyData = new FormData();
    bodyData.append("file", file);
    const res = await axios.post(
        `${process.env.HOST_NAME_STREAM}/mp3`,
        bodyData
    );
    return res.data.path;
};
