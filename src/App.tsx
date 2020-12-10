import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { auth } from "services/firebase";
import { SignUp } from "pages/Signup";
import { Login } from "pages/Login";
import { MainScreen } from "pages/MainScreen";
import Home from "pages/Home";

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
        auth().onAuthStateChanged((user) => {
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
        if (loading) {
            return <h2>Loading...</h2>;
        } else {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <PrivateRoute path="/mood" authenticated={authenticated} Component={MainScreen} />
                        <PublicRoute path="/signup" authenticated={authenticated} Component={SignUp} />
                        <PublicRoute path="/login" authenticated={this.state.authenticated} Component={Login} />
                    </Switch>
                </Router>
            );
        }
    }
}

export default App;
