$(function() {
  var add_user_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendResultToHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    add_user_list.append(html);
  }
  
  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    add_user_list.append(html);
  }

  function appendUserToHTML(user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user[0].id}'>
                  <p class='chat-group-user__name'>\n${user[0].name}\n</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users){
      $("#user-search-result").empty();
      var members = $('#chat-group-users').children().children('p').text();
      var splitMemberOne = members.replace(/\n\n/g, '*');
      var splitMemberTwo = splitMemberOne.replace(/\n/g, '');
      var member = splitMemberTwo.split("*");
      
      var reg = RegExp(input);

      var resultName = []
      users.forEach(function(user){
        if (member.indexOf(user.name) < 0) {
          resultName.push(user);
        }
      });

      if (input != '') {
        if (users.length !== 0)
        $.each(resultName, function(i, user){
          if (user.name.match(reg)) {
            appendResultToHTML(user);
          }
        })
        else {
        appendErrMsgToHTML("該当するユーザーがいませんでした");
        }
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  // $(document).on("click", ".chat-group-user__btn--add", function(){
  //   var name = $(this).siblings().text();
  //   $.ajax({
  //     type: 'GET',
  //     url: '/users',
  //     data: { keyword: name },
  //     dataType: 'json',
  //   })
  //   .done(function(user){
  //     appendUserToHTML(user);
  //   });
  //   $(this).parent().remove();
  // });

  // $(document).on("click", ".chat-group-user__btn--remove", function(){
  //   $(this).parent().remove();
  // });
});
