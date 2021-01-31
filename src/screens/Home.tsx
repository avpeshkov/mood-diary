import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ScreenWrapper } from "components/ScreenWrapper";
import { Col, Row, Typography } from "antd";
import { css } from "@emotion/css";
import { AuthorizedCheckHoc } from "src/components";

const { Title } = Typography;

/**
 Домашняя страница, на которую ведет корень приложения
 */
class Home extends Component {
    render() {
        return (
            <ScreenWrapper>
                <Row justify={"center"} id="home-screen-id">
                    <Col
                        className={css`
                            text-align: center;
                        `}
                    >
                        <Title level={2}>Welcome to Mood Diary</Title>
                        <Title level={3}>A great place to learn more about yourself</Title>
                        <Link id="signup-link-id" className="ant-btn" data-testid="signup-data-test-id" to="/signup">
                            Create New Account
                        </Link>
                        <Title level={5}>or</Title>
                        <Link id="login-link-id" className="ant-btn" data-testid="login-data-test-id" to="/login">
                            Login to Your Account
                        </Link>
                    </Col>
                </Row>
            </ScreenWrapper>
        );
    }
}

export default AuthorizedCheckHoc(Home);
