import Swiper from 'swiper';
import Slider from '~/js/components/slider';

let initialOpen = true;

// Desktop slider init
$.each('.js-slider-steps', el => {
  const slider = new Slider(el);
  el.slider = slider;
});

// Mobile slider init
$.each('.js-slider-steps-mob', el => {
  const slider = new Swiper(el, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    speed: 600
  });

  const onChange = () => {
    const parent = el.closest('.steps__mob');
    if (!parent) return false;
    const accs = $.qsa('.accordion', parent);

    const index = slider.realIndex;

    accs.forEach((acc, i) => {
      acc.classList[i === index ? 'remove' : 'add']('is-hidden');
    });
  };

  onChange();
  slider.on('slideChange', onChange);
});

// Mobile acc size
document.addEventListener('accordion:init', () => {
  const calc = () => {
    $.each('.steps__mob .accordion-container', parent => {
      let height = 0;
      const accs = $.qsa('.accordion', parent);

      accs.forEach(acc => {
        const accHeight = acc.scrollHeight;
        if (accHeight > height) {
          height = accHeight;
        }
      });

      parent.style.height = `${height}px`;
    });
  };

  calc();
  window.addEventListener('resize', calc);
});

// Open first acc
document.addEventListener('accordion:init', () => {
  $.each('.steps__desktop .steps__acc', acc => {
    const btn = $.qs('.accordion:first-child .accordion__btn', acc);
    if (!btn) return false;
    btn.click();
  });

  setTimeout(() => {
    initialOpen = false;
  }, 250);
});

// Update image slider on acc click
document.addEventListener('accordion:complete', ({ detail }) => {
  const { accordion, index } = detail;
  const parent = accordion.closest('.steps__inner');
  if (!parent) return false;

  const sliderElement = $.qs('.js-slider-steps', parent);
  if (!sliderElement) return false;

  const { slider } = sliderElement;
  slider.update(null, index);

  if (initialOpen) return false;

  const wrapper = parent.closest('.steps__wrap');
  setTimeout(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: wrapper.offsetTop
    });
  }, 250);
});
