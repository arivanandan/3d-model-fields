import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';

OBJLoader(THREE);

class ThreeScene extends Component{
  static propTypes = {
    obj: PropTypes.object.isRequired,
  }

  componentDidMount(){
    if (!this.props.obj) return;

    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    //ADD SCENE
    this.scene = new THREE.Scene()

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.camera.position.z = 4

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#eee')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    this.THREE = THREE;
    const loader = new this.THREE.OBJLoader();
    loader.load(
    	tjsobj,
    	(object) => { this.scene.add(object); this.renderScene(); },
    	(xhr) => { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
    	(error) => { console.log( 'An error happened', error ); }
    )
  }

  componentWillUnmount(){
    this.mount.removeChild(this.renderer.domElement)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render(){
    if (!this.props.obj) return;
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default ThreeScene
