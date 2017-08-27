(function() {

  let slider = new Slider({
    el: document.querySelector('#slider'),
    slides: [
      { link: '#1', image: 'images/xiha.jpg' },
      { link: '#2', image: 'images/xgs.jpg' },
      { link: '#3', image: 'images/ljj.jpg' },
      { link: '#4', image: 'images/xl.jpg' },
      { link: '#5', image: 'images/joey.jpg' }
    ]
  })

  window.slider = slider

})()