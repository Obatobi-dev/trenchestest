<?php
// header('Content-Type: application/json');
define("ISLOADED", __DIR__);

function pageError(){
	die(json_encode(['message' => "An error occured"]));
}


############### Error handler for preventing XXL attack
// Empty data sent error
if(!isset($_SERVER['HTTP_REFERER'])){
	pageError();
}

if(!isset($_POST)){
	pageError();
}

// Initializer
require "app/init.php";

$data = (object) $_POST; // Change POST data from an array to object
$AJAX_HANDLER = Handler();

if(!isset($data->$AJAX_HANDLER)){
	// Show an error that the handler is not defined
	pageError();
}

$is_admin = false;
/// Admin actions when logged in
if(stristr(PAGE_REF, ADMIN_ROOT)){
	if(isset($_SESSION['admin_auth'])){
		// Admin automatic privilidge to take action on the users account
		$is_admin = true;
	}
}
define("ADMIN_PRIVILEDGE", $is_admin);

// Decode handler to access the controller's class name and method
$_data = Handler_Decode($data->$AJAX_HANDLER);
$_data = explode('-', $_data);
$controller = ucfirst($_data[0]);
$method = ucfirst(end($_data));
unset($data->$AJAX_HANDLER); // Remove key

// Open controller file
$source = APP_ROOT."/model/{$controller}.php";

// Access method curresponding with class
// eval('{$controller}::{$method}();');
$_cont = new ('\Model\\'.$controller);
// $controller->$method($data);
// $controller::$method($data);;
// show($data, 1);
$_cont->$method($data);