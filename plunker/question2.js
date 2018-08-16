$(document).ready(function () {
  $('#get-data-question2').click(function () {
    var showData = $('#show-data-question2');

    $.getJSON('question2.json', function (data) {
      console.log(data);

      var questionTwo = data.questionTwo.map(function (item) {
        return item.question + ': ' + item.id;
      });

      showData.empty();

      if (questionTwo.length) {
        var content = '<li>' + questionTwo.join('</li><li>') + '</li>';
        var list = $('<ul />').html(content);
        showData.append(list);
      }
    });

    showData.text('Loading the JSON file.');
  });
});
