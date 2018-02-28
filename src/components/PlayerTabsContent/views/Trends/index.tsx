import * as React from 'react';
import './style.scss';
import { connect } from 'react-redux';

export namespace Trends {
  export interface Props {
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Trends extends React.Component<Trends.Props, Trends.State> {

  componentWillMount(){
  }

  render() {
    return (
      <div className='tab-content overview'>
        ЗДАРОВА Я Trends)))0
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
