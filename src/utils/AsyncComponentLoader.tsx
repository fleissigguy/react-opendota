import * as React from 'react';
import Loading from '../components/Loading/index';

declare interface AsyncComponentProps {
  moduleProvider: Function;
}

declare interface AsyncComponentState {
  LoadedAsyncComponent?: (React.ComponentClass | null);
}


export class AsyncComponent extends React.Component<AsyncComponentProps, AsyncComponentState> {
  private isLoaded: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      LoadedAsyncComponent: null
    };
  }

  componentWillMount() {
    if (!this.isLoaded) {
      this.isLoaded = true;
      this.props.moduleProvider().then((provideData: any) => {
        this.setState({LoadedAsyncComponent: provideData[Object.keys(provideData)[0]]});
      });
    }
  }

  render() {
    const {LoadedAsyncComponent} = this.state;
    return LoadedAsyncComponent ? <LoadedAsyncComponent/> : <Loading text='Page loading'/>;
  }
}
