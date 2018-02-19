import * as React from 'react';
import * as TodoActions from '../../actions/todos';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import PageInformer from "../../utils/PageInformer";

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: TodoItemData[];
    actions: typeof TodoActions;
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {

  componentWillMount(){

    PageInformer.setPageInfo('Главная', '');
  }

  render() {
    const { todos, actions, children } = this.props;
    return (
      <div className='page app'>
        <form>
          <i className="fab fa-steam"></i>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions as any, dispatch)
  };
}
