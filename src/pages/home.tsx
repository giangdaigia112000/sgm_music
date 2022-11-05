import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
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
const Home = () => {
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
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                        },
                        "@0.75": {
                            slidesPerView: 2.5,
                            spaceBetween: 20,
                        },
                        "@1.00": {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        "@1.50": {
                            slidesPerView: 3.5,
                            spaceBetween: 40,
                        },
                    }}
                    slidesPerGroup={1}
                    centeredSlides={true}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    loopedSlides={slide.length}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                >
                    {slide.map((sl, idx) => (
                        <SwiperSlide key={idx}>
                            {/*  eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="rounded-xl cursor-pointer"
                                style={{
                                    boxShadow: "#d1d1d133 0px 2px 8px 0px",
                                }}
                                src={sl.img}
                                alt="slider"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-full  pt-[20px] tablet:pt-[40px] text-lg tablet:text-xl font-bold">
                <h1 className="text-[#fff]">Thể Loại</h1>
            </div>
            <div className="h-[2200px]"></div>
        </div>
    );
};

export default Home;
