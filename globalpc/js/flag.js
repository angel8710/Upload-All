function flag_add(profile_id){
   var answer = confirm("Сигурни ли сте, че искате да сигнализирате за нередност, свързана с този потребител?")
    if (answer){
        $.post('../flag_block/ajax/flag_add.php', {profile_id:profile_id}, function(data){
        if(data == 'success_add'){
          document.getElementById('flag').innerHTML = 'Вече сте сигнализирали за този потребител';
        }
        else{
          alert(data);
        }
    });
  } 
}