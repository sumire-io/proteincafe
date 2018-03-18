import classHelpers from './classHelpers';

test('Adds a class', () => {
  let el = document.createElement("div");
  classHelpers.addClass(el, "test");
  expect(el.classList).toContain("test");
});

test('Removes a class', () => {
  let el = document.createElement("div");
  classHelpers.addClass(el, "remove");
  classHelpers.removeClass(el, "remove");
  expect(el.classList).not.toContain("remove");
});