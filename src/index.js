import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Loader from 'react-loader-spinner';

import configureStore from 'store/configure-store';

import 'styles/index.css';

import App from './App';

class Root extends React.Component {
  state = { storeCreated: false }

  componentDidMount() {
    configureStore().then(({ store }) => { this.setState({ store, storeCreated: true }); });
  }

  render() {
    const { storeCreated, store } = this.state;

    if (!storeCreated) return (
      <div className="container center">
        <Loader type="Grid" color="#5add95" height={80} width={80} />
      </div>
    );

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
