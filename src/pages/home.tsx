import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import ListCategory from "../components/ListCategory";
import ListAlbum from "../components/ListAlbum";
import { BiChevronRight } from "react-icons/bi";
import { useRouter } from "next/router";
import ListSong from "../components/ListSong";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    getListAlbumHome,
    getListSongHome,
    getListSongSlide,
} from "../store/slice/homeSlice";
import { setSongList } from "../store/slice/playSlice";
import { Skeleton } from "antd";
import { Album, Category, Song, User } from "../interface";
import { getAllSinger } from "../store/slice/singerSlice";
import { getCategoryHome } from "../store/slice/categorySlice";
import ListSinger from "../components/ListSinger";
import Singer from "./singer";
import { notiWarning } from "../utils/notification";
const slide = [
    {
        img: "https://photo-zmp3.zmdcdn.me/banner/5/5/8/a/558aa70110ea057e49322f8c052077db.jpg",
    },
    {
        img: "https://photo-zmp3.zmdcdn.me/banner/d/1/2/7/d1277be79d058986695624337134eaee.jpg",
    },
    {
        img: "https://photo-zmp3.zmdcdn.me/banner/d/b/8/a/db8ab51fc34f82b584a4e7ca82651b5a.jpg",
    },
];
const skeleton = [1, 2, 3, 4, 5];
const Home = () => {
    const { push } = useRouter();
    const { listSongSlide, listSongHome, listAlbumHome } = useAppSelector(
        (state) => state.home
    );
    const { user } = useAppSelector((state) => state.login);
    const { allSinger } = useAppSelector((state) => state.singer);
    const albumShowHome = listAlbumHome
        ? (listAlbumHome.map((album, index) => {
              if (index < 13) return album;
          }) as Album[])
        : [];
    const songShowHome = listSongHome
        ? (listSongHome.map((song, index) => {
              if (index < 31) return song;
          }) as Song[])
        : [];

    const songSingerHome = allSinger
        ? (allSinger.map((singer, index) => {
              if (index < 7) return singer;
          }) as User[])
        : [];
    const { categoryHome } = useAppSelector((state) => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getListSongSlide());
        dispatch(getListSongHome());
        dispatch(getListAlbumHome());
        dispatch(getAllSinger());
        dispatch(getCategoryHome());
    }, []);
    return (
        <div className="w-full">
            <div className="w-full relative">
                <div
                    className="h-full absolute w-[40px] tablet:w-[80px] top-0 left-[-1px] z-30"
                    style={{
                        background:
                            " linear-gradient(90deg, rgba(23,15,35,1) 8%, rgba(255,255,255,0) 100%)",
                    }}
                ></div>
                <div
                    className="h-full absolute w-[40px] tablet:w-[80px] top-0 right-[-1px] z-30"
                    style={{
                        background:
                            " linear-gradient(270deg, rgba(23,15,35,1) 8%, rgba(255,255,255,0) 100%)",
                    }}
                ></div>
                <Swiper
                    spaceBetween={40}
                    slidesPerView={3.5}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        "@0.75": {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        "@1.00": {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                        "@1.50": {
                            slidesPerView: 5,
                            spaceBetween: 40,
                        },
                    }}
                    slidesPerGroup={1}
                    centeredSlides={true}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    loopedSlides={5}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                >
                    {listSongSlide.length === 0 ? (
                        <>
                            {skeleton.map((_, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="w-full pt-[100%] relative">
                                        <Skeleton.Image
                                            className="rounded-xl absolute top-0 left-0 w-full h-full object-cover"
                                            active={true}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </>
                    ) : (
                        <>
                            {listSongSlide.map((song) => (
                                <SwiperSlide key={song.id}>
                                    <div
                                        onClick={() => {
                                            if (
                                                (user?.vip === 0 || !user) &&
                                                song.free === 0
                                            ) {
                                                notiWarning(
                                                    "Bạn cần là thành viên vip để nghe bài hát này."
                                                );
                                                return;
                                            }
                                            dispatch(setSongList([song]));
                                        }}
                                        className="w-full pt-[100%] relative"
                                    >
                                        {/*  eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="rounded-xl cursor-pointer absolute top-0 left-0 w-full h-full object-cover"
                                            style={{
                                                boxShadow:
                                                    "#d1d1d133 0px 2px 8px 0px",
                                            }}
                                            src={`${process.env.HOST_NAME_STREAM}/image/${song.thumbnail}`}
                                            alt="slider"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </>
                    )}
                </Swiper>
            </div>
            <div className="w-full  pt-[20px] tablet:pt-[40px]">
                <h1 className="text-[#fff]  text-lg tablet:text-xl font-bold">
                    Thể Loại
                </h1>
                <ListCategory listcate={categoryHome} />
            </div>
            <div className="w-full  pt-[20px] tablet:pt-[40px] relative">
                <div
                    onClick={() => {
                        push("/album");
                    }}
                    className="flex items-center text-sm tablet:text-base text-[#ffffff94] hover:text-[#891dee] cursor-pointer absolute right-0 top-[20px] tablet:top-[40px]"
                >
                    TẤT CẢ
                    <BiChevronRight className="w-[25px] h-[25px] tablet:w-[30px] tablet:h-[30px] " />
                </div>
                <h1 className="text-[#fff] text-lg tablet:text-xl font-bold">
                    Album Mới & Hot
                </h1>
                <ListAlbum listAlbum={albumShowHome} />
            </div>
            <div className="w-full  pt-[20px] tablet:pt-[40px] relative">
                <div
                    onClick={() => {
                        push("/singer");
                    }}
                    className="flex items-center text-sm tablet:text-base text-[#ffffff94] hover:text-[#891dee] cursor-pointer absolute right-0 top-[20px] tablet:top-[40px]"
                >
                    TẤT CẢ
                    <BiChevronRight className="w-[25px] h-[25px] tablet:w-[30px] tablet:h-[30px] " />
                </div>
                <h1 className="text-[#fff]  text-lg tablet:text-xl font-bold z-10">
                    Nghệ Sỹ
                </h1>
                <ListSinger listSinger={songSingerHome} />
            </div>
            <div className="w-full  pt-[20px] tablet:pt-[40px] relative">
                <div
                    onClick={() => {
                        push("/bxh");
                    }}
                    className="flex items-center text-sm tablet:text-base text-[#ffffff94] hover:text-[#891dee] cursor-pointer absolute right-0 top-[20px] tablet:top-[40px]"
                >
                    BẢNG XẾP HẠNG
                    <BiChevronRight className="w-[25px] h-[25px] tablet:w-[30px] tablet:h-[30px] " />
                </div>
                <h1 className="text-[#fff] text-lg tablet:text-xl font-bold">
                    Gợi ý cho bạn
                </h1>
                <ListSong listSong={songShowHome} />
            </div>
            <div className="h-[200px]"></div>
        </div>
    );
};

export default Home;
