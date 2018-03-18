import _ from 'lodash';

const getLocation = id => {
  const locations = ['KESKUSTA', 'KUMPULA', 'MEILAHTI', 'TEST', 'VIIKKI'];
  return locations[id];
};

const getItemLocation = (restaurantData, id) => {
  let IDs = [];
  let locations = [];
  IDs = IDs.concat(id);
  IDs.map(id => locations.push(_.find(restaurantData, ['id', id]).name));
  return locations.join(', ');
};

export default {
  getLocation,
  getItemLocation,
};
