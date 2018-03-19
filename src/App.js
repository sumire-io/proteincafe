import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import classHelpers from './utils/classHelpers';
import UI from './utils/UI';
import locationHelper from './utils/locationHelper';
import menuGenerator from './utils/menuGenerator';
import ls from 'localstorage-ttl';

import apiUrls from './utils/apiUrls';

import ListView from './components/ListView';
import MealList from './components/MealList';
import MobileControls from './components/MobileControls';
import SundayView from './components/SundayView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: [],
      menuData: [],
      selected: 0,
    };
  }

  fetchMenuData = (areacode, id) => {
    if (areacode <= 5) {
      axios.get(`${apiUrls.restaurant}${id}`).then(restaurantData => {
        let todaysData = _.find(restaurantData.data.data, item =>
          item.date.includes(moment(new Date()).format('DD.MM')),
        );
        // let todaysData = restaurantData.data.data[2];
        todaysData['areacode'] = areacode;
        todaysData['id'] = id;
        let menuData = this.state.menuData;
        menuData = menuData.concat(todaysData);
        ls.set(
          'menuData',
          menuData,
          -new Date() + new Date().setHours(24, 0, 0, 0),
        );
        this.setState({ menuData: menuData });
      });
    }
  };

  handlePlaceClick = event => {
    classHelpers.addClasses(
      document.getElementById('left'),
      'd-none d-md-block',
    );
    classHelpers.removeClasses(
      document.getElementById('right'),
      'd-none d-md-block',
    );

    classHelpers.deHighlightLinks();
    event.target.style.color = '#4CC1FC';

    this.setState({
      selected: parseInt(event.target.id, 10),
    });
  };

  handleBackButtonClick = () => {
    classHelpers.addClasses(
      document.getElementById('right'),
      'd-none d-md-block',
    );
    classHelpers.removeClasses(
      document.getElementById('left'),
      'd-none d-md-block',
    );
    classHelpers.deHighlightLinks();
  };

  componentDidMount() {
    if (ls.get('restaurantData') === null && ls.get('menuData') === null) {
      axios
        .get(apiUrls.restaurants)
        .then(apiData => {
          ls.set(
            'restaurantData',
            apiData.data.data,
            -new Date() + new Date().setHours(24, 0, 0, 0),
          );
          this.setState({ restaurantData: apiData.data.data });
        })
        .then(() => {
          const restaurantData = this.state.restaurantData;
          restaurantData.map(restaurant =>
            this.fetchMenuData(restaurant.areacode, restaurant.id),
          );
        });
    } else {
      this.setState({
        restaurantData: ls.get('restaurantData'),
        menuData: ls.get('menuData'),
      });
    }
  }

  render() {
    UI.checkResize();
    if (UI.getWidth() > 480 && document.getElementById(this.state.selected)) {
      document.getElementById(this.state.selected).style.color = '#4CC1FC';
    }
    const today = new Date();
    const restaurantData = this.state.restaurantData;
    const mealData =
      this.state.menuData.length < 2
        ? [[], [], [], [], []]
        : menuGenerator.generateMenuData(this.state.menuData);
    const mealItemsToShow = mealData[this.state.selected];

    return (
      <div className="container-fluid">
        <div className="row">
          <div id="left" className="col-sm-6">
            <h1>ROHEIINICAFÉ</h1>
            <div id="date">{moment().format('D.M.YYYY')}</div>
            <p className="info-text">
              Roheiinicafé etsii päivän proteiinipitoisimmat annokset Unicafén
              lounaslistoilta.
            </p>
            {today.getDay() !== 0 ? (
              <ListView handlePlaceClick={this.handlePlaceClick} />
            ) : (
              <SundayView />
            )}
          </div>
          <div id="right" className="col-sm-6 d-none d-md-block">
            {mealItemsToShow.length > 0 && (
              <div>
                {UI.getWidth() < 480 && (
                  <MobileControls
                    location={locationHelper.getLocation(this.state.selected)}
                    handleBackButtonClick={this.handleBackButtonClick}
                  />
                )}
                <MealList
                  restaurantData={restaurantData}
                  mealItemsToShow={mealItemsToShow}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
