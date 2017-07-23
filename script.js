var movieName = $('#movieName');
var btn = $('#getMovie');


btn.on('click',function(){
    doAjax();
})

$(document).on('click','.glyphicon-remove',function(){
  $(this).parent().fadeOut(200, function(){ $(this).remove();});
})

document.onkeypress = function(evt){
  if (evt.keyCode === 13){
    doAjax();
  }
}

function doAjax(){
  var movie = movieName.val();
  if (movie){
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      if (!response.Error && !document.getElementById(response.Title)){
        // Getting the first row of the table
        var table = $("table")
        .children()
        .eq(1)

        var row = $('<tr>');
        row.attr('id',response.Title);
        var data1 = $('<td>');
        var data2 = $('<td>');
        var data3 = $('<td>');
        var data4 = $('<td>');
        var data5 = $('<td>');
        var data6 = $('<button>');
        var img = $('<img>');

        // Setting the inner text of each td in the first row
        data1.text(response.Title);
        data2.text(response.Year);
        data3.text(response.Actors);
        data4.text(response.imdbRating);
        img.attr('src',response.Poster);
        data6.addClass('btn removeBtn glyphicon glyphicon-remove');

        row.append(data1);
        row.append(data2);
        row.append(data3);
        row.append(data4);
        data5.append(img);
        row.append(data5);
        row.append(data6);

        table.append(row);

        // Scrolls table div to bottom with javascript
        var elem = document.getElementById('table-responsive');
        elem.scrollTop = elem.scrollHeight;

        movieName.val(''); // Clears search box
      }
    });
  }

}
