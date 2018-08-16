function IEHack(elementName) {
        if (document.all && document.getElementById) {
          navRoot = document.getElementById(elementName);
          for (i=0 ; i < navRoot.childNodes.length; i++) {
          
            node = navRoot.childNodes[i];
	//alert(node.nodeName);
            if (node.nodeName == "DIV") {
              node.onmouseover = function () { this.className+=" over"; }
              node.onmouseout = function () { this.className=this.className.replace(" over", ""); }
            }
          }
        }
        }

        function startList()
        {
            IEHack("indiv_1");
            IEHack("indiv_2");
            IEHack("corp_1");
            IEHack("corp_2");
            IEHack("corp_3");
        }

        window.onload=startList;