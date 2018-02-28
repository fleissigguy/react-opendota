import * as React from 'react';
import './style.scss';
import { connect } from 'react-redux';

export namespace Records {
  export interface Props {
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Records extends React.Component<Records.Props, Records.State> {

  componentWillMount(){
  }

  render() {
    return (
      <div className='tab-content overview'>
        ЗДАРОВА Я Records)))0
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
