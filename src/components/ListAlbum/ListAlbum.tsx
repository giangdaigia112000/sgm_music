import { Col, Row, Skeleton, Tooltip } from "antd";
import { useRouter } from "next/router";
import {
    BiDotsHorizontalRounded,
    BiListPlus,
    BiMessageSquareAdd,
    BiPlayCircle,
} from "react-icons/bi";
import { Album } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAlbumId } from "../../store/slice/albumSlice";
import { concatSongList, setSongList } from "../../store/slice/playSlice";
import { setSingerId } from "../../store/slice/singerSlice";
import { notiWarning } from "../../utils/notification";
import styles from "./ListAlbum.module.scss";

const mang = [1, 2, 3, 4, 5, 6];
interface Prop {
    listAlbum: Album[] | undefined;
}
const ListAlbum = (prop: Prop) => {
    const { listSongPlay } = useAppSelector((state) => state.play);
    const dispatch = useAppDispatch();

    const { push } = useRouter();
    return (
        <div className="w-full pt-[20px]">
            <Row justify="start" align="middle">
                {prop.listAlbum && prop.listAlbum.length === 0 ? (
                    <>
                        {mang.map((_, idx) => (
                            <Col xs={8} md={6} xl={4} key={idx}>
                                <div className="w-full p-[4px] tablet:p-[8px] laptop:p-[10px]">
                                    <div className="relative w-full pt-[100%] ">
                                        <div
                                            className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg  `}
                                        >
                                            <Skeleton.Image
                                                className="w-full h-full object-cover "
                                                active={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </>
                ) : (
                    <>
                        {prop.listAlbum &&
                            prop.listAlbum.map((album) => (
                                <Col xs={8} md={6} xl={4} key={album.id}>
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
                                                        title={"Nghe List"}
                                                        mouseLeaveDelay={0}
                                                        overlayInnerStyle={{
                                                            borderRadius: "5px",
                                                        }}
                                                    >
                                                        <BiPlayCircle
                                                            onClick={() => {
                                                                if (
                                                                    album.music
                                                                        .length ===
                                                                    0
                                                                ) {
                                                                    notiWarning(
                                                                        "Album rỗng."
                                                                    );
                                                                    return;
                                                                }
                                                                push("/play");
                                                                dispatch(
                                                                    setSongList(
                                                                        album.music
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
                                                        mouseLeaveDelay={0}
                                                        overlayInnerStyle={{
                                                            borderRadius: "5px",
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
                                                                    album.music
                                                                        .length ===
                                                                    0
                                                                ) {
                                                                    notiWarning(
                                                                        "Album rỗng."
                                                                    );
                                                                    return;
                                                                }
                                                                const listMusicCheck =
                                                                    album.music.filter(
                                                                        (
                                                                            music
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
                                                                push("/play");
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
                                                dispatch(setAlbumId(album.id));
                                                push(
                                                    `/albumdetail/${album.id}`
                                                );
                                            }}
                                            className="text-[#fff] m-0 text-xs tablet:text-base font-bold hiddentitle pt-[8px] hover:text-[#891dee] cursor-pointer"
                                        >
                                            {album.name}
                                        </h1>
                                        {album?.singer && (
                                            <h1
                                                onClick={() => {
                                                    dispatch(
                                                        setSingerId(
                                                            album.singer.id
                                                        )
                                                    );
                                                    push(
                                                        `/singerdetail/${album.singer.id}`
                                                    );
                                                }}
                                                className="text-[#ffffff80] text-xs tablet:text-sm  hiddentitle pt-[3px] hover:text-[#891dee] cursor-pointer"
                                            >
                                                {album.singer.name}
                                            </h1>
                                        )}
                                    </div>
                                </Col>
                            ))}
                    </>
                )}
            </Row>
        </div>
    );
};

export default ListAlbum;
