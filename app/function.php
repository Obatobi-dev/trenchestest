<?php

// Deny direct access to file
defined("ISLOADED") OR die("{{Access denied}}");


// All files here may be moved to Helper in the future

function show($show, $die = false)
{
	echo "<pre>";
	print_r($show);
	echo "</pre>";

	if($die){
		die;
	}
}

function result($res, $die = false){
	print_r($res);

	if($die){
		die;
	}
}

function encode($str, $encodeTwice = false){
	$str = base64_encode($str);

	if($encodeTwice){
		$str = base64_encode($str);
	}

	return $str;
}

function decode($str, $decodeTwice = false){
	$str = base64_decode($str);

	if($decodeTwice){
		$str = base64_decode($str);
	}

	return $str;
}

// File extention reader for uploads

function file_get_contents_curl($url) {
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);

	$data = curl_exec($ch);
	curl_close($ch);

	return $data;
}

function Message($msg, $success = false, $extra = null){
	$const = array(
		"message" => $msg,
		"success" => $success,
		"extra" => $extra,
	);
	
	print_r(json_encode($const));
	exit; // Off the script
}

function dataType($type, $data){
	// Type indicates the datatype and validation
	$type($data); // E.g int()
	// is_($type);
}

function readable_stamp($datestring){
	return date("M-d, Y h:ia", strtotime($datestring));
}

// redirect function with JavaScript
// Reason for using JS is because we are using a AJAX call to show view on the front end. Jquery is clashing witht eh header("Location: /");
// This is the nearest we can use to make us achieve the same thing as header("Location")

function Round_Number($value, $places=0) {
	if ($places < 0) { $places = 0; }
	$x= pow(10, $places);
	return ($value >= 0 ? ceil($value * $x):floor($value * $x)) / $x;
	return floor($value * $x) / $x;
}

function Number($num, $decimal = 4){
	return number_format($num, $decimal);
}


// Time 
function timeAgo($timeago){
	// the date parsed is still a string
	if(is_string($timeago)){
		$timeago = strtotime($timeago);
	}

	$now = strtotime(date("Y-m-d H:i:s"));

	return $now - $timeago;
}

/*function timeDiff($ago, $now = STAMP){
	$now = date_create($now);
	$ago = date_create($ago);

	// Return hour diff $interval
	return date_diff($now, $ago);
	return date_diff($ago, $now);
}*/

function timeDiff($date, $tz = NULL, $mode = NULL){
	if(!$date){
		return '';
	}

	if(!$tz){
		// return '';
		$tz = date_default_timezone_get();
	}

	// date_default_timezone_set($tz);

	$now = strtotime(date("Y-m-d H:i:s"));
	$static = strtotime($date);

	// Interval difference in seconds
	$interval = $static - $now;
	// Reverse mode
	// $mode = reverse dosn't do anything special // What it does is to switch between negative and positive result, if day is -2, the ago will reverse it to 2, without losing it original value
	if($mode === "reverse"){
		$interval = $now - $static;
	}
	
	$year = intval($interval / 60 / 60 / 24 / 7 / 4 / 12, 10);
	$month = intval($interval / 60 / 60 / 24 / 7 / 4, 10);
	$week = intval($interval / 60 / 60 / 24 / 7, 10);
	$day = intval($interval / 60 / 60 / 24, 10);
	$hour = intval($interval / 60 / 60 % 24, 10);
    $minute = intval($interval / 60 % 60, 10);
    $second = intval($interval % 60, 10);

    return (object)array(
    	"year"=> $year,
    	"month"=> $month,
    	"week"=> $week,
    	"hour"=> $hour,
    	"day"=> $day,
    	"minute"=> $minute,
    	"second"=> $second,
    );
}

// Compress image
function cropAndCompressimage($original_file_name, $cropped_file_name, $max_width, $max_height){
	if(file_exists($original_file_name))
	{
		// Get the uploaded image information
		$imageInfo = getimagesize($original_file_name);
		switch ($imageInfo['mime']) {
			case 'image/jpeg':
				$original_image = imagecreatefromjpeg($original_file_name);
				break;
			
			case 'image/png':
				$original_image = imagecreatefrompng($original_file_name);
				break;

			case 'image/gif':
				$original_image = imagecreatefromgif($original_file_name);
				break;

			default:
				case 'image/jpeg':
				$original_image = imagecreatefromjpeg($original_file_name);
				break;
		}

		$original_width = imagesx($original_image);
		$original_height = imagesy($original_image);

		if($original_height > $original_width)
		{
			//make width equal to max width;
			$ratio = $max_width / $original_width;

			$new_width = $max_width;
			$new_height = $original_height * $ratio;

		}else
		{

			//make width equal to max width;
			$ratio = $max_height / $original_height;

			$new_height = $max_height;
			$new_width = $original_width * $ratio;
		}
	}

	//adjust incase max width and height are different
	if($max_width != $max_height)
	{

		if($max_height > $max_width)
		{

			if($max_height > $new_height)
			{
				$adjustment = ($max_height / $new_height);
			}else
			{
				$adjustment = ($new_height / $max_height);
			}

			$new_width = $new_width * $adjustment;
			$new_height = $new_height * $adjustment;
		}else
		{

			if($max_width > $new_width)
			{
				$adjustment = ($max_width / $new_width);
			}else
			{
				$adjustment = ($new_width / $max_width);
			}

			$new_width = $new_width * $adjustment;
			$new_height = $new_height * $adjustment;
		}
	}

	$new_image = imagecreatetruecolor($new_width, $new_height);
	imagecopyresampled($new_image, $original_image, 0, 0, 0, 0, $new_width, $new_height, $original_width, $original_height);

	imagedestroy($original_image);

	if($max_width != $max_height)
	{

		if($max_width > $max_height)
		{

			$diff = ($new_height - $max_height);
			if($diff < 0){
				$diff = $diff * -1;
			}
			$y = round($diff / 2);
			$x = 0;
		}else
		{

			$diff = ($new_width - $max_height);
			if($diff < 0){
				$diff = $diff * -1;
			}
			$x = round($diff / 2);
			$y = 0;
		}
	}else
	{
		if($new_height > $new_width)
		{

			$diff = ($new_height - $new_width);
			$y = round($diff / 2);
			$x = 0;
		}else
		{

			$diff = ($new_width - $new_height);
			$x = round($diff / 2);
			$y = 0;
		}
	}

	$new_cropped_image = imagecreatetruecolor($max_width, $max_height);
	imagecopyresampled($new_cropped_image, $new_image, 0, 0, $x, $y, $max_width, $max_height, $max_width, $max_height);
	
	imagedestroy($new_image);

	imagejpeg($new_cropped_image,$cropped_file_name,60);
	imagedestroy($new_cropped_image);

	return true;
}


// Blade file component directories
function Component($source, $useful_data = []) {
	$source = explode("/", strtolower($source));
	foreach ($source as $index => $file) {
		// code...
		$source[$index] = strtolower($file);
	}

	$source = implode("/", $source);
	// show($source);

	// Check if file exist: If not throw an executing error
	$path = APP_ROOT."/route-component/{$source}.php";
	if(!file_exists($path)){
		echo("<pre><b>{$source}</b> Component not found in this directory. Or, please, try creating it</pre>"); return;
	}

	// Additional information for the component page
	extract($useful_data);
	require $path;
}


function App_Img($source = "btc"){
	return IMAGE_ROOT."/{$source}";
}

function Script($file, $source = "js"){
	$path = ROOT."/resource/{$source}/{$file}.{$source}";
	$time = TIME;
	return "<script src='{$path}?version={$time}'></script>";
}