const deleteBtns = document.querySelectorAll('.delete-btn')
const msgContainer = document.querySelector('.messages-contianer')
const loading = document.querySelector('.img')
const errorDiv = document.querySelector('#error')
const submitBtn = document.querySelector('#submitBtn')
const form = document.getElementById('messageForm')

//My Api Urls
const API_URL_POST = 'https://jose-chatbackend.herokuapp.com/messageObj' || 'http://localhost:3000/messageObj'
const API_URL_GET = 'https://jose-chatbackend.herokuapp.com/messages' || 'http://localhost:3000/messages'
const API_URL_DELETE = 'https://jose-chatbackend.herokuapp.com/deleteMsg/' || 'http://localhost:3000/deleteMsg/'
//Finish Api Urls 

loading.style.display = ''
errorDiv.style.display = 'none'

//get all messages to load function
listAllmsgs()
//finish loading messages function

//listen for submit event
form.addEventListener('submit', (e) => {
  
  loading.style.display = ''
  form.style.display = 'none'
  errorDiv.style.display = 'none'
  msgContainer.innerHTML = ''

  e.preventDefault()

  const formData = new FormData(form)
  const name = formData.get('name');
  const desc = formData.get('desc');

  let messageObject = {
    title: name,
    description: desc
  }

   fetch(API_URL_POST,{
    method: 'POST',
    body: JSON.stringify(messageObject),
    headers: {
      'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(error => {      
      
      errorDiv.style.display = ''
      errorDiv.innerHTML = error.message
      submitBtn.disabled = true

      setTimeout(() => {
      errorDiv.style.display = 'none'
      submitBtn.disabled = false
      },3000)
      
    })
    
  setTimeout(() => {
    listAllmsgs()
  }
  ,100)
  form.reset()
})

 function listAllmsgs() {

  console.log('started making HTML')

  fetch(API_URL_GET)
  .then(res => res.json())
  .then(data => data.reverse().forEach(obj => {

    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    const date = document.createElement('h6')
    const div = document.createElement('div')

    obj.title = obj.title + ':'

    h1.textContent = obj.title
    p.textContent = obj.description
    date.textContent = new Date(obj.date).toLocaleString()
    div.id = obj._id
    div.classList.add('msg-container')

    div.appendChild(h1)
    div.appendChild(p)
    div.appendChild(date)
    msgContainer.appendChild(div)

    loading.style.display = 'none'
    form.style.display = ''
  }))
}


//change colors interval

let colors = ['#22a6b3','#95afc0','#f9ca24','#686de0','#6ab04c','#badc58','#ffbe76','#ff7979']

setInterval(() => {
  
  let randomColor = colors[Math.floor(Math.random() * colors.length - 1)]
  const body = document.querySelector('.body')
  const loading = document.querySelector('.img')
  
  body.style.backgroundColor = randomColor
  loading.style.backgroundColor = randomColor

}, 4000)