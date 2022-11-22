import { Col, Row, Tooltip } from "antd";
import {
    BiDotsHorizontalRounded,
    BiListPlus,
    BiMessageSquareAdd,
    BiPlayCircle,
} from "react-icons/bi";
import Song from "../Song";
import { Song as Songdetail } from "../../interface";
import styles from "./ListSong.module.scss";

const mang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
interface Prop {
    listSong: Songdetail[];
}
const ListSong = ({ listSong }: Prop) => {
    return (
        <div className="w-full pt-[20px]">
            <Row justify="start" align="middle">
                {listSong.map((song) => (
                    <Col xs={24} md={12} xl={6} key={song.id}>
                        <div className="w-full ">
                            <Song song={song} />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ListSong;
