function parseData(data)
{
  $('#showThumb').attr('src', data['meta']['image']['original']);
  $('#showInfo .col-lg-3 .caption h3').text(data['meta']['keyword'])

  var arrayLengths = [data['1080p'].length, data['720p'].length, data['sd'].length]
  var maxNum = Math.max(...arrayLengths)

  // Get the last child
  var lastChild = $('#episodeLinks > tbody tr:last-child').clone();

  // Clear the table
  $('#episodeLinks > tbody').empty();

  lastChild.children().each(function(i)
  {
    $(this).text("");
  });

  // Fill it with new - empty - entries
  for (var i = 1; i <= maxNum; i++)
  {
    var row = lastChild.clone()
    $(row.children()[0]).text(i);
    $('#episodeLinks > tbody:last-child').append(row);
  }

  var index = 1

  for (var item of data['1080p'])
  {
    var link = `<a href="${item.url}">Download</a> (${item.classification.source}) ${item.sizeHumanReadable}`
    var child = $('#episodeLinks > tbody tr:nth-child('+index+')').children()[1]
    $(child).html(link);
    index++;
  }

  index = 1

  for (var item of data['720p'])
  {
    var link = `<a href="${item.url}">Download</a> (${item.classification.source}) ${item.sizeHumanReadable}`
    var child = $('#episodeLinks > tbody tr:nth-child('+index+')').children()[2]
    $(child).html(link);
    index++;
  }

  index = 1

  for (var item of data['sd'])
  {
    var link = `<a href="${item.url}">Download</a> (${item.classification.source}) ${item.sizeHumanReadable}`
    var child = $('#episodeLinks > tbody tr:nth-child('+index+')').children()[3]
    $(child).html(link);
    index++;
  }

  index = 1

  $("#parsingStatus span").addClass("done").text("done");
  $("#status").fadeOut()
  $("#showInfo").fadeIn()

  // Clear the search field since we have our results now.
  $('#searchfield').val("");

  // Remove status done classes.
  $("sendRequestStatus span").removeClass("done")
  $("#responseStatus span").removeClass("done")
  $("#parsingStatus span").removeClass("done")
}


function sendSearchRequest()
{
  var searchQuery = $('#searchfield').val();

  if (searchQuery == "")
  {
    alert("Empty query. Not doing anything.")
    return;
  }

  $("#status").fadeIn()
  $("#showInfo").fadeOut()

//  $.ajax( "http://localhost:3020/search/latest:" + searchQuery )
  $.ajax( "http://tor.sc2.nl/search/latest:" + searchQuery )
    .done(function(data) {
      //alert( "success" + data );
      console.log(data)
      $("#responseStatus span").addClass("done").text("done");
      parseData(data);
    })
    .fail(function() {
      alert( "error" );
    });

  $("#sendRequestStatus span").addClass("done").text("done");
}

$( document ).ready(function() {
  $('#searchfieldSubmit').click(function() {
    sendSearchRequest();
  });

  $('#searchfield').keypress(function (e) {
    if(e.which == 13)  // the enter key code
    {
      sendSearchRequest();
      return false;
    }
  });

});
