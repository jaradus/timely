var timeCheck = function timeCheck() {

  // Get current client time
  now = new Date();
  // Get hour from client time
  hour = now.getHours();
  // Get minute from client time
  min = now.getMinutes();

  // If it's less than 10 minutes, you'll return e.g, 9 or 2. So we add a 0 beforehand, giving us e.g., 09
  if (min.toString().length < 2) {
    minutes = "0"+min;
  } else {
    minutes = min;
  };

  // Concatenates the hour and minutes into one string
  var time = hour.toString() + minutes.toString();
  console.log(time);
  return time

}