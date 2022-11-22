import { Col, Row, Skeleton, Tooltip } from "antd";
import { useRouter } from "next/router";
import {
    BiDotsHorizontalRounded,
    BiListPlus,
    BiMessageSquareAdd,
    BiPlayCircle,
} from "react-icons/bi";
import { Category } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCategoryId } from "../../store/slice/categorySlice";
import { concatSongList, setSongList } from "../../store/slice/playSlice";
import { notiWarning } from "../../utils/notification";
import styles from "./ListCategory.module.scss";

const mang = [1, 2, 3, 4, 5, 6, 7, 8];

interface Prop {
    listcate: Category[];
}

const ListCategory = ({ listcate }: Prop) => {
    const { push } = useRouter();
    const { listSongPlay } = useAppSelector((state) => state.play);
    const { user } = useAppSelector((state) => state.login);

    const dispatch = useAppDispatch();
    return (
        <div className="w-full pt-[20px]">
            <Row justify="start" align="middle">
                {listcate.length === 0 ? (
                    <>
                        {mang.map((_, idx) => (
                            <Col xs={6} md={4} xl={3} key={idx}>
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
                        {listcate.map((cate) => (
                            <Col xs={6} md={4} xl={3} key={cate.id}>
                                <div className="w-full p-[4px] tablet:p-[8px] laptop:p-[10px]">
                                    <div className="relative w-full pt-[100%] ">
                                        <div
                                            className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg  ${styles.cateHover}`}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-full h-full object-cover "
                                                src={`${process.env.HOST_NAME_API}/${cate.avatar_path}`}
                                                alt="Category"
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
                                                                cate.music
                                                                    .length ===
                                                                0
                                                            ) {
                                                                notiWarning(
                                                                    "Danh sách rỗng."
                                                                );
                                                                return;
                                                            }
                                                            push("/play");
                                                            dispatch(
                                                                setSongList(
                                                                    cate.music.filter(
                                                                        (
                                                                            music
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
                                                    mouseLeaveDelay={0}
                                                    overlayInnerStyle={{
                                                        borderRadius: "5px",
                                                    }}
                                                >
                                                    <BiListPlus
                                                        onClick={() => {
                                                            const listId =
                                                                listSongPlay.map(
                                                                    (song) =>
                                                                        song.id
                                                                );
                                                            if (
                                                                cate.music
                                                                    .length ===
                                                                0
                                                            ) {
                                                                notiWarning(
                                                                    "Album rỗng."
                                                                );
                                                                return;
                                                            }
                                                            const listMusicCheck =
                                                                cate.music
                                                                    .filter(
                                                                        (
                                                                            music
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
                                            dispatch(setCategoryId(cate.id));
                                            push(`/categorydetail/${cate.id}`);
                                        }}
                                        className="text-[#fff] m-0 text-xs tablet:text-base font-bold hiddentitle pt-[8px] hover:text-[#891dee] cursor-pointer"
                                    >
                                        {cate.name}
                                    </h1>
                                    <h1 className="text-[#ffffff80] text-xs tablet:text-sm  hiddentitle pt-[3px] ">
                                        {cate.description}
                                    </h1>
                                </div>
                            </Col>
                        ))}
                    </>
                )}
            </Row>
        </div>
    );
};

export default ListCategory;
