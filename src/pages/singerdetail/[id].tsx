import { useEffect, useState } from "react";
import {
    BiChevronRight,
    BiPlay,
    BiCheckCircle,
    BiInfoCircle,
} from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper";
import ListSong from "../../components/ListSong";
import Song from "../../components/Song";
import ListAlbum from "../../components/ListAlbum";
import { Button, Modal } from "antd";
import AddSong from "../../components/AddSong";
import AddAlbum from "../../components/AddAlbum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { getDetailSinger } from "../../store/slice/singerSlice";
import Loading from "../../components/Loading";
import { setSongList } from "../../store/slice/playSlice";

const SingerDetail = () => {
    const { user } = useAppSelector((state) => state.login);
    const { detailSinger, loadingApi, singerId, reload } = useAppSelector(
        (state) => state.singer
    );

    const { query } = useRouter();
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<number>(1);
    const [openModalAddSong, setOpenModalAddSong] = useState<boolean>(false);
    const [openModalAddAlbum, setOpenModalAddAlbum] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getDetailSinger(singerId));
    }, [singerId, reload]);

    return (
        <>
            {loadingApi && <Loading />}
            <Modal
                title="Thêm bài hát mới"
                centered
                onCancel={() => setOpenModalAddSong(false)}
                visible={openModalAddSong}
                footer={[]}
            >
                <AddSong />
            </Modal>
            <Modal
                title="Thêm Album mới"
                centered
                onCancel={() => setOpenModalAddAlbum(false)}
                footer={[]}
                visible={openModalAddAlbum}
            >
                <AddAlbum />
            </Modal>
            {user && user.id.toString() == query.id && (
                <div className="w-full flex justify-center items-center">
                    {user.active === 0 ? (
                        <div className="mb-[10px] flex items-center justify-center bg-[#461e69] p-[10px] rounded-md text-[#f0ff23]">
                            <BiInfoCircle className="w-[28px] h-[28px]" />
                            <span className="font-semibold text-sm tablet:text-lg">
                                Bạn chưa được xét duyệt làm nghệ sỹ.
                            </span>
                        </div>
                    ) : (
                        <div className="mb-[10px] flex items-center justify-center bg-[#461e69] p-[10px] rounded-md text-[#24c71f]">
                            <BiInfoCircle className="w-[28px] h-[28px]" />
                            <span className="font-semibold text-sm tablet:text-lg">
                                Bạn đã được xét duyệt.
                            </span>
                        </div>
                    )}
                </div>
            )}

            {detailSinger && (
                <>
                    <div className="w-full relative z-[1] ">
                        <div className="bg-singerdetail absolute "></div>
                        <div className="bg-alphasingerdetail absolute "></div>
                        <div className="w-full flex items-center justify-center relative  tablet:justify-around  z-[100] p-[20px] tablet:p-[30px] flex-col tablet:flex-row-reverse">
                            <div className="w-[150px] h-[150px] tablet:w-[300px] tablet:h-[300px] ">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="w-full h-full object-cover rounded-full"
                                    src={`${process.env.HOST_NAME_STREAM}/image/${detailSinger.detail?.avatar}`}
                                    alt="singer"
                                />
                            </div>
                            <div className=" max-w-[500px]   tablet:mt-0 flex flex-col justify-end items-center tablet:items-start">
                                <h1 className="pl-[10px] pt-[10px] text-2xl tablet:text-to tablet:pb-[20px] font-bold  text-[#fff] text-left">
                                    {detailSinger.detail?.name}
                                </h1>
                                <p className="pl-[10px] text-xs tablet:text-base font-semibold  text-[#fff] text-left">
                                    Sinh ngày:{" "}
                                    {moment(
                                        detailSinger.detail?.date_of_birth
                                    ).format("L")}
                                </p>
                                <p className="pl-[10px] text-xs tablet:text-base font-semibold  text-[#fff] text-left">
                                    Quê quán: {detailSinger.detail?.address}
                                </p>

                                {detailSinger.detail.music.length !== 0 && (
                                    <>
                                        <div
                                            onClick={() => {
                                                dispatch(
                                                    setSongList(
                                                        detailSinger.detail
                                                            .music
                                                    )
                                                );
                                            }}
                                            className=" ml-[10px] cursor-pointer flex gap-[5px] items-center text-sm tablet:text-base bg-[#9b4de0] p-[5px] w-[100px] tablet:w-[120px] justify-center rounded-3xl my-[20px] tablet:my-[30px]"
                                        >
                                            <BiPlay /> Phát nhạc
                                        </div>
                                        <p className="pl-[10px] text-xs tablet:text-base  text-[#fff] text-left">
                                            Mới nhât
                                        </p>
                                        <Song
                                            song={detailSinger.detail.music[0]}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full  pt-[20px] tablet:pt-[40px] relative">
                        {user &&
                            user.id.toString() == query.id &&
                            user.active === 1 && (
                                <div
                                    onClick={() => {
                                        setOpenModalAddSong(true);
                                    }}
                                    className="flex items-center text-sm tablet:text-base text-[#ffffff94] hover:text-[#891dee] cursor-pointer absolute right-0 top-[20px] tablet:top-[40px] z-10"
                                >
                                    THÊM BÀI HÁT
                                    <BiChevronRight className="w-[25px] h-[25px] tablet:w-[30px] tablet:h-[30px] " />
                                </div>
                            )}

                        {detailSinger.detail.music.length !== 0 && (
                            <>
                                <h1 className="text-[#fff] text-lg tablet:text-xl font-bold pb-[40px]">
                                    Danh sách bài hát
                                </h1>
                                <div className="w-full flex">
                                    <div className="w-[320px] h-[320px] flex justify-center items-center  hidden tablet:block">
                                        <div className="w-[300px] h-[300px]">
                                            <Swiper
                                                effect={"cards"}
                                                grabCursor={true}
                                                autoplay={{
                                                    delay: 3500,
                                                    disableOnInteraction: false,
                                                }}
                                                modules={[
                                                    EffectCards,
                                                    Autoplay,
                                                ]}
                                                className="mySwiper"
                                            >
                                                {detailSinger.detail.music.map(
                                                    (song: any) => (
                                                        <SwiperSlide
                                                            key={song.id}
                                                        >
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img
                                                                className="w-[250px] h-[250px] object-cover"
                                                                src={`${process.env.HOST_NAME_STREAM}/image/${song.thumbnail}`}
                                                                alt="anh"
                                                            />
                                                        </SwiperSlide>
                                                    )
                                                )}
                                            </Swiper>
                                        </div>
                                    </div>
                                    <div className="w-[320px] tablet:h-[320px] flex-1 tablet:overflow-y-auto">
                                        <ListSong
                                            listSong={detailSinger.detail.music}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="w-full  pt-[20px]  relative pb-[200px]">
                            {user &&
                                user.id.toString() == query.id &&
                                user.active === 1 && (
                                    <div
                                        onClick={() => {
                                            setOpenModalAddAlbum(true);
                                        }}
                                        className="flex items-center text-sm tablet:text-base text-[#ffffff94] hover:text-[#891dee] cursor-pointer absolute right-0 top-[20px] tablet:top-[40px]"
                                    >
                                        THÊM ALBUM
                                        <BiChevronRight className="w-[25px] h-[25px] tablet:w-[30px] tablet:h-[30px] " />
                                    </div>
                                )}

                            {detailSinger.albums.length !== 0 && (
                                <>
                                    <h1 className="text-[#fff] text-lg tablet:text-xl font-bold">
                                        Album
                                    </h1>
                                    <ListAlbum
                                        listAlbum={detailSinger.albums}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SingerDetail;
