import React from "react";
import { Link } from "react-router-dom";
import authHelpers from "utils/auth";
import { ScreenWrapper } from "components/ScreenWrapper";
import { Button, Col, Divider, Form, Input, Row, Space, Typography } from "antd";
import { css } from "@emotion/css";
import { AuthorizedCheckHoc } from "src/components";

const { Title, Text } = Typography;

interface SignUpState {
    error: string | null;
}

/**
 Страница заведения нового аккаунта
 */
class SignUp extends React.Component<{}, SignUpState> {
    state: SignUpState = { error: null };

    onFinish = async (values: { email: string; password: string }) => {
        try {
            await authHelpers.signUp(values.email, values.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    googleSignIn = async () => {
        try {
            await authHelpers.signInWithGoogle();
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const { error } = this.state;
        return (
            <ScreenWrapper>
                <Row justify={"center"} id="signup-page-id">
                    <Col>
                        <Space size={"large"} direction={"vertical"}>
                            <Title level={3}>Sign Up to Mood Diary</Title>
                            <Space
                                size={"middle"}
                                direction={"vertical"}
                                className={css`
                                    width: 100%;
                                `}
                            >
                                <Text>Fill in the form below to create an account.</Text>
                                <Form name="signup" initialValues={{}} onFinish={this.onFinish}>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your email!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                                {error && <Text type="danger">{error}</Text>}
                            </Space>
                            <Divider type={"vertical"} />
                            <Space
                                size={"middle"}
                                direction={"vertical"}
                                className={css`
                                    width: 100%;
                                `}
                            >
                                <Row justify={"space-between"}>
                                    <Text>Already have an account?</Text>
                                    <Link className="ant-btn" to="/login">
                                        Login
                                    </Link>
                                </Row>
                                <Row justify={"center"}>
                                    <Col
                                        className={css`
                                            text-align: center;
                                            flex-direction: column;
                                            display: flex;
                                        `}
                                    >
                                        <Text>Or</Text>
                                        <Button onClick={this.googleSignIn} typeof="button">
                                            Sign up with Google
                                        </Button>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </ScreenWrapper>
        );
    }
}

export default AuthorizedCheckHoc(SignUp);
