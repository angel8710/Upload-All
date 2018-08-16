<?php
include '../../opensite_functions.php';
include_once '/var/www/common/functions-misc.php';  
include_once 'config.php';
?>

<!DOCTYPE html>

<!--[if lt IE 7 ]> <html class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> 

<html lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="BenchMark Finance">

        <link rel="shortcut icon" href="https://www.benchmark.bg/academy/favicon.ico">
        <link rel="canonical" href="<?php BM::protocol(); ?>://<?php BM::domain(); ?>"/>

        <title><?php echo ($lvl_title == '') ? 'СТАНИ УСПЕШЕН ФОРЕКС ТРЕЙДЪР' : $lvl_title; ?></title>
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

        <!-- Custom Fonts -->
        <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">

        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>
        <!--Facebook open graph-->        
        <meta property="og:type" content="business.business">
        <meta property="og:title" content="БенчМарк Академия">
        <meta property="og:description" content="Излъчване на живо на обученията от курса 'Стани успешен форекс трейдър'.">
        <meta property="og:url" content="https://www.benchmark.bg/landing/livestream/">
        <meta property="og:image" content="https://www.benchmark.bg/img/livestream_sm_open_graph.jpg">
        <meta property="business:contact_data:street_address" content="бул. Черни връх 32, вх. А">
        <meta property="business:contact_data:locality" content="София">
        <meta property="business:contact_data:postal_code" content="1407">
        <meta property="business:contact_data:country_name" content="България">
        <meta property="business:contact_data:phone_number" content="+359 2 962 57 95">
        <meta property="place:location:latitude" content="42.670678">
        <meta property="place:location:longitude" content="23.320219">
        <!--END Facebook open graph-->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
<?php 
//Facebook pixel code
	js_facebook_code('1055135051179489');

//Piwik Analytics code
	js_piwik_code('17'); 

//Google Analytics code
	js_google_code('UA-52524336-1'); ?>
    </head>

    <body>
        <!-- Navigation -->
        <!-- Secondary Menu -->
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header" id="navbar" style="margin-top: -28px; padding-top: 15px; height: 89px;">               
                    <a class="navbar-brand" href="https://www.benchmark.bg/landing/livestream/">
                        <img src="https://www.benchmark.bg/academy/wp-content/themes/benchmark_academy/images/bm-academy-logo.svg" width="190" class="center-block unveil-loaded down" style="margin-top: -7px; margin-left:-7px;">
                    </a>
                </div>           
                <div class="hidden-xs" id="">
                    <ul class="nav navbar-nav navbar-right secondary-menu" style="width: 520px; position: relative;">
                        <li><a href="https://benchmark.bg/academy/" target="_blank"><span style="color:#002662;">Сайт за обучение&nbsp;<i class="fa fa-graduation-cap" aria-hidden="true"></i></span></a></li>   
                        <li><a href="https://www.benchmark.bg" target="_blank">Сайт за търговия <span class="fa fa-sign-in"></span></a></li>				
                        <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank">Контакти <i class="fa fa-phone" aria-hidden="true"></i><span style="color:#7b0f17;"></span></a></li>
                        <li style="margin-top: 9px;">
                            <div id="comm100-button-541" style="margin-right: -10px;">
                                <a href="#" onclick="Comm100API.open_chat_window(event, 541);" style="color: #002662 !important;">Live chat</a>
                            </div>
                            <script async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async="" defer="" src="https://www.benchmark.bg/piwik/piwik.js"></script><script src="https://connect.facebook.net/signals/config/1055135051179489?v=2.7.7" async=""></script><script async="" src="https://connect.facebook.net/en_US/fbevents.js"></script><script type="text/javascript" async="" src="https://chatserver.comm100.com/livechat.ashx?siteId=199228"></script><script type="text/javascript" async="" src="https://chatserver.comm100.com/livechat.ashx?siteId=199228"></script><script type="text/javascript">
                                var Comm100API = Comm100API || {chat_buttons: []};
                                Comm100API.chat_buttons.push({code_plan: 541, div_id: 'comm100-button-541'});
                                Comm100API.site_id = 199228;
                                Comm100API.main_code_plan = 541;
                                (function () {
                                    var lc = document.createElement('script');
                                    lc.type = 'text/javascript';
                                    lc.async = true;
                                    lc.src = 'https://chatserver.comm100.com/livechat.ashx?siteId=' + Comm100API.site_id;
                                    var s = document.getElementsByTagName('script')[0];
                                    s.parentNode.insertBefore(lc, s);
                                })();
                            </script>
                        </li>
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
                        <div class="col-xs-12">
                            <h1 class="topHeading">СТАНИ УСПЕШЕН ФОРЕКС ТРЕЙДЪР</h1>
                        </div>
                    </div>

                    <div class="row firstRow">     
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <h2 class="success-txt">УСПЕШНА РЕГИСТРАЦИЯ!</h2>
                        </div>
                        
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <h2 class="thankyou-txt">Благодарим Ви за проявения интерес!</h2>
                             <p class="successSurvey">На посочения от Вас имейл е изпратено съобщение с данните Ви за достъп.</p>
                             <p>За вход в платформата, моля натиснете <strong><a href="https://www.benchmark.bg/academy/wp-content/themes/benchmark_academy/live-event-registration.php?event=" class="linkcolor">тук.</a></strong></p>                                   
                        <p class="successSurvey">Ако имате допълнителни въпроси, може да се  <a class="linkcolor" href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank"><b style="color:#ff0000">свържете с нас.</b></a>
                        </p>
                                    
                        </div>
                        

                    </div>
                </div>
            </div>
        </header>

        <script type="text/javascript" src="/js/jquery-1.11.1.min.js"></script>	
        <script type="text/javascript" src="/js/bootstrap.min.js"></script>	

        <footer>
            <div class="container">
                <ul>
                    <li><a href="https://www.benchmark.bg/academy/%D0%B7%D0%B0-%D0%BD%D0%B0%D1%81/" target="_blank">За нас</a></li>
                    <li>|</li>
                    <li><a href="https://www.benchmark.bg" target="_blank">Към основния сайт</a></li>
                    <li>|</li>
                    <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank">Контакти</a></li>
                </ul>
            </div>
        </footer>


    </body>
</html>