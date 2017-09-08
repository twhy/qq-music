class MusicPlayer {
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this)
    this.index = ++this.constructor.counter
    this.createAudio()
  }

  createAudio() {
    this.$audio = document.createElement('audio')
    this.$audio.autoplay = true
    this.$audio.loop = true
    this.$audio.id = `player${this.index}`
    document.body.appendChild(this.$audio)
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
    event.target.classList.add('icon-play')
    event.target.classList.remove('icon-pause')
  }

  onPlay(event) {
    event.target.classList.add('icon-pause')
    event.target.classList.remove('icon-play')
  }
}

MusicPlayer.counter = 0

class LyricsPlayers {
  constructor(el) {

  }
}

class ProgressBar {
  constructor(el) {
    this.$el = el
    this.progress = 0
  }

  set(progress) {
    this.progress = progress
  }

  continue() {
    
  }

  pause() {

  }

  stop() {

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

// [ti:龙卷风 (Live)]
// [ar:周杰伦]
// [al:周杰伦魔天伦世界巡回演唱会]
// [by:]
// [offset:0]
// [00:01.25]龙卷风 (Live) - 周杰伦
// [00:03.18]词：徐若瑄
// [00:04.22]曲：周杰伦
// [00:05.53]
// [00:27.06]爱像一阵风 吹完它就走
// [00:33.61]这样的节奏 谁都无可奈何
// [00:40.15]没有你以后 我灵魂失控
// [00:46.95]黑云在降落 我被它拖着走
// [00:53.33]静静悄悄默默离开
// [00:56.47]陷入了危险边缘Baby
// [01:00.61]我的世界已狂风暴雨
// [01:04.53]
// [01:06.17]Wu 爱情来的太快就像龙卷风
// [01:10.18]离不开暴风圈来不及逃
// [01:13.24]我不能再想我不能再想
// [01:16.49]我不我不我不能
// [01:20.42]爱情走的太快就像龙卷风
// [01:23.68]不能承受我已无处可躲
// [01:26.56]我不要再想我不要再想
// [01:29.85]我不我不我不要再想你
// [01:34.01]不知不觉你已经离开我
// [01:36.95]不知不觉我跟了这节奏
// [01:40.26]后知后觉又过了一个秋
// [01:43.65]后知后觉我该好好生活
// [01:46.88]静静悄悄默默离开
// [01:49.91]陷入了危险边缘Baby
// [01:53.92]我的世界已狂风暴雨
// [01:58.31]
// [01:59.54]Wu 爱情来的太快就像龙卷风
// [02:03.80]离不开暴风圈来不及逃
// [02:06.70]我不能再想
// [02:08.25]我不能再想
// [02:09.87]我不我不我不能
// [02:13.47]爱情走的太快就像龙卷风
// [02:17.03]不能承受我已无处可躲
// [02:19.93]我不要再想
// [02:21.46]我不要再想
// [02:23.19]我不我不我不要再想你
// [02:27.45]
// [02:53.75]爱情来的太快就像龙卷风
// [02:56.92]离不开暴风圈来不及逃
// [02:59.92]我不能再想
// [03:01.46]我不能再想
// [03:03.16]我不我不我不能
// [03:06.22]
// [03:07.08]爱情走的太快就像龙卷风
// [03:10.26]不能承受我已无处可躲
// [03:13.45]我不要再想
// [03:14.84]我不要再想
// [03:16.56]我不我不我不要再想你
// [03:20.24]不知不觉你已经离开我
// [03:23.69]不知不觉我跟了这节奏
// [03:26.96]后知后觉又过了一个秋
// [03:30.47]后知后觉我该好好生活
// [03:34.10]不知不觉你已经离开我
// [03:37.22]不知不觉我跟了这节奏
// [03:40.30]后知后觉又过了一个秋
// [03:43.74]后知后觉我该好好生活
// [03:47.17]不知不觉你已经离开我
// [03:50.34]不知不觉我跟了这节奏
// [03:53.81]后知后觉后知后觉  