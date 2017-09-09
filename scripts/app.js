(function() {

  fetch('https://qq-music-api.now.sh')
    .then(res => res.json())
    .then(render)

  fetch('https://qq-music-api.now.sh/top')
    .then(res => res.json())
    .then(json => json.data.topList)
    .then(renderTopList)

  function render(json) {
    renderSlider(json.data.slider)
    renderRadios(json.data.radioList)
    renderPlaylists(json.data.songList)
    lazyload()
  }

  let search = new Search(document.querySelector('#search-view'))

  let player = new MusicPlayer(document.querySelector('#player'))

  document.querySelector('.show-player').addEventListener('click', () => {
    player.show()
  })

  function onHashChange() {
    let hash = location.hash
    if (/^#player\?.+/.test(hash)) {
      let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
      let options = matches && matches.reduce((res, cur) => {
        let arr = cur.split('=')
        res[arr[0]] = arr[1]
        return res
      }, {})
      player.play(options)
    } else {
      player.hide()
    }
  }

  onHashChange()
  window.addEventListener('hashchange', onHashChange);

  window.search = search
  window.player = player

  function renderSlider(slides) {
    slides = slides.map(slide => ({ link: slide.linkUrl, image: slide.picUrl }))
    new Slider({ el: document.querySelector('#slider'), slides })
  }

  function renderRadios(radios) {
    document.querySelector('.radios .list').innerHTML = radios.map(radio => 
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

  function renderPlaylists(playlists) {
    document.querySelector('.playlists .list').innerHTML = playlists.map(list =>
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

  function renderTopList(list) {
    document.querySelector('#rank-view .toplist').innerHTML = list.map(item => 
      `<li class="top-item">
      <div class="top-item-media">
        <a href="#">
          <img class="lazyload" data-src="${item.picUrl}">
        </a>
      </div>
      <div class="top-item-info">
        <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
        <ul class="top-item-list">
          ${songlist(item.songList)}
        </ul>
      </div>
    </li>`).join('')

    lazyload(document.querySelectorAll('#rank-view .toplist .lazyload'))

    function songlist(songs) {
      return songs.map((song, i) => 
        `<li class="top-item-song">
          <i class="song-index">${i + 1}</i>
          <span class="song-name">${song.songname}</span>- ${song.singername}
        </li>`).join('')
    }
  }
})()