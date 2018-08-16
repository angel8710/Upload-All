//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetBrowserName(){
	if(navigator.userAgent.toLowerCase().indexOf("opera") != -1){
		return "Opera";
	}else if(navigator.userAgent.toLowerCase().indexOf("gecko") != -1){
		return "Mozilla";
	}else if(navigator.userAgent.toLowerCase().indexOf("msie") != -1){
		return "IE";
	}
}

// Ima veche takava funkciq v main.js
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function WinOpen(url, width, height, name, top, left, scroll, status, resizable, menubar){
//	if(!status) status = 0;
//	if(!scroll) scroll = 'no';
//	var sName = Math.round(Math.random() * 999999999);	
//	if(!name) name = 'WinOpen'+ sName.toString();
//	if(!width) width = '600';
//	if(!height) height = '450';
//	if(!resizable) resizable = 'no';
//	if(!menubar) menubar = 'no';
//	if(!top) top = (screen.height-height)/2 - 40;
//	if(!left) left = (screen.width-width)/2;
//	properties='history=no, toolbar=0, location=0, directories=0, scrollbars='+scroll+', status='+status+', menubar='+menubar+', width='+width+', height='+height+', top='+top+', left='+left+', resizable='+resizable+'';
//	window.open(url, name, properties);
//}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CBrowserWindow(sURL, nWidth, nHeight){
	var sBrowserName = GetBrowserName();
	
	if(sURL.length)
		this.sURL = sURL;
		
	this.nWidth = 480;
	if(nWidth)
		this.nWidth = nWidth;
		
	this.nHeight = 360;
	if(nHeight)
		this.nHeight = nHeight;
		
	var sTempName = Math.round(Math.random() * 999999999);
	this.sWindowName = 'Window'+ sTempName.toString();
	this.nTop = (screen.height - this.nHeight) / 2 - 40;
	this.nLeft = (screen.width - this.nWidth) / 2;
	
	this.nResizable = 0;
	this.nMenubar = 0;
	this.nStatusBar = 0;
	this.nScrollBars = 0;
	this.nLocationBar = 0;
	this.nToolBar = 0;
	this.nModal = 0;
	this.vWindowArguments = '';
	this.oWindow = null;
	
	this.Open = function(){
		var sAdditional = "";
		
		if(this.nStatusBar)
			sAdditional += "status = 1; ";
		else
			sAdditional += "status = 0; ";
		
		if(this.nStatusBar)
			sAdditional += "status: yes; ";
		else
			sAdditional += "status: no; ";
			
		if(this.nModal)
			sAdditional += "modal = yes; ";
		else
			sAdditional += "modal = no; ";
		
		if(this.nScrollBars)
			sAdditional += "scroll: yes; ";
		else
			sAdditional += "scroll: no; ";
				
		var sFeatures = sAdditional +"channelmode = 0, directories = 0, fullscreen = 0, location = "+ this.nLocationBar +", menubar = "+ this.nMenubar +", resizable = "+ this.nResizable +", scrollbars = "+ this.nScrollBars +", status = "+ this.nStatusBar +", toolbar = "+ this.nToolBar +", height = "+ this.nHeight +", width = "+ this.nWidth +", left = "+ this.nLeft +", top = "+ this.nTop +"";
		
		if(sBrowserName == "IE" && this.nModal == 1)
			this.oWindow = window.showModalDialog(this.sURL, this.vWindowArguments, sFeatures);
		else
			this.oWindow = window.open(this.sURL, this.sWindowName, sFeatures);
	}
	
	this.Close = function(){
		this.oWindow.close();
	}
	
	this.GetWindow = function(){
		return this.oWindow;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

