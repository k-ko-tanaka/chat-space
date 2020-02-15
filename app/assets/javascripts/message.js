$(function(){

  var buildHTML = function(message) {
    if (message.content && message.image) {   //data-idが反映されるようにしている
      var html =
       `<div class="message" data-message-id="${message.id}">   
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="message__text__content">
              ${message.content}
            </p>
          </div>  
          <img src="${message.image}" class="message__text__image" >
        </div>`
      return html;

    } else if (message.content) {
      var html =
       `<div class="message" data-message-id="${message.id}">
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="message__text__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;

    } else if (message.image) {
      var html = 
       `<div class="message" data-message-id="${message.id}">
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
          <img src="${message.image}" class="message__text__image" >
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: "POST",  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  });

  // 自動更新
  var reloadMessages = function() {  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({  //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",  //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',  //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';    //追加するHTMLの入れ物を作る
      $.each(messages, function(i, message) {  //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);  //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function () {
      alert('自動更新に失敗しました');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000); 
  }
});