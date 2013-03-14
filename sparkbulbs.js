var db = {}; // Only use global var as a hack!

var getData = function() {
	$.get('sparkbulbs-data.json', function(data) {
		db = data;
		console.log('got data:', db);
	});
};

var isIn = function(time, start, end) {
	if (time >= start && time <= end) {
		return true;
	}
	return false;
};

var popKeyword = function(keyword) {
	var index = 0, matched = false;
	$.each(db.captions, function (i, item) {
		if (!matched && item.keyword === keyword) {
			index = i;
			matched = true;
		}
	});
	db.captions.splice(index, 1);
};

var addItemToSidebar  = function(matches) {
	var markup = "<li class=\"sidebar-item\"><aside><img src=\"buildassets/Images for sidebar/${sbimage}\" /><h5>${sbtitle}</h5><p>${sbsynopsis}</p></aside></li>";
	var keyword = matches[0].keyword;
	var guides = jQuery.grep(db.guides, function(elem, i) {
		return elem.keyword === keyword;
	});
    var data = {sbtitle: guides[0].content[0].title, sbsynopsis: guides[0].content[0].synopsis, sbimage:guides[0].content[0].thumbnail, sburl: guides[0].content[0].url};
    $.template("sbitem", markup);
	$.tmpl("sbitem", data).prependTo("#sparkbulb-sidebar ul").fadeIn();
	popKeyword(keyword);
};

var sparkLookup = function() {
	var player = this;
	var cueTime = player.currentTime().toFixed(2);
	var matches = jQuery.grep(db.captions, function(elem, i) {
		return isIn(cueTime, elem.start, elem.end);
	});
	
	if (matches.length) {
		showBulb(player);
		addItemToSidebar(matches);
	}
//	} else {
//		hideBulb(player);
//	}
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
    
	setTimeout(function(){
    	$("#eureka").fadeOut();
    }, 10000);
    
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
	getData();
	var myPlayer = this;
	myPlayer.addEvent("timeupdate", sparkLookup);
	myPlayer.play();
	bindClicks();
	console.log("Spark bulbs ready!");
});

