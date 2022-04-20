const app = Vue.createApp({
  data: () => ({
    tweets: []
  }),
  methods: {
    selectPost: function() {
      console.log('Clicked!')
      fetch('http://localhost:3000/POST', {
        method: 'GET'
      })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data[0].id);
        for(var i=0; i<data.length; i++){
          let tweet = {
            post_id: data[i].id,
            post_user_id: data[i].POST_USER_ID,
            post_datetime: data[i].POST_DATETIME,
            post_text: data[i].POST_TEXT
          };
          this.tweets.push(tweet);
        }
      });
    },
    createFavorite: function(n) {
      console.log('Clicked!' + n);
      fetch('http://localhost:3000/FAVORITE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'POST_ID': this.tweets.post_id,
          'USER_ID': this.tweets.post_user_id
        })
      });
    }
  }
})
app.mount('#app')
