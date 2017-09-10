import { searchUrl } from './helpers.js'

export class Search {
  constructor(el) {
    this.$el = el
    this.$input = this.$el.querySelector('#search')
    this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
    this.$songs = this.$el.querySelector('.song-list')
    this.page = 1
    this.songs = {}
    this.keyword = ''
    this.perpage = 20
    this.nomore = false
    this.fetching = false
    this.onscroll = this.onScroll.bind(this)
    window.addEventListener('scroll', this.onscroll)
  }

  onKeyUp(event) {
    let keyword = event.target.value.trim()
    if (!keyword) return this.reset()
    if (event.keyCode !== 13) return
    this.search(keyword)
  }

  onScroll(event) {
    if (this.nomore) return window.removeEventListener('scroll', this.onscroll)
    if (pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight - 50) {
      this.search(this.keyword, this.page + 1)
    }
  }

  reset() {
    this.page = 1
    this.songs = {}
    this.keyword = ''
    this.nomore = false
    this.$songs.innerHTML = ''
  }

  search(keyword, page) {
    if (this.keyword === keyword && this.songs[page || this.page]) return
    if (this.nomore || this.fetching) return
    if (this.keyword !== keyword) this.reset()
    this.keyword = keyword
    this.loading()
    fetch(searchUrl(this.keyword, page || this.page))
      .then(res => res.json())
      .then(json => {
        this.page = json.data.song.curpage
        this.songs[this.page] = json.data.song.list
        this.nomore = json.message === 'no results'
        return json.data.song.list
      })
      .then(songs => this.append(songs))
      .then(() => this.done())
      .catch(() => this.fetching = false)
  }

  append(songs) {
    let html = songs.map(song => {
      let artist = song.singer.map(s => s.name).join(' ')
      return `
        <a class="song-item"
           href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
          <i class="icon icon-music"></i>
          <div class="song-name ellipsis">${song.songname}</div>
          <div class="song-artist ellipsis">${artist}</div>
        </a>`}).join('')
    this.$songs.insertAdjacentHTML('beforeend', html)
  }

  loading() {
    this.fetching = true
    this.$el.querySelector('.search-loading').classList.add('show')
  }

  done() {
    this.fetching = false
    if (this.nomore) {
      this.$el.querySelector('.loading-icon').style.display = 'none'
      this.$el.querySelector('.loading-text').style.display = 'none'
      this.$el.querySelector('.loading-done').style.display = 'block'
      this.$el.querySelector('.search-loading').classList.add('show')
    } else {
      this.$el.querySelector('.search-loading').classList.remove('show')
    }
  }
  
}