<?php
include '../../opensite_functions.php';
include_once '/var/www/common/functions-misc.php';  
include_once 'config.php';

include $_SERVER['DOCUMENT_ROOT'].'/libs/db_raynor2.php';

function saveSurvey($db, $survey_id, $user_answers, $user_ansers_freetext, $user_remarks) {
    try {
        // Questions
        $stmt = $db->prepare('SELECT * FROM `surveys_new_questions` WHERE `survey_id` = ?');
        $stmt->execute([
            $survey_id,
        ]);
        $questions = $stmt->fetchAll();
        $questions_assoc = [];

        foreach ($questions as $question) {
            $questions_assoc[$question['id']] = $question;
        }

        $question_ids = array_map(function($question) {
            return $question['id'];
        }, $questions);

        // Options
        $placeholders = implode(', ', array_fill(0, count($question_ids), '?'));
        $stmt = $db->prepare('SELECT * FROM `surveys_new_options` WHERE `question_id` IN (' . $placeholders . ')');
        $stmt->execute($question_ids);
        $options = $stmt->fetchAll();
        $options_assoc = [];

        foreach ($options as $option) {
            $options_assoc[$option['id']] = $option;
        }

        // Session
        $db->query('INSERT INTO `surveys_new_sessions` VALUES ()');
        $session_id = $db->PDO->lastInsertId();

        // Answers
        $stmt = $db->prepare('INSERT INTO `surveys_new_answers`
            (`session_id`, `option_id`, `answer_text`, `remark_text`)
            VALUES (:session_id, :option_id, :answer_text, :remark_text)');

        foreach ($questions as $question) {
            $question_id = $question['id'];
            
            if (!array_key_exists($question_id, $user_answers)) {
                continue;
            }
            
            $answers = is_array($user_answers[$question_id]) ? $user_answers[$question_id] : [
                $user_answers[$question_id]
            ];
            
            foreach ($answers as $answer) {
                $option_id = intval($answer);
                
                if (!array_key_exists($option_id, $options_assoc)) {
                    continue;
                }

                $data = compact('session_id', 'option_id');
                
                // Freetext answer
                $data['answer_text'] = (
                    ($options_assoc[$option_id]['type'] & (1 << 0)) &&
                    array_key_exists($option_id, $user_answers_freetext)
                ) ? $user_answers_freetext[$option_id] : null;
                
                // Remark
                $data['remark_text'] = (
                    ($questions_assoc[$question_id]['type'] & (1 << 1)) &&
                    array_key_exists($question_id, $user_remarks)
                ) ? $user_remarks[$question_id] : null;
                
                $params = [];
                
                foreach ($data as $key => $value) {
                    $params[':' . $key] = $value;
                }

                $stmt->execute($params);
            }
        }
    }
    catch (PDOException $e) {
        //var_dump($e);
    }
}

$filter_options = [
    'flags' => FILTER_REQUIRE_ARRAY,
    'options' => [
        'default' => [],
    ],
];

$user_answers = filter_input(INPUT_POST, 'q', FILTER_DEFAULT, $filter_options);
$user_answers_freetext = filter_input(INPUT_POST, 'a', FILTER_DEFAULT, $filter_options);
$user_remarks = filter_input(INPUT_POST, 'r', FILTER_DEFAULT, $filter_options);

if ($user_answers) {
    saveSurvey($db, 2, $user_answers, $user_answers_freetext, $user_remarks);
}
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
        <link rel="canonical" href="<?php BM::protocol(); ?>://<?php echo BM::$use_www; ?><?php BM::domain(); echo str_replace(array("mobile1/", "mobile2/", "mobile/"), "", $_SERVER['REQUEST_URI']); ?>"/>

        <title><?php echo ($lvl_title == '') ? 'Стани успешен финансов трейдър с БенчМарк Академия' : $lvl_title; ?></title>
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
                            <h1 class="topHeading">Първи стъпки в света на финансовите пазари</h1>
                        </div>
                    </div>

                    <div class="row firstRow">     
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <a href="http://www.benchmark.bg/landing/albena/"><button class="pro-btn res" style="width: 105px;float: left;margin-left: -5%;margin-top: 3px;border: none;color: #afafaf;font-family: aktiv-grotesk, sans-serif;">
                                    <i class="fa fa-angle-left" style="font-size:24px"></i>&nbsp;Назад</button></a>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <h1 class="text-center surveyHeader kart">Анкетна карта</h1>
                        </div>
                        <div class="row" style="padding: 160px;">
                            <div class="row">
                                <p class="successSurvey" style="text-align: center;font-weight: bold;font-size: 24px;color:#009452">Благодарим Ви за споделеното мнение!</p>
                            </div>
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
                    <li><a href="http://benchmark.bg" target="_blank">Към основния сайт</a></li>
                    <li>|</li>
                    <li><a href="https://www.benchmark.bg/academy/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8/" target="_blank">Контакти</a></li>
                </ul>
            </div>
        </footer>


    </body>
</html>