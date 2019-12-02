import _ from 'lodash';
import protein from './proteinExtractor';

const generateMenuData = menuData => {
  // Menu array
  let menu = [[], [], [], [], []];

  if (menuData.length < 1) {
    return;
  }

  let allItemsForToday = [];
  menuData.map(items => {
    items.data.map(item => {
      item['areacode'] = items.areacode;
      item['id'] = items.id;
      return item;
    });
    return (allItemsForToday = allItemsForToday.concat(items.data));
  });

  allItemsForToday = allItemsForToday.filter(
    item =>
      item.price.name === 'Päivän lounas' ||
      item.price.name === 'Päivän erikoinen' ||
      item.price.name === 'Kaivopiha Päivän lounas' ||
      item.price.name === 'Kaivopiha Päivän erikoinen'
  );

  for (let i = 1; i <= 5; i++) {
    let menuItemsForArea = allItemsForToday.filter(item => item.areacode === i);
    if (menuItemsForArea.length > 0) {
      let items = _.sortBy(menuItemsForArea, [
        item => protein.getProtein(item.nutrition),
      ]).reverse();
      items = _.uniqBy(items, 'name');
      menu[i - 1] = items.map(item => {
        let results = menuItemsForArea.filter(i => i.name === item.name);
        if (results.length > 1) {
          item.id = results.map(result => result.id);
        }
        return item;
      });
    }
  }

  return menu;
};

export default {
  generateMenuData,
};
