/*********************************************************************/
function CMenuTemplate(){
	this.sMenuImagesPath = "Images/";
	
	this.m_bOpenToTheLeft = false;
	
	this.m_nLeftMenuOffset = 0;
	this.m_nTopMenuOffset = 1;
	
	this.m_nItemHeight = 17;
	this.m_nItemPadding = 0;
	this.m_nItemBorderPxWidth = 0; 
	
	this.m_nItemLeftOffset = 4; 
	this.m_sItemMOBkgrColor = "#A9B7C9"; 
	this.m_sItemFontColor = "#000000"; 
	
	this.m_sItemMOFontColor = "#FFFFFF";
	this.m_sItemBorderColor = "#000000"; 
	
	this.m_sItemArrowImage = this.sMenuImagesPath +"MenuArrow.gif"	
	this.m_sItemArrowWidth = 3; 
	this.m_sItemArrowRightOffset = 18; 
	
	this.m_sTextItemFont = "Verdana"; 
	this.m_sFontSize = "9px";
	this.m_sTextPaddingLeft= "7";
	
	this.m_nTextTopOffset = 0;
	this.m_nArrowTopOffset = -1;
	this.m_nIconHeight = 14;
	this.m_nIconWidth = 14;
	
	this.m_nSeparatorHeight = 1;
	this.m_sSeparatorColor = "#B4C4E3";
	
	this.m_sLeftBkgrPicture = this.sMenuImagesPath +"bkgrMenuLeftLightBlue.gif";
	
	this.m_sOuterBorderColor = "#000000";
	this.m_sOuterLeftBorderPxWidth = 0;
	this.m_sOuterTopBorderPxWidth = 0;
	this.m_sOuterRightBorderPxWidth = 0;
	this.m_sOuterBottomBorderPxWidth = 0;
	this.m_sOuterBorderPxWidth = 0;
	this.m_nOuterBorderPadding = 0; 
	
	this.m_sMenuBkgrColor = "#F6F6F6"; 
	
	this.m_sSpacerImage = "spacer.gif";
	this.m_nBaseZIndex = 100;
	
	this.m_nShadowOffsetX = 6; 
	this.m_nShadowOffsetY = 6; 
	this.m_nShadowShorterByX = 8;
	this.m_nShadowShorterByY = 8;
	this.m_sShadowBlankImage = this.sMenuImagesPath + this.m_sSpacerImage;
	this.m_sShadowImage = this.sMenuImagesPath + "MenuShadowBlack.gif";
	this.m_bDisplayShadow = false; 
	
	this.m_nMenuLeftWidth = 24;
	
	this.m_nSubMenuOffsetLeft = 0;
	this.m_nSubMenuOffsetTop = 0;

	this.m_bProMode = 0; /* Adds a iframes behind the menus. Solves the problem with the zIndexes */
	
	this.m_nAutoCloseTime = 0;
	this.m_bUnderlineOnMO = 1;
}


function CMenu(oMenuTemplate, sName, nWidth, bIsContextMenu){
	
	this.bResizeMenu = false;
	this.bResizeMenuAlpha = false;
	if(typeof(ExtendObject) == 'undefined')
		alert("ExtendObject function required");
	ExtendObject(this, oMenuTemplate);


	this.arMenuTemplate = new Array();
	this.arMenuTemplate['ArrowImage'] = document.createElement('img');
	this.arMenuTemplate['ArrowImage'].src = this.m_sItemArrowImage;
	this.arMenuTemplate['ArrowImage'].width = this.m_sItemArrowWidth;
	this.arMenuTemplate['ArrowImage'].style.position = "absolute";
	//this.arMenuTemplate['ArrowImage'].style.lineHeight = this.m_sFontSize;
	

	this.arMenuTemplate['MenuShadow'] = document.createElement("div");
	this.arMenuTemplate['MenuShadow'].style.position = "absolute";
	this.arMenuTemplate['MenuShadow'].style.left = this.m_nShadowOffsetX;
	this.arMenuTemplate['MenuShadow'].style.top = this.m_nShadowOffsetY;
	this.arMenuTemplate['MenuShadow'].style.zIndex = this.m_nBaseZIndex;
	this.arMenuTemplate['MenuShadow'].style.visibility = "hidden";
	if(this.m_bDisplayShadow){
		var oShadowImage = CreateImage(this.m_sShadowImage, 1, 1);
		oShadowImage.style.filter = "progid:DXImageTransform.Microsoft.Blur(pixelradius=3); progid:DXImageTransform.Microsoft.Alpha(opacity=30);";
	}else{
		var oShadowImage = CreateImage(this.m_sShadowBlankImage, 1, 1);
	}
	this.arMenuTemplate['MenuShadow'].appendChild(oShadowImage);
	//this.arMenuTemplate['MenuShadow'].style.lineHeight = this.m_sFontSize;

	this.arMenuTemplate['BackgroundIFrame'] = document.createElement("iframe");
	this.arMenuTemplate['BackgroundIFrame'].src = "Blank.html";
	this.arMenuTemplate['BackgroundIFrame'].style.position = 'absolute';
	this.arMenuTemplate['BackgroundIFrame'].style.left = 0;
	this.arMenuTemplate['BackgroundIFrame'].style.top = 0;
	this.arMenuTemplate['BackgroundIFrame'].style.zIndex = 1;
	this.arMenuTemplate['BackgroundIFrame'].style.visibility = "hidden";
	this.arMenuTemplate['BackgroundIFrame'].frameBorder = "0";
	this.arMenuTemplate['BackgroundIFrame'].scrolling = "no";
	this.arMenuTemplate['BackgroundIFrame'].oMenuRef = this;
	//this.arMenuTemplate['BackgroundIFrame'].style.lineHeight = this.m_sFontSize;
			
	this.arMenuTemplate['MenuSeparatorTemplate'] = document.createElement("div");
	this.arMenuTemplate['MenuSeparatorTemplate'].style.left = this.m_nItemLeftOffset;
	this.arMenuTemplate['MenuSeparatorTemplate'].style.height = this.m_nSeparatorHeight +"px";
	this.arMenuTemplate['MenuSeparatorTemplate'].style.backgroundColor = this.m_sSeparatorColor;
	this.arMenuTemplate['MenuSeparatorTemplate'].style.backgroundPosition = "left";
	this.arMenuTemplate['MenuSeparatorTemplate'].style.position = "absolute";
	this.arMenuTemplate['MenuSeparatorTemplate'].appendChild(CreateImage('spacer.gif', 1, this.m_nSeparatorHeight));
	this.arMenuTemplate['MenuSeparatorTemplate'].style.zIndex = this.m_nBaseZIndex + 3;
	//this.arMenuTemplate['MenuSeparatorTemplate'].style.lineHeight = this.m_sFontSize;
	//this.arMenuTemplate['MenuSeparatorTemplate'].style.filter = "alpha(opacity=100)";
	//this.arMenuTemplate['MenuSeparatorTemplate'].style.opacity = 1.0;
	
	this.arMenuTemplate['MenuOuterBorderTemplate'] = document.createElement("div");
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.position = "absolute";
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.left = 0;
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.top = 0;
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.zIndex = Number(this.m_nBaseZIndex + 1);
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.visibility = "hidden";
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.border = this.m_sOuterBorderPxWidth +'px solid '+ this.m_sOuterBorderColor;
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.borderLeft = this.m_sOuterLeftBorderPxWidth +'px solid '+ this.m_sOuterBorderColor;
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.borderTop = this.m_sOuterTopBorderPxWidth +'px solid '+ this.m_sOuterBorderColor;
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.borderRight = this.m_sOuterRightBorderPxWidth +'px solid '+ this.m_sOuterBorderColor;
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.borderBottom = this.m_sOuterBottomBorderPxWidth +'px solid '+ this.m_sOuterBorderColor;
	this.arMenuTemplate['MenuOuterBorderTemplate'].style.backgroundColor = this.m_sMenuBkgrColor;
	//this.arMenuTemplate['MenuOuterBorderTemplate'].style.filter = "alpha(opacity=100)";
	//this.arMenuTemplate['MenuOuterBorderTemplate'].style.opacity = 1.0;
	this.arMenuTemplate['MenuOuterBorderTemplate'].oMenuRef = this;
	//this.arMenuTemplate['MenuOuterBorderTemplate'].style.lineHeight = this.m_sFontSize;

	this.arMenuTemplate['MenuBkgrLeftTemplate'] = document.createElement("div");
	this.arMenuTemplate['MenuBkgrLeftTemplate'].style.position = "relative";
	this.arMenuTemplate['MenuBkgrLeftTemplate'].style.left = 0;
	this.arMenuTemplate['MenuBkgrLeftTemplate'].style.top = 0;
	this.arMenuTemplate['MenuBkgrLeftTemplate'].style.zIndex = this.m_nBaseZIndex + 2;
	this.arMenuTemplate['MenuBkgrLeftTemplate'].style.backgroundImage = "url("+ this.m_sLeftBkgrPicture +")";
	this.arMenuTemplate['MenuBkgrLeftTemplate'].style.backgroundRepeat = "repeat-y";
	this.arMenuTemplate['MenuBkgrLeftTemplate'].style.backgroundPosition = "left";
	//this.arMenuTemplate['MenuBkgrLeftTemplate'].style.lineHeight = this.m_sFontSize;
	//this.arMenuTemplate['MenuBkgrLeftTemplate'].style.filter = "alpha(opacity=100)";
	//this.arMenuTemplate['MenuBkgrLeftTemplate'].style.opacity = 1;
	
	this.arMenuTemplate['MenuItemIcon'] = document.createElement("img");
	this.arMenuTemplate['MenuItemIcon'].style.position = "absolute";
	this.arMenuTemplate['MenuItemIcon'].width = this.m_nIconWidth +"px";
	this.arMenuTemplate['MenuItemIcon'].height = this.m_nIconHeight +"px";
	this.arMenuTemplate['MenuItemIcon'].style.zIndex = this.m_nBaseZIndex + 4;
	//this.arMenuTemplate['MenuItemIcon'].style.lineHeight = this.m_sFontSize;
	//this.arMenuTemplate['MenuItemIcon'].style.filter = "alpha(opacity=100)";
	//this.arMenuTemplate['MenuItemIcon'].style.opacity = 1.0;

	this.arMenuTemplate['MenuTextItem'] = document.createElement("div");
	this.arMenuTemplate['MenuTextItem'].style.position = "absolute";
	this.arMenuTemplate['MenuTextItem'].style.zIndex = this.m_nBaseZIndex + 4;
	this.arMenuTemplate['MenuTextItem'].style.paddingTop = '2px';
	this.arMenuTemplate['MenuTextItem'].style.paddingLeft = this.m_sTextPaddingLeft+"px"; // VESKO
	this.arMenuTemplate['MenuTextItem'].style.fontFamily = this.m_sTextItemFont;
	this.arMenuTemplate['MenuTextItem'].style.fontSize = this.m_sFontSize;
	//this.arMenuTemplate['MenuTextItem'].style.lineHeight = this.m_sLineHeight;
	this.arMenuTemplate['MenuTextItem'].style.width = "100%";
	this.arMenuTemplate['MenuTextItem'].style.color = this.m_sItemFontColor;
	this.arMenuTemplate['MenuTextItem'].style.lineHeight = this.m_sFontSize;

	this.arMenuTemplate['MenuItem'] = document.createElement("div");
	this.arMenuTemplate['MenuItem'].bHighlited = false;
	this.arMenuTemplate['MenuItem'].style.position = "absolute";
	this.arMenuTemplate['MenuItem'].ItemValue = "1";
	this.arMenuTemplate['MenuItem'].style.left = this.m_nOuterBorderPadding;
	this.arMenuTemplate['MenuItem'].style.zIndex = this.m_nBaseZIndex + 3;
	this.arMenuTemplate['MenuItem'].style.backgroundColor = "transparent";
	this.arMenuTemplate['MenuItem'].style.borderWidth = this.m_nItemBorderPxWidth +"px";
	this.arMenuTemplate['MenuItem'].style.borderStyle = "none";
	this.arMenuTemplate['MenuItem'].style.borderColor = this.m_sItemBorderColor;
	this.arMenuTemplate['MenuItem'].style.cursor = "default";
	//this.arMenuTemplate['MenuItem'].style.lineHeight = this.m_sFontSize;
	//this.arMenuTemplate['MenuItem'].style.filter = "alpha(opacity=100)";
	//this.arenuTemplate['MenuItem'].style.opacity = 1.0;

	this.m_nWidth = nWidth;
	this.m_nHeight = 0;
	this.m_sName = sName;
	this.m_bIsContextMenu = bIsContextMenu;
	this.m_nShowTimeout = 10;
	this.m_nHideTimout = 0;
	this.m_sIcon = "";	
	this.m_oParentMenu = null;

	this.m_arItems = new Array();
	this.m_arChildMenus = new Array();
	this.m_oShadow = null;	
	this.m_oOuterBorder = null;
	this.m_oBackgroundIFrame = null;
	
	// the html item which opens the menu on the main document
	this.m_oMenuHeader = null;
	
	this.m_bWroteMenu = false;
	this.m_bShown = false;
	this.m_oHighlitedItem = null;
	this.m_bShowTimeoutSet = false;
	
	this.m_sOnShow = null;
	this.m_sOnHide = null;
		
	var oWnd = window;
	var oDocument = document;
	
	// save the menu
	if(!CheckObject(oWnd.m_arMenus)) oWnd.m_arMenus = new Array();
	if(!CheckObject(oWnd.arOpenMenus)) oWnd.m_arOpenMenus = new Array();
	if(!CheckObject(oWnd.m_nOpenMenusCount)) oWnd.m_nOpenMenusCount = 0;
	this.m_nStorageIndex = oWnd.m_arMenus.length;
	m_nStorageIndex = this.m_nStorageIndex;

	oWnd.m_arMenus.push(this);
	// register event handler
	if(GetBrowserName() == "IE")
		oDocument.attachEvent('onclick', new Function("return CatchEvent("+ this.m_nStorageIndex +", event)"));
	if(GetBrowserName() == "Mozilla")
		oDocument.addEventListener("click", new Function("return CatchEvent("+ this.m_nStorageIndex +", event)"), false);
	//if(GetBrowserName() == "Opera")
		// Still looking
	function ClickHandler(){
		CatchEvent(m_nStorageIndex, arguments[0]);
	}
	oDocument.onclick = ClickHandler;
	///////////////////////////////////////////////////////////////////////////// M E N U :: A D D   I T E M
	// M E N U :: A D D   I T E M
	this.AddItem = function(Child, sIcon, sColor){
		arTemp = new Array();
	
		if(Child != "-"){
			arTemp[0] = Child;
			if(CheckObject(sIcon) && sIcon != ""){
				arTemp.sIcon = sIcon;
			}else{
				arTemp.sIcon = "";
			}
			arTemp.bIsSeparator = new Boolean(false);
			if(typeof(Child) == "string"){
				arTemp.bIsChildMenu = new Boolean(false);
			}else{
				Child.m_oParentMenu = this;
				arTemp.bIsChildMenu = new Boolean(true);
				//alert("Adding a child menu to "+ this.m_sName);
				this.m_arChildMenus.push(Child);
			}
			if(typeof(sColor) != 'undefined' || sColor == '' || sColor == null){
				arTemp.sColor = sColor;
			}else{
				arTemp.sColor = null;
			}
		}else{
			arTemp[0] = "";
			arTemp.bIsSeparator = new Boolean(true);
			arTemp.bIsChildMenu = new Boolean(false);
		}
		this.m_arItems.push(arTemp);
		return this.m_arItems[this.m_arItems.length - 1];
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: W R I T E
	// M E N U :: W R I T E
	this.Write = function(){
		var oEvent = new CEvent(arguments);
		if(this.m_bWroteMenu == false && this.m_arItems.length > 0){
			var oItem, oShadowImage, oTextItem, oTextItem, oStyle, oDocument, oArrow, oWnd;
			var sOnClick, sMouseOver, sShowSubItemDelayedCode, sShowSubItemCode, sText;
			var nOffset, i;
			var nTime;
			var arItems;
			oDocument = document;
			oWnd = window;
			//nTime = GetTime();
			
			//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: calculate menu height
			if(typeof(MeasureText) == 'undefined')
				//alert("MeasureText function required");
			this.m_nHeight = 2 * this.m_sOuterBorderPxWidth;

			for(i = 0; i < this.m_arItems.length; i++){
				var sMenuText = ""
				if(typeof(this.m_arItems[i][0]) == 'string')
					sMenuText = this.m_arItems[i][0];
				else
					sMenuText = this.m_arItems[i][0].m_sName;
					
				oStyle = new Object();
				oStyle.fontSize = this.m_sFontSize;
				oStyle.fontFamily = this.m_sTextItemFont;
				oStyle.lineHeight = this.m_sFontSize;
				var arTextSizes = MeasureText(sMenuText, oStyle, this.m_nWidth-this.m_sTextPaddingLeft);
				var nCurrentItemTextHeight = arTextSizes[1]+6; //// IVO NE OK
				this.m_nItemHeight = nCurrentItemTextHeight;
				
				this.m_arItems[i].nCalculatedHeight = nCurrentItemTextHeight;
			
				if(this.m_arItems[i].bIsSeparator == true){
					this.m_nHeight += this.m_nSeparatorHeight;
				}else{
					this.m_nHeight += this.m_nItemHeight;
				}
			}
			this.m_nHeight += (this.m_arItems.length + 1) * this.m_nOuterBorderPadding;

			if(oDocument.all){
				// BORDER IS DRAWN ON THE INSIDE FOR IE
				nMenuWidth = this.m_nWidth;
				nMenuHeight = this.m_nHeight;
				nItemWidth = nMenuWidth - 2 * this.m_nItemBorderPxWidth - 2 * this.m_nOuterBorderPadding;
				nItemHeight = this.m_nItemHeight;
				nSeparatorWidth = nItemWidth + 2 * this.m_nOuterBorderPadding;
			}else{
				nMenuWidth = this.m_nWidth;
				nMenuHeight = this.m_nHeight;
				nItemWidth = nMenuWidth - 2 * this.m_nItemBorderPxWidth - 2 * this.m_nOuterBorderPadding;
				nItemHeight = this.m_nItemHeight;
				nSeparatorWidth = nItemWidth + 2 * this.m_nOuterBorderPadding;
			}

			//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Write menu code
			if(this.m_bDisplayShadow){
				this.m_oShadow = this.arMenuTemplate['MenuShadow'].cloneNode(true);
				oDocument.body.appendChild(this.m_oShadow);
				
				this.m_oShadow.style.width = (nMenuWidth - this.m_nShadowShorterByX) +'px';
				this.m_oShadow.style.height = (nMenuHeight - this.m_nShadowShorterByY) +'px';
				this.m_oShadow.firstChild.width = nMenuWidth - this.m_nShadowShorterByX;
				this.m_oShadow.firstChild.height = nMenuHeight - this.m_nShadowShorterByY;
			}
			//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Outer border
			this.m_oOuterBorder = this.arMenuTemplate['MenuOuterBorderTemplate'].cloneNode(true);
			oDocument.body.appendChild(this.m_oOuterBorder);
			if(typeof(GetBrowserName) == 'undefined')
				alert("Error: GetBrowserName function required");
				
			if(GetBrowserName() == "IE" || GetBrowserName() == "Opera"){
				this.m_oOuterBorder.style.width = nMenuWidth + this.m_sOuterLeftBorderPxWidth + this.m_sOuterRightBorderPxWidth +"px";
				this.m_oOuterBorder.style.height = nMenuHeight + this.m_sOuterTopBorderPxWidth + this.m_sOuterBottomBorderPxWidth +"px";
			}else{
				this.m_oOuterBorder.style.width = nMenuWidth +"px";
				this.m_oOuterBorder.style.height = nMenuHeight +"px";
			}
			
			if(this.m_nAutoCloseTime){
				if(GetBrowserName() == "IE" || GetBrowserName() == "Opera"){
					this.m_oOuterBorder.onmouseout = new Function("this.oMenuRef.StartAutoCloseTimer(); event.cancelBubble = true;");
					this.m_oOuterBorder.onmouseover = new Function("this.oMenuRef.StopAutoCloseTimer(); event.cancelBubble = true;");
				}else{
					this.m_oOuterBorder.addEventListener("mouseout", new Function("this.oMenuRef.StartAutoCloseTimer(); event.stopPropagation();"), false);
					this.m_oOuterBorder.addEventListener("mouseover", new Function("this.oMenuRef.StopAutoCloseTimer(); event.stopPropagation();"), false);
				}
			}
			
			this.m_oOuterBorder.oMenuRef = this;
			
			//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: BackgroundIFrame
			if(this.m_bProMode){
				if(GetBrowserName() != 'Opera'){
					this.m_oBackgroundIFrame = this.arMenuTemplate['BackgroundIFrame'].cloneNode(true);
					oDocument.body.appendChild(this.m_oBackgroundIFrame);
					this.m_oBackgroundIFrame.style.width = nMenuWidth + this.m_sOuterLeftBorderPxWidth + this.m_sOuterRightBorderPxWidth +"px";
					this.m_oBackgroundIFrame.style.height = nMenuHeight + this.m_sOuterTopBorderPxWidth + this.m_sOuterBottomBorderPxWidth +"px";
					this.m_oBackgroundIFrame.oMenuRef = this;
				}
			}
			//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Left Background
			this.m_oBkgrLeft = this.arMenuTemplate['MenuBkgrLeftTemplate'].cloneNode(true);
			this.m_oOuterBorder.appendChild(this.m_oBkgrLeft);
			this.m_oBkgrLeft.style.width = this.m_nMenuLeftWidth +"px";
			this.m_oBkgrLeft.style.height = nMenuHeight +"px";
			//alert(this.m_nBaseZIndex);
			//Dump(this.arMenuTemplate);
			//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Items
			nOffset = this.m_nOuterBorderPadding;
			for(var i = 0; i < this.m_arItems.length; i++){
				nItemHeight = this.m_arItems[i].nCalculatedHeight;
			
				if(this.m_arItems[i].bIsSeparator == true){
					//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Separator
					oItem = this.arMenuTemplate['MenuSeparatorTemplate'].cloneNode(true);
					this.m_oOuterBorder.appendChild(oItem);
					oItem.style.width = (nItemWidth - this.m_nItemLeftOffset + 2 * this.m_sOuterBorderPxWidth) +"px";
					oItem.style.top = nOffset;
					//alert(oItem.style.top);
					nOffset += this.m_nSeparatorHeight + this.m_nOuterBorderPadding;
				}else{
					oItem = this.arMenuTemplate['MenuItem'].cloneNode(true);
					oItem.oMenuRef = this;
					this.m_oOuterBorder.appendChild(oItem);
					oItem.style.top = nOffset;
					if(typeof(this.m_arItems[i].ItemValue) != 'undefined')
						oItem.ItemValue = this.m_arItems[i].ItemValue;

					if(this.m_arItems[i].bIsChildMenu == true){
						//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Text
						sText = this.m_arItems[i][0].m_sName;
						//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: References
						oItem.oChildMenu = this.m_arItems[i][0];
						this.m_arItems[i][0].oParentMenu = this;
						//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Show code
						//sShowSubItemCode = new String();
						sShowSubItemCode = "nTop = this.offsetTop + "+ (this.m_nItemBorderPxWidth - this.m_nTopMenuOffset) +" + this.oMenuRef.m_oOuterBorder.offsetTop -document.body.scrollTop;\n";
						sShowSubItemCode += "nIndex = this.oChildMenu.m_nStorageIndex;\n";
						sShowSubItemCode += "nLeft = this.oMenuRef.m_oOuterBorder.offsetLeft - 1 -"+ this.m_nLeftMenuOffset +"+ - document.body.scrollLeft + "+ nMenuWidth +";\n";
						
						sShowSubItemCode += "if(((nLeft +  this.oChildMenu.m_nWidth) > document.body.clientWidth) || this.oMenuRef.m_bOpenToTheLeft == true){\n";
						sShowSubItemCode += "	nLeft = this.oMenuRef.m_oOuterBorder.offsetLeft - this.oChildMenu.m_nWidth - document.body.scrollLeft;\n";
						sShowSubItemCode += "	this.oChildMenu.m_bOpenToTheLeft = true;\n";
						sShowSubItemCode += "}\n";
						
						sShowSubItemDelayedCode = sShowSubItemCode;
						//sShowSubItemDelayedCode += "this.oMenuRef.m_bShowTimeoutSet = true;\n";
						
						//sShowSubItemDelayedCode += "	this.oChildMenu.m_nBaseZIndex = "+ (this.m_nBaseZIndex + 100) +"\n";
						//sShowSubItemDelayedCode += "	this.oChildMenu.Write()\n";
						if(this.m_nShowTimeout >= 10){
							//sShowSubItemDelayedCode += "if(this.oMenuRef.m_bShowTimeoutSet == false){\n";
							//sShowSubItemDelayedCode += "	window.clearTimeout(window.nShowTimeout);\n";
							sShowSubItemDelayedCode += "	window.nShowTimeout = setTimeout('ShowSavedMenu('+ nIndex +','+ nLeft +', '+ nTop +')', "+ this.m_nShowTimeout +");\n";
							//sShowSubItemDelayedCode += "	this.oMenuRef.m_bShowTimeoutSet = true;";
							//sShowSubItemDelayedCode += "}\n";
						}else{
							sShowSubItemDelayedCode += "	ShowSavedMenu(nIndex, nLeft, nTop);\n";
						}
						//alert(sShowSubItemDelayedCode);
						//sShowSubItemDelayedCode += "\n";
						sShowSubItemDelayedCode += "window.status ='';\n"
						sShowSubItemCode += "ShowSavedMenu(nIndex, nLeft, nTop);\n";
					}else{
						sText = this.m_arItems[i][0];
					}
					//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Item
					oItem.style.width = nItemWidth +"px";
					oItem.style.height = nItemHeight +"px";
					//::::::::::::::::::::::::::::::::::::::::::::: Events
					//----------------------------------------------------- MOUSE OVER
					sMouseOver = "if(this.bHighlited == false) this.oMenuRef.HighliteItem("+ i +");";
					if(this.m_bUnderlineOnMO)
						sMouseOver += "this.style.color = this.oMenuRef.m_sItemMOFontColor; this.style.textDecoration='underline'";
					if(this.m_arItems[i].bIsChildMenu == true){
						sMouseOver += sShowSubItemDelayedCode;
					}
					//alert(sMouseOver);
					oItem.ItemRef = this.m_arItems[i];
					if(typeof(this.m_arItems[i].Disabled) != 'undefined') oItem.disabled = this.m_arItems[i].Disabled;
					oItem.onmouseover = new Function(sMouseOver);
					
					var sMouseOut = "this.oMenuRef.UnHighliteItem("+ i +");";
					if(this.m_bUnderlineOnMO)
						sMouseOut += "this.style.textDecoration='none'; ";
					oItem.onmouseout = new Function(sMouseOut);
					
					if(this.m_arItems[i].bIsChildMenu == true){
						//----------------------------------------------------- CLICK
						oItem.onclick = new Function(sShowSubItemCode +";");
						//----------------------------------------------------- MOUSE OUT
					}else{
						//----------------------------------------------------- CLICK
						//oItem.onclick = new Function('HideSavedMenu('+ this.m_nStorageIndex +')');
						//sOnClick = "HideOpenMenus();\n";
						sOnClick = "";
						//sOnClick += "event.cancelBubble = true;";
						
						if(this.m_arItems[i].OnClickHandler != "" && this.m_arItems[i].OnClickHandler != null){
							sOnClick += this.m_arItems[i].OnClickHandler +"(this, event);";
						}
						if(this.m_arItems[i].sAction != "" && this.m_arItems[i].sAction != null) 
							sOnClick += this.m_arItems[i].sAction +";";
						sOnClick += "this.oMenuRef.Hide(true);";
						oItem.onclick = new Function(sOnClick +"event.cancelBubble = true;");
						//----------------------------------------------------- MOUSE OUT
					}
					//::::::::::::::::::::::::::::::::::::::::::::: Contents holder
					oTextItem = this.arMenuTemplate['MenuTextItem'].cloneNode(true);
					oItem.appendChild(oTextItem);
					if(this.m_arItems[i].sColor != null){
						oTextItem.style.color = this.m_arItems[i].sColor;
						//alert(oTextItem.style.color);
					}
					oTextItem.title = sText;
					oTextItem.style.width = this.m_nWidth;
					oTextItem.style.cursor = 'pointer';
					oTextItem.nOriginalTop = this.m_nTextTopOffset + parseFloat(oItem.style.borderWidth);
					oTextItem.style.top = oTextItem.nOriginalTop;
					oTextItem.nOriginalLeft = this.m_nItemLeftOffset + parseFloat(oItem.style.borderWidth);
					oTextItem.style.left = oTextItem.nOriginalLeft;
					//oTextItem.style.height = nItemHeight - 4 * this.m_nItemBorderPxWidth;
					oTextItem.style.height = "100%";
					//oTextItem.onmouseover = new Function("alert('"+ oItem.uniqueID +"- in');");
					//oTextItem.onmouseout = new Function("oEvent.cancelBubble = true;");
					
					if(this.m_arItems[i].bIsChildMenu == true){
						//::::::::::::::::::::::::::::::::::::::::::::: Create arrow
						oArrow = this.arMenuTemplate['ArrowImage'].cloneNode(true);
						//oArrow.nOriginalTop = this.m_nArrowTopOffset + Number(oItem.style.borderWidth.replace("px", ""));
						oArrow.nOriginalTop = this.m_nArrowTopOffset;
						oStyle = oArrow.style;
						oStyle.top = oArrow.nOriginalTop;
						
						oArrow.nOriginalLeft = nItemWidth - this.m_nItemBorderPxWidth - this.m_sItemArrowWidth - this.m_sItemArrowRightOffset;
						oStyle.left = oArrow.nOriginalLeft;

						oItem.oArrow = oArrow;
						
						oItem.appendChild(oArrow);
					}
					//::::::::::::::::::::::::::::::::::::::::::::: Icon
					if(this.m_arItems[i].sIcon != "" || this.m_arItems[i][0].m_sIcon){
						oIcon = this.arMenuTemplate['MenuItemIcon'].cloneNode(true);
						oIcon.src = (this.m_arItems[i].sIcon != "") ? this.m_arItems[i].sIcon : this.m_arItems[i][0].m_sIcon;
						oItem.appendChild(oIcon);
						oItem.oIcon = oIcon;
						
						oStyle = oIcon.style;
						oIcon.nOriginalTop = (nItemHeight + Number(oItem.style.borderWidth.replace("px", "")) - this.m_nIconHeight) / 2;
						oStyle.top = oIcon.nOriginalTop;
						
						oIcon.nOriginalLeft = (this.m_nMenuLeftWidth - this.m_nIconWidth) / 2 - Number(oItem.style.left.replace("px", ""));
						oStyle.left = oIcon.nOriginalLeft;
					}
					//::::::::::::::::::::::::::::::::::::::::::::: Contents
					//oTextItem.appendChild(CreateText(sText));
					oTextItem.innerHTML = sText;
					//alert(eval(oTextItem.uniqueID));
					oItem.oText = oTextItem;
					//::::::::::::::::::::::::::::::::::::::::::::: save the visual representation in the items collection
					this.m_arItems[i].oDiv = oItem;
					//alert(this.m_arItems[i].oDiv.outerHTML);
					oItem.nItemIndex = i;
					//::::::::::::::::::::::::::::::::::::::::::::: increase offset
					nOffset += nItemHeight + this.m_nOuterBorderPadding;
				}
			}
			//alert(GetTime() - nTime);
			this.m_bWroteMenu = true;
			//alert(this.m_bWroteMenu);
			//window.Debug.Echo("Writing Menu["+ this.m_nStorageIndex +"]");
		}else{
			//alert('not writing!');
		}
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: I S P A R E N T O F
	// M E N U :: I S P A R E N T O F
	this.IsParentOf = function(Menu){
		var bReturnValue = false;
		//window.Debug.Echo("Menu "+ this.m_sName +"["+ this.m_nStorageIndex +"] has "+ this.m_arChildMenus.length +" child menus");
		for(var i = 0; i < this.m_arChildMenus.length; i++){
			//window.Debug.Echo("Child menu["+ this.m_arChildMenus[i].m_sName +"] has storage index "+ this.m_arChildMenus[i].m_nStorageIndex);
			if(Menu.m_nStorageIndex == this.m_arChildMenus[i].m_nStorageIndex){
				//window.Debug.Echo("Menu "+ this.m_sName +" is a parent menu of "+ this.m_arChildMenus[i].m_sName);
				return true;
			}else{
				//window.Debug.Echo("Menu "+ this.m_sName +" is NOT a parent menu of "+ this.m_arChildMenus[i].m_sName);
				bReturnValue = this.m_arChildMenus[i].IsParentOf(Menu);
				if(bReturnValue == true) return true;
			}
		}
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: S H O W
	// M E N U :: S H O W
	this.Show = function(oElement, oEvent) {
		this.m_bMainMenu = 1;
		this.StopAutoCloseTimer();
		oMenu = this;
		bContextMenu = oMenu.m_bIsContextMenu;
		
		var oEvent = new CEvent(arguments);
		
		oCurrentElement = oEvent.GetSourceElement();
		
		var oParent = oElement;
		var X = oParent.offsetLeft;
		var Y = oParent.offsetTop;
	
		if(bContextMenu == true){
			X = oEvent.clientX;
			Y = oEvent.clientY;
		}else{
			while(oParent = oParent.offsetParent){
				X += oParent.offsetLeft;
				Y += oParent.offsetTop;
			}
			Y += oElement.offsetHeight;
		}
				
		if(bContextMenu == true){
			oMenu.ShowAtPosition(X - document.body.scrollLeft, Y - document.body.scrollTop);
		}else{			
			oMenu.ShowAtPosition(X - document.body.scrollLeft, Y - document.body.scrollTop);			
			var oTarget = oCurrentElement;
			oMenu.m_oMenuHeader = oCurrentElement;
			//oMenu.m_sOnHide = "if(typeof(this.m_oMenuHeader.runtimeStyle) != 'undefined'){ this.m_oMenuHeader.runtimeStyle.border = this.m_oMenuHeader.sNormalBorder; this.m_oMenuHeader.runtimeStyle.zIndex = this.m_oMenuHeader.sNormalZIndex; } ";
			// IVO			
			// Background image
			if(oTarget.getAttribute('bMenuHeader')){
				if(typeof(oTarget.getAttribute('sHeaderBackgroundImageId')) != 'undefined' && typeof(oTarget.getAttribute('sHeaderBackgroundImageMouseOver')) != 'undefined'){
					var oImage = document.getElementById(oTarget.getAttribute('sHeaderBackgroundImageId'));
					oTarget.setAttribute('sHeaderBackgroundImageMouseOut', oImage.src);
					oImage.src = oTarget.getAttribute('sHeaderBackgroundImageMouseOver');
					oMenu.m_sOnHide = oMenu.m_sOnHide + "document.getElementById('"+ oTarget.getAttribute('sHeaderBackgroundImageId') + "').src = '"+ oTarget.getAttribute('sHeaderBackgroundImageMouseOut') +"'; ";
				}
			}	
					
			/*
			if(GetBrowserName() == "IE"){
				oMenu.m_oOuterBorder.fireEvent("onmouseover");
				oMenu.m_oOuterBorder.fireEvent("onmouseout");
			}else{
				eval(oMenu.m_oOuterBorder.onmouseover);
				eval(oMenu.m_oOuterBorder.onmouseout);
			}
			*/
			if(typeof(oTarget.runtimeStyle) != 'undefined'){
				//oTarget.runtimeStyle.border = oTarget.getAttribute('sMouseOverBorder');
				//oTarget.runtimeStyle.borderBottom = 'none';
				//oTarget.runtimeStyle.zIndex = oTarget.getAttribute('sMouseOverZIndex');
				//oTarget.className = oTarget.getAttribute('sMenuOpenClass');
				
				//if(typeof(oTarget.sMouseOverBackgroundImage) != 'undefined')
				//	oTarget.style.backgroundImage = "url("+ oTarget.sMouseOverBackgroundImage +")";	
				
			}
		}
		//alert(2);
	}
	///////////////////////////////////////////////////////////////////////////// A U T O C L O S E M E N U
	// A U T O C L O S E M E N U
	AutoCloseMenu = function(nStorageIndex){		
		var Menus = window.m_arMenus;
		var OpenMenus = window.m_arOpenMenus;
		for(var i = 0; i < OpenMenus.length; i++){
			if(nStorageIndex == Menus[OpenMenus[i]].m_nStorageIndex){
				Menus[OpenMenus[i]].Hide();
				Menus[OpenMenus[i]].StopAutoCloseTimer();
				break;
			}
		}
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: S T A R T A U T O C L O S E T I M E R
	// M E N U :: S T A R T A U T O C L O S E T I M E R
	this.StartAutoCloseTimer = function(){
		//Dump(this.m_arChildMenus);
		//Dump(this.m_oParentMenu);
		this.m_AutoCloseTimeout = window.setTimeout("AutoCloseMenu("+ this.m_nStorageIndex +")", this.m_nAutoCloseTime);
		if(this.m_oParentMenu != null)
			this.m_oParentMenu.StartAutoCloseTimer();
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: S T O P A U T O C L O S E T I M E R
	// M E N U :: S T O P A U T O C L O S E T I M E R
	this.StopAutoCloseTimer = function(){
		window.clearTimeout(this.m_AutoCloseTimeout);
		if(this.m_oParentMenu != null)
			this.m_oParentMenu.StopAutoCloseTimer();
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: S H O W A T P O S I T I O N
	// M E N U :: S H O W A T P O S I T I O N
	this.ShowAtPosition = function(X, Y){
		if(typeof(this.m_bMainMenu) == 'undefined')
			this.m_bMainMenu = 0;
		this.bShowTimeoutSet = false;
		var Wnd = window;
		var Menus = Wnd.m_arMenus;
		var OpenMenus = Wnd.m_arOpenMenus;
		// clear any timeouts		
		Wnd.clearTimeout(window.nShowTimeout);
		
		// write it if its not written
		if(this.m_bWroteMenu == false) this.Write();
		// hide it first if it's a context menu
		
		if(this.m_bIsContextMenu) this.Hide();
		
		// show it
		if(this.m_bWroteMenu == true && this.m_bShown == false){			
			// register the open menu

			Wnd.m_LayerRegister.Register(this.m_oOuterBorder);
			
			for(var i = 0; i < OpenMenus.length; i++)
				if(!Menus[OpenMenus[i]].IsParentOf(this)) Menus[OpenMenus[i]].Hide();
			
			var nLeft = 0;
			var nTop = 0;
			
			if(document.all){
				nWindowWidth = document.body.clientWidth;
				nWindowHeight = document.body.clientHeight;
				nScrolledDown = document.body.scrollTop;
				nScrolledRight = document.body.scrollLeft;
			}else{
				nWindowWidth = window.innerWidth;
				nWindowHeight = window.innerHeight;
				nScrolledDown = window.scrollY;
				nScrolledRight = window.scrollX;
			}
			
			//alert(nWindowWidth +" "+ nWindowHeight);
			if((X + this.m_nWidth) >= nWindowWidth){
				nLeft = X - this.m_nWidth;
			}else{
				nLeft = X;
			}

			if((Y + this.m_nHeight) >= nWindowHeight){
				nTop = Y - this.m_nHeight;
			}else{
				nTop = Y;
			}
			
			nLeft = nLeft + nScrolledRight + this.m_nLeftMenuOffset;
			nTop = nTop + nScrolledDown + this.m_nTopMenuOffset;
			
			if(!this.m_bMainMenu){
				nLeft += this.m_nSubMenuOffsetLeft;
				nTop += this.m_nSubMenuOffsetTop;
			}			
			this.m_oOuterBorder.style.left = nLeft;
			this.m_oOuterBorder.style.top = nTop;
			
			if(this.bResizeMenu){
				if(typeof(ResizeObject) == 'undefined')
					alert('Error: Required ResizeObject function');
				ResizeObject(this.m_oOuterBorder, this.bResizeMenuAlpha);
			}	
						
					
			this.m_oOuterBorder.style.opacity = 1.0;
			//this.m_oOuterBorder.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
			this.m_oOuterBorder.style.visibility = "visible";								
			if(this.m_bProMode){
				this.m_oBackgroundIFrame.style.left = this.m_oOuterBorder.style.left;
				this.m_oBackgroundIFrame.style.top = this.m_oOuterBorder.style.top;
				this.m_oBackgroundIFrame.style.visibility = "visible";
			}			
			if(this.m_bDisplayShadow){
				this.m_oShadow.style.left = nLeft + this.m_nShadowOffsetX;
				this.m_oShadow.style.top = nTop + this.m_nShadowOffsetY;
				this.m_oShadow.style.visibility = "visible";
			}			
			this.m_bShown = true;
			//:::::::::::::::::::::::::::::::::::::::::::::::::: register in the open menus collection
			Wnd.m_arOpenMenus.push(this.m_nStorageIndex);			
			//:::::::::::::::::::::::::::::::::::::::::::::::::: increase the open menus count
			Wnd.m_nOpenMenusCount++;
			//Wnd.Debug.Echo("Show["+ this.m_nStorageIndex +"]: "+ Wnd.m_nOpenMenusCount);
		}else{
			//alert('Menu '+ this.m_nStorageIndex +' not written!');
		}
		eval(this.m_sOnShow);		
	}
	/////////////////////////////////////////////////////////////////////////////// M E N U :: H I D E
	// M E N U :: H I D E
	this.Hide = function(bHideParent){
		if(!this.m_bShown) return;
		if(true){
			var oOuterBorderStyle = this.m_oOuterBorder.style;
			if(oOuterBorderStyle.visibility != "hidden"){
				//FadeObject(this.m_oOuterBorder); //IVO
				oOuterBorderStyle.visibility = "hidden";
			}
			
			if(this.m_bProMode){
				this.m_oBackgroundIFrame.style.left = -300;
				this.m_oBackgroundIFrame.style.top = -300;
				this.m_oBackgroundIFrame.style.visibility = "hidden";
			}

			if(this.m_bDisplayShadow){
				var oShadowStyle = this.m_oShadow.style;
				if(oShadowStyle.visibility != "hidden") 
					oShadowStyle.visibility = "hidden";
			}
			
			this.m_bShown = false;
			this.m_bOpenToTheLeft = false;
			
			if(this.m_oHighlitedItem) this.UnHighliteItem(this.m_oHighlitedItem);

			if(this.m_oMenuHeader){
				this.m_oMenuHeader.className = this.m_oMenuHeader.sNormalClass;
			}
			if(this.m_sOnHide)
				eval(this.m_sOnHide); // IVO
			//:::::::::::::::::::::::::::::::::::::::::::::::::: unregister from the open menus collection
			var arTemp = new Array();
			for(var i = 0; i < window.m_arOpenMenus.length; i++)
				if(window.m_arOpenMenus[i] != this.m_nStorageIndex) arTemp.push(window.m_arOpenMenus[i]);
			window.m_arOpenMenus = arTemp;
			
			//:::::::::::::::::::::::::::::::::::::::::::::::::: decrease the open menus count
			window.m_nOpenMenusCount--;
			window.m_LayerRegister.Unregister(this.m_oOuterBorder);
			//window.Debug.Echo("Hide["+ this.m_nStorageIndex +"]: "+window.m_nOpenMenusCount);
			if(bHideParent && this.m_oParentMenu) this.m_oParentMenu.Hide(true);
		
			for(j = 0; j < this.m_arChildMenus.length; j++){
				this.m_arChildMenus[j].Hide();
			}
			
		}
		
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: H A S   P O I N T
	// M E N U :: H A S   P O I N T
	this.HasPoint = function(X, Y){
		var nLeft = parseFloat(this.m_oOuterBorder.style.left);
		var nTop = parseFloat(this.m_oOuterBorder.style.top);
		if((Y < nTop || Y > (nTop + this.m_nHeight)) || (X < nLeft || X > (nLeft + this.m_nWidth))){
			return false;
		}else{
			return true;
		}
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: H I G H L I T E   I T E M
	// M E N U :: H I G H L I T E   I T E M
	this.HighliteItem = function(vItem){
		var oItem;
		if(typeof(vItem) == "number"){
			oItem = this.m_arItems[vItem].oDiv;
			//Dump(this.m_arItems[vItem]);
		}else{
			oItem = vItem;
		}
		
		// unhighlite the previous highlighted item
		if(this.m_oHighlitedItem){
			if(this.m_oHighlitedItem.uniqueID == oItem.uniqueID){
				//event.cancelBubble = false;
				//return;
				//alert(1);
			}
			//alert(1);
			this.UnHighliteItem(this.m_oHighlitedItem);
		}
		//alert(oItem.outerHTML);
		// highlite the item
		oItem.style.borderStyle = "solid";
		oItem.style.backgroundColor = this.m_sItemMOBkgrColor;
		
		var nItemBorderWidth = Number(oItem.style.borderWidth.replace("px", ""));
		
		oItem.oText.style.OriginalColor = oItem.oText.style.color;
		oItem.oText.style.color = this.m_sItemMOFontColor;
		
		//alert(oItem.oText.nOriginalTop);
		oItem.oText.style.top = oItem.oText.nOriginalTop - nItemBorderWidth + "px";
		oItem.oText.style.left = oItem.oText.nOriginalLeft - nItemBorderWidth +"px";
		if(oItem.oArrow){
			oItem.oArrow.style.top = oItem.oArrow.nOriginalTop - nItemBorderWidth +"px";
			oItem.oArrow.style.left = oItem.oArrow.nOriginalLeft - nItemBorderWidth +"px";
		}
		if(oItem.oIcon){
			oItem.oIcon.style.top = oItem.oIcon.nOriginalTop - nItemBorderWidth +"px";
			oItem.oIcon.style.left = oItem.oIcon.nOriginalLeft - nItemBorderWidth +"px";
		}
		// set the state to 'highlited'
		oItem.bHighlited = true;
		// save it as the highlited item
		
		this.m_oHighlitedItem = oItem;
	}
	///////////////////////////////////////////////////////////////////////////// M E N U :: U N H I G H L I T E   I T E M
	// M E N U :: U N H I G H L I T E   I T E M
	this.UnHighliteItem = function(vItem){
		var oItem;
		if(typeof(vItem) == "number"){
			oItem = this.m_arItems[vItem].oDiv;
		}else{
			oItem = vItem;
		}
		
		//alert('Gonna Hide It '+ this.m_sName +'!');
		
		if(CheckObject(oItem.oChildMenu)){
			if(window.nShowTimeout){
				// if there is some timeout set - clear it so the menu doesn't try to show again
				window.clearTimeout(window.nShowTimeout);
			}
			if(oItem.oChildMenu.m_bShown){
				//window.nHideTimeout = window.setTimeout('HideSavedMenu('+ oItem.oChildMenu.m_nStorageIndex +')', this.m_nHideTimout);
				HideSavedMenu(oItem.oChildMenu.m_nStorageIndex);
			}
			this.m_bShowTimeoutSet = false;
		}
		oItem.style.borderStyle = "none";
		oItem.style.backgroundColor = 'transparent';
		oItem.oText.style.color =  oItem.oText.style.OriginalColor;
		oItem.oText.style.top = oItem.oText.nOriginalTop + "px";
		oItem.oText.style.left = oItem.oText.nOriginalLeft +"px";
		if(oItem.oArrow){
			oItem.oArrow.style.top = oItem.oArrow.nOriginalTop +"px";
			oItem.oArrow.style.left = oItem.oArrow.nOriginalLeft  +"px";
		}
		if(oItem.oIcon){
			oItem.oIcon.style.top = oItem.oIcon.nOriginalTop +"px";
			oItem.oIcon.style.left = oItem.oIcon.nOriginalLeft +"px";
		}
		// set the state to 'normal'
		oItem.bHighlited = false;
	}
}
//####################################################################################################
///////////////////////////////////////////////////////////////////////////// S H O W   S A V E D   M E N U
// S H O W   S A V E D   M E N U
function ShowSavedMenu(vItem, X, Y){
	if(typeof(vItem) == "number"){
		if(CheckObject(window.m_arMenus) && window.m_arMenus[vItem]){
			window.m_arMenus[vItem].ShowAtPosition(X, Y, true);
		}
	}else{
		vItem.m_oMenuHeader = oMenuHeader;
		vItem.ShowAtPosition(X, Y);
	}
}
///////////////////////////////////////////////////////////////////////////// H I D E   S A V E D   M E N U
// H I D E   S A V E D   M E N U
function HideSavedMenu(vItem){
	var arSavedMenus = window.m_arMenus;
	window.clearTimeout(window.nShowTimeout);
	if(typeof(vItem) == "number"){
		if(arSavedMenus[vItem]){
			// clear any timeouts
			
			// hide it
			arSavedMenus[vItem].Hide();
		}
	}else{
		vItem.Hide();
	}
}
///////////////////////////////////////////////////////////////////////////// W R I T E   S A V E D   M E N U S
// W R I T E   S A V E D   M E N U S
function WriteSavedMenus(){
	var i;
	var arMnus = window.m_arMenus;
	if(arMnus){
		for(i = 0; i < arMnus.length; i++){
			// write it
			arMnus[i].Write();
		}
	}
}
///////////////////////////////////////////////////////////////////////////// C A T C H   E V E N T
// C A T C H   E V E N T
function CatchEvent(nMenuIndex){
	var oEvent = new CEvent(arguments);
	//Dump(oEvent);
	var bRightClick = false;
	var i;
	var arMnus = window.m_arMenus;
	
	if(nMenuIndex == null || nMenuIndex < 0) 
		return true;
	
	if(oEvent.type == "contextmenu" || oEvent.button == 2)
		bRightClick = true;

	if(bRightClick == true){
		arMnus[nMenuIndex].ShowAtPosition(oEvent.clientX, oEvent.clientY);
		oEvent.returnValue = false;
		return false;
	}else if(oEvent.GetSourceElement().bMenuHeader != "1"){
		if(arMnus){
			var oMenu = arMnus[nMenuIndex];
			if(oMenu.m_bShown == true){
				if(oMenu.HasPoint(oEvent.clientX, oEvent.clientY) == false){
					oMenu.Hide();
				}
			}
		}
		oEvent.returnValue = true;
		return true;
	}
}

function NavMenuClickHandler(MenuItem, EventArguments){
	window.location.href = MenuItem.ItemRef.RedirectUrl;
}