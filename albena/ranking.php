<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
include_once 'config.php';
//Initial accounts balance (used in formulas)
define("INITIAL_BALANCE", 100000);
define("CONTRACT_SIZE", 10000);

$server_addtime = 3;
$time = time();
$start_time = strtotime(CONTEST_START_TIME);

$auto_activate = false;
if ($time > $start_time) {
    $auto_activate = true;
}
$auto_activate = true;


$num_digits = array();
$num_digits["AUDCAD"] = 5;
$num_digits["AUDJPY"] = 3;
$num_digits["AUDCHF"] = 5;
$num_digits["AUDNZD"] = 5;
$num_digits["AUDUSD"] = 5;
$num_digits["CADCHF"] = 5;
$num_digits["CADJPY"] = 3;
$num_digits["CHFJPY"] = 3;
$num_digits["CHFNOK"] = 5;
$num_digits["CHFSEK"] = 5;
$num_digits["EURAUD"] = 5;
$num_digits["EURCAD"] = 5;
$num_digits["EURUSD"] = 5;
$num_digits["EURCHF"] = 5;
$num_digits["EURCZK"] = 5;
$num_digits["EURDKK"] = 5;
$num_digits["EURGBP"] = 5;
$num_digits["EURHUF"] = 3;
$num_digits["EURJPY"] = 3;
$num_digits["EURNOK"] = 5;
$num_digits["EURNZD"] = 5;
$num_digits["EURPLN"] = 5;
$num_digits["EURSEK"] = 5;
$num_digits["EURTRY"] = 5;
$num_digits["GBPAUD"] = 5;
$num_digits["GBPCAD"] = 5;
$num_digits["GBPCHF"] = 5;
$num_digits["GBPJPY"] = 3;
$num_digits["GBPNZD"] = 5;
$num_digits["GBPSEK"] = 5;
$num_digits["GBPUSD"] = 5;
$num_digits["HKDJPY"] = 3;
$num_digits["NOKJPY"] = 3;
$num_digits["NZDCAD"] = 5;
$num_digits["NZDCHF"] = 5;
$num_digits["NZDJPY"] = 3;
$num_digits["NZDUSD"] = 5;
$num_digits["SEKJPY"] = 3;
$num_digits["SGDJPY"] = 3;
$num_digits["TRYJPY"] = 3;
$num_digits["USDCAD"] = 5;
$num_digits["USDCHF"] = 5;
$num_digits["USDCZK"] = 5;
$num_digits["USDDKK"] = 5;
$num_digits["USDHKD"] = 5;
$num_digits["USDHUF"] = 3;
$num_digits["USDJPY"] = 3;
$num_digits["USDMXN"] = 5;
$num_digits["USDNOK"] = 5;
$num_digits["USDPLN"] = 5;
$num_digits["USDRUB"] = 5;
$num_digits["USDSEK"] = 5;
$num_digits["USDSGD"] = 5;
$num_digits["USDTRY"] = 5;
$num_digits["USDZAR"] = 5;
$num_digits["ZARJPY"] = 3;
$num_digits["USOIL"] = 2;
$num_digits["UKOIL"] = 2;
$num_digits["AUS200"] = 0;
$num_digits["ESP35"] = 0;
$num_digits["FRA40"] = 0;
$num_digits["GER30"] = 0;
$num_digits["ITA40"] = 0;
$num_digits["EUTX50"] = 0;
$num_digits["NAS100"] = 0;
$num_digits["SPX500"] = 1;
$num_digits["SUI30"] = 0;
$num_digits["SWE30"] = 1;
$num_digits["UK100"] = 0;
$num_digits["US30"] = 0;
$num_digits["HKG33"] = 0;
$num_digits["JPN225"] = 0;
$num_digits["XAU_USD"] = 2;
$num_digits["XAG_USD"] = 2;
$num_digits["XPD_USD"] = 1;
$num_digits["XPT_USD"] = 2;
$num_digits["NGAS"] = 3;
$num_digits["Copper"] = 3;
$num_digits["Bund"] = 2;

include $_SERVER['DOCUMENT_ROOT'] . '/opensite_functions.php';
include $_SERVER['DOCUMENT_ROOT'] . '/libs/db_raynor2.php';

$month = strftime("%m");

$limit = (isset($_REQUEST['page'])) ? (int) $_REQUEST['page'] : 1;
$from = (int) ($limit - 1) * 25;
$users_list = $db->query("SELECT * FROM " . RANKING_TABLE_NAME . " ORDER BY equity DESC, CASE bargins WHEN 0 THEN 1
       ELSE -1
      END ASC LIMIT $from, 25");
$all = $db->query("SELECT COUNT(*) t FROM " . RANKING_TABLE_NAME);
$all_demos = $all->fetch();

function pages2($curr_page, $pages_shown, $pages_cnt, $url = "") {
    global $step;

    $page_num = floor($pages_cnt / $pages_shown);
    $rest = ($pages_cnt % $pages_shown);
    if ($rest > 0) {
        $page_num += 1;
    }

    if ($curr_page <= round($step / 2)) {
        $from = 1;
        $to = $step;
        if ($page_num <= $step) {
            $to = $page_num;
        }
    } else if ($curr_page > round($step / 2) && $curr_page < $page_num - (round($step / 2) - 1)) {
        $from = $curr_page - (round($step / 2) - 1);
        $to = $curr_page + (round($step / 2) - 1);
    } else if ($curr_page >= ($page_num - (round($step / 2) - 1))) {
        if ($page_num <= $step) {
            $from = 1;
        } else {
            $from = $page_num - $step;
        }
        $to = $page_num;
    }
    if ($page_num > 1) {
        for ($i = $from; $i <= $to; $i++) {
?>
            <button onClick="window.location = 'ranking.php?page=<?php echo $i ?>'" type="button" class="btn btn-default <?php echo ($curr_page == $i) ? "active" : "" ?>"><?php echo $i ?></button>
<?php
        }
    }
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

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <meta property="og:image" content="<?php BM::protocol(); ?>://<?php BM::domain(); ?>/img/fbsharing.jpg">
        <meta property="og:type" content="website">	
        <meta property="og:url" content="http://www.benchmark.bg/contest/cez/">	
        <meta property="og:title" content="БенчМарк | Състезание на финансовите пазари">	
        <meta property="og:description" content="БенчМарк организира състезание на финансовите пазари с награден фонд 5000 лв., подходящо за участници без опит и познания за финансовите пазари. Регистрацията е напълно безплатна и отнема по-малко от минута.">	

        <link rel="shortcut icon" href="https://www.benchmark.bg/academy/favicon.ico">
        <link rel="canonical" href="<?php BM::protocol(); ?>://<?php echo BM::$use_www; ?><?php BM::domain(); echo str_replace(array("mobile1/", "mobile2/", "mobile/"), "", $_SERVER['REQUEST_URI']); ?>"/>

        <title>Първи стъпки в света на финансовите пазари</title>
        <meta name="title" content="Първи стъпки в света на финансовите пазари">
        <meta name="description" content="Първи стъпки в света на финансовите пазари" />
        <meta name="keywords" content="Първи стъпки в света на финансовите пазари" />



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

        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>


        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

<?php
include_once "/var/www/common/functions-misc.php";
//Facebook tracking JS code
js_facebook_code();

//Google Analytics code
js_google_code('UA-52524336-1');
?>
    </head>

    <body>
        <!-- Navigation -->
        <!-- Secondary Menu -->


        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header" id="navbar" style="margin-top: -28px; padding-top: 15px; height: 89px;">               
                    <a class="navbar-brand" href="http://www.benchmark.bg/landing/albena/">
                        <img src="https://www.benchmark.bg/academy/wp-content/themes/benchmark_academy/images/bm-academy-logo.svg" width="190" class="center-block unveil-loaded down" style="margin-top: -7px; margin-left:-7px;">
                    </a>
                </div>
                <div class="hidden-xs" id="">
                    <ul class="nav navbar-nav navbar-right secondary-menu" style="width: 520px; position: relative;">
                        <li><a href="https://benchmark.bg/academy/" target="_blank"><span style="color:#002662;">Сайт за обучение&nbsp;<i class="fa fa-graduation-cap" aria-hidden="true"></i></span></a></li>   
                        <li><a href="http://benchmark.bg" target="_blank">Сайт за търговия <span class="fa fa-sign-in"></span></a></li>				
                        <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank">Контакти <i class="fa fa-phone" aria-hidden="true"></i><span style="color:#7b0f17;"></span></a></li>
                        <li style="margin-top: 9px;">
                            <div id="comm100-button-541" style="margin-right: -10px;">
                                <a href="#" onclick="Comm100API.open_chat_window(event, 541);" style="color: #002662 !important;">Live chat</a>
                            </div>
                            <script async="" src="https://www.google-analytics.com/analytics.js"></script>
                            <script type="text/javascript" async="" defer="" src="https://www.benchmark.bg/piwik/piwik.js"></script>
                            <script src="https://connect.facebook.net/signals/config/1055135051179489?v=2.7.7" async=""></script>
                            <script async="" src="https://connect.facebook.net/en_US/fbevents.js"></script>
                            <script type="text/javascript" async="" src="https://chatserver.comm100.com/livechat.ashx?siteId=199228"></script>
                            <script type="text/javascript">
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

        <div class="wrap">
            <div class="container">
                <div class="row text-left">
                    <h1 class="topHeading">Първи стъпки в света на финансовите пазари</h1>
                </div>
                <div class="row firstRow">

                    <div class="row">     
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <a href="http://www.benchmark.bg/landing/albena/"><button class="pro-btn res" style="width: 105px;float: left;margin-left: 6%;margin-top: 3px;border: none;color: #afafaf;font-family: aktiv-grotesk, sans-serif;">
                                    <i class="fa fa-angle-left" style="font-size:24px"></i>&nbsp;Назад</button></a>
                        </div>

                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <h1 class="text-center surveyHeader kart"></h1>
                        </div>
                    </div>

<?php if (isset($_REQUEST['id'])) {
    $user = $db->query("SELECT * FROM " . RANKING_TABLE_NAME . " WHERE user_id=" . (int) $_GET['id']);
    if ($uname = $user->fetch()) {
        $name = $uname['name'];
    }
?>
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="">
                            <div class="panel-body platforms-body"> <span style="font-weight:bold;color:white;">Информация за участник: <span style="color:white;"> <?php echo $name ?> </span></span>
                                <div style="font-weight:bold;margin-bottom:10px;margin-top:20px;color:white;">Отворени позиции:</div>
                                <div class="back" style="background: rgba(35, 30, 30, .7);padding-left: 0px;">
                                <div class="table-responsive">
                                    <table cellspacing="1" cellpadding="1" border="0" summary="" style="width: 100%;" class="table table-hover whiteTdTables">
                                        <tbody>
                                            <tr class="table-first">
                                                <td width="13%" align="center">Дата/ Час</td>
                                                <td width="17%" align="center">Инструмент</td>
                                                <td width="9%" align="center">Buy/Sell</td>
                                                <td width="15%" align="center">Количество</td>
                                                <td width="16%" align="center">Цена отваряне</td>
                                                <td width="15%" align="center">Текуща цена</td>
                                                <td width="19%" align="center">Суап</td>
                                                <td width="19%" align="center">&nbsp;<strong>Резултат</strong></td>
                                            </tr>
<?php
    //include $DOCUMENTROOT . '/libs/db_raynor2.php';
    //$db2->sql_query("set names cp1251");
    //
    $deals = $db2->query("SELECT SWAPS suap, open_price, close_price curr_price, symbol, ADDTIME(open_time, '" . $server_addtime . ":0:0') open_time, cmd sell_buy, 100*volume quantity, profit FROM demoreport.mt4_trades WHERE login=" . (int) $_GET['id'] . " and (cmd=1 or cmd=0) and CLOSE_TIME<'1971-01-01 00:00:00' and OPEN_TIME<'" . CONTEST_END_TIME . "' ORDER BY open_time desc");

    while ($opened_deals = $deals->fetch()) {
        $symbol = "";
        $explode = explode(" ", $opened_deals['open_time']);
        $parts = explode("-", $explode[0]);
        $open_time = $parts[2] . "." . $parts[1] . "." . $parts[0] . " " . substr($explode[1], 0, 5);
        //var_dump($opened_deals['open_time']);
        $symbol = $opened_deals['symbol'];
?>
                                            <tr>
                                                <td height="25" align="center"><span style="color: #ffffff;"><span style="color: #ffffff;"><span style="color: #ffffff;"> <?php echo $open_time ?> </span></span></span></td>
                                                <td align="center"><span style="color: #ffffff;"> <?php echo $symbol ?> </span></td>
                                                <td align="center"><?php echo ($opened_deals['sell_buy']) ? "Продажба" : "Покупка" ?></td>
                                                <td align="center"><?php echo number_format($opened_deals['quantity'] / CONTRACT_SIZE, 2) ?></td>
                                                <td align="center"><?php echo number_format($opened_deals['open_price'], $num_digits[$symbol], ".", "") ?></td>
                                                <td align="center"><?php echo number_format($opened_deals['curr_price'], $num_digits[$symbol], ".", "") ?></td>
                                                <td align="center"><?php echo $opened_deals['suap'] ?></td>
                                                <td align="center"><?php echo number_format($opened_deals['profit'], 2) ?></td>
                                            </tr>
<?php
    }
?>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                <div style="font-weight:bold;margin-bottom:10px;color:white;">История на сметката:</div>
                                <div class="back" style="background: rgba(35, 30, 30, .7);padding-left: 0px;">
                                <div class="table-responsive">
                                    <table cellspacing="1" cellpadding="1" border="0" summary="" style="width: 100%;" class="table table-hover whiteTdTables">
                                        <tbody>
                                            <tr class="table-first">
                                                <td width="15%" align="center">Отваряне</td>
                                                <td width="20%" align="center">Затваряне</td>
                                                <td width="9%" align="center">Инструмент</td>
                                                <td width="12%" align="center">Buy/Sell</td>
                                                <td width="15%" align="center">Цена отваряне</td>
                                                <td width="16%" align="center">Количество</td>
                                                <td width="20%" align="center">Цена затваряне</td>
                                                <td width="19%" align="center">&nbsp;<strong>Резултат</strong></td>
                                            </tr>
<?php
        $deals = $db2->query("SELECT SWAPS suap, open_price, close_price curr_price, symbol, ADDTIME(open_time, '" . $server_addtime . ":0:0') open_time, ADDTIME(close_time, '" . $server_addtime . ":0:0') close_time, cmd sell_buy, 100*volume quantity, profit FROM demoreport.mt4_trades WHERE login=" . (int) $_GET['id'] . " and (cmd=1 or cmd=0) and CLOSE_TIME>'1971-01-01 00:00:00' and CLOSE_TIME<'" . CONTEST_END_TIME . "' ORDER BY open_time desc");

        while ($opened_deals = $deals->fetch()) {
            $explode = explode(" ", $opened_deals['open_time']);
            $parts = explode("-", $explode[0]);
            $open_time = $parts[2] . "." . $parts[1] . "." . $parts[0] . " " . substr($explode[1], 0, 5);

            $explode = explode(" ", $opened_deals['close_time']);
            $parts = explode("-", $explode[0]);
            $close_time = $parts[2] . "." . $parts[1] . "." . $parts[0] . " " . substr($explode[1], 0, 5);
            //var_dump($opened_deals['open_time']);
            $symbol = $opened_deals['symbol'];
?>
                                            <tr class="whiteTd">
                                                <td height="25" align="center"><span style="color: #ffffff;"><span style="color: #ffffff;"><span style="color: #ffffff;"> <?php echo $open_time ?> </span></span></span></td>
                                                <td align="center"><span style="color: #ffffff;"> <?php echo $close_time ?> </span></td>
                                                <td align="center"><span style="color: #ffffff;"> <?php echo $symbol ?> </span></td>
                                                <td align="center"><?php echo ($opened_deals['sell_buy']) ? "Продажба" : "Покупка" ?></td>
                                                <td align="center"><?php echo $opened_deals['open_price'] ?></td>
                                                <td align="center"><?php echo number_format($opened_deals['quantity'] / CONTRACT_SIZE, 2) ?></td>
                                                <td align="center"><?php echo number_format($opened_deals['curr_price'], $num_digits[$symbol], ".", "") ?></td>
                                                <td align="center"><?php echo number_format($opened_deals['profit'], 2) ?></td>
                                            </tr>
<?php
        }
?>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
<?php } else { ?>               
                    
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="panel-body platforms-body">
<?php   if (!HAS_GAME_STARTED && !$auto_activate && !$_GET['preview']) { ?>
                            <div class="container-fluid" style="font-weight:bold;margin-bottom:20px;">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-8"> Класирането ще бъде обявено след началото на състезанието. </div>
                                    <div class="col-xs-6 col-sm-4 text-right"></div>
                                </div>
                            </div>
<?php   } else { ?>
                            <div class="container-fluid" style=" color:#ffffff !important; font-size:16px; color:#ffffff !important; font-size:16px; margin-bottom:20px;">
                                <div class="row">		
                                    <div class="col-xs-12 back box" style="width: 100% !important;text-align:center;">                    
                                            <p class="questionsSurvey">За да разгледате сделките на определен участник, кликнете върху неговото име.</p> 
                                    </div>
                                </div>
                            </div>

                            <div class="back" style="background: rgba(35, 30, 30, .7);padding-left: 0px;">
                                <div class="table-responsive">
                                    <table cellspacing="1" cellpadding="1" border="0" summary="" style="width: 100%;" class="table table-hover whiteTdTables">
                                        <tbody>
                                            <tr class="table-first">
                                                <td width="8%" align="center">Място</td>
                                                <td width="23%" align="center">Име</td>
                                                <td width="9%"  align="center">Сделки</td>
                                                <td width="25%" align="center">Най-търгуван инструмент</td>
                                                <td width="16%" align="center">Баланс</td>
                                                <td width="19%" align="center">&nbsp;<strong>Доходност</strong></td>
                                            </tr>
<?php
            while ($users = $users_list->fetch()) {
                $symbol = "";
                $num_traded = $db2->sql_query("select count(*) from demoreport.mt4_trades where login=" . $users['user_id'] . " and cmd<>6");
                //var_dump($num_traded);
                if ($num = $db->sql_fetchrow($num_traded)) {
                    $bargins = $num[0];
                }

                $most_traded = $db2->sql_query("select symbol from demoreport.mt4_trades where login=" . $users['user_id'] . " and cmd<>6 group by symbol order by count(symbol) desc limit 0,1");
                if ($instrument = $db->sql_fetchrow($most_traded)) {
                    $symbol = $instrument[0];
                }

                $a++; //var_dump($users); 
?>
                                            <tr>
                                                <td height="25" align="center" <?php echo ($a + $from <= RANKING_NUMBER_OF_BOLD) ? "style='font-weight:bold;'" : "" ?>><span style="color: #ffffff !important;"> <?php echo $a + $from ?> </span></td>
                                                <td align="center" <?php echo ($a + $from <= RANKING_NUMBER_OF_BOLD) ? "style='font-weight:bold;'" : "" ?>><span style="color: #ffffff !important;"><a href="ranking.php?id=<?php echo $users['user_id'] ?>"  style="color: #ffffff !important;font-size: 16px;"> <?php echo $users['name'] ?> </a></span></td>
                                                <td align="center" style="color: #ffffff !important;font-size: 16px;" <?php echo ($a + $from <= RANKING_NUMBER_OF_BOLD) ? "style='font-weight:bold;'" : "" ?>><?php echo $bargins ?></td>
                                                <td align="center" <?php echo ($a + $from <= RANKING_NUMBER_OF_BOLD) ? "style='font-weight:bold;'" : "" ?>><?php echo $symbol ?></td>
                                                <td align="center" style="color: #ffffff !important;font-size: 16px;" <?php echo ($a + $from <= RANKING_NUMBER_OF_BOLD) ? "style='font-weight:bold;'" : "" ?>><?php echo $users['equity'] ?></td>
                                                <td align="center" style="color: #ffffff !important;font-size: 16px;" ><strong> 
                                                <?php echo number_format(($users['equity'] - INITIAL_BALANCE) / 1000, 2) ?> %</strong></td>
                                            </tr>
<?php       } ?>
                                        </tbody>							
                                    </table>
                                    <div class="clearfix"></div>
                                    <div role="toolbar" class="btn-toolbar pull-right">
                                        <div class="btn-group">
<?php
                                            $step = 15;
                                            pages2($limit, 25, $all_demos['t']);
?>
                                        </div>
                                    </div>
                                </div>
                            </div>
<?php   } ?>
                        </div>
                    </div>
                     <p style="padding:10px">&nbsp;</p>
<?php } ?>
                </div>
            </div>
        </div>

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