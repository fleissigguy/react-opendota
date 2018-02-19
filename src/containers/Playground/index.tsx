import * as React from 'react';
import * as THREE from 'three';
import './style.scss';
import PageInformer from '../../utils/PageInformer';

export namespace Playground {
  export interface Props {

  }

  export interface State {
    /* empty */
  }
}

// @connect(mapStateToProps, mapDispatchToProps)
export class Playground extends React.Component<Playground.Props, Playground.State> {
  playgroundRef: HTMLDivElement;

  componentWillMount(){
    PageInformer.setPageInfo('Игра', 'Ну что, приступим к битве ?');
  }

  componentDidMount(){
    let camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    let scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    let material = new THREE.MeshNormalMaterial();

    let mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    let renderer = new THREE.WebGLRenderer( { antialias: true } );
    // renderer.setSize( '', window.document.body.offsetHeight );
    // renderer.domElement.style.width = '100%';
    // renderer.domElement.style.height = '100%';
    if(window.document.body.offsetHeight > window.document.body.offsetWidth){
      this.playgroundRef.style.width = '100vw';
      this.playgroundRef.style.height = '100vw';
    }else{
      this.playgroundRef.style.width = '100vh';
      this.playgroundRef.style.height = '100vh';
    }
    this.playgroundRef.appendChild( renderer.domElement );
  }

  render() {
    // const { todos, actions, children } = this.props;
    return (
      <div className='playground' ref={ref=>this.playgroundRef = ref}>
      </div>
    );
  }
}
//
// function mapStateToProps(state: RootState) {
//   return {
//     todos: state.todos
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions as any, dispatch)
//   };
// }
