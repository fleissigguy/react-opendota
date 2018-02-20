import * as React from 'react';


export namespace SteamUser {
  export interface Props {
    data:SearchResult
  }
}


export default class SteamUser extends React.Component<SteamUser.Props>{



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
