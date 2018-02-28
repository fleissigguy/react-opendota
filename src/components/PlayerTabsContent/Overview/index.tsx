import * as React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export namespace Overview {
  export interface Props {
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Overview extends React.Component<Overview.Props, Overview.State> {

  componentWillMount(){
  }

  render() {
    return (
      <div className='tab-content-overview'>
        ЗДАРОВА Я OVERVIEW)))0
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
