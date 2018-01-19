import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink as Link,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import './App.css';

const Links = () => (
  <div>
    <Link exact={true} activeClassName="selected" to="/">
      Home
    </Link>
    <Link
      activeStyle={{ color: 'crimson', fontWeight: 'bold' }}
      to={{ pathname: '/hello/' }}
    >
      Hello
    </Link>
    <Link exact={true} activeClassName="selected" replace={true} to="/world">
      World
    </Link>
    <Link activeClassName="selected" to="/world/Mark">
      World/Mark
    </Link>
    <Link activeClassName="selected" to="/children">
      children
    </Link>
    <Link activeClassName="selected" to="/?name=Mark">
      ?name=Mark
    </Link>
    <Link
      exact={true}
      activeClassName="selected"
      to={{ pathname: '/', search: 'name=Anna', state: undefined }}
    >
      ?name=Anna
    </Link>
    <Link activeClassName="selected" to="/404">
      404
    </Link>
  </div>
);

const Home = (props: RouteComponentProps<{}>) => {
  console.log(props.match, props.location);
  console.log(new URLSearchParams(props.location.search).get('name') || '없음');
  return <h2>Home</h2>;
};
const Hello = () => <h2>Hello</h2>;
const World = () => <h2>World</h2>;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Links />
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route strict={true} path="/hello/" component={Hello} />
            <Route exact={true} path="/world" component={World} />
            <Route
              path="/world/:name"
              render={(props: RouteComponentProps<{ name: string }>) => {
                console.log(props.match.params.name);
                return <h2>{props.match.params.name}</h2>;
              }}
            />
            <Route
              path="/children"
              children={(props: RouteComponentProps<{}>) => {
                return props.match && <h2>{JSON.stringify(props.match)}</h2>;
              }}
            />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
