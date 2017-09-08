class MusicPlayer {
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this)
    this.createAudio()
    this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'))
    this.progress = new ProgressBar(this.$el.querySelector('.progress'))
    this.fetching = false
  }

  createAudio() {
    this.$audio = document.createElement('audio')
    this.$audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
    this.$audio.addEventListener('ended', () => {
      this.$audio.play()
      this.lyrics.restart()
      this.progress.restart()
    })
    document.body.appendChild(this.$audio)
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
    
    let url = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${options.albummid}.jpg`
    this.$el.querySelector('.album-cover').src = url
    this.$el.querySelector('.player-background').style.backgroundImage = `url(${url})`

    if (options.songid) {
      if (this.songid !== options.songid) {
        this.$el.querySelector('.icon-action').className = 'icon-action icon-play'
      }
      
      this.songid = options.songid
      this.$audio.src = `http://ws.stream.qqmusic.qq.com/${this.songid}.m4a?fromtag=46`
      this.fetching = true
      fetch(`https://qq-music-api.now.sh/lyrics?id=${this.songid}`)
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