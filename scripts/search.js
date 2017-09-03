class Search {
  constructor(el) {
    this.$el = el
    this.$input = this.$el.querySelector('#search')
    this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
    this.$songs = this.$el.querySelector('.song-list')
    this.page = 1
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
    this.keyword = ''
    this.nomore = false
    this.$songs.innerHTML = ''
  }

  search(keyword, page) {
    if (!this.page && this.keyword === keyword) return
    if (this.nomore || this.fetching) return
    if (this.keyword !== keyword) this.reset()
    this.keyword = keyword
    this.loading()
    fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page || this.page}`)
      .then(res => res.json())
      .then(json => {
        this.page = json.data.song.curpage
        this.nomore = json.message === 'no results'
        return json.data.song.list
      })
      .then(songs => this.append(songs))
      .then(() => this.done())
      .catch(() => this.done())
  }

  append(songs) {
    let html = songs.map(song => `
      <li class="song-item">
        <i class="icon icon-music"></i>
        <div class="song-name ellipsis">${song.songname}</div>
        <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' ')}</div>
      </li>`).join('')
    this.$songs.insertAdjacentHTML('beforeend', html)
  }

  loading() {
    this.fetching = true
    this.$el.querySelector('.search-loading').classList.add('show')
  }

  done() {
    this.fetching = false
    if (this.nomore) {
      this.$el.querySelectorAll('.loading-icon, .loading-text').forEach(el => el.style.display = 'none')
      this.$el.querySelector('.loading-done').style.display = 'block'
      this.$el.querySelector('.search-loading').classList.add('show')
    } else {
      this.$el.querySelector('.search-loading').classList.remove('show')
    }
  }
  
}