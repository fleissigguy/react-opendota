import * as React from 'react';
import './style.scss';
import { connect } from 'react-redux';

export namespace Peers {
  export interface Props {
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Peers extends React.Component<Peers.Props, Peers.State> {

  componentWillMount(){
  }

  render() {
    return (
      <div className='tab-content overview'>
        ЗДАРОВА Я Peers)))0
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: null
  };
}
