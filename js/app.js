


(function ($) {
	
	// On load
	$(function(){
		
		$(".container").height($(document).height());
		
		
		$(".text p").each(function(){
			$(this).addClass("hyphenate").attr("lang","en");
		});
		
		Hyphenator.config({
			defaultlanguage: "en"
		});
		Hyphenator.run();
		
		letterSpacing($(".text p"));
		
	});
	
	// As of now, this breaks paragraphs into line & word elements
	// TODO: more accurate "first word of line" reading
	// TODO: how to equally space line letters
	
	function letterSpacing(el){
		el.each(function(){
			
			var text 	= $(this).html(),
				words	= text.split(" "),
				combo	= [];
			
			$.each(words, function(i,word){
				word = $.trim(word);
				var string = "<word>" + word + " </word>";
				combo.push(string);
			});
			
			var newHtml = combo.join("");
			$(this).html(newHtml);
			
			var prevPos = 0,
				arr = ["<line>"];
			$("word",this).each(function(){
				var pos		= $(this).offset().top,
					text	= $(this).html();
				
				if (prevPos==0) prevPos = pos;
				if (pos > prevPos) {
					arr.push("</line><line>");
					arr.push("<span>"+text+"</span>");
				} else {
					arr.push("<span>"+text+"</span>");
				}
				
				prevPos = pos;
			});
			
			newHtml = arr.join("");
			$(this).html(newHtml);
			
		});
	}
	
})(jQuery);



