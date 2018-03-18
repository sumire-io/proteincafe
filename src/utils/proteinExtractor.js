const getProtein = nutrition => {
  if (nutrition !== null) {
    const match = nutrition.match(/(?:proteiinia )([0-9]{1,2})/);
    return match === null ? 0 : parseInt(match[1], 10);
  } else {
    return 0;
  }
};

export default {
  getProtein,
};
