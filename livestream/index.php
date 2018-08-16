<?php /*<?php
include_once "../../opensite_functions.php";
include_once "/var/www/common/functions-misc.php";
require '/var/www/common/Gen-random.php';
include_once 'config.php';
gen_random(false);
//Constants
define("SEMINAR_COURSE_ID_", '399');
if (time() > strtotime(SEMINAR_COURSE_STARTED_TIME)) {
    $seminarCourseStarted = true;
} else {
    $seminarCourseStarted = false;    
}

//Check for valid md5 campaign ID
if (preg_match("/^[a-f0-9]{32}$/", $_GET['campaignlogin'])) {
    $db->sql_query("INSERT INTO benchmark.landing_ips(ip, campaign, landing, visited) VALUES 
	(" . $db->PDO->quote($_SERVER['REMOTE_ADDR']) . ", "
            . $db->PDO->quote($_GET['campaignlogin']) . ", 
	4, 
	NOW())");
    //
    $_SESSION['campain_ind'] = $_GET['campaignlogin'];
    $_SESSION['first_click'] = 1;
    header("Location: " . str_replace('/cmp' . $_GET['campaignlogin'], '', $_SERVER['REQUEST_URI']));
    exit();
}

//Check for valid session campaign md5
if (preg_match("/^[a-f0-9]{32}$/", $_SESSION['campain_ind'])) { //echo 3;
    $first_click = $_SESSION['first_click'];
    $headers = '';
    $head = getallheaders();
    foreach ($head as $k => $v) {
        $headers .= $k . ": " . $v . "\n";
    }
    $x = '';
    $requesturi_cyrilic = iconv('utf8', 'windows-1251', rawurldecode(basename($_SERVER['REQUEST_URI'])));
    if (strlen(iconv('utf8', 'windows-1251', rawurldecode($requesturi_cyrilic))) == 0 && basename($_SERVER['REQUEST_URI']) != '' && basename($_SERVER['REQUEST_URI']) != 'bg_BG') {
        $x = basename($_SERVER['REQUEST_URI']);
        $temp = str_replace('?s=1', '', str_replace('_', '', str_replace('.html', '', strstr($x, '_'))));
        $ptitle_qry = $db->sql_query("SELECT title_bg_BG FROM benchmark.menu WHERE id=" . $db->PDO->quote($temp));
        $ptitle = $db->sql_fetchrow($ptitle_qry);
        $requesturi_cyrilic = 1;
    }

    $sc_query = $db->sql_query("SELECT id FROM benchmark.sources2campaign WHERE url_final_bg_BG LIKE '%{$_SESSION['campain_ind']}%'");
    //var_dump($db->PDO->errorInfo());
    $sc = $db->sql_fetchrow($sc_query);
    //var_dump($sc['id']);
    $_SESSION['sc'] = $sc['id'];
    $db->sql_query("INSERT INTO benchmark.campaign_stat (dat,server_name,requesturi,requesturi_cyrilic,section2campaign_md5,ip,headers,language,remote_host,first_click) 
	VALUES(NOW(),"
            . $db->PDO->quote($_SERVER['SERVER_NAME']) . ","
            . $db->PDO->quote($requesturi_cyrilic) . ","
            . $db->PDO->quote($requesturi_cyrilic) . ","
            . $db->PDO->quote($_SESSION['campain_ind']) . ","
            . $db->PDO->quote($_SERVER['REMOTE_ADDR']) . ","
            . $db->PDO->quote($headers) . ","
            . $db->PDO->quote($_SESSION['LANG']['key']) . ","
            . $db->PDO->quote($_SERVER['REMOTE_HOST']) . ","
            . $db->PDO->quote($first_click) . ")");
    //
    unset($_SESSION['first_click']);
    $x = '';
}
?>  */?>

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
        <meta property="og:image" content="https://www.benchmark.bg/img/livestream_open_graph_img.jpg">
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
<?php /* <?php 
//Facebook pixel code
	js_facebook_code('1055135051179489');

//Piwik Analytics code
	js_piwik_code('17'); 

//Google Analytics code
	js_google_code('UA-52524336-1'); */?>
    
<!-- Hotjar Tracking Code for http://www.benchmark.bg -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:639654,hjsv:5};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
</script>

    </head>

    <body>
        <!-- Navigation -->
        <!-- Secondary Menu -->

        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header" id="navbar" style="margin-top: -28px; padding-top: 15px; height: 89px;">               
                    <a class="navbar-brand" href="https://www.benchmark.bg/landing/livestream/">
                        <img src="https://www.benchmark.bg/academy/wp-content/themes/benchmark_academy/images/bm-academy-logo.svg" width="190" class="center-block unveil-loaded down" style="margin-top: -7px; margin-left:-7px;"></a>
                    <span class="mobile-menu hidden-xs hidden-md hidden-sm hidden-lg">
                        <ul class="nolist">
                            <li><a target="_blank" href="/За-нас_456.html">За нас</a></li> |
                            <li><a target="_blank" href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/">Контакти</a></li>
                        </ul>
                    </span>
                </div>           
                <div id="">
                    <ul class="nav navbar-nav navbar-right secondary-menu hidden-xs" style="width: 520px; position: relative;">
                        <li><a href="https://benchmark.bg/academy/" target="_blank"><span style="color:#002662;">Сайт за обучение&nbsp;<i class="fa fa-graduation-cap" aria-hidden="true"></i></span></a></li>   
                        <li><a href="https://www.benchmark.bg" target="_blank">Сайт за търговия <span class="fa fa-sign-in"></span></a></li>				
                        <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank">Контакти <i class="fa fa-phone" aria-hidden="true"></i><span style="color:#7b0f17;"></span></a></li>
                        <li style="margin-top: 9px;">
                            <div id="comm100-button-541" style="margin-right: -10px;"><a href="#" onclick="Comm100API.open_chat_window(event, 541);" 
                                                                                         style="color: #002662 !important;">Live chat</a></div>
                            <script async="" src="https://www.google-analytics.com/analytics.js"></script>
                            <script type="text/javascript" async="" defer="" src="https://www.benchmark.bg/piwik/piwik.js"></script><script src="https://connect.facebook.net/signals/config/1055135051179489?v=2.7.7" async=""></script>
                            <script async="" src="https://connect.facebook.net/en_US/fbevents.js"></script>
                            <script type="text/javascript" async="" src="https://chatserver.comm100.com/livechat.ashx?siteId=199228"></script><script type="text/javascript" async="" src="https://chatserver.comm100.com/livechat.ashx?siteId=199228"></script><script type="text/javascript">
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
                            </script></li>
                        <li style="margin-top: 8px;"><span class="fa fa-comments brand-color"></span></li>
                    </ul>
                </div>           
            </div>
            <!-- /.container -->
        </nav>

        <header>
            <div class="wrap" id="scrollTop">
                <div class="container">
                    <div class="row text-left">
                        <div class="col-xs-12">
                            <h1 class="topHeading">СТАНИ УСПЕШЕН ФОРЕКС ТРЕЙДЪР</h1>
                        </div>
                    </div>
                    <div class="row firstRow">
                    <div class="col-xs-12 col-sm-12 col-md-7 col-lg-9" >
                        <h2 class="topHeading2 secondHeading"><b style="color: #c62026;" class="twoThousand">БЕЗПЛАТНА РЕГИСТРАЦИЯ</b> <b class="disappear">за обученията от курса</b>
                        </h2><br/>
                            
                    <div class="hidden-xs hidden-sm hidden-md hidden-lg" style="display:block;">                    
                        <div class="csoon agileinfo">
                           <ul class="countdown">
                            <li>
                                <span class="days">00</span>
                                <p class="days_ref">Дни</p>
                            </li>
                            <li>
                                <span class="hours">00</span>
                                <p class="hours_ref">Часа</p>
                            </li>
                            <li>
                                <span class="minutes">00</span>
                                <p class="minutes_ref">Минути</p>
                            </li>
                            <li>
                                <span class="seconds last">00</span>
                                <p class="seconds_ref">Секунди</p>
                            </li>
                        </ul>                    
                            </div>
                    </div> 
                            
                        <div class="info">
                            <p class="rowtextSecond"><span>Гледайте от 02 октомври на телефон или компютър поредицата от 6 лекции
                            </span></p>
                        </div>
                            
                        <div class="hidden-xs hidden-sm hidden-md hidden-lg infocourse" id="showOnlyMobile">
                          
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Продължителност:</span> 
                            6 лекции</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Начало:</span> 02 октомври 2017 г.</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Край:</span> 18 октомври 2017 г.</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Стартов час:</span> 18:00 ч.</p>
                        </div>

                       <div class="hidden-xs hidden-sm col-md-12 col-lg-12 infocourse" id="showOnlyDesktop">
                          
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Продължителност на курса:</span> 
                            6 лекции</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Начало на курса:</span> 02 октомври 2017 г.</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Край на курса:</span> 18 октомври 2017 г.</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Стартов час на лекциите:</span> 18:00 ч.</p>
                        </div>
                        

                        <!--<div class="col-xs-12 col-sm-12 hidden-md hidden-lg" id="regForm" style="display:block;    margin-bottom: 60px;">		
                            <div class="formWrapper">
                                <!--NO FORM 
                            </div>
                        </div>-->

                    </div>
                    
                    <div class="hidden-xs hidden-sm col-md-5 col-lg-3" style="display:block;">                    
                        <div class="csoon agileinfo">
                           <ul class="countdown">
                            <li>
                                <span class="days">00</span>
                                <p class="days_ref">Дни</p>
                            </li>
                            <li>
                                <span class="hours">00</span>
                                <p class="hours_ref">Часа</p>
                            </li>
                            <li>
                                <span class="minutes">00</span>
                                <p class="minutes_ref">Минути</p>
                            </li>
                            <li>
                                <span class="seconds last">00</span>
                                <p class="seconds_ref">Секунди</p>
                            </li>
                        </ul>                    
                            </div>
                    </div> 
                        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3" id="regForm" style="display:block;">		
                            <div class="formWrapper" id="stickysidebar">
                                <form method="get" class="removeHead" name="frm_registration" id="frm_registration" action="">                                    
                                    <input type="hidden" name="form_sid" id="form_sid" value="<?php echo $_SESSION['form_sid']; ?>">
                                    <div class="formHeading removeHead">
                                        <p class="small">РЕГИСТРАЦИЯ ЗА УЧАСТИЕ</p>
                                    </div>
                                    <div class="formName">
                                        <input type="text" name="fln" id="fln" placeholder="Име и фамилия" onFocus="jQuery(this).attr('placeholder', '');" onBlur="jQuery(this).attr('placeholder', 'Име и фамилия');" />
                                    </div>
                                    <div class="formMail">
                                        <input type="text" name="email" id="email" placeholder="Имейл адрес" onFocus="jQuery(this).attr('placeholder', '');" onBlur="jQuery(this).attr('placeholder', 'Имейл адрес');" />
                                    </div>
                                    <div class="formTel">
                                        <input type="text" name="phone" id="phone" placeholder="Телефон" onFocus="jQuery(this).attr('placeholder', '');" onBlur="jQuery(this).attr('placeholder', 'Телефон');"/>
                                    </div>
                                    
                                    <div>
                                        <button type="submit" class="formHeadingButton"><span class="small"  style="display: block;margin-top:-2px !important">Регистрирайте се</span></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <div class="col-xs-12 col-sm-12 hidden-md hidden-lg infocourse2" >
                          
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Продължителност:</span> 
                            6 лекции</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Начало:</span> 02 октомври 2017 г.</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Край:</span> 18 октомври 2017 г.</p>
                            <p><span class="txt360" style="color:#c62026;font-weight: bold;">Стартов час:</span> 18:00 ч.</p>
                        </div>
                        
                         <div class="col-xs-12 col-sm-12 col-md-7 col-lg-9" id="positionUp">
                         
                          <div class="info">
                            <p style="text-align: center;font-size: 22px;font-weight: bold;"><span>Какво ще науча?</span></p>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="textWrapper borderleft">	
                        <div class="panel-demo metatrader demo-active phheight">
                                    <div class="panel-heading panel-heading-demo padding_top_bottom_20">
                                        <span class="real real-m specialBgSiteFontSize" style="">Курсът е фокусиран върху търговията на международните финансови пазари. Предоставяме Ви възможността да натрупате необходимите знания, за да взимате правилните решения във всяка ситуация на пазара.</span>                                      
                                    </div>
                                    <div class="panel-heading panel-heading-demo padding_top_bottom_20">
                                      <span class="real real-m specialBgSiteFontSize" style="">  Регистрацията ще Ви осигури достъп до живите излъчвания на лекциите от курса «Стани успешен форекс трейдър». </span>
                                    </div>
                                      <div class="panel-heading panel-heading-demo padding_top_bottom_20">
                                      <span class="real real-m specialBgSiteFontSize" style="font-weight: bold;line-height: 1.1em;padding-bottom: 10px;">Теми в обучителния курс</span>
                                    </div>		                                    
                                </div>
                                
                                
                                
                                                            
                        <!-- Start Accordion Menu Info 1 -->
                                <div class="panel-group" role="tablist" aria-multiselectable="true">
                                <div class="accordion-main">
                                <div class="accordion-main-content" role="tab">
                                <h4 class="accordion-title"><a class="collapsed openaccordion" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" ><b>02.10.2017 г.</b> – Лекция 1: Първи стъпки към успешната търговия  <i class="fa fa-arrow-circle-o-right" style="color: #333333;"></i></a></h4>
                                </div>
                                <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="accordion-main-body warning" style="padding-left: 15px; padding-right: 15px; padding-top: 12px;margin-bottom: -30px;">
                                <p style="color:#000000;">Лекция 1 ще ви запознае с основите на търговията – термини, същност и параметри на валутния пазар. Темата е общообразователна. Ще бъдат споменати и накратко представени различни финансови инструменти с техните особености, като фокусът попада върху валутните пазари.</p>
                                <p style="color:#000000;">В Лекция 1 „Първи стъпки към успешната търговия“ ще научите:</p>
                                <ol class="fontstyle" style="margin-left: -23px !important;font-size: 15px;font-family: aktiv-grotesk, sans-serif;color: #000;">
                                    <li>Какво представляват финансовите пазари</li>
                                    <li>Кои са участниците:
                                <ul class="scontent-info">
                                    <li>Купувачи (бикове)</li>
                                    <li>Продавачи (мечки)</li>
                                </ul>
                                </li>
                                    <li>Кой движи пазара? Принцип на търговското поведение</li>
                                    <li>Цена – пазарна, цена на отваряне, цена на затваряне, спред</li>
                                    <li>Графично изобразяване на ценовото движение и периоди:
                                <ul class="scontent-info">
                                    <li>Линейна графика</li>
                                    <li>Бар графика</li>
                                    <li>Японски свещи</li>
                                </ul>
                                </li>
                                    <li>Дълги и къси позиции (покупки и продажби)</li>
                                    <li>Марджин търговия</li>
                                    <li>Видове поръчки:
                                <ul class="scontent-info">
                                    <li>Пазарни</li>
                                    <li>Отложени</li>
                                </ul>
                                </li>
                                    <li>Практическа работа с платформа за търговия на БенчМарк</li>
                                    <li style="margin-left: 8px !important;">Дискусионен панел с въпроси и отговори</li>
                                </ol>
                                <p>&nbsp;</p>
                                </div>
                              </div>
                            </div>                 
                        </div>  
                                
                                
                        <!-- Start Accordion Menu Info 2 -->
                                <div class="panel-group" role="tablist" aria-multiselectable="true">
                                <div class="accordion-main">
                                <div class="accordion-main-content" role="tab">
                                <h4 class="accordion-title"><a class="collapsed openaccordion" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse3" aria-expanded="false" aria-controls="collapse3"><b>06.10.2017 г.</b> – Лекция 2: Как да анализираме пазарните движения  <i class="fa fa-arrow-circle-o-right" style="color: #333333;"></i></a></h4>
                                </div>
                                <div id="collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="accordion-main-body warning" style="padding-left: 15px; padding-right: 15px; padding-top: 12px;margin-bottom: -30px;">
                                <p style="color:#000000;">Лекция 2 ще ви запознае с различните аспекти при анализиране на финансовите пазари. Ще се обърне внимание на ключови грешки, което ще ви спести години неуспешни опити. По отделно ще бъдат разгледани технически и фундаментален анализ, ще се обърне внимание как могат да се използват и двата подхода по лесен и интуитивен начин за начинаещия трейдър.</p>
                                <p style="color:#000000;">В Лекция 2 „Как да анализираме пазарните движения“ ще научите:</p>
                                <ol class="fontstyle" style="margin-left: -23px !important;font-size: 15px;font-family: aktiv-grotesk, sans-serif;color: #000;">
                                    <li>Какво представлява анализът на финансов инструмент</li>
                                    <li>Различни подходи при анализиране и вземане на решения:
                                <ul class="scontent-info">
                                    <li>Технически</li>
                                    <li>Фундаментален</li>
                                    <li>Смесен</li>
                                    <li>Често допускани грешки</li>
                                </ul>
                                </li>
                                    <li>Основи на фундаменталния анализ:
                                <ul class="scontent-info">
                                    <li>Икономически показатели</li>
                                    <li>Изявления</li>
                                    <li>Геополитически фактори</li>
                                </ul>
                                </li>
                                    <li>Основи на техническия анализ:
                                <ul class="scontent-info">
                                    <li>Движение на цената</li>
                                    <li>Психологически и структурни нива на цената</li>
                                    <li>Индикатори (математически модели)</li>
                                    <li>Графични фигури</li>
                                </ul>
                                </li>
                                    <li>Разликата между трейдър и анализатор</li>
                                </ol>
                                <p>&nbsp;</p>
                                </div>
                               </div>
                            </div>                 
                        </div>  
                                
                                
                        <!-- Start Accordion Menu Info 3 -->
                                <div class="panel-group" role="tablist" aria-multiselectable="true">
                                <div class="accordion-main">
                                <div class="accordion-main-content" role="tab">
                                <h4 class="accordion-title"><a class="collapsed openaccordion" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse4" aria-expanded="false" aria-controls="collapse4"><b>09.10.2017 г.</b> – Лекция 3: Основни концепции на техническия анализ <i class="fa fa-arrow-circle-o-right" style="color: #333333;"></i></a></h4>
                                </div>
                                <div id="collapse4" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="accordion-main-body warning" style="padding-left: 15px; padding-right: 15px; padding-top: 12px;margin-bottom: -30px;">
                                <p style="color:#000000;">Лекция 3 има за цел да покаже основни принципи и правила при търсенето на подходящи трендове за търговия. Едни от най-големите предизвикателства е да се открива и разчита структурата на цената. Научете основните принципи, върху които да импровизирате правилно според ситуацията.</p>
                                <p style="color:#000000;">В Лекция 3 „Основни концепции на техническия анализ“ ще научите:</p>
                                <ol class="fontstyle" style="margin-left: -23px !important;font-size: 15px;font-family: aktiv-grotesk, sans-serif;color: #000;">
                                    <li>Трендове:
                                <ul class="scontent-info">
                                    <li>Възходящи</li>
                                    <li>Низходящи</li>
                                    <li>Странични</li>
                                </ul>
                                </li>
                                    <li>Структура на цената (базови правила):
                                <ul class="scontent-info">
                                    <li>Подкрепа</li>
                                    <li>Съпротива</li>
                                    <li>Хоризонтални</li>
                                    <li>Диагонални</li>
                                </ul>
                                </li>
                                    <li>Йерархична структура на цената</li>
                                </ol>
                                <p>&nbsp;</p>
                                </div>
                               </div>
                            </div>                 
                        </div>     
                           

                         <!-- Start Accordion Menu Info 4 -->
                                <div class="panel-group" role="tablist" aria-multiselectable="true">
                                <div class="accordion-main">
                                <div class="accordion-main-content" role="tab">
                                <h4 class="accordion-title"><a class="collapsed openaccordion" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse5" aria-expanded="false" aria-controls="collapse5"><b>11.10.2017 г.</b> – Лекция 4: Фигурите като инструмент на анализа <i class="fa fa-arrow-circle-o-right" style="color: #333333;"></i></a></h4>
                                </div>
                                <div id="collapse5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="accordion-main-body warning" style="padding-left: 15px; padding-right: 15px; padding-top: 12px;margin-bottom: -30px;">
                                <p style="color:#000000;">Тази лекция ще ви запознае с някои изключения на ценовото движение и как можете да извличате полза от тях. Ще бъдат разгледани различни графични фигури и принципите, по които те се търгуват.</p>
                                <p style="color:#000000;">В Лекция 4 „Фигурите като инструмент на анализа“ ще научите:</p>
                                <ol class="fontstyle" style="margin-left: -23px !important;font-size: 15px;font-family: aktiv-grotesk, sans-serif;color: #000;">
                                    <li>Същност на фигурите:
                                <ul class="scontent-info">
                                    <li>До колко са финансови финансовите пазари</li>
                                    <li>Фигурите като психологически модели</li>
                                    <li>Фигурите като графични модели</li>
                                </ul>
                                </li>
                                    <li>Основни групи фигури:
                                <ul class="scontent-info">
                                    <li>Тренд обръщащи</li>
                                    <li>Тренд потвърждаващи</li>
                                    <li>Визуални примери</li>
                                </ul>
                                </li>
                                    <li>Дискусионен панел с въпроси и отговори</li>                                   
                                    </ol>
                                <p>&nbsp;</p>
                                </div>
                               </div>
                            </div>                 
                        </div>  


                        <!-- Start Accordion Menu Info 5 -->
                                <div class="panel-group" role="tablist" aria-multiselectable="true">
                                <div class="accordion-main">
                                <div class="accordion-main-content" role="tab">
                                <h4 class="accordion-title"><a class="collapsed openaccordion" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse6" aria-expanded="false" aria-controls="collapse6"><b>13.10.2017 г.</b> – Лекция 5: Как да търгуваме ефективно на финансовите пазари <i class="fa fa-arrow-circle-o-right" style="color: #333333;"></i></a></h4>
                                </div>
                                <div id="collapse6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="accordion-main-body warning" style="padding-left: 15px; padding-right: 15px; padding-top: 12px;margin-bottom: -30px;">
                                <p style="color:#000000;font-weight:normal;">В лекция 5 ще се разгледат два типа дивергенции. На тяхна база ще бъде споделена търговска стратегия, изградена върху по-рядко срещани, но по-надеждни сигнали. Стратегията може да бъде използвана като основа, върху която лесно да прибавяте ваши сигнали за вход и изход. Също така, в голяма степен може да бъде автоматизирана като експертна система.</p>
                                <p style="color:#000000;font-weight:normal;">В Лекция 5 „Как да търгуваме ефективно на финансовите пазари“, ще научите:</p>
                                <ol class="fontstyle" style="margin-left: -23px !important;font-weight: normal;font-size: 15px;    font-family: aktiv-grotesk, sans-serif;color: #000;">
                                    <li>Технически индикатори:
                                <ul class="scontent-info">
                                    <li>Осцилатори</li>
                                    <li>Трендови</li>
                                    <li>Комбинации</li>
                                </ul>
                                </li>
                                    <li>Стратегия за търговия:
                                <ul class="scontent-info">
                                    <li>Изпреварващи сигнали</li>
                                    <li>Параметри</li>
                                    <li>Отваряне и затваряне на позиции</li>
                                    <li>Управление на позиции</li>
                                </ul>
                                </li>
                                    <li>Статистика:
                                <ul class="scontent-info">
                                    <li>Дисциплината в търговията и капаните, които крие</li>
                                    <li>Психология и трудности при изпълнението на стратегията</li>
                                </ul>
                                </li>
                                </ol>
                                <p>&nbsp;</p>
                                </div>
                               </div>
                            </div>                 
                        </div> 

                    <!-- Start Accordion Menu Info 6 -->
                                <div class="panel-group"  role="tablist" aria-multiselectable="true">
                                <div class="accordion-main">
                                <div class="accordion-main-content" role="tab">
                                <h4 class="accordion-title"><a class="collapsed openaccordion" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse7" aria-expanded="false" aria-controls="collapse7"><b>18.10.2017 г.</b> – Лекция 6: Контролираният риск – ключът към успеха  <i class="fa fa-arrow-circle-o-right" style="color: #333333;"></i></a></h4>
                                </div>
                                <div id="collapse7" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="accordion-main-body warning" style="padding-left: 15px; padding-right: 15px; padding-top: 12px;margin-bottom: -30px;">
                                <p style="color:#000000;font-weight:normal;">Управлението на риска е най-важният аспект от търговията на финансовите пазари. Бързопроменящите се пазарни условия и високата волатилност водят до рискове и намаляване на печалбите. Лекция 6 разглежда различни начини и инструменти за управление на риска.</p>
                                <p style="color:#000000;font-weight:normal;">В Лекция 6 „Контролираният риск – ключът към успеха“, ще научите:</p>
                                <ol class="fontstyle" style="margin-left: -23px !important;font-weight: normal;font-size: 15px; font-family: aktiv-grotesk, sans-serif;color: #000;">
                                    <li>70% от търговията е управление на риска:
                                <ul class="scontent-info">
                                    <li>Разликата между стратегия и система</li>
                                    <li>Не търсете универсална стратегия</li>
                                </ul>
                                </li>
                                    <li>Управление на позиции:
                                <ul class="scontent-info">
                                    <li>Преместване на стоп</li>
                                    <li>Свиване на експозиция</li>
                                </ul>
                                </li>
                                    <li>Съотношение печалба/загуба:
                                <ul class="scontent-info">
                                    <li>Съотношение 1:3</li>
                                    <li>Съотношение 5:1</li>
                                </ul>
                                </li>
                                <li>Дискусионен панел с въпроси и отговори</li>
                                </ol>
                                <p>&nbsp;</p>
                                </div>
                               </div>
                            </div>                 
                        </div>                         
                      </div>  
                  </div>
                  <p>&nbsp;</p>    
                          
                <div class="info">
                    <p style="text-align: center;font-size: 22px;font-weight: bold;"><span>За курса</span></p>
                </div>
                            
                        
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="textWrapper">	
                        <div class="panel-demo metatrader demo-active phheight" id="boxheight">
                                    <div class="panel-heading panel-heading-demo padding_top_bottom_20">
                                      <span class="real real-m specialBgSiteFontSize" style="font-weight:bold;line-height: 1.1em;">
                                      1. За кого е подходящ курсът?</span>
                                      <p id="ordered-1">Курсът е подходящ за хора без опит в търговията и анализа на финансовите пазари.</p>                                 
                                    </div>
                                    <div class="panel-heading panel-heading-demo padding_top_bottom_20" >
                                      <span class="real real-m specialBgSiteFontSize" style="font-weight:bold;line-height: 1.1em;">
                                      2. Продължителност на курса:</span>
                                      <p id="ordered-2">Обучението се състои от лекции с 60-минутна продължителност. Желаещите да задълбочат знанията си могат да заявят индивидуална <b style="color:#002662;font-weight:bold;"><a href="mailto:academy@benchmark.bg">онлайн консултация</b></a> с нашите лектори.</p>
                                    </div>
                                      <div class="panel-heading panel-heading-demo padding_top_bottom_20 nomargin" id="nospace">
                                      <span class="real real-m specialBgSiteFontSize" style="font-weight:bold;line-height: 1.1em;">
                                      3. Колко ще ми струва курсът?  </span>
                                     <p id="ordered-3"> Курсът е безплатен. Единственото, което се изисква от участниците, е да имат желанието да учат и да се развиват в сферата на финансовата търговия.</p>  
                                    </div>
                                      <div class="panel-heading panel-heading-demo padding_top_bottom_20 nomargin">
                                      <span class="real real-m specialBgSiteFontSize" style="font-weight:bold;line-height: 1.1em;">
                                      4. Лектори: </span>
                                     <p id="ordered-4"> Лекторите в курса са изявени трейдъри и анализатори с дългогодишен опит на международните финансови пазари.<p>
                                       
                                    </div>		                                    
                                </div> 
                           </div>		                                    
                        </div>
                        <p>&nbsp;</p>         
                                
                            <div class="info">
                                <p style="text-align: center;font-size: 22px;font-weight: bold;"><span>Повече информация</span></p>
                            </div>
                            
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="textWrapper">	
                        <div class="panel-demo metatrader demo-active phheight" id="boxheightInfo">
                                      <div class="panel-heading panel-heading-demo padding_top_bottom_20 margin-bottom" 
                                      style="margin-bottom: -40px;">
                                      <span class="real real-m specialBgSiteFontSize  txtstyle">
                                      Участието в обучения, излъчвани на живо цели да даде възможност на хора, които не могат да присъстват на място в офис да гледат лекциите в реално време.
                                      </span>
                                     
                                    <p>&nbsp;</p> 
                                    </div>
                                      <div class="panel-heading panel-heading-demo padding_top_bottom_20" id="nomargin">
                                        <!--<table id="disabled">
                                        <thead>
                                        <tr>
                                        <th width="33%"><strong style="font-size: 17px;">Възможности</strong></th>
                                        <th><strong style="font-size: 17px;">Присъстващи на място</strong></th>
                                        <th  width="33%"><strong style="font-size: 17px;">Live Stream</strong></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td class="back-color" ><span class="text-header left-txt" >Слушане на лекции, представяни от анализатори на пазара</span></td>
                                        <td class="text-center right" data-label="Присъстващи на място"><img src="./img/check.png" alt=""/></td>
                                        <td class="text-center right" data-label="Live Stream"><img src="./img/check.png" alt=""/></td>
                                        </tr>
                                        <tr>
                                        <td class="back-color" ><span class="text-header left-txt" >Задаване на въпроси към лектора</span></td>
                                        <td class="text-center right" data-label="Присъстващи на място"><img src="./img/check.png" alt=""/></td>
                                        <td class="text-center right" data-label="Live Stream"><img src="./img/none.png" alt=""/></td>
                                        </tr>
                                        <tr>
                                        <td class="back-color" ><span class="text-header left-txt" >Участие в практически занятия</span></td>
                                         <td class="text-center right" data-label="Присъстващи на място"><img src="./img/check.png" alt=""/></td>
                                         <td class="text-center right" data-label="Live Stream"><img src="./img/none.png" alt=""/></td>
                                        </tr>
                                        <tr>
                                        <td class="back-color" ><span class="text-header left-txt">Участие в състезания с награден фонд</span></td>
                                        <td class="text-center right" data-label="Присъстващи на място"><img src="./img/check.png" alt=""/></td>
                                        <td class="text-center right" data-label="Live Stream"><img src="./img/none.png" alt=""/></td>
                                        </tr>
                                        <tr>
                                        <td class="back-color"><span class="text-header left-txt" >Сертификати</span></td>
                                         <td class="text-center right" data-label="Присъстващи на място"><img src="./img/check.png" alt=""/></td>
                                         <td class="text-center right" data-label="Live Stream"><img src="./img/none.png"/></td>
                                        </tr>
                                        <tr>
                                        <td class="back-color" ><span class="text-header left-txt">Стартов бонус до 2 000 лв</span></td>
                                         <td class="text-center right" data-label="Присъстващи на място"><img src="./img/check.png" alt=""/></td>
                                         <td class="text-center right" data-label="Live Stream"><img src="./img/none.png" alt=""/></td>

                                        </tr>
                                        </tbody>
                                        </table>-->


                                    <div class="panel-heading panel-heading-demo padding_top_bottom_20" id="nomargin2">
                                              <span class="real real-m specialBgSiteFontSize txtstyle" style="margin: 0px 16px 0px -16px;">
                                              Качеството на излъчванията зависи от параметрите на вашата интернет връзка.
                                              </span>
                                                </div>                                    
                                            </div>
		                                    
                                        </div> 
                                   </div>                         
                               </div> 
                            <div class="col-xs-12 col-sm-12 hidden-md hidden-lg">
                                <a href="#scrollTop" style="text-decoration:none;"><input type="button" class="moibleBtnOnly" value="Регистрирайте се"></a>
                             </div>                                  
                         </div>
                     </div>
                </div>
             </div>  
        </header>

        <script type="text/javascript" src="/js/jquery-1.11.1.min.js"></script>	
        <script type="text/javascript" src="/js/bootstrap.min.js"></script>	
        <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
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
                <!-- /.modal-content --> 
            </div>
            <!-- /.modal-dialog --> 
        </div>
        <!-- /.modal -->  

        <script src="/js/jquery.validate.min.js"></script> 
        <script type="text/javascript">
            jQuery(document).ready(function (e) {
                var validator = jQuery("#frm_registration").validate({
                    onfocusout: false,
                    onkeyup: false,
                    onclick: false,
                    rules: {
                        fln: {required: true, minlength: 6},
                        email: {required: true, email: true},
                        phone: {required: true, number: true, minlength: 8, maxlength: 40},                        
                        
                        form_sid: {required: true}
                    },
                    submitHandler: function (form) {
                        jQuery('#fwd').attr('value', 'Моля, изчакайте...').attr('disabled', 'disabled');
                        jQuery.ajax({
                            url: "../../register_seminar.php",
                            data: {
                                email: jQuery("#email").val(),
                                phone: jQuery("#phone").val(),
                                fln: jQuery("#fln").val(),
                                form_sid: "<?php echo isset($_SESSION['form_sid']) ? $_SESSION['form_sid'] : ""; ?>",
                                ref: "academy",
                                url: "/academy/",
                                id: <?php echo SEMINAR_COURSE_ID_?>,
                                
                                seminar_type: "live_stream",
                                campain_ind: "<?php echo isset($_SESSION['campain_ind']) ? $_SESSION['campain_ind'] : "" ?>"
                            },
                            type: "GET",
                            cache: false,
                            dataType: "html",
                            async: false
                        })
                                .done(function (data, textStatus, jqXHR) {
                                    if (data == "OK online") {                                        
                                        window.location = "success.php";
                                    }
                                    else {
                                        jQuery('#fwd').attr('value', 'Регистрирай се').removeAttr('disabled');
                                        document.getElementById("frm_registration").reset();
                                        jQuery('#myModal .modal-title').html("Регистрация");
                                        jQuery('#myModal .modal-body').html(data);
                                        jQuery('#myModal').modal({});
                                    }
                                })
                                .fail(function (jqXHR, textStatus, errorThrown) {
                                    jQuery('#fwd').attr('value', 'Регистрирай се').removeAttr('disabled');
                                    document.getElementById("frm_registration").reset();
                                    jQuery('#myModal .modal-title').html("Грешка");
                                    jQuery('#myModal .modal-body').html(textStatus + "<br>" + errorThrown);
                                    jQuery('#myModal').modal({});
                                });
                    },
                    messages: {
                        fln: {
                            required: "Полето е задължително.",
                            minlength: "Полето трябва да съдържа поне 6 символа."
                        },
                        email: {
                            required: "Полето е задължително.",
                            email: "Въвели сте невалиден имейл."
                        },
                        phone: {
                            required: "Полето е задължително.",
                            minlength: "Полето трябва да съдържа поне 8 цифри без интервали или други символи.",
                            maxlength: "Полето трябва да съдържа до 40 цифри."
                        },
                        
                        obj_id: {
                            required: "Полето е задължително."
                        }

                    }

                });


            });
        </script>
        
        <!-- Start Javascript Functionality -->
    <script type="text/javascript">// <![CDATA[
        $(document).ready(function() {
        $('.collapse.in').prev('.accordion-main-content').addClass('active');
        $('#accordion, #bs-collapse')
        .on('show.bs.collapse', function(a) {
          $(a.target).prev('.accordion-main-content').addClass('active');
        })
        .on('hide.bs.collapse', function(a) {
          $(a.target).prev('.accordion-main-content').removeClass('active');
        });
    });
// ]]></script>


<!-- Start Custom-JavaScript-CountDown -->

<script src="js/jquery.downCount.js"></script>

<script type="text/javascript">
jQuery(document).ready(function() { 
	jQuery('.countdown').downCount({
		date: '2017-10-02T17:00:00', // ISO 8601 date only
  offset: +1
	});
});
</script> 
<!-- //End Custom-JavaScript-CountDown -->
        <footer>
            <div class="container">
                <ul>
                    <li><a href="https://www.benchmark.bg/academy/%D0%B7%D0%B0-%D0%BD%D0%B0%D1%81/" target="_blank">За нас</a></li>
                    <li>|</li>
                    <li><a href="https://benchmark.bg" target="_blank">Към основния сайт</a></li>
                    <li>|</li>
                    <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank">Контакти</a></li>
                </ul>
            </div>
        </footer>


    </body>
</html>