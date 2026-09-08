(() => {
  const slider = document.querySelector('.ba-slider');
  if (!slider) return;
  const before = slider.querySelector('.ba-before');
  const after = slider.querySelector('.ba-after');
  const handle = slider.querySelector('.ba-handle');
  const line = slider.querySelector('.ba-line');
  let position = 51;

  function positionLabels() {
    const rect = slider.getBoundingClientRect();
    const ratio = after.naturalWidth && after.naturalHeight ? after.naturalWidth / after.naturalHeight : 1;
    const width = Math.min(rect.width, rect.height * ratio);
    const height = Math.min(rect.height, rect.width / ratio);
    slider.style.setProperty('--image-left', `${(rect.width - width) / 2}px`);
    slider.style.setProperty('--image-top', `${(rect.height - height) / 2}px`);
    slider.style.setProperty('--image-width', `${width}px`);
    slider.style.setProperty('--image-height', `${height}px`);
  }
  function fitSlider() {
    positionLabels();
  }
  function update(value) {
    position = Math.max(0, Math.min(100, value));
    before.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    handle.style.left = `${position}%`;
    line.style.left = `calc(${position}% - 1px)`;
    handle.setAttribute('aria-valuenow', Math.round(position));
  }
  function setFromPointer(event) {
    const rect = slider.getBoundingClientRect();
    update(((event.clientX - rect.left) / rect.width) * 100);
  }
  slider.addEventListener('pointerdown', event => { slider.setPointerCapture(event.pointerId); setFromPointer(event); });
  slider.addEventListener('pointermove', event => { if (event.buttons) setFromPointer(event); });
  handle.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { update(position - 1); event.preventDefault(); }
    if (event.key === 'ArrowRight') { update(position + 1); event.preventDefault(); }
  });
  after.addEventListener('load', fitSlider);
  new ResizeObserver(positionLabels).observe(slider);
  fitSlider();
  update(position);
})();
