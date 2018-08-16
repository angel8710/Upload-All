function MeasureText(sText, oStyle, nFixedWidth, nFixedHeight){
	if(typeof(window._MeasurementLayer) == 'undefined'){
		window._MeasurementLayer = document.createElement("div");
		window._MeasurementLayer.style.position = "absolute";
		//window._MeasurementLayer.style.backgroundColor = '#FF0000';
		//window._MeasurementLayer.style.color = '#FFFFFF';
		window._MeasurementLayer.style.left = '0px';
		window._MeasurementLayer.style.top = '0px';
		window._MeasurementLayer.style.visibility = "hidden";
		//window._MeasurementLayer.style.fontSize = '1px';
		if(typeof(ExtendObject) == 'undefined')
			alert("ExtendObject required in MeasureText");
		ExtendObject(window._MeasurementLayer.style, oStyle);
		window._MeasurementLayer = document.body.appendChild(window._MeasurementLayer);
	}
	if(nFixedWidth)
		window._MeasurementLayer.style.width = nFixedWidth;	
	else if(nFixedHeight)
		window._MeasurementLayer.style.height = nFixedHeight;	

	window._MeasurementLayer.innerHTML = sText;
	//alert(window._MeasurementLayer.outerHTML);
	return new Array(window._MeasurementLayer.offsetWidth, window._MeasurementLayer.offsetHeight);
}