let text = `[ti:就这样]
[ar:李荣浩]
[al:就这样]
[by:]
[offset:0]

[00:00.81]就这样 - 李荣浩

[00:01.50]词：施人诚
[00:01.67]曲：李荣浩

[00:01.83]编曲：李荣浩

[00:02.03]制作人：李荣浩
[00:02.26]吉他：李荣浩
[00:02.46]贝斯：李荣浩
[00:02.66]鼓：龙江浩

[00:02.82]弦乐编写：李荣浩

[00:03.09]弦乐：国际首席爱乐乐团
[00:03.45]和声编写：李荣浩
[00:03.71]和声：李荣浩
[00:03.91]录音师：单为明
[00:04.14]混音师：李荣浩/曹飞
[00:04.47]音乐制作助理：杜以丞
[00:04.80]录音室：北京一样音乐录音室
[00:05.23]Vocal录音室：Lights Up Studio,Taipei
[00:05.50]混音室：北京一样音乐录音室
[00:05.93]母带后期制作人：李荣浩
[00:06.29]母带后期处理工程师：Tom Coyne
[00:06.68]母带后期处理录音室：Sterling Sound Studio
[00:07.11]OP：一样音乐工作室
[00:07.41]SP：酷亚音乐(深圳)有限公司 admin by One Asia Music Inc. 酷亚音乐股份有限公司
[00:08.40]OP : HIM Music Publishing Inc.
[00:08.60]
[00:30.39]不忍看你像个嫌犯
[00:34.30]
[00:37.55]我就不再追问答案
[00:41.69]
[00:44.95]你的沉默已经回答
[00:48.95]
[00:50.69]够直接了当
[00:56.47]
[00:59.74]是我太常让你失望
[01:04.04]
[01:06.94]不够贴心包容温暖
[01:11.49]
[01:14.36]才会落得这个下场和背叛无关
[01:30.65]
[01:31.23]就这样就这样
[01:38.55]你不用不自然
[01:45.90]你也不要说需要我原谅
[01:52.43]
[01:54.25]别让我多想
[02:00.05]
[02:00.65]就这样就这样
[02:08.07]怕真相太难看
[02:14.71]
[02:15.44]我想对爱情还抱有希望
[02:22.80]
[02:23.74]我们俩就这样
[02:33.51]
[02:39.54]以为能够功德圆满
[02:44.13]
[02:46.75]最后勉强好聚好散
[02:51.14]
[02:53.94]一段感情这样收场
[02:58.20]
[02:59.54]你也会遗憾
[03:08.62]
[03:10.80]就这样就这样
[03:17.60]
[03:18.14]你不用不自然
[03:25.50]你也不要说需要我原谅
[03:32.91]
[03:33.95]别让我多想
[03:40.17]就这样就这样
[03:47.61]怕真相太难看
[03:55.15]我想对爱情还抱有希望
[04:01.98]
[04:03.56]反正你也没差
[04:17.27]就这样就这样
[04:23.68]
[04:24.56]怕真相太难看
[04:31.78]我想对爱情还抱有希望
[04:39.07]
[04:40.32]我们俩就这样`

class MusicPlayer {
  
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this)
    this.createAudio()
    this.createLyrics()
    this.createProgress()
  }

  createAudio() {
    this.$audio = document.createElement('audio')
    this.$audio.autoplay = true
    this.$audio.loop = true
    this.$audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
    document.body.appendChild(this.$audio)
  }

  createLyrics() {
    this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'), text)
  }

  createProgress() {
    this.progress = new ProgressBar(this.$el.querySelector('.progress'), 248, true)
  }

  handleEvent(event) {
    let target = event.target
    switch (true) {
      case target.matches('.icon-pause'):
        this.onPause(event)
        break;
      case target.matches('.icon-play'):
        this.onPlay(event);
        break;
    }
  }

  onPause(event) {
    this.progress.pause()
    event.target.classList.add('icon-play')
    event.target.classList.remove('icon-pause')
  }

  onPlay(event) {
    this.progress.start()
    event.target.classList.add('icon-pause')
    event.target.classList.remove('icon-play')
  }
}


class LyricsPlayer {
  constructor(el, text) {
    this.$el = el
    this.$el.innerHTML = '<div class="player-lyrics-lines"></div>'
    this.$lines = this.$el.querySelector('.player-lyrics-lines')
    this.text = this.formatText(text)
    this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)
    this.render()
    this.index = 0
    this.elapsed = 0
    this.$lines.children[this.index].classList.add('active')
    this.start()
  }

  render() {
    let html = this.lyrics.map((line, index) => `
      <div class="player-lyrics-line-${index}">${line.slice(10)}</div>
    `).join('')
    this.$lines.innerHTML = html
  }

  start() {
    this.intervalId = setInterval(this.update.bind(this), 1000)
  }

  pause() {
    this.clearInterval(this.clearInterval)
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
    let y = -(this.index > 1 ? this.index - 2 : this.index) * this.LINE_HEIGHT
    this.$lines.style.transform = `translateY(${y}px)`
  }

  getSeconds(line) {
    return +line.replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => 60 * (+p1) + (+p2))
  }

  formatText(text) {
    let div = document.createElement('div')
    div.innerText = text
    return div.innerText
  }
}

LyricsPlayer.prototype.LINE_HEIGHT = 42

class ProgressBar {
  constructor(el, duration, start) {
    this.elapsed = 0
    this.duration = duration
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

  reset() {
    this.pause()
    this.elapsed = 0
    this.progress = 0
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

// fetch('http://localhost:4000/lyrics?id=106291303')
//   .then(res => res.json())
//   .then(json => json.lyric)
//   .then(text => {
//     let div = document.createElement('div')
//     div.innerHTML = text
//     return div.firstChild.nodeValue
//   }).then(console.log)