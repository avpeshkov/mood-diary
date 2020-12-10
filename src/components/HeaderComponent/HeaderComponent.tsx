import React from "react";
import { Link } from "react-router-dom";
import { auth } from "services/firebase";
import "antd/dist/antd.css";
import { Button, Col, Divider, Layout, Row, Typography } from "antd";
import { css } from "@emotion/css";

export const HeaderComponent: React.FC<{ className?: string }> = (props) => {
    return (
        <Layout.Header className={props.className}>
            <Row justify={"space-between"}>
                <Col>
                    <Link component={Typography.Link} className="navbar-brand" to="/">
                        Mood Diary
                    </Link>
                </Col>
                <Col>
                    <Row>
                        {auth().currentUser ? (
                            <>
                                <Typography.Text
                                    className={css`
                                        color: white;
                                    `}
                                >
                                    {auth().currentUser!.email}
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
                                    onClick={() => auth().signOut()}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link component={Button} to="/login">
                                    Sign In
                                </Link>
                                <Divider type={"vertical"} />
                                <Link component={Button} to="/signup">
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
