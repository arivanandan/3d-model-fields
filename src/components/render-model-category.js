import React from 'react';
import PropTypes from 'prop-types';

import RenderModelList from 'components/render-model-list';

class RenderCategory extends React.Component {
  static propTypes = {
    category: PropTypes.shape({ name: PropTypes.string,
      models: PropTypes.array,
      modelsMeta: PropTypes.object }).isRequired,
  }

  render() {
    const { category, ...modelProps1 } = this.props;
    const { name, categoryIndex, ...modelProps2 } = category;
    return (
      <div className="container-category" key={`category-${categoryIndex}-${name}`}>
        <div className="container-category-title">
          {name}
        </div>
        <RenderModelList {...modelProps1} {...modelProps2} />
      </div>
    );
  }
}

export default RenderCategory;
