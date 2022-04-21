const app = Vue.createApp({
  data: () => ({
    tweets: []
  }),
  mounted: function() {
    console.log('Clicked!')
    fetch('http://localhost:3000/POST', {
      method: 'GET'
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      var n = 0;
      for(var i=data.length-1; i>=0; i--){
        let tweet = {
          soeji: n,
          post_id: data[i].id,
          post_user_id: data[i].POST_USER_ID,
          post_datetime: data[i].POST_DATETIME,
          post_text: data[i].POST_TEXT,
          post_fav_cnt: data[i].POST_FAV_CNT,
          is_edit_mode: false,
          post_text_bef_edit: data[i].POST_TEXT,
          message: ''
        };
        this.tweets.push(tweet);
        n++;
      }
    });
  },
  methods: {
    // 編集モードのオンオフ切替
    changeMode: function(n){
      // 編集モードをオフ→オン
      this.tweets[n].is_edit_mode = !(this.tweets[n].is_edit_mode)
    },
    // 編集モードをやめる
    quitEdit: function(n){
      // テキストエリアに編集前の本文を格納
      this.tweets[n].post_text = this.tweets[n].post_text_bef_edit
      // エラーメッセージをクリア
      this.tweets[n].message = ''
      // 編集モードをオン→オフ
      this.tweets[n].is_edit_mode = !(this.tweets[n].is_edit_mode)
    },
    // ツイート本文の更新
    updateText: function(n) {
      // 文字数チェック
      if(this.tweets[n].post_text.length > 140){
        this.tweets[n].message = '140文字以内で入力してください'
        return
      }
      if(this.tweets[n].post_text.length == 0){
          this.tweets[n].message = '文字数0の状態で投稿できません'
          return
      }
      // ツイート本文の更新
      fetch('http://localhost:3000/POST/' + this.tweets[n].post_id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'POST_TEXT': this.tweets[n].post_text
        })
      });
      // エラーメッセージをクリア
      this.tweets[n].message = ''
      // 編集モードをオン→オフ
      this.tweets[n].is_edit_mode = !(this.tweets[n].is_edit_mode)
    },
    // FAVORITEテーブルの登録
    createFavorite: function(n) {
      console.log('Clicked!' + n);
      fetch('http://localhost:3000/FAVORITE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'POST_ID': this.tweets[n].post_id,
          'USER_ID': this.tweets[n].post_user_id
        })
      });
      console.log(this.tweets[n].post_fav_cnt);
      // いいねカウント数のインクリメント
      this.tweets[n].post_fav_cnt += 1
      // POSTテーブルの「いいねカウント数」の更新
      fetch('http://localhost:3000/POST/' + this.tweets[n].post_id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'POST_FAV_CNT': this.tweets[n].post_fav_cnt
        })
      });
    }
  }
})
app.mount('#app')
