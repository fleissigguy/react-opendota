import * as React from 'react';


export namespace SearchUser {
  export interface Props {
    data:SearchResult
  }
}


export default class SearchUser extends React.Component<SearchUser.Props>{



  render(){
    const {avatarfull,personname} = this.props.data;

    return (
      <div className="steam-user">
        <label>{personname}</label>
        <img src={avatarfull} alt="" className="avatar"/>
      </div>
    )
  }
}
