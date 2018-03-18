import locationHelper from './locationHelper';

const restaurantData = [
  {
    id: 1,
    name: "McDonald's",
  },
  {
    id: 2,
    name: 'Subway',
  },
];

test('Gives one location', () => {
  expect(locationHelper.getItemLocation(restaurantData, [1])).toBe("McDonald's");
});

test('Gives several locations', () => {
  expect(locationHelper.getItemLocation(restaurantData, [1, 2])).toBe("McDonald's, Subway");
});