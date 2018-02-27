import * as React from 'react';
import './style.scss';
import {TagCloud} from "react-tagcloud";
import axios from 'axios';


export namespace PlayerWordCloud {
  export interface Props {
    playerId: number
  }

  export interface State {
    words: Array<Word>
  }
}

declare interface Word {
  value: string,
  count: number
}


export default class PlayerWordCloud extends React.Component<PlayerWordCloud.Props> {
  state = {
    words: []
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.playerId) {
      axios.get(`https://api.opendota.com/api/players/${this.props.playerId}/wordcloud`).then((response) => {
        this.setState({
          words: Object.keys(response.data.my_word_counts).map(key => ({
            value: key,
            count: response.data.my_word_counts[key]
          }))
        })
      });
    }
  }

  render() {
    if (!this.props.playerId || !this.state.words.length) {
      return null;
    }
    return (
      <TagCloud minSize={15}
                maxSize={87}
                colorOptions={{luminosity: 'light'}}
                className={`tag-cloud ${this.state.words.length && 'show'}`}
                tags={this.state.words}
                style={this.state.words.length < 30 ? {
                  left: '32.5%',
                  width: '35%'
                } : this.state.words.length < 470 && {
                  left: '20%',
                  width: '60%'
                } || null}
      />
    )
  }
}
