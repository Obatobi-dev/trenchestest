<?php
// namespace Controller;

// Deny direct access to file
defined("ISLOADED") OR die("{{Access denied}}");
use \Model\User as User;

// Page loading App
class Route {
	private static $root_file = "", $default_page = "home", $default_description = "Crypto app | One stop";

	public static function request(){

		$url = $urls = self::filterUrl();

		$url_len = count($url);
		self::$root_file = $root_file = APP_ROOT."/route/";

		// If the url length is more than one data. Then we wil have to first check if there's a folder named in the firls element e.g url[0] = admin, the file will load from url[1] in the admin's folder. If not, then it will load directly from the blade file
		// First load the $url[0] data if it is a original file or a folder file

		// Original file check
		$base_data = self::file_exists($url[0]);

		// show($url);
		if($base_data->result){
			unset($url[0]); // Remove the first element, it has serve it purpose
		} else{ // If this file exist as a folder, then open the original file after opening the folder
			if($url_len > 1){
				// Access the second data
				// url[0] is now serving as the folder which is no longer needed in the data to be parsed. url[1] is now the loaded file: which the data is no longer needed. So we have to remove them so that it wouldn'th cause conflict in our code
				$base_data = self::file_exists($url[0]."/".$url[1]);
				unset($url[0]); // Remove
				unset($url[1]); // Remove
			}
		}


		// $url = reset($url);

		$index = 1;
		foreach($url as $extra => $val){
			unset($url[$extra]); // Remove the index key
			$url['page_'.$index] = $val; // Replace it with a name key
			$GLOBALS['extra']['page_'.$index] = $val;
			$index++;
		}

		// Check if user is logged in on this page
		// Check if there is a user active session
		// $GLOBALS['user'] = User::logged_in(true); // Check if the user is logged in and also Fetch the data

		extract($url);
		require ($base_data->path);
	}

	private static function filterUrl(){
		$URL = ($_GET['name'] ?? self::$default_page);
		$URL = explode("/", trim($URL,"/"));
		return $URL;
	}

	private static function page_title(){
		return APP_NAME ." - ". ucwords(str_replace("/", " | ", trim($_GET['name'] ?? "home")));
	}

	private static function file_exists($base_file = '404'):object{
		// $base_file
		$exp_e = explode('/', $base_file);
		foreach($exp_e as $exp => $val){
			$exp_e[$exp] = strtolower($val);
		}

		$base_file = (implode("/", $exp_e)).".php";
		$path = self::$root_file."404.php";
		$result = false;

		if(file_exists(self::$root_file.$base_file)){
			$result = true;
			$path = self::$root_file.$base_file;
		}

		return (object)['path' => $path, 'result' => $result];
	}
}