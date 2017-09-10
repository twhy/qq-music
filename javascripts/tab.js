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