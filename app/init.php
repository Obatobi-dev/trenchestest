<?php
// declare(strict_types=1);
// Deny direct access to file
defined("ISLOADED") OR die("{{Access denied}}");

// Some variable
define("RELATIVE_PATH", ""); // The root / path of files: Leave empty if on root directory public_html
define("ROOT", RELATIVE_PATH); // evironment root
define("APP_ROOT", $_SERVER['DOCUMENT_ROOT'].ROOT); // Document root

// Vendor Autoloader
spl_autoload_register("myAutoLoader");
function myAutoLoader($classname){
	$classname = explode("\\", $classname);
	$folder = strtolower($classname[0]);
	$class = ucfirst(end($classname));
	$classname = end($classname);
	
	require APP_ROOT."/{$folder}/{$class}.php";
}


// Create session
@session_set_cookie_params(3600 * 24, null, null, true, true);
@session_name("hey");
session_start();
session_regenerate_id();

// require APP_ROOT."/vendor/autoload.php"; // Composer loaded
require "dot_env.php";
// require APP_ROOT."/database/seed.php"; // Database connections
// require "model.php";
// require APP_ROOT."/database/migration.php"; // Run this Database table creator once, in order not to stress the database to do more work, if you later have a large database data it may crash your code due to heavyness in data
// require APP_ROOT."/vendor/autoload.php";
require "route.php"; // Route file
require "function.php";

DEBUG ? ini_set('display_errors', 1) : ini_set('display_errors', 0);