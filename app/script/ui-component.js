
$(document).ready(function(){
  $('.tabContentReturn').hide();
  $('.divOneway').hide();
  $('.divReturn').hide();
  $('.showRange').hide();
  $(".tabs a:first").addClass('activeTab');
 // $('.tabContentOneWay:first').show();
  $(".tabs a").click(function(e){
    $(".tabs a").removeClass('activeTab');
    $(this).addClass('activeTab');
    $('.tabContentOneway').hide();
    $('.tabContentReturn').hide();
    var el = $(this).attr('href');
    $(el).show();
   return false;
  });

}); 
