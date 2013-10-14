function suggestedWords(words) {
  var suggestedWord;
  $(".js-suggested-words").append('<h1>Did you mean?</h1>');
  for (var index = 0; index <  words.length; index++) {
    suggestedWord = "<div class=word>" + words[index] + "</div>";
    $(".js-suggested-words").append(suggestedWord);
  }
  $(".js-suggested-words").show();
}

function checkSpelling(word) {
  $.ajax("/spelt/" + word + "/correctly", {
    dataType: "json",
    data: {},
    success: function (data, response, xhr) {
      var words = data;
      if (words.length) {
        return suggestedWords(words);
      }
      $(".js-correct").text(word + " was spelt correctly.").show();
    },
    error: function (data, response, xhr) {
      $(".js-correct").hide();
      $('.js-suggested-words').hide();
    }
  });
}

$(document).ready(function () {
  $("#js-button").on("click", function (evt) {
    evt.preventDefault();
    var word = $("#js-word").val();
    $("#js-word").val('');
    $(".js-correct").hide();
    $(".js-suggested-words").children().remove();
    checkSpelling(word);
  });
});