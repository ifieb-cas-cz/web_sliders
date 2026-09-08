(() => {
  const slider = document.querySelector('.ba-slider');
  if (!slider) return;
  const mid = slider.querySelector('.ba-mid');
  const handleA = slider.querySelector('.ba-handle-a');
  const handleB = slider.querySelector('.ba-handle-b');
  let posA = 33;
  let posB = 67;

  function positionLabels() {
    const rect = slider.getBoundingClientRect();
    const ratio = mid.naturalWidth && mid.naturalHeight ? mid.naturalWidth / mid.naturalHeight : 1;
    const width = Math.min(rect.width, rect.height * ratio);
    const height = Math.min(rect.height, rect.width / ratio);
    slider.style.setProperty('--image-left', `${(rect.width - width) / 2}px`);
    slider.style.setProperty('--image-top', `${(rect.height - height) / 2}px`);
    slider.style.setProperty('--image-width', `${width}px`);
  }
  function fitSlider() {
    if (mid.naturalWidth && mid.naturalHeight) slider.style.aspectRatio = `${mid.naturalWidth} / ${mid.naturalHeight}`;
    positionLabels();
  }
  function update() {
    slider.style.setProperty('--pos-a', `${posA}%`);
    slider.style.setProperty('--pos-b', `${posB}%`);
    handleA.setAttribute('aria-valuenow', Math.round(posA));
    handleB.setAttribute('aria-valuenow', Math.round(posB));
  }
  function setPos(which, value) {
    if (which === 'a') posA = Math.max(0, Math.min(posB, value));
    else posB = Math.max(posA, Math.min(100, value));
    update();
  }
  function posFromEvent(event) {
    const rect = slider.getBoundingClientRect();
    return ((event.clientX - rect.left) / rect.width) * 100;
  }

  // Each handle captures its own pointer, so dragging one never gets
  // confused with the other, even when they overlap or cross.
  function makeDraggable(handle, which) {
    handle.addEventListener('pointerdown', event => {
      handle.setPointerCapture(event.pointerId);
      setPos(which, posFromEvent(event));
      event.stopPropagation();
    });
    handle.addEventListener('pointermove', event => {
      if (event.buttons) setPos(which, posFromEvent(event));
    });
    handle.addEventListener('keydown', event => {
      const value = which === 'a' ? posA : posB;
      if (event.key === 'ArrowLeft') { setPos(which, value - 1); event.preventDefault(); }
      if (event.key === 'ArrowRight') { setPos(which, value + 1); event.preventDefault(); }
    });
  }
  makeDraggable(handleA, 'a');
  makeDraggable(handleB, 'b');

  // Clicking empty space (not a handle) jumps the nearest handle there.
  let activeHandle = null;
  slider.addEventListener('pointerdown', event => {
    const value = posFromEvent(event);
    activeHandle = Math.abs(value - posA) <= Math.abs(value - posB) ? 'a' : 'b';
    slider.setPointerCapture(event.pointerId);
    setPos(activeHandle, value);
  });
  slider.addEventListener('pointermove', event => {
    if (event.buttons && activeHandle) setPos(activeHandle, posFromEvent(event));
  });
  slider.addEventListener('pointerup', () => { activeHandle = null; });

  mid.addEventListener('load', fitSlider);
  window.addEventListener('resize', positionLabels);
  fitSlider();
  update();
})();
