import * as React from 'react';
import './style.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import h337 from 'heatmap.js';

const mapImage = require('../../../assets/dota2map.png');

export namespace Wardmap {
  export interface Props {
    playerId?: string
  }

  export interface State {
    /* empty */
  }
}

function scaleAndExtrema(points, scalef, max, shift) {
  const newPoints = points.map(p => ({
    x: Math.floor(p.x * scalef),
    y: Math.floor(p.y * scalef),
    value: p.value + (shift || 0),
  }));
  const vals = points.map(p => p.value);
  const localMax = Math.max.apply(null, vals);
  return {
    min: 0,
    max: max || localMax,
    data: newPoints,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export class Wardmap extends React.Component<Wardmap.Props, Wardmap.State> {
  isMount = true;
  observerWardmapRef: HTMLDivElement;
  sentryWardmapRef: HTMLDivElement;
  observerWardmap;
  sentryWardmap;

  unpackWardmapData(data) {
    let results = [];
    console.log(Object.keys(data).forEach((x) =>
      Object.keys(data[x]).forEach((y) => (
        results.push({
          x: +x - 64,
          y: 128 - (+y - 64),
          value: data[x][y],
        })
      ))
    ));
    return results;

  }

  componentDidMount() {
    axios.get(`https://api.opendota.com/api/players/${this.props.playerId}/wardmap`).then(({data}) => {
      if (this.isMount) {
        const width = this.observerWardmapRef.offsetWidth;
        this.observerWardmap = h337.create({
          container: this.observerWardmapRef,
          radius: 15 * (width / 600),
        });
        this.sentryWardmap = h337.create({
          container: this.sentryWardmapRef,
          radius: 15 * (width / 600),
        });
        this.observerWardmap.setData(
          scaleAndExtrema(this.unpackWardmapData(data.obs),
            width / 127,
            null,
            25));
        this.sentryWardmap.setData(
          scaleAndExtrema(this.unpackWardmapData(data.sen),
            width / 127,
            null,
            25));
        //points = unpackWardmapData(data.obs)
        //points = unpackWardmapData(data.sen)
      }
    })
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  render() {
    return (
      <div className='tab-content-wardmap'>
        <div className="wardmap observer" ref={ref => this.observerWardmapRef = ref}>
          <img src={mapImage} alt=""/>
        </div>
        <div className="wardmap sentry" ref={ref => this.sentryWardmapRef = ref}>
          <img src={mapImage} alt=""/>
        </div>
      </div>
    );
  }//
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: null
  };
}
