import * as React from 'react';
import './style.scss';
import { connect } from 'react-redux';

export namespace Totals {
  export interface Props {
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Totals extends React.Component<Totals.Props, Totals.State> {

  componentWillMount(){
  }

  render() {
    return (
      <div className='tab-content overview'>
        ЗДАРОВА Я Totals)))0
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
