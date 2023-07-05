
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(document).ready(function () {

// Sets current Date and Time at header of page down to the second and counting.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?


// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
$(function () {
  var workDayHour = [
    { time: "9 AM", description: "", index: 'hour0' },
    { time: "10 AM", description: "", index: 'hour1' },
    { time: "11 AM", description: "", index: 'hour2' },
    { time: "12 PM", description: "", index: 'hour3' },
    { time: "1 PM", description: "", index: 'hour4' },
    { time: "2 PM", description: "", index: 'hour5' },
    { time: "3 PM", description: "", index: 'hour6' },
    { time: "4 PM", description: "", index: 'hour7' },
    { time: "5 PM", description: "", index: 'hour8' },
  ];

  var savedWorkDescription = JSON.parse(localStorage.getItem("workDayHour")) || workDayHour;

  if (savedWorkDescription) {
    workDayHour = savedWorkDescription;
  }


  workDayHour.forEach(function (timeBlock, index) {
    var timeArea = timeBlock.time;
    var blockColor = colorRow(index);
    var row =
      `<div class="time-block${blockColor}" id="hour${index}" index="${index}">
      <div class="row no-gutters">
      <div class="col-2 col-md-1 hour text-center py-3">${timeArea}</div>
      <textarea class="col-8 col-md-10 description" rows="3"></textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>
      </div>
      '</div>`;

    $("#hour-container").append(row);

  });

  function colorRow(index) {
    var currentHour = dayjs().hour();
    var hour = index + 9;
    if (hour < currentHour) {
      return "past";
    } else if (hour === currentHour) {
      return "present";
    } else {
      return "future"
    };
  }

  function updateTime() {
    var now = dayjs();
    var formattedDateTime = now.format('MMM DD, YYYY hh:mm:ss A');
    $("#currentDayTime").text(formattedDateTime);
  }
  updateTime();
  setInterval(updateTime, 1000);

  $(document).on("click", ".saveBtn", function () {
    var timeBlock = $(this).closest(".time-block");
    var index = parseInt(timeBlock.attr("index"));
    var description = timeBlock.find(".description");
    workDayHour[index].description = description.val();
    localStorage.setItem("workDayHour", JSON.stringify(workDayHour));
  });


  for (let i = 0; i < savedWorkDescription.length; i++) {
    var timeBlockId = savedWorkDescription[i].index;
    var timeBlock = $(`#${timeBlockId}`).closest(".time-block");
    var description = timeBlock.find(".description");
    description.val(savedWorkDescription[i].description)
  }

});


// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//


// save description data to local storage and have it persist when page is refreshed
// set colors to past, present and future rows