const dropdown = button => {
  const parent = button.closest('.js-accordion');

  // Current content
  const content = button.nextElementSibling;
  const contentParent = content.parentElement;

  const oldActive = $.qs('.accordion.active', parent);

  $.dispatch({
    el: document,
    name: 'accordion:begin',
    detail: { accordion: parent, oldActive, newActive: contentParent }
  });

  contentParent.classList.toggle('active');
  contentParent.style.setProperty(
    '--acc-max-height',
    `${content.scrollHeight}px`
  );

  // Other contents
  const accordions = $.qsa('.accordion', parent);
  const currentIndex = accordions.indexOf(contentParent);
  const others = accordions.filter((el, i) => i !== currentIndex);

  others.forEach(el => {
    el.classList.remove('active');
  });

  $.dispatch({
    el: document,
    name: 'accordion:complete',
    detail: {
      accordion: parent,
      active: accordions[currentIndex],
      index: currentIndex
    }
  });
};

const initAccordion = () => {
  $.delegate('.accordion__btn', (e, el) => {
    dropdown(el);
  });

  $.dispatch({
    el: document,
    name: 'accordion:init'
  });
};

document.addEventListener('DOMContentLoaded', initAccordion);
