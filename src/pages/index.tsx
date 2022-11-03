import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
    const { push } = useRouter();
    useEffect(() => {
        push("/home");
    }, []);

    return <div></div>;
};

export default Home;
