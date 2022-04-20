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
            console.log(response)
            return response.json();
        })
        .then(data => {
            let tweet = {
                post_id: data.id,
                post_user_id: data.POST_USER_ID,
                post_datetime: data.POST_DATETIME,
                post_text: data.POST_TEXT
            };
            this.tweetss.push(tweet)
            }
    },
    createFavorite: function(n) {
        console.log('Clicked!' + n)
        fetch('http://localhost:3000/FAVORITE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'POST_ID': n,
                'USER_ID': this.post_user_id[n]
            })
        })  
    }
}   
})
app.mount('#app')
