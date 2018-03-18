import React from 'react';

import ListItem from './ListItem';

class MealList extends React.Component {
  render() {
    return (
      <div>
        <ol className="list">
          {this.props.mealItemsToShow.slice(0, 5).map((mealItem, i) => {
            return (
              <ListItem
                key={i}
                restaurantData={this.props.restaurantData}
                itemData={mealItem}
              />
            );
          })}
        </ol>
      </div>
    );
  }
}

export default MealList;
