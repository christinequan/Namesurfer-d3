// Adapted from https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
// and https://davidwalsh.name/css-animation-callback

const whichAnimationEvent = (element) => {

  let animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  };

  for (let a in animations){
    if (element.style[a] !== undefined){
      return animations[a];
    }
  }
}

export function headshakeCallback(element) {
  element.classList.add('headshake');
  element.placeholder = '';
  element.value = '';
  animationEnd(element)
}

const animationEnd = (element) => {
  const animation_event = whichAnimationEvent(element);
  element.addEventListener(animation_event, () => {
  element.classList.remove('headshake');
  })
}
