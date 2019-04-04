import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 import Loader from 'react-loader-spinner';

import RenderCategory from 'components/render-model-category';

import ThreeScene from './three-scene';

import { fetchModelList, getModelCategories } from 'actions/model';

import 'styles/App.css';

class App extends Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    fetchModelList: PropTypes.func.isRequired,
    getModelCategories: PropTypes.func.isRequired,
  };

  state = { initialFetch: true, fetching: false };

  componentDidMount() {
    setTimeout(() => { this.props.fetchModelList(); }, 2000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.model && this.props.model.categories && this.props.model.categories.length !==
      prevProps.model.categories.length) {
        this.setState({ initialFetch: false });
        this.getModelCategories();
      }
    if (this.props.model.categoriesPaginated &&
        this.props.model.categoriesPaginated.length !== prevProps.model.categoriesPaginated.length) {
      this.setState({ fetching: false });
    }
  }

  getModelCategories = (pageNo) => {
    this.setState(
      { fetching: true },
      () => setTimeout(() => { this.props.getModelCategories({ pageNo }); }, 2000)
    );
  }

  render() {
    const { initialFetch, fetching } = this.state;
    const { categoriesPaginated = [], categoriesPaginatedMeta = {} } = this.props.model;
    const { lastFetched, totalPages } = categoriesPaginatedMeta;

    return <ThreeScene />

    return (
      <div className="container center">
        {
          initialFetch ? (
            <div className="container center">
              <Loader type="Grid" color="#5add95" height={80} width={80} />
            </div>
          ) : (
            <div className="content-container">
              <div className="header">
                3D Models
              </div>
              {categoriesPaginated.map((category, i) => <RenderCategory category={category} categoryIndex={i} />)}
              {
                (() => {
                  if (fetching) return (
                    <div className="center">
                      <Loader type="ThreeDots" color="#5add95" height={80} width={80} />
                    </div>
                  );

                  if (lastFetched < totalPages) return (
                    <div className="center">
                      <div className="button-load-categories" onClick={() => this.getModelCategories(lastFetched + 1)}>
                        Load More
                      </div>
                    </div>
                  );

                  return null;
                })()
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(
  ({ model }) => ({ model }),
  { fetchModelList, getModelCategories }
)(App);
