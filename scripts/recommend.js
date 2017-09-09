import { Slider } from './slider.js'
import { lazyload } from './lazyload.js'
import { RECOMMEND_URL } from './constants.js'

export class Recommend {
  constructor(el) {
    this.$el = el
  }

  launch() {
    fetch(RECOMMEND_URL)
      .then(res => res.json())
      .then(json => this.json = json)
      .then(() => this.render())
    return this
  }

  render() {
    this.renderSlider(this.json.data.slider)
    this.renderRadios(this.json.data.radioList)
    this.renderPlayLists(this.json.data.songList)
    lazyload()
  }

  renderSlider(slides) {
    this.slider = new Slider({
      el: this.$el.querySelector('#slider'),
      slides: slides.map(slide => ({ link: slide.linkUrl, image: slide.picUrl }))
    })
  }

  renderRadios(radios) {
    this.$el.querySelector('.radios .list').innerHTML = radios.map(radio => 
      `<div class="list-item">
        <div class="list-media">
          <img class="lazyload" data-src="${radio.picUrl}">
          <span class="icon icon-play"></span>
        </div>
        <div class="list-detail">
          <h3 class="list-title">${radio.Ftitle}</h3>
        </div>
      </div>`).join('')
  }

  renderPlayLists(playlists) {
    this.$el.querySelector('.playlists .list').innerHTML = playlists.map(list =>
      `<div class="list-item">
        <div class="list-media">
          <img class="lazyload" data-src="${list.picUrl}">
          <span class="icon icon-play"></span>
        </div>
        <div class="list-detail">
          <h3 class="list-title">${list.songListDesc}</h3>
          <div class="list-text"></div>
        </div>
      </div>`).join('')
  }
}