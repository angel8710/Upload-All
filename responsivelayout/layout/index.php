<?php
include_once "../../opensite_functions.php";

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
	
<link rel="shortcut icon" href="http://www.benchmark.bg/favicon.ico" type="image/x-icon" />
<link rel="icon" href="http://www.benchmark.bg/favicon.png" type="image/png" />
 
<title><?php echo ($lvl_title=='')?'Boxes':$lvl_title; ?></title>
<meta name="title" content="<?php echo ($lvl_title=='')?'BenchMark':$lvl_title; ?>">
<meta name="description" content="<?php echo ($lvl_desc=='')?'57 CFD върху Индекси, Стоки, Метали и др. Безплатна демо сметка със $100 000':$lvl_desc?>" />
<meta name="keywords" content="<?php echo ($lvl_kw=='')?'':$lvl_kw; ?>" />

	
	<!--[if gte IE 9]>
	  <style type="text/css">
		.gradient {
		   filter: none;
		}
	  </style>
	<![endif]-->
	
	 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	 
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/custom.css" rel="stylesheet">

	<link href="css/custom-t.css" rel="stylesheet">
	<link href="css/custom-p.css" rel="stylesheet">

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
				<a class="" href="/index.php">
				<img src="/img/logo-black.svg" width="190" class="center-block" style="margin-top: -5px;"></a>
                    <span class="mobile-menu visible-xs">
                        <ul class="nolist">
                            <li><a target="_blank" href="/За-нас_456.html">За нас</a></li> |
                            <li><a target="_blank" href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/">Контакти</a></li>
                        </ul>
                    </span>
            </div>           
            <div class="hidden-xs" id="">
                <ul class="nav navbar-nav navbar-right secondary-menu" style="width: 520px; position: relative;">
                <li><a href="https://benchmark.bg/academy/" target="_blank"><span style="color:#002662;">Сайт за обучение&nbsp;<i class="fa fa-graduation-cap" aria-hidden="true"></i></span></a></li>   
				<li><a href="http://benchmark.bg" target="_blank"  style="color: #526C86 !important;">Сайт за търговия <span class="fa fa-sign-in"></span></a></li>				
			   <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank" target="_blank"  style="color: #526C86 !important;">Контакти<i class="fa fa-phone" aria-hidden="true"></i><span style="color:#7b0f17;"></span></a></li>
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

	<div class="container" style="margin-top: 5%;">
	<div class="col-lg-12 col-md-9 col-sm-12 col-xs-12">
    <h1 class="page-header">Boxes</h1>

<!-- Start -->	

<div class='outline'>

<!--
<div class="row">
                <div class="features">
                    <div class="col-md-4 col-sm-12 wow fadeInUp animated" data-wow-duration="300ms" data-wow-delay="0ms" style="visibility: visible; animation-duration: 300ms; animation-delay: 0ms; animation-name: fadeInUp;">
                        <div class="media service-box">
						<div class="upper-part"><span class="text">Maintenance<span></div>
						<div class="icon">
						  <div class="inner">              
							 <i class="fa fa-wrench" aria-hidden="true"></i>
						  </div>
						</div> 
                            <div class="media-body">
                                <h4 class="media-heading">City Ride</h4>
                                <p>Backed by some of the biggest names in the industry, Firefox OS is an open platform that fosters greater</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-12 wow fadeInUp animated" data-wow-duration="300ms" data-wow-delay="100ms" style="visibility: visible; animation-duration: 300ms; animation-delay: 100ms; animation-name: fadeInUp;">
                        <div class="media service-box">
						<div class="upper-part"><span class="text">Settings</span></div>
						<div class="icon">
						  <div class="inner">              
							<i class="fa fa-cog" aria-hidden="true"></i>
						  </div>
						</div>  
                            <div class="media-body">
                                <h4 class="media-heading">Luxury Cars</h4>
                                <p>Backed by some of the biggest names in the industry, Firefox OS is an open platform that fosters greater</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-12 wow fadeInUp animated" data-wow-duration="300ms" data-wow-delay="200ms" style="visibility: visible; animation-duration: 300ms; animation-delay: 200ms; animation-name: fadeInUp;">
                        <div class="media service-box"> 
						<div class="upper-part"><span class="text">Storage</span></div>
								<div class="icon">
						  <div class="inner">  
                            <i class="fa fa-cloud" aria-hidden="true"></i>
						  </div>
						</div>  
                            <div class="media-body">
                                <h4 class="media-heading">Insurance</h4>
                                <p>Morbi vitae tortor tempus, placerat leo et, suscipit lectus. Phasellus ut euismod massa, eu eleifend ipsum.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div> -->

</div>
<p>&nbsp;</p>

<div class='outline'>
<div class="row">
                <div class="features">
                    <div class="col-md-4 col-sm-12 wow fadeInUp animated" data-wow-duration="300ms" data-wow-delay="0ms" style="visibility: visible; animation-duration: 300ms; animation-delay: 0ms; animation-name: fadeInUp;">
                        <div class="uv-box">
						<div class="background-back"><span class="text">Entry Module<span></div>
						<div class="module-head-image">
							<i class="fa fa-sign-in"></i>
							</div>
							<div class="text-body">
                                <h4 class="text-heading"></h4>
                                <img src="./img/chrome.png"/>
                            </div>
                            <div class="text-body">
                                <h4 class="text-heading">City Ride</h4>
                                <p>Backed by some of the biggest names in the industry, Firefox OS is an open platform that fosters greater</p>
                            </div>
                        </div>
                    </div><!--/.col-md-4-->

                    <div class="col-md-4 col-sm-12 wow fadeInUp animated" data-wow-duration="300ms" data-wow-delay="100ms" style="visibility: visible; animation-duration: 300ms; animation-delay: 100ms; animation-name: fadeInUp;">
                        <div class="uv-box">
						<div class="background-back"><span class="text">Tech Module</span></div>
						<div class="module-head-image">
							<i class="fa fa-code"></i>
							</div>
							<div class="text-body">
                                <h4 class="text-heading"></h4>
                                <img src="./img/chrome.png"/>
                            </div>
                            <div class="text-body">
                                <h4 class="text-heading">Luxury Cars</h4>
                                <p>Backed by some of the biggest names in the industry, Firefox OS is an open platform that fosters greater</p>
                            </div>
                        </div>
                    </div><!--/.col-md-4-->

                    <div class="col-md-4 col-sm-12 wow fadeInUp animated" data-wow-duration="300ms" data-wow-delay="200ms" style="visibility: visible; animation-duration: 300ms; animation-delay: 200ms; animation-name: fadeInUp;">
                        <div class="uv-box"> 
						<div class="background-back"><span class="text">Professional Modules</span></div>
								<div class="module-head-image">
							<i class="fa fa-briefcase"></i>
							</div>
							<div class="text-body">
                                <h4 class="text-heading"></h4>
                                <img src="./img/chrome.png"/>
                            </div>
                            <div class="text-body">
                                <h4 class="text-heading">Insurance</h4>
                                <p>Morbi vitae tortor tempus, placerat leo et, suscipit lectus. Phasellus ut euismod massa, eu eleifend ipsum.</p>
                            </div>
                        </div>
                    </div><!--/.col-md-4-->

                </div>
            </div>

</div>
<!-- End -->	
</div>
</div>

    <footer>
        <div class="container">
            <ul>
                <li><a href="https://www.benchmark.bg/academy/%D0%B7%D0%B0-%D0%BD%D0%B0%D1%81/" target="_blank" style="color: #526C86 !important;">За нас</a></li>
                <li>|</li>
                <li><a href="http://benchmark.bg" target="_blank" style="color: #526C86 !important;">Към основния сайт</a></li>
                <li>|</li>
                <li><a href="https://www.benchmark.bg/academy/" target="_blank" style="color: #526C86!important;">Контакти</a></li>
            </ul>
        </div>
    </footer>
<?php
include_once "/var/www/common/functions-misc.php";
//Facebook pixel code
	js_facebook_code('1055135051179489');

//Piwik Analytics code
	js_piwik_code('17'); 

//Google Analytics code
	js_google_code('UA-52524336-1'); 
?>



</body>
</html>