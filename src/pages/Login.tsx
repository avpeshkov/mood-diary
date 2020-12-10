import React from "react";
import { Link, Redirect } from "react-router-dom";
import { signIn, signInWithGoogle } from "helpers/auth";
import { Wrapper } from "components/Wrapper";
import { Button, Col, Divider, Form, Input, Row, Space, Typography } from "antd";
import { auth } from "services/firebase";
import { css } from "@emotion/css";

const { Title, Text } = Typography;

interface LoginState {
    error: string | null;
}

export class Login extends React.PureComponent<{}, LoginState> {
    state: LoginState = { error: null };

    onFinish = async (values: { email: string; password: string }) => {
        console.log("Success:", values);
        try {
            await signIn(values.email, values.password);
        } catch (error) {
            console.log(error);
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
        if (auth().currentUser) {
            return <Redirect to={{ pathname: "/mood" }} />;
        }
        const { error } = this.state;
        return (
            <Wrapper>
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
                                <Link component={Button} to="/signup">
                                    Sign up
                                </Link>
                            </Row>
                        </Space>
                    </Col>
                </Row>
            </Wrapper>
        );
    }
}
