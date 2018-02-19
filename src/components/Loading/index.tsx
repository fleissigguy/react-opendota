import * as React from 'react';

export namespace NLoading {
  export interface Props {
    text?: string;
  }
}

export default class Loading extends React.Component<NLoading.Props>{

  constructor(props){
    super(props);
  }


  render(){

    return (
      <div className="loading">
        {this.props.text}
      </div>
    )
  }
}
