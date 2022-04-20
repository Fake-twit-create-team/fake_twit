const app = Vue.createApp({
    data: () =>({
        message: '',
        text: ''
    }),
    methods: {
        onClick: function(){
            if(this.text.length > 140){
                this.message = '140文字以内で入力してください'
                return
            }
            if(this.text.length == 0){
                this.message = '文字数0の状態で投稿できません'
                return
            }
            var replyPostId = null

            // URLを取得
            let url = new URL(window.location.href);

            // URLSearchParamsオブジェクトを取得
            let params = url.searchParams;
            if(params.get('id') != null){
                replyPostId = params.get('id')
            }

            fetch('http://localhost:3000/POST', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'POST_USER_ID': 'testuser',
                    'POST_DATETIME': new Date().toLocaleString(),
                    'POST_TEXT': this.text,
                    'REPLY_POST_ID': replyPostId,
                    'POST_IMAGE_ID': null,
                    'POST_FAV_CNT': 0
                })
            }).then(res => res.json()).then(console.log);

            this.message = 'ツイートしました'
            //location.reload()
        }
    }
})
app.mount('#twitCreate')