import LocomotiveScroll from 'locomotive-scroll';
import { isMobileDevice } from '~/js/helpers/detect';

document.addEventListener('DOMContentLoaded', initLocoScroll);
window.addEventListener('load', updateScroll);

function initLocoScroll() {
  const scrollContainer = $.qs('#js-scroll');
  if (!scrollContainer) return false;

  // Scrollbar show/hide
  const scrollbar = {
    show: () => {
      if (loco.scroll.scrollbar)
        loco.scroll.scrollbar.classList.remove('u-hidden');
    },
    hide: () => {
      if (loco.scroll.scrollbar)
        loco.scroll.scrollbar.classList.add('u-hidden');
    }
  };

  const isMobileOrSmall = isMobileDevice() || window.innerWidth <= 990;

  // Scroll instance
  const loco = new LocomotiveScroll({
    el: scrollContainer,
    smooth: !isMobileOrSmall,
    getDirection: true
  });

  window.loco = loco;

  // Scroll data, start/stop functions
  window.scroll = {
    data: {
      direction: 'down'
    },
    start: () => {
      document.addEventListener('keydown', loco.scroll.checkKey, false);
      scrollbar.show();
      loco.start();
    },
    stop: () => {
      document.removeEventListener('keydown', loco.scroll.checkKey, false);
      scrollbar.hide();
      loco.stop();
    },
    update: updateScroll
  };

  // Save scroll data
  loco.on('scroll', e => {
    window.scroll.data = e;
  });

  scrollContainer.dispatchEvent(new Event('locoscroll:init'));
}

function updateScroll() {
  const { loco } = window;

  if (loco && loco.update) loco.update();
}
