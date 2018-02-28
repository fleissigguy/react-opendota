import * as React from 'react';
import './style.scss';
import { connect } from 'react-redux';

export namespace Rankings {
  export interface Props {
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Rankings extends React.Component<Rankings.Props, Rankings.State> {

  componentWillMount(){
  }

  render() {
    return (
      <div className='tab-content overview'>
        ЗДАРОВА Я Rankings)))0
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
