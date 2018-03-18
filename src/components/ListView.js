import React from 'react';

class ListView extends React.Component {
  render() {
    return (
      <div>
        <ul id="restaurant_list">
          <li>
            <a id="0" className="trigger" onClick={this.props.handlePlaceClick}>
              KESKUSTA
            </a>
          </li>
          <li>
            <a id="1" className="trigger" onClick={this.props.handlePlaceClick}>
              KUMPULA
            </a>
          </li>
          <li>
            <a id="2" className="trigger" onClick={this.props.handlePlaceClick}>
              MEILAHTI
            </a>
          </li>
          <li>
            <a id="4" className="trigger" onClick={this.props.handlePlaceClick}>
              VIIKKI
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default ListView;
