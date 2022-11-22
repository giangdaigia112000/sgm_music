import { Col, Row, Skeleton, Tooltip } from "antd";
import { useRouter } from "next/router";
import {
    BiDotsHorizontalRounded,
    BiListPlus,
    BiMessageSquareAdd,
    BiPlayCircle,
} from "react-icons/bi";
import { User } from "../../interface";
import { useAppDispatch } from "../../store/hooks";
import { setSingerId } from "../../store/slice/singerSlice";
import styles from "./ListSinger.module.scss";

const mang = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
interface Prop {
    listSinger: User[];
}
const ListSinger = ({ listSinger }: Prop) => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    return (
        <div className="w-full pt-[20px] ">
            <Row justify="start" align="middle">
                {listSinger.length === 0 ? (
                    <>
                        {mang.map((_, idx) => (
                            <Col xs={6} md={4} xl={3} key={idx}>
                                <div className="w-full p-[4px] tablet:p-[8px] laptop:p-[10px] cursor-pointer">
                                    <div className="relative w-full pt-[100%] ">
                                        <div
                                            className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg `}
                                        >
                                            <Skeleton.Image
                                                className="w-full h-full object-cover rounded-full "
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
                        {listSinger.map((singer) => (
                            <Col xs={6} md={4} xl={3} key={singer.id}>
                                <div
                                    onClick={() => {
                                        dispatch(setSingerId(singer.id));
                                        push(`/singerdetail/${singer.id}`);
                                    }}
                                    className="w-full p-[4px] tablet:p-[8px] laptop:p-[10px] cursor-pointer"
                                >
                                    <div className="relative w-full pt-[100%] ">
                                        <div
                                            className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg `}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-full h-full object-cover rounded-full"
                                                src={`${process.env.HOST_NAME_STREAM}/image/${singer.avatar}`}
                                                alt="Album"
                                            />
                                        </div>
                                    </div>
                                    <h1 className="text-[#fff] text-xs tablet:text-base font-bold text-center pt-[15px] hover:text-[#891dee] cursor-pointer">
                                        {singer.name}
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

export default ListSinger;
