var keywords = [
                {"start":10, "end": 19, "keyword": "curiosity"}, 
                {"start":20, "end": 30, "keyword": "curiosity"}, 
                {"start":45, "end": 50, "keyword": "martian"}, 
                {"start":60, "end": 70, "keyword": "space"}
                ];

var isIn = function(time, start, end) {
	if (time >= start && time <= end) {
//		console.log('found entry at: ', time);
		return true;
	}

	return false;
};

var sparkLookup = function() {
	var player = this;
	var cueTime = player.currentTime().toFixed(2);
	var matches = jQuery.grep(keywords, function(elem, i) {
		return isIn(cueTime, elem.start, elem.end);
	});
	
	if (matches.length) {
		showBulb(player);
	} else {
		hideBulb(player);
	}
};

var showBulb = function() {
	var offset = $("#sparkbulb-player").offset();
	var imgLeft = (offset.left + $("#sparkbulb-player").width()) - 64;
	var imgTop = (offset.top + $("#sparkbulb-player").height()) - 110;
	
//	console.log("pos", imgTop, imgLeft);
	
	$("#eureka").css({
	       position:'absolute',
	       top: imgTop,
	       left:imgLeft,
	       zIndex:5000
	     });
	$("#eureka").fadeIn();
};

var hideBulb = function(player) {
	$("#eureka").fadeOut();
};

var toggleSidebar = function() {
	console.log("toggling sidebar");
	$("#sparkbulb-sidebar").toggle();
};

var bindClicks = function() {
	$("#eureka").click(function(){
		toggleSidebar();
	});
};

_V_("sparkbulb-player").ready(function() {
	var myPlayer = this;
	myPlayer.addEvent("timeupdate", sparkLookup);
	myPlayer.play();
	bindClicks();
	console.log("Spark bulbs ready!");
});

