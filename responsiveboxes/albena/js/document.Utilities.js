//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Find(sId){
	if (document.all) return document.all[sId];
	if (document.getElementById) return document.getElementById(sId);
	return false;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CreateImage(sSrc, nWidth, nHeight){
	var oImage;
	oImage = document.createElement("img");
	oImage.src = sSrc;
	if(nHeight) oImage.height = nHeight;
	if(nWidth) oImage.width = nWidth;
	return oImage;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PlaceLayers(sParent, sLayer){
	var oParent = Find(sParent);
	var oLayer = Find(sLayer);
	if(!oParent || !sLayer) return;
	var arCoordinates = GetCoordinates(oParent);
	if(oLayer.offsetWidth < oParent.offsetWidth) 
		oLayer.style.width = oParent.offsetWidth;
	oLayer.style.top = arCoordinates[1] + oParent.offsetHeight;
	oLayer.style.left = arCoordinates[0];
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ChangeBgColor(oElement, sColor){
	oElement.oldBgColor = oElement.style.backgroundColor;
	oElement.style.backgroundColor=sColor;
}

function RestoreBgColor(oElement){
	oElement.style.backgroundColor = oElement.oldBgColor;
}

