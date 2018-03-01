import * as React from 'react';
import './style.scss';

export class Map extends React.Component {
  iframe: HTMLIFrameElement;

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    document.body.classList.add('map-showed');
  }

  componentWillUnmount(){
    document.body.classList.remove('map-showed');
  }

  componentDidMount(){
  }



  render() {
    return (
      <div className="page map">
        <iframe src="https://devilesk.com/dota2/apps/drawablemap" className='drawable-map'/>
        <span className="thanks">
          Карта создана <a href="https://github.com/devilesk" className="github-user">devilesk</a> и является его разработкой
        </span>
      </div>
    );
  }
}


