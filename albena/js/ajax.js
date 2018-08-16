	 function makeRequest(url, myelement) {
        var http_request = false;

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
                // See note below about this line
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!http_request) {
            //alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
		var now = new Date();
		url += '&m=' + now.getYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds() + '';
        http_request.onreadystatechange = function() { alertContents(http_request, myelement); };
        http_request.open('GET', url, true);
        http_request.send(null);

    }

    function alertContents(http_request, myelement) {

        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
//                alert(http_request.responseText);
				tmp = document.getElementById(myelement);
				tmp.innerHTML = http_request.responseText;
            } else {
                // alert('There was a problem with the request.');
            }
        }

    }
