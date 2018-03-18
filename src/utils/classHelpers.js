const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
};

const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
      ' ',
    );
  }
};

const addClasses = (element, className) => {
  const classNames = className.split(' ');
  classNames.map(name => addClass(element, name));
};

const removeClasses = (element, className) => {
  const classNames = className.split(' ');
  classNames.map(name => removeClass(element, name));
};

const deHighlightLinks = () => {
  const elements = Array.from(document.getElementsByTagName('a'));
  elements.map(el => (el.style.color = ''));
};

export default {
  addClass,
  removeClass,
  addClasses,
  removeClasses,
  deHighlightLinks,
};
