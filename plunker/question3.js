$(document).ready(function () {
  $('#get-data-question3').click(function () {
    var showData = $('#show-data-question3');

    $.getJSON('question3.json', function (data) {
      console.log(data);

      var items = data.items.map(function (item) {
        return item.question + ': ' + item.id;
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
