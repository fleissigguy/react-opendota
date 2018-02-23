import * as React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { autobind } from 'core-decorators';

moment.locale('ru');

export namespace SearchUser {
  export interface Props {
    data: ShortUserInfo,
    handleClick?: Function
  }
}


export default class SearchUser extends React.Component<SearchUser.Props> {

  constructor(props){
    super(props);
  }

  @autobind
  handleClick(e){
    e.preventDefault();
    this.props.handleClick(this.props.data);
  }

  render() {
    const {avatarfull, personaname, account_id, last_match_time} = this.props.data;
    return (
        <div className="search-user">
          <Link to={`/user/${account_id}`} onClick={this.handleClick}>
          <img src={avatarfull} alt="" className="avatar"/>
          <label className="name">{personaname}</label>
          {moment(last_match_time).isValid() &&
          <label className="last-match-time">{moment(last_match_time).fromNow()}</label>}
          </Link>
        </div>
    )
  }
}
