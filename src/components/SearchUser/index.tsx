import * as React from 'react';
import './style.scss';
import * as moment from 'moment';
moment.locale('ru');

export namespace SearchUser {
  export interface Props {
    data:SearchResult
  }
}


export default class SearchUser extends React.Component<SearchUser.Props>{



  render(){
    const {avatarfull,personaname,last_match_time} = this.props.data;
    return (
      <div className="search-user">
        <img src={avatarfull} alt="" className="avatar"/>
        <label className="name">{personaname}</label>
        {moment(last_match_time).isValid() && <label className="last-match-time">{moment(last_match_time).fromNow()}</label>}
      </div>
    )
  }
}
