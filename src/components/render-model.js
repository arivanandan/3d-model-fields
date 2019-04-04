import React from 'react';
import PropTypes from 'prop-types';

import MTLModal from 'components/render-mtl-modal';

import NoThumbnail from 'resources/no-thumb.png';

class Model extends React.Component {
  static propTypes = {
    model: PropTypes.shape({ thumb: PropTypes.string, mtl: PropTypes.string }).isRequired,
  }

  state = { openMTL: null };

  onClick = (mtl) => {
    this.setState({ openMTL: mtl });
  }

  closeMTLModal = () => {
    this.setState({ openMTL: null });
  }

  render() {
    const { thumb = NoThumbnail, mtl } = this.props.model;
    const { openMTL } = this.state;

    return (
      <React.Fragment key={thumb}>
        <div className="container-model-thumnail">
          <img src={thumb} className="model-thumbnail" onClick={() => this.onClick(thumb)} />
        </div>
        <MTLModal mtl={openMTL} closeModal={this.closeMTLModal} />
      </React.Fragment>
    );
  }
}


export default Model;
