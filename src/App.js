import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/ProtectedRoute';
import NavBar from './components/NavBar';
import Movies from './containers/Movies';
import MovieForm from './components/MovieForm';
import Rentals from './components/Rentals';
import Customers from './components/Customers';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Logout from './components/Logout';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={user} />
				<main className="container">
					<Switch>
						<Route path="/login" render={(props) => <LoginForm {...props} />} />
						<Route path="/logout" component={Logout} />
						<Route path="/register" render={(props) => <RegisterForm {...props} />} />
						<ProtectedRoute path="/movies/:id" component={MovieForm} />
						<Route path="/movies" exact render={(props) => <Movies {...props} user={user} />} />
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" exact to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
