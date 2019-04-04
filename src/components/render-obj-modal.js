import React from 'react';
import Loader from 'react-loader-spinner';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import ThreeScene from 'components/three-scene';

class OBJModal extends React.Component {
  static propTypes = {
      obj: PropTypes.string,
      closeModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    obj: null,
  }

  state = { loadingOBJ : true };

  onLoad = () => {
    this.setState({ loadingOBJ: false });
  }

  onProgress = p => {
    console.log(p);
  }

  onError = (e) => {
    console.log(e);
  }

  render() {
    const { closeModal, obj } = this.props;
    const { loadingOBJ } = this.state;

    return (
      <Modal
        isOpen={!!obj}
        onRequestClose={closeModal}
        className="modal-model center"
      >
        <img src={obj} />
        {
          loadingOBJ ? (
            <div className="container center">
              <Loader type="Grid" color="#5add95" height={80} width={80} />
            </div>
          ) : (
            <ThreeScene obj={obj} />
          )
        }
      </Modal>
    );
  }
}

export default OBJModal;
