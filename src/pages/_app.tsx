// ----import lib-----
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";
import "react-h5-audio-player/lib/styles.css";
// ----import file-----
import "../styles/globals.css";
import "../styles/globals.scss";
import store from "../store";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import AuthenticatedRoute from "../contexts/authenticatedRoute";
import { AuthProvider } from "../contexts/auth";
import PlayAudio from "../components/PlayAudio";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>Sgm Music</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/sgm.png" />
            </Head>
            <AuthProvider>
                {/* <AuthenticatedRoute pathAfterFailure={"/login"}> */}
                <div className="container-page">
                    <Navbar />
                    <div className="body">
                        <Header />
                        <div className="body-content px-[10px] laptop:px-[50px] pt-[10px] relative">
                            <Component {...pageProps} />
                        </div>
                        <PlayAudio />
                    </div>
                </div>
                {/* </AuthenticatedRoute> */}
            </AuthProvider>
        </Provider>
    );
}

export default MyApp;
