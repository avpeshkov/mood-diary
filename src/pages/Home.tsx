import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "components/Wrapper";
import { Col, Row, Typography } from "antd";
import { css } from "@emotion/css";
import { authorizedCheckHoc } from "helpers/authorizedCheckHoc";

const { Title } = Typography;

class Home extends Component {
    render() {
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
                        <Link className="ant-btn" data-testid="signup-data-test-id" to="/signup">
                            Create New Account
                        </Link>
                        <Title level={5}>or</Title>
                        <Link className="ant-btn" data-testid="login-data-test-id" to="/login">
                            Login to Your Account
                        </Link>
                    </Col>
                </Row>
            </Wrapper>
            // </>
        );
    }
}

export default authorizedCheckHoc(Home);
