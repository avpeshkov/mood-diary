import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Wrapper } from "components/Wrapper";
import { Button, Col, Row, Typography } from "antd";
import { css } from "@emotion/css";
import { auth } from "services/firebase";

const { Title } = Typography;
export default class Home extends Component {
    render() {
        if (auth().currentUser) {
            return <Redirect to={{ pathname: "/mood" }} />;
        }
        return (
            <Wrapper>
                <Row justify={"center"}>
                    <Col
                        className={css`
                            text-align: center;
                        `}
                    >
                        <Title level={2}>Welcome to Mood Diary</Title>
                        <Title level={3}>A great place to learn more about yourself</Title>
                        <Link component={Button} to="/signup">
                            Create New Account
                        </Link>
                        <Title level={5}>or</Title>
                        <Link component={Button} to="/login">
                            Login to Your Account
                        </Link>
                    </Col>
                </Row>
            </Wrapper>
        );
    }
}
