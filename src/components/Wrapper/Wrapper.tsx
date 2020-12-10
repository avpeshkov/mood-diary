import React from "react";
import { FooterComponent } from "components/FooterComponent";
import { HeaderComponent } from "components/HeaderComponent";
import { Layout } from "antd";
import { css, cx } from "@emotion/css";

export const Wrapper: React.FC<{}> = (props) => {
    return (
        <Layout
            className={css`
                height: 100vh;
            `}
        >
            <HeaderComponent
                className={css`
                    height: 64px;
                `}
            />
            <Layout.Content
                className={css`
                    height: calc(100vh - 114px);
                `}
            >
                {props.children}
            </Layout.Content>
            <FooterComponent
                className={css`
                    height: 55px;
                `}
            />
        </Layout>
    );
};
