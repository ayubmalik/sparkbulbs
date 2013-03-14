var db = {}; // Only use global var as a hack!

var getData = function() {
	$.get('sparkbulbs-data.json', function(data) {
		db = data;
		console.log('got data:', db);
	});
};

var isIn = function(time, start, end) {
	if (time >= start && time <= end) {
//		console.log('found entry at: ', time);
		return true;
	}

	return false;
};


var addItemToSidebar  = function(matches, currentItemIndex) {
	console.log('matches: ', matches, currentItemIndex);
	var markup = $("#sb-item").html();
};

var sparkLookup = function() {
	var player = this;
	var cueTime = player.currentTime().toFixed(2);
	var matches = jQuery.grep(db.captions, function(elem, i) {
		return isIn(cueTime, elem.start, elem.end);
	});
	
	if (matches.length) {
		showBulb(player);
		
		addItemToSidebar(matches, i);
		
	} else {
		hideBulb(player);
	}
};

var showBulb = function() {
	var offset = $("#sparkbulb-player").offset();
	var imgLeft = (offset.left + $("#sparkbulb-player").width()) - 64;
	var imgTop = (offset.top + $("#sparkbulb-player").height()) - 110;
	
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
	$("#sparkbulb-sidebar").toggle("slow");
};

var bindClicks = function() {
	$("#eureka").click(function(){
		toggleSidebar();
	});
};

_V_("sparkbulb-player").ready(function() {
	getData();
	var myPlayer = this;
	myPlayer.addEvent("timeupdate", sparkLookup);
	myPlayer.play();
	bindClicks();
	console.log("Spark bulbs ready!");
});

