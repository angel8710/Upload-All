<?php
include_once "../../opensite_functions.php";
include_once "/var/www/common/functions-misc.php";
//Constants
define("_NBU_EVENT_ID_",766);

//Check for valid md5 campaign ID
if( preg_match("/^[a-f0-9]{32}$/", $_GET['campaignlogin'])) {
    $db->sql_query("INSERT INTO benchmark.landing_ips(ip, campaign, landing, visited) VALUES 
	(".$db->PDO->quote($_SERVER['REMOTE_ADDR']).", "
	.$db->PDO->quote($_GET['campaignlogin']).", 
	4, 
	NOW())");
	//
	$_SESSION['campain_ind']=$_GET['campaignlogin'];
	$_SESSION['first_click']=1;
	header("Location: ".str_replace('/cmp'.$_GET['campaignlogin'], '', $_SERVER['REQUEST_URI']));
	exit();
}

//Check for valid session campaign md5
if( preg_match("/^[a-f0-9]{32}$/", $_SESSION['campain_ind'])) { //echo 3;
	$first_click=$_SESSION['first_click'];
	$headers='';
	$head = getallheaders();
	foreach($head as $k=>$v) {
		$headers .= $k.": ".$v."\n";
	}
	$x='';
	$requesturi_cyrilic=iconv('utf8', 'windows-1251', rawurldecode(basename($_SERVER['REQUEST_URI'])));
	if(strlen(iconv('utf8', 'windows-1251', rawurldecode($requesturi_cyrilic)))==0 && basename($_SERVER['REQUEST_URI'])!='' && basename($_SERVER['REQUEST_URI'])!='bg_BG') {
		$x=basename($_SERVER['REQUEST_URI']);
	  	$temp=str_replace('?s=1','',str_replace('_','',str_replace('.html','',strstr($x, '_'))));
		$ptitle_qry=$db->sql_query("SELECT title_bg_BG FROM benchmark.menu WHERE id=".$db->PDO->quote($temp));
		$ptitle=$db->sql_fetchrow($ptitle_qry);
		$requesturi_cyrilic=1;
	  } 
	
    $sc_query = $db->sql_query("SELECT id FROM benchmark.sources2campaign WHERE url_final_bg_BG LIKE '%{$_SESSION['campain_ind']}%'");
    //var_dump($db->PDO->errorInfo());
    $sc = $db->sql_fetchrow($sc_query);
    //var_dump($sc['id']);
    $_SESSION['sc'] = $sc['id'];
    $db->sql_query("INSERT INTO benchmark.campaign_stat (dat,server_name,requesturi,requesturi_cyrilic,section2campaign_md5,ip,headers,language,remote_host,first_click) 
	VALUES(NOW(),"
	.$db->PDO->quote($_SERVER['SERVER_NAME']).","
	.$db->PDO->quote($requesturi_cyrilic).","
	.$db->PDO->quote($requesturi_cyrilic).","
	.$db->PDO->quote($_SESSION['campain_ind']).","
	.$db->PDO->quote($_SERVER['REMOTE_ADDR']).","
	.$db->PDO->quote($headers).","
	.$db->PDO->quote($_SESSION['LANG']['key']).","
	.$db->PDO->quote($_SERVER['REMOTE_HOST']).","
	.$db->PDO->quote($first_click).")");
	//
	unset($_SESSION['first_click']);
	$x='';
	
}
?>

<!DOCTYPE html>

<!--[if lt IE 7 ]> <html class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->

    

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="BenchMark Finance">
	
<link rel="shortcut icon" href="https://www.benchmark.bg/academy/favicon.ico">
<link rel="canonical" href="<?php BM::protocol(); ?>://<?php echo BM::$use_www;?><?php BM::domain(); echo str_replace(array("mobile1/","mobile2/","mobile/"),"",$_SERVER['REQUEST_URI']);?>"/>
 
<title><?php echo ($lvl_title=='')?'Стани успешен финансов трейдър с БенчМарк Академия':$lvl_title; ?></title>
<meta name="title" content="">
<meta name="description" content="" />
<meta name="keywords" content="" />


	
	<!--[if gte IE 9]>
	  <style type="text/css">
		.gradient {
		   filter: none;
		}
	  </style>
	<![endif]-->

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/custom.css" rel="stylesheet">

	<link href="css/custom-t.css" rel="stylesheet">
	<link href="css/custom-p.css" rel="stylesheet">
	<link href="css/form.css" rel="stylesheet">
	
<!--	<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
-->

	<!-- Custom Fonts -->
	<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>
	 
	 
	
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <!-- Navigation -->
	<!-- Secondary Menu -->
    
	
	<nav class="navbar navbar-inverse">
        <div class="container">
            <div class="navbar-header" id="navbar" style="margin-top: -28px; padding-top: 15px; height: 89px;">               
				<a class="navbar-brand" href="http://www.benchmark.bg/landing/albena/">
				<img src="https://www.benchmark.bg/academy/wp-content/themes/benchmark_academy/images/bm-academy-logo.svg" width="190" class="center-block unveil-loaded down" style="margin-top: -7px; margin-left:-7px;"></a>

            </div>           
            <div class="hidden-xs" id="">
                <ul class="nav navbar-nav navbar-right secondary-menu" style="width: 520px; position: relative;">
                <li><a href="https://benchmark.bg/academy/" target="_blank"><span style="color:#002662;">Сайт за обучение&nbsp;<i class="fa fa-graduation-cap" aria-hidden="true"></i></span></a></li>   
				<li><a href="http://benchmark.bg" target="_blank">Сайт за търговия <span class="fa fa-sign-in"></span></a></li>				
			   <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank">Контакти <i class="fa fa-phone" aria-hidden="true"></i><span style="color:#7b0f17;"></span></a></li>
                <li style="margin-top: 9px;">
                    <div id="comm100-button-541" style="margin-right: -10px;"><a href="#" onclick="Comm100API.open_chat_window(event, 541);" 
					style="color: #002662 !important;">Live chat</a></div>
                    <script async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async="" defer="" src="https://www.benchmark.bg/piwik/piwik.js"></script><script src="https://connect.facebook.net/signals/config/1055135051179489?v=2.7.7" async=""></script><script async="" src="https://connect.facebook.net/en_US/fbevents.js"></script><script type="text/javascript" async="" src="https://chatserver.comm100.com/livechat.ashx?siteId=199228"></script><script type="text/javascript" async="" src="https://chatserver.comm100.com/livechat.ashx?siteId=199228"></script><script type="text/javascript"> 
					var Comm100API=Comm100API||{chat_buttons:[]}; Comm100API.chat_buttons.push({code_plan:541,div_id:'comm100-button-541'}); 
					Comm100API.site_id=199228;Comm100API.main_code_plan=541; 
					(function(){ var lc=document.createElement('script'); lc.type='text/javascript';lc.async=true; 
					lc.src='https://chatserver.comm100.com/livechat.ashx?siteId='+Comm100API.site_id; 
					var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(lc,s); })(); 
					</script></li>
                <li style="margin-top: 8px;"><span class="fa fa-comments brand-color"></span></li>
            </ul>
            </div>           
        </div>
        <!-- /.container -->
    </nav>
   
    <header>
	<div class="wrap">
		<div class="container">
			<div class="row text-left">
					<h1 class="topHeading">Първи стъпки в света на финансовите пазари</h1>
			</div>
			<div class="row firstRow">
			<div class="container">
			
			<div class="row">     
			<div class="col-md-3 col-sm-3 col-xs-12">
			<a href="http://www.benchmark.bg/landing/albena/"><button class="pro-btn res" style="width: 105px;float: left;margin-left: -5%;margin-top: 3px;border: none;color: #afafaf;font-family: aktiv-grotesk, sans-serif;">
		<i class="fa fa-angle-left" style="font-size:24px"></i>&nbsp;Назад</button></a>
	    </div>

	   <div class="col-md-6 col-sm-6 col-xs-12">
            <h1 class="text-center surveyHeader kart">Анкетна карта</h1>
	   </div>
    </div>
   

   <div class="row">
	<div class="back" style="padding-left: 0px !important;">
    <form name="frm_registration" id="frm_registration" method="post" action="survey_completed.php" style=" padding-left: 11px;">
	<input type="hidden" name="obj_id" id="obj_id" value="">
    <div class="box">
	 <p class="questionsSurvey">1. Каква специалност следвате?</p> 
	 </div>
	 <ul class="surveyUl">
	<input class="inputSurvey" type="radio" name="q[1]" value="1">
	  <label for="radio hidden">Финанси</label>
	  
	<input class="inputSurvey" type="radio" name="q[1]" value="2" >
	  <label for="radio">Икономика</label><br>
		
	<input class="inputSurvey" type="radio" name="q[1]" value="3" >
	  <label for="radio">Информатика</label>
	 	
	<input class="inputSurvey" type="radio" name="q[1]" value="4" >
	  <label for="radio">Статистика</label><br>
		
	<input class="inputSurvey" type="radio" name="q[1]" value="5" >
	  <label for="radio">Маркетинг</label>
	
	<input class="inputSurvey" type="radio" name="q[1]" value="6" >
	  <label for="radio">Друго</label>
	<input type="text" class="inputFieldsSurvey" name="fln" id="fln" style="width: 39.3%;">
	  </div>
	<br /> 
	 
	<div class="back">	 
	 <div class="box">
	 <p class="questionsSurvey">2. Полезно ли беше обучението за вас?</p> 
	 </div>
	
	<input class="inputSurvey" type="radio" name="q[2]" value="7">
	  <label for="radio">Да</label>

	<input class="inputSurvey" type="radio" name="q[2]" value="8">
	  <label for="radio">Не</label>
	  
	<input class="inputSurvey" type="radio" name="q[2]" value="9">
	  <label for="radio">Не мога да преценя</label>
	  <p>Коментар:</p><textarea name="r[2]" rows="3" class="textareaSurvey"></textarea>
</div>	
	
	<br /> 
	<div class="back">	  
	 <div class="box">
	 <p class="questionsSurvey">3. Разбираемо ли беше изнесена презентацията?</p> 
	 </div>
	 
	<input class="inputSurvey" type="radio" name="q[3]" value="7">
	  <label for="radio">Да</label>
	<input class="inputSurvey" type="radio" name="q[3]" value="8">
	  <label for="radio">Не</label>
 
	<input class="inputSurvey" type="radio" name="q[3]" value="9">
	  <label for="radio">Не мога да преценя</label>
	  <p>Препоръки:</p><textarea name="r[3]" rows="3" class="textareaSurvey"></textarea>
</div>
 	 
	<br />  
	<div class="back">	  
	<div class="box">
	 <p class="questionsSurvey">4. Вашето мнение за организацията на обучението:</p> 
	 </div>

	<input class="inputSurvey" type="radio" name="q[4]" value="7">
	  <label for="radio">Много добра</label>

	<input class="inputSurvey" type="radio" name="q[4]" value="8">
	  <label for="radio">Задоволителна</label><br>
	  
	<input class="inputSurvey" type="radio" name="q[4]" value="9">
	  <label for="radio">Незадоволителна</label>
	  <p>Препоръки:</p><textarea name="r[4]" rows="3" class="textareaSurvey"></textarea>
	 
</div>
 
  <br />  
   <div class="back">	  
	<div class="box">
	 <p class="questionsSurvey">5. Информирани ли сте за текущите и предстоящи семинари/уебинари/специални събития, провеждани от БенчМарк Академия?</p> 
	 </div>
	 
	<input class="inputSurvey" type="radio" name="q[5]" value="10">
	  <label for="radio">Да</label>

	<input class="inputSurvey" type="radio" name="q[5]" value="11">
	  <label for="radio">Не</label>

</div>
    <br />  
    <div class="back">	  
	 <div class="box">
	 <p class="questionsSurvey">6. Каква е предпочитаната от Вас форма за провеждане на обучения от БенчМарк Академия?</p> 
	 </div>
	 
	<input class="inputSurvey" type="radio" name="q[6]" value="12">
	  <label for="radio">Онлайн курсове/семинари</label><br>

	<input class="inputSurvey" type="radio" name="q[6]" value="13">
	  <label for="radio">Присъствени курсове</label>

</div>
 
    <br />   
    <div class="back">
     <div class="box">
	 <p class="questionsSurvey">7. В кое от следните обучения, в областта на търговията на финансовите пазари, бихте искали да участвате?</p> 
	 </div>

	<input class="inputSurvey" type="radio" name="q[7]" value="14">
	  <label for="radio">За начинаещи</label>

	<input class="inputSurvey" type="radio" name="q[7]" value="15">
	  <label for="radio">За напреднали</label><br>
	  
	<input class="inputSurvey" type="radio" name="q[7]" value="16">
	  <label for="radio">С практическа насоченост</label><br>
	  
	<input class="inputSurvey" type="radio" name="q[7]" value="17">
	  <label for="radio">Под формата на консултации</label><br>
	  
	<input class="inputSurvey" type="radio" name="q[7]" value="18">
	  <label for="radio">Не бих се включил</label>
	  <br />
	<input class="inputSurvey" type="radio" name="q[7]" value="19">
	  <label for="radio">Друго</label>
	<input type="text" class="inputFieldsSurvey" name="seven" id="seven" style="width: 37.3%;">	  
	</div>	
	<br />  
	
	<div class="back">	  
	<div class="box">
	 <p class="questionsSurvey">8. Имате ли предишен опит в търговия на финансовите пазари?</p> 
	 </div>
	<input class="inputSurvey" type="radio" name="radio" value="20">
	  <label for="radio">Да</label>
	<input class="inputSurvey" type="radio" name="radio" value="21">
	 <label for="radio">Не</label>
	</div>
	<br />  
<input type="submit" name="submit" title="Изпрати" value="Изпрати" class="btn btn-demo-mobile bm" style="margin:10px auto 0 auto;display: block;width: 30%;font-family: aktiv-grotesk, sans-serif;">   
</ul>
</form>
    </div>
	  </div>
		</div>		
</header>

<script type="text/javascript" src="/js/jquery-1.11.1.min.js"></script>	
<script type="text/javascript" src="/js/bootstrap.min.js"></script>	
 <!--<div class="modal fade" tabindex="-1" role="dialog" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Затвори"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Информация</h4>
            </div>
            <div class="modal-body">
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-demo-mobile btnModalClose" data-dismiss="modal">Затвори</button>
            </div>
        </div>
        <!-- /.modal-content 
    </div>
 
</div>
<!-- /.modal -->  
	
	<script src="/js/jquery.validate.min.js"></script> 
	<script type="text/javascript">
	jQuery(document).ready(function(e) {
	var validator = jQuery("#frm_registration").validate({
		onfocusout: false,
  		onkeyup: false,
 		onclick: false,
		rules: {    
			fln: {required: true,minlength: 6},
			seven: {required: true },
		},
		submitHandler: function(form) { jQuery('#fwd').attr('value','Моля, изчакайте...').attr('disabled', 'disabled'); 
		jQuery.ajax({
			url: "../../register_seminar.php",
			data: {
				
				fln: jQuery("#fln").val() + " (" + jQuery("#specialty").val() + ")",
				form_sid: "<?php echo isset($_SESSION['form_sid']) ? $_SESSION['form_sid'] : "" ; ?>",
                ref: "landing",
				id: jQuery("#obj_id").val(),
						    
				},
			type: "GET",
			cache: false,
			dataType: "html",
			async: false			
			})
			.done(function ( data, textStatus, jqXHR) {
				jQuery('#fwd').attr('value','Регистрирай се').removeAttr('disabled');
				document.getElementById("frm_registration").reset();
				jQuery('#myModal .modal-title').html("Регистрация");
				jQuery('#myModal .modal-body').html(data);
				jQuery('#myModal').modal({});
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				jQuery('#fwd').attr('value','Регистрирай се').removeAttr('disabled');
				document.getElementById("frm_registration").reset();
				jQuery('#myModal .modal-title').html("Грешка");
				jQuery('#myModal .modal-body').html(textStatus + "<br>" +errorThrown);
				jQuery('#myModal').modal({});
			});
		 },
		messages: {
			fln: {
				required: "Полето е задължително.",
				minlength: "Полето трябва да съдържа поне 6 символа."
				},
			obj_id: {
				required: "Полето е задължително."				
				},
				
			seven: {
				required: "Полето е задължително."				
				}
			
			}
		
		});
		
		
		});
</script>


<!--
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<script src="js/validation.js"></script>
<script src="js/main-form.js"></script>-->

    <footer>
        <div class="container">
            <ul>
                <li><a href="https://www.benchmark.bg/academy/%D0%B7%D0%B0-%D0%BD%D0%B0%D1%81/" target="_blank">За нас</a></li>
                <li>|</li>
                <li><a href="http://benchmark.bg" target="_blank">Към основния сайт</a></li>
                <li>|</li>
                <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank">Контакти</a></li>
            </ul>
        </div>
    </footer>


</body>
</html>