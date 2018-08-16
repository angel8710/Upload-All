// JavaScript Document
function like_add(profile_id){
  $.post('../likes/ajax/like_add.php', {profile_id:profile_id}, function(data){
      if(data == 'success_add'){
        document.getElementById('div1').innerHTML = 'ВЕЧЕ НЕ ХАРЕСВАМ <br />';
        like_get(profile_id);
      }
      else if(data == 'success_rem'){
        document.getElementById('div1').innerHTML = 'ХАРЕСВАМ <br />';
        like_get(profile_id);
      }
      else{
        alert(data);
      }
  
  }); 
}

function like_get(profile_id){
  $.post('../likes/ajax/like_get.php', {profile_id:profile_id}, function(data){
     $('#profile_'+profile_id+'_likes').text(data);
  
  });
  $.post('../likes/ajax/like_get_amur.php', {profile_id:profile_id}, function(data){
     $('#likeamur').text(data);
  
  });
}