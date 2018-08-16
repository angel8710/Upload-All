function Show(n)
{
    var i;
    for (i=1; ; i++)
    {
        var id = "xx_" + i.toString();
        var element = document.getElementById(id);
        if (!element) return;
        if (i == n)
          element.className = element.className == "vi" ? "hi" : "vi";
        else
                  element.className = "hi";
    }
}

function resetCalc(){
    var os_data = document.getElementById("s_data");
    var oe_data = document.getElementById("e_data");
    var oyield1 = document.getElementById("yield1");
    var oyield2 = document.getElementById("yield2");

    os_data.value = "";
    oe_data.value = "";
    oyield1.value="";
    oyield2.value="";
}        
function validateCareerForm(formname){

	frm = eval('document.'+formname);

	if (frm.name_work.value == ''){

		alert('Моля, въведете име!');
		frm.name_work.focus();
		return false;

	}

	if (!ValidateAsEmail(frm.email.value)){

		alert('Моля, въведете коректен E-mail адрес!');
		frm.email.focus();
		return false;

	}

	if (frm.position){

		if (frm.position.options[frm.position.selectedIndex].value == ''){

			alert('Моля, изберете позиция!');
			frm.position.focus();
			return false;

		}

	}

	if (frm.cvfile.value == ''){

		alert('Моля, изберете файл с Автобиография!');
		frm.cvfile.focus();
		return false;

	}


return true;
}

/////
// E-mail validation
/////
	function ValidateAsEmail (emailStr) {
		var emailPat=/^(.+)@(.+)$/
		var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
		var validChars="\[^\\s" + specialChars + "\]"
		var quotedUser="(\"[^\"]*\")"
		var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
		var atom=validChars + '+'
		var word="(" + atom + "|" + quotedUser + ")"
		var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
		var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
		var matchArray=emailStr.match(emailPat)
		if (matchArray==null) {
			return false
		}
		var user=matchArray[1]
		var domain=matchArray[2]


		if (user.match(userPat)==null) {
			// user is not valid
			return false
		}

		/* if the e-mail address is at an IP address (as opposed to a symbolic
		   host name) make sure the IP address is valid. */
		var IPArray=domain.match(ipDomainPat)
		if (IPArray!=null) {
			// this is an IP address
			  for (var i=1;i<=4;i++) {
				if (IPArray[i]>255) {
				return false
				}
			}
			return true
		}

		// Domain is symbolic name
		var domainArray=domain.match(domainPat)
		if (domainArray==null) {
			return false
		}

		var atomPat=new RegExp(atom,"g")
		var domArr=domain.match(atomPat)
		var len=domArr.length
		if (domArr[domArr.length-1].length<2 ||
			domArr[domArr.length-1].length>5) {
		   // the address must end in a two letter or three letter word.
		   return false
		}

		// Make sure there's a host name preceding the domain.
		if (len<2) {
		   return false
		}

		return true;
	}
	
function searchFunc(){
   if ((document.searchform.find.value.length < 3) || (document.searchform.find.value=='   ')){
       alert('Моля, въведете поне три символа в полето за търсене!');
       document.searchform.find.focus();
  } else {
     document.searchform.submit();
  }
}

