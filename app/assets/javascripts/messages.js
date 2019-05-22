$(function() {
  var buildMessageHTML = function(message) {
    var content = message.content ? `<p>${message.content}</p>` : "";
    var image = message.image.url ? `<img class="lower-message__image" src="${message.image.url}">` : "";
    var groupNum = $('.message').last().data('group');
    var html = `<div class="message" data-group="${groupNum}" data-id="${message.id}">
                  <div class="upper-message">
                  <div class="mupper-message__user-name">
                  ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div lower-meesage">
                    ${content}
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      type: 'POST',
      url: url,
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMessageHTML(data);
      $('.main__group').append(html);
      $('form').get(0).reset();
      var height = $('.message').last().offset().top + $('.main__group').scrollTop();
      $('.main__group').animate({
        scrollTop: height
        }, 300, 'swing'
      );
    })
    .fail(function(data) {
      alert("メッセージ送信は出来ませんでした");
    })
    .always(function(data){
      $('.main__form__submit').prop('disabled', false);
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id');
    group_id = $('.message').last().data('group');
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      data: {id: last_message_id, group_id: group_id},
      dataType: 'json'
    })
    .done(function(messages) {
      messages.forEach(function(message){
        var html = buildMessageHTML(message);
        $('.main__group').append(html);
        var height = $('.message').last().offset().top + $('.main__group').scrollTop();
        $('.main__group').animate({
          scrollTop: height
          }, 300, 'swing'
        );
      });
    })
    .fail(function() {
    });
  }

  reg = new RegExp('groups\/\\d\/messages');
  if (location.href.match(reg)) {
    setInterval(reloadMessages, 5000);
  }
});