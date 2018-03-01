import * as React from 'react';
import './style.scss';
import { connect } from 'react-redux';

export namespace Wardmap {
  export interface Props {
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Wardmap extends React.Component<Wardmap.Props, Wardmap.State> {

  componentWillMount(){
  }

  render() {
    return (
      <div className='tab-content-wardmap'>
        <img src={require('../../../assets/dota2map.png')} alt="" className="wardmap sentry"/>
        <img src={require('../../../assets/dota2map.png')} alt="" className="wardmap observer"/>
      </div>
    );
  }//
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
