<?php

namespace Model;

// Deny direct access to file
defined("ISLOADED") OR die("{{Access denied}}");

class Session
{
	public static function init(){
	    @session_name(HOST);
		@session_start();
		session_regenerate_id();
		
		/*// Set session param
		if(session_status() == PHP_SESSION_ACTIVE){
			session_regenerate_id();
		} else {
			session_set_cookie_params(3600 * 24, null, null, true, true);
			session_name(HOST);
			session_start();
		}*/
	}

	public static function create(mixed $name = null, mixed $value = null){
// 		self::init();
		$_SESSION[$name] = $value;
		return true;
	}

	public static function read(mixed $name = null){
// 		self::init();
		return $_SESSION[$name] ?? false;
	}

	public static function delete(mixed $name = null){
// 		self::init();
		unset($_SESSION[$name]);
		return true;
	}
}