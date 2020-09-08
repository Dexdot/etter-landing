class Steps {
  constructor(el) {
    this.DOM = { el };
    this.DOM.inner = $.qs('.steps__desktop-inner', el);
    this.DOM.accordions = $.qsa('.accordion__btn', el);

    this.length = window.parseInt(el.dataset.steps);
    this.index = 0;

    this.init();
  }

  init() {
    this.handleResize();
    this.handleScroll();
  }

  createSteps() {
    this.steps = [];
    for (var x = 0; x < this.length; x++) {
      this.steps.push({
        start: x === 0 ? 0 : this.windowH * x,
        end: this.windowH * (x + 1)
      });
    }
  }

  handleResize() {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    this.windowH = window.innerHeight;
    this.createSteps();
  }

  handleScroll() {
    const self = this;
    function onRAF() {
      self.y = $.getComputedY(self.DOM.inner);
      self.onScroll();
      window.requestAnimationFrame(onRAF);
    }
    window.requestAnimationFrame(onRAF);
  }

  onScroll() {
    const { y, steps } = this;
    const { accordions } = this.DOM;

    steps.forEach(({ start, end }, i) => {
      if (y >= start && y <= end) {
        if (i !== this.index) {
          this.index = i;
          accordions[i].click();
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = $.qs('#js-scroll');
  if (!scrollContainer) return false;

  $.each('.steps__desktop', el => {
    const steps = new Steps(el);
  });
});
