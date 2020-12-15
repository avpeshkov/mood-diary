import React from "react";
import { Link } from "react-router-dom";
import { signIn, signInWithGoogle } from "helpers/auth";
import { PageWrapper } from "components/Wrapper";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import { css } from "@emotion/css";
import { authorizedCheckHoc } from "helpers/authorizedCheckHoc";

const { Title, Text } = Typography;

interface LoginState {
    error: string | null;
}

/**
 Страница введения логина
 */
class Login extends React.PureComponent<{}, LoginState> {
    state: LoginState = { error: null };

    onFinish = async (values: { email: string; password: string }) => {
        try {
            await signIn(values.email, values.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    googleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const { error } = this.state;
        return (
            <PageWrapper>
                <Row justify={"center"}>
                    <Col>
                        <Space size={"large"} direction={"vertical"}>
                            <Title level={3}>Login to Mood Diary</Title>
                            <Space size={"middle"} direction={"vertical"}>
                                <Text>Fill in the form below to login to your account.</Text>
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
                                    {error && <Text type="danger">{error}</Text>}
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
                                </Form>
                            </Space>
                            <Row justify={"space-between"}>
                                <Text>Don&apos;t have an account?</Text>
                                <Link className="ant-btn" to="/signup">
                                    Sign up
                                </Link>
                            </Row>
                        </Space>
                    </Col>
                </Row>
            </PageWrapper>
        );
    }
}

export default authorizedCheckHoc(Login);
