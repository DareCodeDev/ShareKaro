// JavaScript to pause the animation on hover
const slider = document.querySelector('.slider');

slider.addEventListener('mouseover', () => {
  slider.style.animationPlayState = 'paused';
}); 

slider.addEventListener('mouseout', () => {
  slider.style.animationPlayState = 'running';
});