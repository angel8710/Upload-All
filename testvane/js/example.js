$(document).ready(function () {
  $('#get-data').click(function () {
    var showData = $('#show-data');

    $.getJSON('example.json', function (data) {
      console.log(data);

      var items = data.items.map(function (item) {
        return item.key + ': ' + item.value;
      });

      showData.empty();

      if (items.length) {
        var content = '<li>' + items.join('</li><li>') + '</li>';
        var list = $('<ul />').html(content);
        showData.append(list);
      }
    });

    showData.text('Loading the JSON file.');
  });
});

$.getJSON("new.json", function(data){
        // I have placed alert here previously and realized it doesn't go into here
        $.each(data.streetCity, function(i,s){
            alert(s);
        });
    }).error(function(jqXhr, textStatus, error) {
                alert("ERROR: " + textStatus + ", " + error);
    });