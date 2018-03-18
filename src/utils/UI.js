const hide = el => {
  let element = document.getElementById(el);
  if (element !== null) {
    element.style.display = 'none';
  }
};

const show = el => {
  let element = document.getElementById(el);
  if (element !== null) {
    element.style.display = '';
  }
};

const checkResize = () => {
  if (window.innerWidth >= 770) {
    hide('mobile_controls');
  } else {
    show('mobile_controls');
  }
};

const getWidth = () => {
  return window.innerWidth;
};

window.addEventListener('resize', () => {
  checkResize();
});

export default {
  checkResize,
  getWidth,
};
