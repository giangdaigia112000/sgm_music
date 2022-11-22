import { useEffect, useState } from "react";
import {
    BiChevronRight,
    BiPlay,
    BiCheckCircle,
    BiInfoCircle,
    BiListPlus,
    BiPlayCircle,
} from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper";
import ListSong from "../../components/ListSong";
import Song from "../../components/Song";
import ListAlbum from "../../components/ListAlbum";
import { Button, Col, Modal, Popconfirm, Row, Tooltip } from "antd";
import AddSong from "../../components/AddSong";
import AddAlbum from "../../components/AddAlbum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";
import moment from "moment";
import {
    deleteAlbum,
    deleteSong,
    getDetailSinger,
    setAlbumUpdate,
    setSingerId,
    setSongUpdate,
} from "../../store/slice/singerSlice";
import Loading from "../../components/Loading";
import { concatSongList, setSongList } from "../../store/slice/playSlice";
import { notiWarning } from "../../utils/notification";
import styles from "./Singerdetail.module.scss";
import { setAlbumId } from "../../store/slice/albumSlice";
import UpdateSong from "../../components/UpdateSong";
import UpdateAlbum from "../../components/UpdateAlbum";
const SingerDetail = () => {
    const { user } = useAppSelector((state) => state.login);
    const {
        detailSinger,
        loadingApi,
        singerId,
        reload,
        updateSong,
        updateAlbum,
    } = useAppSelector((state) => state.singer);
    const { listSongPlay, songActive } = useAppSelector((state) => state.play);
    const { query, push } = useRouter();
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<number>(1);
    const [openModalAddSong, setOpenModalAddSong] = useState<boolean>(false);
    const [openModalUpdateSong, setOpenModalUpdateSong] =
        useState<boolean>(false);

    const [openModalAddAlbum, setOpenModalAddAlbum] = useState<boolean>(false);
    const [openModalUpdateAlbum, setOpenModalUpdateAlbum] =
        useState<boolean>(false);

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

            <Modal
                title="Sửa bài hát "
                centered
                onCancel={() => setOpenModalUpdateSong(false)}
                footer={[]}
                visible={openModalUpdateSong}
            >
                <UpdateSong song={updateSong} />
            </Modal>

            <Modal
                title="Sửa Album "
                centered
                onCancel={() => setOpenModalUpdateAlbum(false)}
                footer={[]}
                visible={openModalUpdateAlbum}
            >
                <UpdateAlbum album={updateAlbum} />
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
                                                        detailSinger.detail.music.filter(
                                                            (music: any) =>
                                                                !(
                                                                    (user?.vip ===
                                                                        0 ||
                                                                        !user) &&
                                                                    music.free ===
                                                                        0
                                                                )
                                                        )
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
                                    <div className="w-[320px] h-[320px] flex justify-center items-center hidden tablet:block">
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
                                        <div className="w-full pt-[20px]">
                                            <Row justify="start" align="middle">
                                                {detailSinger.detail.music.map(
                                                    (song: any) => (
                                                        <Col
                                                            xs={24}
                                                            md={12}
                                                            xl={8}
                                                            key={song.id}
                                                        >
                                                            <div className="w-full ">
                                                                {user &&
                                                                    user.id.toString() ==
                                                                        query.id && (
                                                                        <div className="flex gap-3 px-[10px]">
                                                                            <span
                                                                                onClick={() => {
                                                                                    dispatch(
                                                                                        setSongUpdate(
                                                                                            song
                                                                                        )
                                                                                    );
                                                                                    setOpenModalUpdateSong(
                                                                                        true
                                                                                    );
                                                                                }}
                                                                                className="hover:text-[#902fad] cursor-pointer"
                                                                            >
                                                                                Sửa
                                                                            </span>
                                                                            <Popconfirm
                                                                                title="Bạn muốn xóa bài hát này"
                                                                                onConfirm={() => {
                                                                                    dispatch(
                                                                                        deleteSong(
                                                                                            song.id
                                                                                        )
                                                                                    );
                                                                                }}
                                                                                okText="Có"
                                                                                cancelText="Không"
                                                                            >
                                                                                <span className="hover:text-[#902fad] cursor-pointer">
                                                                                    Xóa
                                                                                </span>
                                                                            </Popconfirm>
                                                                        </div>
                                                                    )}

                                                                <Song
                                                                    song={song}
                                                                />
                                                            </div>
                                                        </Col>
                                                    )
                                                )}
                                            </Row>
                                        </div>
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
                                    <div className="w-full pt-[20px]">
                                        <Row justify="start" align="middle">
                                            {detailSinger.albums &&
                                                detailSinger.albums.length !==
                                                    0 && (
                                                    <>
                                                        {detailSinger.albums.map(
                                                            (album: any) => (
                                                                <Col
                                                                    xs={8}
                                                                    md={6}
                                                                    xl={4}
                                                                    key={
                                                                        album.id
                                                                    }
                                                                >
                                                                    <div className="w-full ">
                                                                        {user &&
                                                                            user.id.toString() ==
                                                                                query.id && (
                                                                                <div className="flex gap-3 px-[10px]">
                                                                                    <span
                                                                                        onClick={() => {
                                                                                            dispatch(
                                                                                                setAlbumUpdate(
                                                                                                    album
                                                                                                )
                                                                                            );
                                                                                            setOpenModalUpdateAlbum(
                                                                                                true
                                                                                            );
                                                                                        }}
                                                                                        className="hover:text-[#902fad] cursor-pointer"
                                                                                    >
                                                                                        Sửa
                                                                                    </span>
                                                                                    <Popconfirm
                                                                                        title="Bạn muốn xóa album này"
                                                                                        onConfirm={() => {
                                                                                            dispatch(
                                                                                                deleteAlbum(
                                                                                                    album.id
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        okText="Có"
                                                                                        cancelText="Không"
                                                                                    >
                                                                                        <span className="hover:text-[#902fad] cursor-pointer">
                                                                                            Xóa
                                                                                        </span>
                                                                                    </Popconfirm>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                    <div className="w-full p-[4px] tablet:p-[8px] laptop:p-[10px]">
                                                                        <div className="relative w-full pt-[100%] ">
                                                                            <div
                                                                                className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg  ${styles.cateHover}`}
                                                                            >
                                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                                <img
                                                                                    className="w-full h-full object-cover "
                                                                                    src={`${process.env.HOST_NAME_STREAM}/image/${album.thumbnail}`}
                                                                                    alt="Album"
                                                                                />
                                                                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#00000086] gap-[10px] ">
                                                                                    <Tooltip
                                                                                        placement="top"
                                                                                        color="volcano"
                                                                                        title={
                                                                                            "Nghe List"
                                                                                        }
                                                                                        mouseLeaveDelay={
                                                                                            0
                                                                                        }
                                                                                        overlayInnerStyle={{
                                                                                            borderRadius:
                                                                                                "5px",
                                                                                        }}
                                                                                    >
                                                                                        <BiPlayCircle
                                                                                            onClick={() => {
                                                                                                if (
                                                                                                    album
                                                                                                        .music
                                                                                                        .length ===
                                                                                                    0
                                                                                                ) {
                                                                                                    notiWarning(
                                                                                                        "Album rỗng."
                                                                                                    );
                                                                                                    return;
                                                                                                }
                                                                                                push(
                                                                                                    "/play"
                                                                                                );
                                                                                                dispatch(
                                                                                                    setSongList(
                                                                                                        album.music.filter(
                                                                                                            (
                                                                                                                music: any
                                                                                                            ) =>
                                                                                                                !(
                                                                                                                    (user?.vip ===
                                                                                                                        0 ||
                                                                                                                        !user) &&
                                                                                                                    music.free ===
                                                                                                                        0
                                                                                                                )
                                                                                                        )
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            className="w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px]   text-[#ffffff80] hover:text-[#ffffff] cursor-pointer"
                                                                                        />
                                                                                    </Tooltip>
                                                                                    <Tooltip
                                                                                        placement="top"
                                                                                        color="volcano"
                                                                                        title={
                                                                                            "Thêm vào danh sách phát"
                                                                                        }
                                                                                        mouseLeaveDelay={
                                                                                            0
                                                                                        }
                                                                                        overlayInnerStyle={{
                                                                                            borderRadius:
                                                                                                "5px",
                                                                                        }}
                                                                                    >
                                                                                        <BiListPlus
                                                                                            onClick={() => {
                                                                                                const listId =
                                                                                                    listSongPlay.map(
                                                                                                        (
                                                                                                            song
                                                                                                        ) =>
                                                                                                            song.id
                                                                                                    );
                                                                                                if (
                                                                                                    album
                                                                                                        .music
                                                                                                        .length ===
                                                                                                    0
                                                                                                ) {
                                                                                                    notiWarning(
                                                                                                        "Album rỗng."
                                                                                                    );
                                                                                                    return;
                                                                                                }
                                                                                                const listMusicCheck =
                                                                                                    album.music
                                                                                                        .filter(
                                                                                                            (
                                                                                                                music: any
                                                                                                            ) =>
                                                                                                                !(
                                                                                                                    (user?.vip ===
                                                                                                                        0 ||
                                                                                                                        !user) &&
                                                                                                                    music.free ===
                                                                                                                        0
                                                                                                                )
                                                                                                        )
                                                                                                        .filter(
                                                                                                            (
                                                                                                                music: any
                                                                                                            ) =>
                                                                                                                !listId.includes(
                                                                                                                    music.id
                                                                                                                )
                                                                                                        );
                                                                                                if (
                                                                                                    listMusicCheck.length ===
                                                                                                    0
                                                                                                ) {
                                                                                                    notiWarning(
                                                                                                        "Tất cả bài hát đang trong danh sách phát"
                                                                                                    );
                                                                                                    return;
                                                                                                }
                                                                                                push(
                                                                                                    "/play"
                                                                                                );
                                                                                                dispatch(
                                                                                                    concatSongList(
                                                                                                        listMusicCheck
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            className="w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px]   text-[#ffffff80] hover:text-[#ffffff] cursor-pointer"
                                                                                        />
                                                                                    </Tooltip>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <h1
                                                                            onClick={() => {
                                                                                dispatch(
                                                                                    setAlbumId(
                                                                                        album.id
                                                                                    )
                                                                                );
                                                                                push(
                                                                                    `/albumdetail/${album.id}`
                                                                                );
                                                                            }}
                                                                            className="text-[#fff] m-0 text-xs tablet:text-base font-bold hiddentitle pt-[8px] hover:text-[#891dee] cursor-pointer"
                                                                        >
                                                                            {
                                                                                album.name
                                                                            }
                                                                        </h1>
                                                                        {album?.singer && (
                                                                            <h1
                                                                                onClick={() => {
                                                                                    dispatch(
                                                                                        setSingerId(
                                                                                            album
                                                                                                .singer
                                                                                                .id
                                                                                        )
                                                                                    );
                                                                                    push(
                                                                                        `/singerdetail/${album.singer.id}`
                                                                                    );
                                                                                }}
                                                                                className="text-[#ffffff80] text-xs tablet:text-sm  hiddentitle pt-[3px] hover:text-[#891dee] cursor-pointer"
                                                                            >
                                                                                {
                                                                                    album
                                                                                        .singer
                                                                                        .name
                                                                                }
                                                                            </h1>
                                                                        )}
                                                                    </div>
                                                                </Col>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                        </Row>
                                    </div>
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
