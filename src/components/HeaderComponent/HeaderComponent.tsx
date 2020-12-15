import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Button, Col, Divider, Layout, Row, Typography } from "antd";
import { css } from "@emotion/css";
import firebaseApi from "services/firebase";

/**
 *   Компонент недера используемый на всех страницах
 */
export const HeaderComponent: React.FC<{ className?: string }> = (props) => {
    return (
        <Layout.Header className={props.className}>
            <Row justify={"space-between"}>
                <Col>
                    <Link data-testid="home-link-test-id" className="navbar-brand" to="/">
                        Mood Diary
                    </Link>
                </Col>
                <Col>
                    <Row>
                        {firebaseApi.auth().currentUser ? (
                            <>
                                <Typography.Text
                                    className={css`
                                        color: white;
                                    `}
                                >
                                    {firebaseApi.auth().currentUser!.email}
                                </Typography.Text>
                                <Divider
                                    className={css`
                                        color: white;
                                    `}
                                    type={"vertical"}
                                />
                                <Button
                                    className={css`
                                        align-self: center;
                                    `}
                                    onClick={() => firebaseApi.auth().signOut()}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link className="ant-btn" to="/login">
                                    Sign In
                                </Link>
                                <Divider type={"vertical"} />
                                <Link className="ant-btn" to="/signup">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </Row>
                </Col>
            </Row>
        </Layout.Header>
    );
};
