<?php
include_once "../../opensite_functions.php";
include_once "/var/www/common/functions-misc.php";

//Constants
$survey_id = 2;

function renderQuestion($question, &$counter, $options) {
?>
    <div class="back">
        <div class="box">
            <p class="questionsSurvey"><?php echo ($counter++), '. ', htmlspecialchars($question['text']); ?></p>
        </div>
        <ul class="surveyUl">
<?php
    foreach ($options as $option) {
?>
            <li>
                <label>
<?php   if ($question['type'] & (1 << 0)) { ?>
                    <input class="inputSurvey" type="checkbox" name="q[<?php echo $question['id']; ?>][]" value="<?php echo $option['id']?>">
<?php   } else { ?>
                    <input class="inputSurvey" type="radio" name="q[<?php echo $question['id']; ?>]" value="<?php echo $option['id']; ?>">
<?php   }
        echo htmlspecialchars($option['text']);
?>
                </label>
<?php   if ($option['type'] & (1 << 0)) { ?>
                <input type="text" class="inputFieldsSurvey" name="a['<?php echo $option['id']; ?>']">
                <div style="color: #f00; display: none" class="inputFieldSurveyText">Моля, въведете Вашия отговор в полето</div>
<?php       } ?>
            </li>
<?php   
    }
?>
        </ul>
<?php
    if ($question['type'] & (1 << 1)) {
        if (!is_null($question['remark_text'])) {
            echo '<p>', htmlspecialchars($question['remark_text']), '</p>';
        }

        echo '<textarea name="r[', $question['id'], ']" rows="3" class="textareaSurvey"></textarea>';
    }
    echo '</div>';
}

function renderSurvey($questions, $options, &$counter, $start) {
    for ($i = $start; $i < count($questions); $i += 2) {
?>        
        <div class="row row-eq-height">
            <div class="col-md-6 col-sm-6 col-xs-12 surveyCols">
<?php renderQuestion($questions[$i], $counter, $options[$questions[$i]['id']]); ?>
            </div>
<?php   if (isset($questions[$i + 1])) { ?>        
            <div class="col-md-6 col-sm-6 col-xs-12 surveyCols">
<?php renderQuestion($questions[$i + 1], $counter, $options[$questions[$i + 1]['id']]); ?>
            </div>
<?php    } ?>
        </div>
<?php
    }
    
    echo '<div class="row buttonRow"><div class="col-xs-12"><input type="submit" title="Изпрати" value="Изпрати" class="btn btn-demo-mobile" disabled="disabled" style="margin:0 auto;display: block;width: 30%;"></div></div>';
}

// Questions
$stmt = $db->prepare('SELECT * FROM `surveys_new_questions` WHERE `survey_id` = :id ORDER BY position');
$stmt->execute([
    ':id' => $survey_id,
]);
$questions = $stmt->fetchAll();

$question_count = count($questions);
$column_count = floor($question_count / 2);

$question_ids = array_map(function($question) {
    return $question['id'];
}, $questions);

// Options
$placeholders = implode(', ', array_fill(0, count($question_ids), '?'));
$stmt = $db->prepare('SELECT * FROM `surveys_new_options` WHERE `question_id` IN (' . $placeholders . ')');
$stmt->execute($question_ids);
$options = $stmt->fetchAll();
$question_options = [];

foreach ($options as $option) {
    if (!array_key_exists('question_id', $option)) {
        $question_options[$option['question_id']] = [];
    }
    
    $question_options[$option['question_id']][] = $option;
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
                        <div class="col-xs-12">
                            <h1 class="topHeading">Първи стъпки в света на финансовите пазари</h1>
                        </div>
            </div>
			
			
			
			<div class="row firstRow">     
			<div class="col-md-3 col-sm-3 col-xs-12">
			<a href="http://www.benchmark.bg/landing/albena"><button class="pro-btn res" style="width: 105px;float: left;margin-left: -5%;margin-top: 3px;border: none;color: #afafaf;font-family: aktiv-grotesk, sans-serif;">
		<i class="fa fa-angle-left" style="font-size:24px"></i>&nbsp;Назад</button></a>
	    </div>

	   <div class="col-md-6 col-sm-6 col-xs-12">
            <h1 class="text-center surveyHeader kart">Анкетна карта</h1>
	   </div>
    </div>
   

   <div class="row">
   <div class="col-xs-12">
        <form method="post" action="survey_completed.php" id="surveyForm">
<?php
$counter = 1;
renderSurvey($questions, $question_options, $counter, 0);
?>
        </form>
       </div> 
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
        jQuery(function($) {
            $(document).on('input', '.inputFieldsSurvey', function(e) {
                var $this = $(this);

                if ($this.val().length > 0) {
                    $this.closest('li').find('.inputSurvey').prop('checked', true);
                }
            }).on('change', '.inputSurvey', function(e) {
                $(this).closest('ul').find('.inputSurvey').each(function() {
                    var $this = $(this);

                    if ($this.prop('checked')) {
                        return;
                    }

                    $this.parent().siblings('.inputFieldsSurvey').val('');
                });
            }).on('input change', '#surveyForm', function(e) {
                var $this = $(this);
                var inputs = $this.find(':input');

                var hasChecked = inputs.filter('.inputSurvey:checked').filter(function() {
                    return $(this).parent().siblings('.inputFieldsSurvey').length === 0;
                }).length > 0;

                var hasFilled = inputs.filter('.inputFieldsSurvey, .textareaSurvey').filter(function() {
                    return $.trim($(this).val()).length > 0;
                }).length > 0;

                $this.find(':submit').prop('disabled', !hasChecked && !hasFilled);

                inputs.filter('.inputFieldsSurvey').each(function() {
                    var $this = $(this);

                    var showWarning = $.trim($this.val()).length === 0 && $this.siblings().find('.inputSurvey').prop('checked');

                    $this.siblings('.inputFieldSurveyText').toggle(showWarning);
                });
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