<?php
// Deny direct access to file
defined("ISLOADED") OR die("{{Access denied}}");

// Get user system timezone from computer
define('COMPUTER_TIME_ZONE_ID', date_default_timezone_get());

// Set official system timezone
define("TIME_ZONE_ID", "UTC");
date_default_timezone_set(TIME_ZONE_ID);

// Project mode [1 = deployment mode, 0 = test mode]
define("HOST_IS_LIVE", 0);

// Host name
define("HOST", $_SERVER['SERVER_NAME']);

// Database set up on live server
define("DB_HOSTNAME", "localhost"); // Database host name
define("DB_USERNAME", "root"); // Database username: fixontra_admin
define("DB_PASSWORD", ''); // Database password: +Din7U!OtW5N
define("DB_NAME", "fixon"); // Enter your database name: fixontra_binary

// Forge a fake IP address on local server
if(HOST == "localhost") $_SERVER['REMOTE_ADDR'] = rand(0, 200).".".rand(0, 200).".".rand(0, 200).".".rand(0, 200);

/// App setting by DEV
define("APP_NAME", "Trench Test Quiz App");
define("SKEME", $_SERVER['REQUEST_SCHEME']);
define("BASE", SKEME."://".HOST.RELATIVE_PATH);
define("SKIN", "original");
define("DEBUG", true);
define("STAMP_DATE", date("Y-m-d"));
define("STAMP", date("Y-m-d H:i:s"));
define("TIME", time());
define("VERSION", "1.0");
define("PAGE_REF", $_SERVER['HTTP_REFERER'] ?? BASE); // Page referrer
define("IP_ADDRESS", $_SERVER['REMOTE_ADDR'] ?? BASE); // Page referrer

// Image root setting
define('IMAGE_ROOT', ROOT.'/resource/img'); // Image root
define('IMAGE_BASE', BASE.'/resource/img'); // Image root