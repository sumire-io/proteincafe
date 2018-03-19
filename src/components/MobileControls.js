import React from 'react';

class MobileControls extends React.Component {
  render() {
    return (
      <div id="mobile_controls">
        <h3 className="mobile_title">
          <span id="back_button">
            <a className="back" onClick={this.props.handleBackButtonClick}>
              <img src="./images/back_arrow.svg" alt={'Back button'} />
            </a>
          </span>{' '}
          <span id="title">{this.props.location}</span>
        </h3>
      </div>
    );
  }
}

export default MobileControls;
