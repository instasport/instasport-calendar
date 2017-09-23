 jQuery(document).ready(function($) {
  

  
  showHideCalendar();


  //alert(1212);
  $("#calendarModal .close").click(function(){
    $("#calendarModal").css({"display":"none"});
  });
  /*
  var modal = document.getElementById('calendarModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal 
  btn.onclick = function() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }*/

});



jQuery(window).resize(function(){
  showHideCalendar();
});



 function showHideCalendar(){
    var widthForMycalendarMobile = parseInt(jQuery(".for-mycalendar-mobile").css("width"), 10);
    var widthForMycalendarDesktop = parseInt(jQuery(".for-mycalendar-desktop").css("width"), 10);
    //console.log(widthForMycalendarMobile+" - "+widthForMycalendarDesktop);
    if(widthForMycalendarMobile < 900 || widthForMycalendarDesktop < 900){
      jQuery(".mycalendar-desktop").hide();
      jQuery(".mycalendar-mobile").show();
    }else{
      jQuery(".mycalendar-desktop").show();
      jQuery(".mycalendar-mobile").hide();
    }
 }