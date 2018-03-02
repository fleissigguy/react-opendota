import * as React from 'react';
import Loading from '../components/Loading/index';

declare interface AsyncComponentProps {
  moduleProvider: Function;
  props?:object
}

declare interface AsyncComponentState {
  LoadedAsyncComponent?: (React.ComponentClass | null);
}


export class AsyncComponent extends React.Component<AsyncComponentProps, AsyncComponentState> {
  private isLoaded: boolean = false;
  private isMount: boolean = true;

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
          if(this.isMount){
            this.setState({LoadedAsyncComponent: provideData[Object.keys(provideData)[0]]});
          }
      });
    }
  }
  componentWillUnmount(){
    this.isMount = false;
  }

  render() {
    const {LoadedAsyncComponent} = this.state;
    return LoadedAsyncComponent ? <LoadedAsyncComponent {...this.props.props || {}}/> : <Loading text='Page loading'/>;
  }
}
