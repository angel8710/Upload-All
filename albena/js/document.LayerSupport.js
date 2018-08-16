////////////////////////////////////////////////////////////////////////////////////////////////////// L A Y E R   R E G I S T E R
// L A Y E R   R E G I S T E R
function LayerRegister(){
	this.m_arLayers = new Array();
	////////////////////////////////////////////////////////////////////////////////////////////////////// L A Y E R   R E G I S T E R :: R E G I S T E R
	// L A Y E R   R E G I S T E R :: R E G I S T E R
	this.Register = function(Layer){
		this.m_arLayers.push(Layer);
		if(this.m_arLayers.length == 1) ChangeComboboxesVisibility('hidden');
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////// L A Y E R   R E G I S T E R :: U N R E G I S T E R
	// L A Y E R   R E G I S T E R :: U N R E G I S T E R
	this.Unregister = function(Layer){
		var arTemp = new Array();
		for(var i = 0; i < this.m_arLayers.length; i++)
			if(this.m_arLayers[i].uniqueID != Layer.uniqueID) arTemp.push(this.m_arLayers[i]);
		this.m_arLayers = arTemp;
		if(this.m_arLayers.length == 0) ChangeComboboxesVisibility('visible');
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////// L A Y E R   R E G I S T E R :: G E T   C O U N T
	// L A Y E R   R E G I S T E R :: G E T   C O U N T
	this.GetCount = function(){
		return this.m_arLayers.length;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////// C H A N G E   C O M B O B O X E S   V I S I B I L I T Y
// C H A N G E   C O M B O B O X E S   V I S I B I L I T Y
function ChangeComboboxesVisibility(sVisibility, wndWindow){
	if(document.all){
		//alert('Changing visibility!');
		if(!wndWindow) wndWindow = window;
		arCombos = wndWindow.document.all.tags("select");
		for(var i = 0; i < arCombos.length; i++){
			arCombos[i].style.visibility = sVisibility;
		}
		var arFrames = wndWindow.frames;
		for(var j = 0; j < arFrames.length; j++){
			ChangeComboboxesVisibility(sVisibility, arFrames[j]);
		}		
	}
}
