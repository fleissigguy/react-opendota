import * as React from 'react';
import './style.scss';
import { connect } from 'react-redux';

export namespace Heroes {
  export interface Props {
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Heroes extends React.Component<Heroes.Props, Heroes.State> {

  componentWillMount(){
  }

  render() {
    return (
      <div className='tab-content-overview'>
        ЗДАРОВА Я Heroes)))0
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
