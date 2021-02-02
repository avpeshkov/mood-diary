import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./screens/Home";
import firebaseApi from "./utils/firebase";
import MainScreen from "./screens/MainScreen";
import SignUp from "./screens/Signup";
import Login from "./screens/Login";
import { Provider } from "react-redux";
import { store } from "./store";

const PrivateRoute = <P extends object>({ Component, authenticated, path }: { Component: React.ComponentType<P>; authenticated: boolean; path: string }) => {
    return (
        <Route
            path={path}
            render={(props) => (authenticated ? <Component {...(props as P)} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />)}
        />
    );
};

const PublicRoute = <P extends object>({ Component, authenticated, path }: { Component: React.ComponentType<P>; authenticated: boolean; path: string }) => {
    return <Route path={path} render={(props) => (!authenticated ? <Component {...(props as P)} /> : <Redirect to="/mood" />)} />;
};

interface AppState {
    authenticated: boolean;
    loading: boolean;
}

class App extends React.Component<{}, AppState> {
    state: AppState = {
        authenticated: false,
        loading: true,
    };

    componentDidMount() {
        firebaseApi.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false,
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                });
            }
        });
    }

    render() {
        const { loading, authenticated } = this.state;
        const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";
        if (loading) {
            return <h2>Loading...</h2>;
        } else {
            return (
                <Provider store={store}>
                    <Switch>
                        <Route exact path={`${PUBLIC_PATH}`} component={Home} />
                        <PrivateRoute path={`${PUBLIC_PATH}mood`} authenticated={authenticated} Component={MainScreen} />
                        <PublicRoute path={`${PUBLIC_PATH}signup`} authenticated={authenticated} Component={SignUp} />
                        <PublicRoute path={`${PUBLIC_PATH}login`} authenticated={this.state.authenticated} Component={Login} />
                        <Route path="*">
                            <Redirect to={{ pathname: `${PUBLIC_PATH}` }} />
                        </Route>
                    </Switch>
                </Provider>
            );
        }
    }
}

export default App;
