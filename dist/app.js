/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const RECOMMEND_URL = 'https://qq-music-api.now.sh'
/* harmony export (immutable) */ __webpack_exports__["b"] = RECOMMEND_URL;

const TOPLIST_URL = 'https://qq-music-api.now.sh/top'
/* harmony export (immutable) */ __webpack_exports__["d"] = TOPLIST_URL;

const SEARCH_URL = 'https://qq-music-api.now.sh/search'
/* harmony export (immutable) */ __webpack_exports__["c"] = SEARCH_URL;

const LYRICS_URL = 'https://qq-music-api.now.sh/lyrics'
/* harmony export (immutable) */ __webpack_exports__["a"] = LYRICS_URL;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lazyload;
function lazyload(images) {
  let imgs = [].slice.call(images || document.querySelectorAll('.lazyload'))  // Array.from(images)

  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          loadImage(entry.target, () => {
            observer.unobserve(entry.target)
          })
        }
      })
    }, { threshold: 0.01 })
  
    imgs.forEach(img => observer.observe(img))
  } else {
    let onscroll = throttle(function() {
      if (imgs.length === 0) {
        return window.removeEventListener('scroll', onscroll)
      }
      imgs = imgs.filter(img => img.classList.contains('lazyload'))
      imgs.forEach(img => inViewport(img) && loadImage(img))
    }, 300)
  
    window.addEventListener('scroll', onscroll)
    window.dispatchEvent(new Event('scroll'))
  }
}

function throttle(func, wait) {
  let prev, timer
  return function fn() {
    let curr = Date.now()
    let diff = curr - prev
    if (!prev || diff >= wait) {
      func()
      prev = curr
    } else if (diff < wait) {
      clearTimeout(timer)
      timer = setTimeout(fn, wait - diff)
    }
  }
}

function inViewport(img) {
  let { top, left, right, bottom } = img.getBoundingClientRect()
  let vpWidth = document.documentElement.clientWidth
  let vpHeight = document.documentElement.clientHeight
  return (
    (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
    (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
  )
}

function loadImage(img, callback) {
  let image = new Image()
  image.src = img.dataset.src
  image.onload = function() {
    img.src = image.src
    img.classList.remove('lazyload')
    if (typeof callback === 'function') callback()
  }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tab_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toplist_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recommend_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__music_player_js__ = __webpack_require__(8);






let search = new __WEBPACK_IMPORTED_MODULE_1__search_js__["a" /* Search */](document.querySelector('#search-view'))
let player = new __WEBPACK_IMPORTED_MODULE_4__music_player_js__["a" /* MusicPlayer */](document.querySelector('#player'))
let toplist = new __WEBPACK_IMPORTED_MODULE_2__toplist_js__["a" /* TopList */](document.querySelector('#rank-view')).launch()
let recommend = new __WEBPACK_IMPORTED_MODULE_3__recommend_js__["a" /* Recommend */](document.querySelector('#rec-view')).launch()

document.querySelector('.show-player').addEventListener('click', () => {
  player.show()
})

onHashChange()
addEventListener('hashchange', onHashChange)

function onHashChange() {
  let hash = location.hash
  if (/^#player\?.+/.test(hash)) {
    let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
    let options = matches && matches.reduce((res, cur) => {
      let arr = cur.split('=')
      res[arr[0]] = decodeURIComponent(arr[1])
      return res
    }, {})
    player.play(options)
  } else {
    player.hide()
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

document.addEventListener('click', function(event) {
  
  let target = event.target

  if (target.dataset.role !== 'tab') return

  [].forEach.call(target.parentElement.children, tab => {
    tab.classList.remove('active')
  })
  target.classList.add('active')
    
  let content = document.querySelector(target.dataset.view)

  if (content) {
    [].forEach.call(content.parentElement.children, child => {
      child.style.display = 'none'
    })
    content.style.display = 'block'
  }

})

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);


class Search {
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
    if (event.key !== 'Enter') return
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
    fetch(`${__WEBPACK_IMPORTED_MODULE_0__constants_js__["c" /* SEARCH_URL */]}?keyword=${this.keyword}&page=${page || this.page}`)
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Search;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazyload_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = __webpack_require__(0);
 


class TopList {
  constructor(el) {
    this.$el = el
  }

  launch() {
    fetch(__WEBPACK_IMPORTED_MODULE_1__constants_js__["d" /* TOPLIST_URL */])
      .then(res => res.json())
      .then(json => this.list = json.data.topList)
      .then(() => this.render())
    return this
  }

  render() {
    this.$el.querySelector('.toplist').innerHTML = this.list.map(item => 
      `<li class="top-item">
        <div class="top-item-media">
          <a href="#">
            <img class="lazyload" data-src="${item.picUrl}">
          </a>
        </div>
        <div class="top-item-info">
          <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
          <ul class="top-item-list">${this.songlist(item.songList)}</ul>
        </div>
      </li>`).join('')

    Object(__WEBPACK_IMPORTED_MODULE_0__lazyload_js__["a" /* lazyload */])(this.$el.querySelectorAll('.lazyload'))
  }

  songlist(songs) {
    return songs.map((song, i) => 
      `<li class="top-item-song">
        <i class="song-index">${i + 1}</i>
        <span class="song-name">${song.songname}</span>- ${song.singername}
      </li>`).join('')
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TopList;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lazyload_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_js__ = __webpack_require__(0);




class Recommend {
  constructor(el) {
    this.$el = el
  }

  launch() {
    fetch(__WEBPACK_IMPORTED_MODULE_2__constants_js__["b" /* RECOMMEND_URL */])
      .then(res => res.json())
      .then(json => this.json = json)
      .then(() => this.render())
    return this
  }

  render() {
    this.renderSlider(this.json.data.slider)
    this.renderRadios(this.json.data.radioList)
    this.renderPlayLists(this.json.data.songList)
    Object(__WEBPACK_IMPORTED_MODULE_1__lazyload_js__["a" /* lazyload */])()
  }

  renderSlider(slides) {
    this.slider = new __WEBPACK_IMPORTED_MODULE_0__slider_js__["a" /* Slider */]({
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Recommend;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Slider {
  constructor(options = {}) {
    this.$el = options.el
    this.slides = options.slides
    this.interval = options.interval || 3000
    this.duration = options.duration || 300
    this.index = 0
    this.render()
    this.start()
  }

  render() {
    this.$el.innerHTML = `<div class="qq-slider-wrap"></div>`
    this.$wrap = this.$el.firstElementChild
    this.$wrap.style.transitionDuration = `${this.duration}ms`
    this.$wrap.style.width = `${this.slides.length * 100}%`
    this.$wrap.innerHTML = this.slides.map(slide =>
      `<div class="qq-slider-item">
          <a href="${slide.link}">
            <img src="${slide.image}">
          </a>
      </div>`
    ).join('')
  }

  start() {
    setInterval(this.next.bind(this), this.interval)
  }

  next() {
    this.index += 1
    if (this.index === this.slides.length) {
      this.$wrap.style.transform = `translate(0)`
      this.index = 0
      return
    }
    this.$wrap.style.transform = `translate(-${this.index * 100 / this.slides.length}%)`
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Slider;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__progress_bar_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lyrics_player_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(11);




class MusicPlayer {
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this)
    this.$audio = this.createAudio()
    this.lyrics = new __WEBPACK_IMPORTED_MODULE_1__lyrics_player_js__["a" /* LyricsPlayer */](this.$el.querySelector('.player-lyrics'), this.$audio)
    this.progress = new __WEBPACK_IMPORTED_MODULE_0__progress_bar_js__["a" /* ProgressBar */](this.$el.querySelector('.progress'))
    this.fetching = false
  }

  createAudio() {
    let audio = document.createElement('audio')
    audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
    audio.addEventListener('ended', () => {
      this.$audio.play()
      this.lyrics.restart()
      this.progress.restart()
    })
    document.body.appendChild(audio)
    return audio
  }

  handleEvent(event) {
    let target = event.target
    switch (true) {
      case target.matches('.icon-play'):
        this.onPlay(event)
        break
      case target.matches('.icon-pause'):
        this.onPause(event)
        break
      case target.matches('.icon-list'):
        this.hide()
        break
    }
  }

  onPlay(event) {
    if (this.fetching) return
    this.$audio.play()
    this.lyrics.start()
    this.progress.start()
    event.target.classList.add('icon-pause')
    event.target.classList.remove('icon-play')
  }

  onPause(event) {
    this.$audio.pause()
    this.lyrics.pause()
    this.progress.pause()
    event.target.classList.add('icon-play')
    event.target.classList.remove('icon-pause')
  }

  play(options = {}) {
    if (!options) return
    
    this.$el.querySelector('.song-name').innerText = options.songname
    this.$el.querySelector('.song-artist').innerText = options.artist
    this.progress.reset(options.duration)
    
    let coverUrl = Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* albumCoverUrl */])(options.albummid)
    this.$el.querySelector('.album-cover').src = coverUrl
    this.$el.querySelector('.player-background').style.backgroundImage = `url(${coverUrl})`

    if (options.songid) {
      if (this.songid !== options.songid) {
        this.$el.querySelector('.icon-action').className = 'icon-action icon-play'
      }
      
      this.songid = options.songid
      this.$audio.src = Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* songUrl */])(this.songid)
      this.fetching = true
      fetch(Object(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["b" /* lyricsUrl */])(this.songid))
        .then(res => res.json())
        .then(json => json.lyric)
        .then(text => this.lyrics.reset(text))
        .catch(() => {})
        .then(() => this.fetching = false)
    }
    
    this.show()
  }

  show() {
    this.$el.classList.add('show')
    document.body.classList.add('noscroll')
  }

  hide() {
    this.$el.classList.remove('show')
    document.body.classList.remove('noscroll')
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MusicPlayer;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ProgressBar {
  constructor(el, duration, start) {
    this.$el = el
    this.elapsed = 0
    this.duration = duration || 0
    this.progress = 0
    this.render()
    this.$progress = this.$el.querySelector('.progress-bar-progress')
    this.$elapsed = this.$el.querySelector('.progress-elapsed')
    this.$duration = this.$el.querySelector('.progress-duration')
    this.$elapsed.innerText = this.formatTime(this.elapsed)
    this.$duration.innerText = this.formatTime(this.duration)
    if (start) this.start()
  }

  start() {
    this.pause()
    this.intervalId = setInterval(this.update.bind(this), 50)
  }

  pause() {
    clearInterval(this.intervalId)
  }

  update() {
    this.elapsed += 0.05
    if (this.elapsed >= this.duration) this.reset()
    this.progress = this.elapsed / this.duration
    this.$progress.style.transform = `translate(${this.progress * 100 - 100}%)`
    this.$elapsed.innerText = this.formatTime(this.elapsed)
  }

  reset(duration) {
    this.pause()
    this.elapsed = 0
    this.progress = 0
    this.$progress.style.transform = `translate(-100%)`
    this.$elapsed.innerText = this.formatTime(this.elapsed)
    if (duration) {
      this.duration = +duration
      this.$duration.innerText = this.formatTime(this.duration)
    }
  }

  restart() {
    this.reset()
    this.start()
  }

  render() {
    this.$el.innerHTML = `
      <div class="progress-time progress-elapsed"></div>
        <div class="progress-bar">
          <div class="progress-bar-progress"></div>
        </div>
      <div class="progress-time progress-duration"></div>
    `
  }

  formatTime(seconds) {
    let mins = Math.floor(seconds / 60)
    let secs = Math.floor(seconds % 60)
    if (mins < 10) mins = '0' + mins
    if (secs < 10) secs = '0' + secs
    return `${mins}:${secs}`
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProgressBar;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LyricsPlayer {
  constructor(el, audio) {
    this.$el = el
    this.$el.innerHTML = '<div class="player-lyrics-lines"></div>'
    this.$lines = this.$el.querySelector('.player-lyrics-lines')
    this.$audio = audio
    this.text = ''
    this.index = 0
    this.lyrics = []
    this.elapsed = 0
    this.reset(this.text)
  }

  start() {
    this.pause()
    this.intervalId = setInterval(this.update.bind(this), 1000)
  }

  pause() {
    clearInterval(this.intervalId)
  }

  update() {
    this.elapsed = Math.round(this.$audio ? this.$audio.currentTime : this.elapsed + 1)
    if (this.index === this.lyrics.length - 1) return
    for (let i = this.index + 1; i < this.lyrics.length; i++) {
      let seconds = this.getSeconds(this.lyrics[i])
      if (
        this.elapsed === seconds &&
        (!this.lyrics[i + 1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))
      ) {
        this.$lines.children[this.index].classList.remove('active')
        this.$lines.children[i].classList.add('active')
        this.index = i
        break
      }
    }
    if (this.index > 2) {
      let y = -(this.index - 2) * this.LINE_HEIGHT
      this.$lines.style.transform = `translateY(${y}px)`
    }
  }

  render() {
    let html = this.lyrics.map(line => `
      <div class="player-lyrics-line">${line.slice(10)}</div>
    `).join('')
    this.$lines.innerHTML = html
  }

  reset(text) {
    this.pause()
    this.index = 0
    this.elapsed = 0
    
    this.$lines.style.transform = `translateY(0)`
    let $active = this.$lines.querySelector('.active')
    if ($active) {
      $active.classList.remove('active')
    }

    if (text) {
      this.text = this.formatText(text) || ''
      this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []
      if (this.lyrics.length) this.render()
    }

    if (this.lyrics.length) {
      this.$lines.children[this.index].classList.add('active')
    }
  }

  restart() {
    this.reset()
    this.start()
  }

  getSeconds(line) {
    return +line.replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => 60 * (+p1) + (+p2))
  }

  formatText(text) {
    let div = document.createElement('div')
    div.innerHTML = text
    return div.innerText
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LyricsPlayer;


LyricsPlayer.prototype.LINE_HEIGHT = 42

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = songUrl;
/* harmony export (immutable) */ __webpack_exports__["b"] = lyricsUrl;
/* harmony export (immutable) */ __webpack_exports__["a"] = albumCoverUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);


function songUrl(id) {
  return `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
}

function lyricsUrl(songid) {
  return `${__WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* LYRICS_URL */]}?id=${songid}`
}

function albumCoverUrl(id) {
  return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
}



/***/ })
/******/ ]);