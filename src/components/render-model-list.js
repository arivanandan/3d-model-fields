import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import RenderModel from 'components/render-model';

import { getModels } from 'actions/model';

import { MODELS_PAGINATION_SIZE } from 'constants/app';

const MODELS_DISPLAYED = 3;

const SLIDER_SETTINGS = {
   dots: false,
   infinite: false,
   slidesToShow: MODELS_DISPLAYED,
   slidesToScroll: 2,
 };

class RenderModelList extends React.Component {
  static propTypes = {
    categoryIndex: PropTypes.number.isRequired,
    models: PropTypes.array.isRequired,
    modelsMeta: PropTypes.object.isRequired,
    getModels: PropTypes.func.isRequired,
  }

  state = { fetching: false };

  comonentDidUpdate(prevProps) {
    if (this.props.models.length !== prevProps.models.length)
      this.setState({ fetching: false });
  }

  maybeLoadMore = (modelIndex, pageNo) => {
    const { categoryIndex, modelsMeta: { lastFetched, totalPages } } = this.props;

    if (pageNo > totalPages) return;
    if (modelIndex * MODELS_PAGINATION_SIZE < lastFetched - MODELS_PAGINATION_SIZE - 1) return;

    this.setState(
      { fetching: true },
      () => setTimeout(
        () => { this.props.getModels({ categoryIndex, pageNo }); },
        2000,
      ));
  }

  render() {
    const { categoryIndex, models = [], modelsMeta = {} } = this.props;
    const { fetching } = this.state;

    const modelsWithLoader = [...models,
      fetching
        ? { renderLoader: <div className="center"><Loader key={`loader-${categoryIndex}`} type="ThreeDots" color="#5add95" height={80} width={80} /></div> }
        : {}
    ];

    return (
      <Slider
        {...SLIDER_SETTINGS}
        className="container-model-row"
        afterChange={(modelIndex) => this.maybeLoadMore(modelIndex, modelsMeta.lastFetched + 1)}
      >
        {modelsWithLoader.map(model => model.renderLoader || <RenderModel model={model} />)}
      </Slider>
    );
  }
}

export default connect(null, { getModels })(RenderModelList);
