import * as React from 'react';
import './style.scss';

export namespace SearchUser {
  export interface Props {
    data:SearchResult
  }
}


export default class SearchUser extends React.Component<SearchUser.Props>{



  render(){
    const {avatarfull,personaname} = this.props.data;

    return (
      <div className="search-user">
        <img src={avatarfull} alt="" className="avatar"/>
        <label className="name">{personaname}</label>
      </div>
    )
  }
}
