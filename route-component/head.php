<?php
$vendor_scripts = ['jquery', 'apex-chart', 'bootstrap', 'myalert', 'datatable', 'owl-carousel', 'vector-map', 'vector-mill', 'toastr'];
$vendor_css = ['aos', 'bootstrap', 'owl-carousel', 'owl-main', 'vector', 'toastr'];
$scripts = ['function', 'app'];
// Get login detail if yes
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?=APP_NAME?></title>
<meta name="description" value="<?=APP_NAME?>">
<link href="<?=IMAGE_BASE?>/logo.jpg" rel="image_src">
<link href="<?=IMAGE_BASE?>/logo.jpg" rel="icon" type="image/x-icon">
<?php foreach($vendor_css as $script):?>
<link href="<?=ROOT;?>/resource/css/vendor/<?=($script)?>.css" rel="stylesheet">
<?php endforeach;?>
<link href="<?=ROOT;?>/resource/css/main.css?version=<?=HOST_IS_LIVE ? VERSION: TIME?>" rel="stylesheet">
<?php foreach($vendor_scripts as $script):?>
<script src="<?=ROOT;?>/resource/js/vendor/<?=($script)?>.js"></script>
<?php endforeach;?>
<?php foreach($scripts as $script):?>
<script src="<?=ROOT;?>/resource/js/<?=($script)?>.js?version=<?=HOST_IS_LIVE ? VERSION: TIME?>"></script>
<?php endforeach;?>
<script type="text/javascript">
// Location
App.location = {
	host: "<?=HOST?>",
	base: "<?=BASE?>",
	origin: "<?=ROOT?>",
	isLive: <?=HOST_IS_LIVE?>,
}

// Configuration
App.config = {
	name: "<?=APP_NAME?>",
	version: "<?=VERSION?>",
	time_zone_id: "<?=TIME_ZONE_ID;?>",
	time_zone: "<?=COMPUTER_TIME_ZONE_ID?>",
}

// Api
App.rest = {
	image_root: "<?=IMAGE_ROOT?>",
}

// Toastr option
toastr.options = {
	"closeButton": true,
	"debug": false,
	"newestOnTop": true,
	"progressBar": true,
	// "positionClass": "toast-bottom-center",
	"positionClass": "toast-top-center",
	"preventDuplicates": false,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "8000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
}
</script>
</head>
<body>