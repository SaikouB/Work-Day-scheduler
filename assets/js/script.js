$(function () {

  // Updates date and time live on webpage using 'MMM DD, YYYY hh:mm:ss A' dayjs format.
  function updateTime() {
    var now = dayjs();
    var formattedDateTime = now.format('MMM DD, YYYY hh:mm:ss A');
    $("#currentDayTime").text(formattedDateTime);
  }
  updateTime(); // Calls function to update time
  setInterval(updateTime, 1000); // 1 second time interval

  // Work day hour array to inlcude time, description, index hour and hour of day in 24hr format
  var workDayHour = [
    { time: "9 AM", description: "", index: 'hour0', hour: 9 },
    { time: "10 AM", description: "", index: 'hour1', hour: 10 },
    { time: "11 AM", description: "", index: 'hour2', hour: 11 },
    { time: "12 PM", description: "", index: 'hour3', hour: 12 },
    { time: "1 PM", description: "", index: 'hour4', hour: 13 },
    { time: "2 PM", description: "", index: 'hour5', hour: 14 },
    { time: "3 PM", description: "", index: 'hour6', hour: 15 },
    { time: "4 PM", description: "", index: 'hour7', hour: 16 },
    { time: "5 PM", description: "", index: 'hour8', hour: 17 }
  ];

  // Work day hour loop for each time block row
  workDayHour.forEach(function (timeBlock, index) {
    var timeArea = timeBlock.time;
    var blockColor = colorRow(index);
    var row = // Adds rows to html dynamically by template string
      `<div class="time-block ${blockColor}" id="hour${index}" index="${index}">
    <div class="row">
    <div class="col-2 col-md-1 hour text-center py-3">${timeArea}</div>
    <textarea class="col-8 col-md-10 description" rows="3"></textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>
    </div>
    </div>`;

    //Appends id of hour-container and adds rows for time-blocks under parent element "<div>"
    $("#hour-container").append(row);
  });

  // Applys color to rows based on if past, present, or future, leveraged by CSS
  function colorRow(index) {
    var currentHour = dayjs().hour();
    var blockHour = workDayHour[index].hour;
    if (blockHour < currentHour) {
      return "past";
    } else if (blockHour === currentHour) {
      return "present";
    } else {
      return "future";
    }
  }

  // Adds click function to save button for each row using jquery and sets work-day hour to local storage
  $(document).on("click", ".saveBtn", function () {
    var timeBlock = $(this).closest(".time-block");
    var index = parseInt(timeBlock.attr("index"));
    var description = timeBlock.find(".description");
    workDayHour[index].description = description.val();
    localStorage.setItem("workDayHour", JSON.stringify(workDayHour));
  });

  // Gets saved description from local storage and persists it on the page
  var savedWorkDescription = JSON.parse(localStorage.getItem("workDayHour")) || workDayHour.val();
  var workDayHour = savedWorkDescription;

  // When page refreshes or reloads, adds saved description to time blocks from local storage
  for (var i = 0; i < savedWorkDescription.length; i++) {
    var timeBlockId = savedWorkDescription[i].index;
    var timeBlock = $(`#${timeBlockId}`).closest(".time-block");
    var description = timeBlock.find(".description");
    description.val(savedWorkDescription[i].description);
  }
});