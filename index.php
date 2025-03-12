<?php

define("ISLOADED", __DIR__); // Page approver agent

/**
 * @return
 * @ APP DEVELOPED BY OBATOBI.DEV
*/

$minPHPVersion = '8.0';
if (phpversion() < $minPHPVersion)
{
  die("Your PHP version must be {$minPHPVersion} or higher to run this app. Your current version is " . phpversion());
}

ob_start();
clearstatcache();

/**
 * @param
 * @return
 * ENVIRONMENT, DATABASE and SITE SETTING is in app/dot_end.php
 * DATABASE SEEDER is in database/seed.php
 * MIGRATION / TABLES SEEDER is in database/migration.php
*/

// Initializer
require "app/init.php";

// Page requester
Route::request();