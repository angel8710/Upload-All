
function Validate()
{
    var name = document.ContactForm.name;
    var email = document.ContactForm.email;
    var phone = document.ContactForm.phone;
    var address = document.ContactForm.address;
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




