import React from 'react';

import protein from '../utils/proteinExtractor';
import locationHelper from '../utils/locationHelper';

class ListItem extends React.Component {
  render() {
    return (
      <li className="list_item">
        <div className="ateria">
          <h4 className="ateria_name">
            {this.props.itemData.name}{' '}
            <span className="ateria_type">
              ({this.props.itemData.price.name})
            </span>
          </h4>
          <h5 className="ateria_protein">
            Proteiinia {protein.getProtein(this.props.itemData.nutrition)} g /
            100 g
          </h5>
          <h5 className="ateria_place">
            <i>
              {locationHelper.getItemLocation(
                this.props.restaurantData,
                this.props.itemData.id,
              )}
            </i>
          </h5>
        </div>
      </li>
    );
  }
}

export default ListItem;
