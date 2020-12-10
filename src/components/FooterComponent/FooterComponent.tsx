import React from "react";
import { Layout } from "antd";

export const FooterComponent: React.FC<{ className?: string }> = (props) => {
    return (
        <Layout.Footer className={props.className} style={{ textAlign: "center" }}>
            &copy; Mood diary 2020
        </Layout.Footer>
    );
};
