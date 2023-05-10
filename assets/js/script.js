// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var blocks = $(".time-block");
var currentHour;



const clock = setInterval(() => {
  $("#currentDay").text(dayjs().format("MMMM D YYYY, h:mm:ss a"));
}, 1000);

$(function () {
  currentHour = parseInt(dayjs().format("H"));
  for (let i = 0; i < blocks.length; i++) {
    var tempBlock = $(blocks[i]);
    var tempBlockHour = parseInt(tempBlock.attr("id"));
    if (tempBlockHour < currentHour) {
      tempBlock.addClass("past");
    } else if (tempBlockHour === currentHour) {
      tempBlock.addClass("present");
    } else if (tempBlockHour > currentHour) {
      tempBlock.addClass("future");
    }
    if (localStorage.getItem(tempBlockHour) !== null) {
      tempBlock.children(".description").val(localStorage.getItem(tempBlockHour));
    }
    
  }
});

$(".saveBtn").on("click", function () {
  var text = $(this).siblings(".description").val();
  var time = $(this).parent().attr("id");

  localStorage.setItem(time, text);
}
);