import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import MainLayout from './component/Main';
import MovieLayout from './component/MovieComponent';


class App extends Component {
  render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/search" component={MainLayout} />
          <Route path="/movieInfo" component={MovieLayout} />

					<Redirect from="/*" to="/search" exact />
					<Route render={() => <h1>404</h1>} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
