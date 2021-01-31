import React from "react";
import { FooterComponent } from "components/FooterComponent";
import { HeaderComponent } from "components/HeaderComponent";
import { Layout } from "antd";
import { css, cx } from "@emotion/css";

/**
 * Компонента обертся для страниц
 */
export const ScreenWrapper: React.FC<{}> = (props) => {
    return (
        <Layout
            className={css`
                height: 100%;
            `}
        >
            <HeaderComponent
                className={css`
                    height: 64px;
                `}
            />
            <Layout.Content
                className={css`
                    height: calc(100% - 119px);
                `}
            >
                {props.children}
            </Layout.Content>
            <FooterComponent
                className={css`
                    height: 40px;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                `}
            />
        </Layout>
    );
};
