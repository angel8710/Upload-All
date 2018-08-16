animatedcollapse.addDiv('sec1', 'fade=1')
animatedcollapse.addDiv('sec2', 'fade=1')
animatedcollapse.addDiv('sec3', 'fade=1')
animatedcollapse.addDiv('sec4', 'fade=1')
animatedcollapse.addDiv('sec5', 'fade=1')
animatedcollapse.addDiv('sec6', 'fade=1')
animatedcollapse.addDiv('sec7', 'fade=1')
animatedcollapse.addDiv('sec8', 'fade=1')
animatedcollapse.addDiv('sec9', 'fade=1')
animatedcollapse.addDiv('sec10', 'fade=1')
animatedcollapse.addDiv('sec11', 'fade=1')
animatedcollapse.addDiv('sec12', 'fade=1')
animatedcollapse.addDiv('sec13', 'fade=1')
animatedcollapse.addDiv('sec14', 'fade=1')
animatedcollapse.addDiv('sec15', 'fade=1')
animatedcollapse.addDiv('sec16', 'fade=1')
animatedcollapse.addDiv('sec17', 'fade=1')
animatedcollapse.addDiv('sec18', 'fade=1')
animatedcollapse.addDiv('sec19', 'fade=1')
animatedcollapse.addDiv('sec20', 'fade=1')
animatedcollapse.addDiv('sec21', 'fade=1')
animatedcollapse.addDiv('sec22', 'fade=1')
animatedcollapse.addDiv('sec23', 'fade=1')
animatedcollapse.addDiv('sec24', 'fade=1')
animatedcollapse.addDiv('sec25', 'fade=1')
animatedcollapse.addDiv('sec25', 'fade=1')
animatedcollapse.addDiv('sec27', 'fade=1')
animatedcollapse.addDiv('sec28', 'fade=1')
animatedcollapse.addDiv('sec29', 'fade=1')
animatedcollapse.addDiv('sec30', 'fade=1')
animatedcollapse.addDiv('sec31', 'fade=1')
animatedcollapse.addDiv('sec32', 'fade=1')
animatedcollapse.addDiv('sec33', 'fade=1')
animatedcollapse.addDiv('sec34', 'fade=1')
animatedcollapse.addDiv('sec35', 'fade=1')
animatedcollapse.addDiv('sec36', 'fade=1')
animatedcollapse.addDiv('sec37', 'fade=1')
animatedcollapse.addDiv('sec38', 'fade=1')
animatedcollapse.addDiv('jason', '')
animatedcollapse.ontoggle=function($, divobj, state){ //fires each time a DIV is expanded/contracted
	//$: Access to jQuery
	//divobj: DOM reference to DIV being expanded/ collapsed. Use "divobj.id" to get its ID
	//state: "block" or "none", depending on state
}

animatedcollapse.init()
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}