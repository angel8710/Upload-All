function Validate()
{
    var name = document.ContactForm.name;
    var email = document.ContactForm.email;
    var phone = document.ContactForm.phone;
	var city = document.ContactForm.city;
	var state = document.ContactForm.state;
    var location = document.ContactForm.location;
    var address = document.ContactForm.address;
    var nocall = document.ContactForm.DoNotCall;
    var subject = document.ContactForm.subject;
    var comment = document.ContactForm.Comment;
	

	
	
    if (name.value == "")
    {
        window.alert("Please enter your name.");
        name.focus();
        return false;
    }
    
    if (email.value == "")
    {  
	  
        window.alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
    }
    if (email.value.indexOf("@", 0) < 0)
    {
	  
        window.alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
    }
    if (email.value.indexOf(".", 0) < 0)
    { 
	    
        window.alert("Please enter e-mail address.");
        email.focus();
        return false;
    }

    if ((nocall.checked == false) && (phone.value == ""))
    {
        window.alert("Please enter your phone number.");
        phone.focus();
        return false;
    }
	
	
    if(city.value=="")
	{
	   window.alert("Please enter City!");
	   city.focus();
	   return false;
	}
	
	if(state.value=="")
	{
	    window.alert("Please type your state");
	    state.focus();
	    return false;
	}
	
	if(bday.value=="")
	{
	window.alert("Select Date Month Year!");
	bday.focus();
	return false;
	}
	
	if(location.value=='')
	{
	window.alert("Type Location");
	location.focus();
	return false;
	}
	
	if(address.value=='')
	{
	window.alert("Type address in the box");
	address.focus();
	return false;
	}
	
	if(subject.value=="")
	{
	window.alert("Type Subject");
	subject.focus();
	return false;
	
	}

 
    return true;
}

function EnableDisable(chkbx)
{
    if(chkbx.checked == true)
    {
        document.ContactForm.phone.disabled = true;
    }
    else
    {
        document.ContactForm.phone.disabled = false;
    }
}


