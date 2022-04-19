import { createApp } from 'vue'

const app = createApp(
  fetch('http://localhost:3000/POST', {
    method: 'GET'
  })
  .then(response => {
    console.log(response)
    return response.json();
  })
  .then(data => {
    var text = document.getElementById('data');
    for(var i=0; i < data.length;i++){
      text.innerHTML += `test ${data[i].POST_USER_ID} ${data[i].POST_DATETIME}  <br> ${data[i].POST_TEXT} <br> <button>いいね</button> <br> <br>`;
    }
  })
);

app.mount('#searchall');

export default {
  name: 'App',
};