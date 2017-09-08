class MusicPlayer {
  
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this)
    this.songid = ''
    this.albumid = ''
    this.createAudio()
    this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'))
    this.progress = new ProgressBar(this.$el.querySelector('.progress'))
  }

  createAudio() {
    this.$audio = document.createElement('audio')
    this.$audio.loop = true
    this.$audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
    this.$audio.addEventListener('ended', () => {
      this.lyrics.restart()
      this.progress.restart()
    })
    document.body.appendChild(this.$audio)
  }

  handleEvent(event) {
    let target = event.target
    switch (true) {
      case target.matches('.icon-pause'):
        this.onPause(event)
        break
      case target.matches('.icon-play'):
        this.onPlay(event);
        break
      case target.matches('.icon-list'):
        this.hide()
        break
    }
  }

  play(options) {
    if (!options) return

    this.$el.querySelector('.song-name').innerText = options.songname
    this.$el.querySelector('.song-artist').innerText = options.artist
    this.progress.reset(options.duration)
    
    let url = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${options.albummid}.jpg`
    this.$el.querySelector('.album-cover').src = url
    this.$el.querySelector('.player-background').style.backgroundImage = `url(${url})`

    if (options.songid) {
      this.songid = options.songid
      this.$audio.src = `http://ws.stream.qqmusic.qq.com/${this.songid}.m4a?fromtag=46`
      fetch(`https://qq-music-api.now.sh/lyrics?id=${this.songid}`)
        .then(res => res.json())
        .then(json => json.lyric)
        .then(text => this.lyrics.reset(text))
        .catch(() => {})
    }
    this.show()
  }

  onPause(event) {
    this.$audio.pause()
    this.lyrics.pause()
    this.progress.pause()
    event.target.classList.add('icon-play')
    event.target.classList.remove('icon-pause')
  }

  onPlay(event) {
    this.$audio.play()
    this.lyrics.start()
    this.progress.start()
    event.target.classList.add('icon-pause')
    event.target.classList.remove('icon-play')
  }

  show() {
    this.$el.classList.add('show')
  }

  hide() {
    this.$el.classList.remove('show')
  }
}

class LyricsPlayer {
  constructor(el) {
    this.$el = el
    this.$el.innerHTML = '<div class="player-lyrics-lines"></div>'
    this.$lines = this.$el.querySelector('.player-lyrics-lines')
    this.text = ''
    this.lyrics = []
    this.reset(this.text)
  }

  render() {
    let html = this.lyrics.map((line, index) => `
      <div class="player-lyrics-line-${index}">${line.slice(10)}</div>
    `).join('')
    this.$lines.innerHTML = html
  }

  start() {
    this.$lines.style.transform = `translateY(0px)`
    this.intervalId = setInterval(this.update.bind(this), 1000)
  }

  pause() {
    clearInterval(this.intervalId)
  }

  update() {
    this.elapsed += 1
    for (let i = this.index + 1; i < this.lyrics.length; i++) {
      let seconds = this.getSeconds(this.lyrics[i])
      if (
        this.elapsed === seconds &&
        this.lyrics[i + 1] &&
        this.elapsed < this.getSeconds(this.lyrics[i + 1])
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

  reset(text) {
    this.index = 0
    this.elapsed = 0
    if (text) {
      this.text = this.formatText(text) || ''
      this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []
      if (this.lyrics.length) {
        this.render()
        this.$lines.children[this.index].classList.add('active')
      }
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

LyricsPlayer.prototype.LINE_HEIGHT = 42

class ProgressBar {
  constructor(el, duration, start) {
    this.elapsed = 0
    this.duration = duration || 0
    this.progress = 0
    this.$el = el
    this.render()
    this.$progress = this.$el.querySelector('.progress-bar-progress')
    this.$elapsed = this.$el.querySelector('.progress-elapsed')
    this.$duration = this.$el.querySelector('.progress-duration')
    this.$elapsed.innerText = this.formatTime(this.elapsed)
    this.$duration.innerText = this.formatTime(this.duration)
    if (start) this.start()
  }

  start() {
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
    if (duration) {
      this.duration = +duration
      this.$duration.innerText = this.formatTime(this.duration)
    }
  }

  restart() {
    this.reset()
    this.restart()
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