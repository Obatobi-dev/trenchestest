<?php

namespace Model;

// Deny direct access to file
defined("ISLOADED") OR die("{{Access denied}}");

class Migration
{
	use Model;
	
	public function __construct(){
		$tables = json_decode(DB_TABLES);
		// ALTER TABLE `user` ADD `verified` BOOLEAN NOT NULL AFTER `password`;
		foreach($tables as $table){
			if($this->query($this->$table())){
				result(SYSTEM_ERROR, true);
			}
		}
	}

	// Trades
	private function trade(){
		return $query = "
		CREATE TABLE IF NOT EXISTS trade(
			id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL, -- ALL ID be changed to INDEX the, userid changed to id (And for all tables)
			userid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL,
			tradeid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL UNIQUE,
			detail TEXT NOT NULL, -- start price, end price, trade type (High or low), status, amount, starttime, endtime
			tzstamp DATETIME NOT NULL, -- User timezone
			stamp DATETIME NOT NULL -- System timezone
		);";
	}

	// Users
	private function user(){
		return $query = "
		CREATE TABLE IF NOT EXISTS user(
			id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
			userid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL UNIQUE,
			email VARCHAR(60) NOT NULL,
			fullname VARCHAR(60) NULL,
			password VARCHAR(80) NOT NULL,
			timezone VARCHAR(80) NOT NULL,
			geo VARCHAR(500) NOT NULL,
			disabled BOOLEAN NOT NULL DEFAULT 0,
			image VARCHAR(100) NULL,
			balance DECIMAL(10,2) NOT NULL,
			wallet VARCHAR(60) NULL,
			tzstamp DATETIME NOT NULL,
			stamp DATETIME NOT NULL
		);";
	}


	// Deposit
	private function deposit(){
		return $query = "
		CREATE TABLE IF NOT EXISTS deposit(
			id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
			userid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL,
			depositid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL UNIQUE,
			amount DECIMAL(10,2) NOT NULL,
			status VARCHAR(20) NOT NULL,
			attachment VARCHAR(100) NOT NULL,
			confirmedstamp DATETIME NULL,
			tzstamp DATETIME NOT NULL,
			stamp DATETIME NOT NULL
		);";
	}

	// Withdrawal
	private function withdrawal(){
		return $query = "
		CREATE TABLE IF NOT EXISTS withdrawal(
			id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
			userid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL,
			withdrawalid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL UNIQUE,
			amount DECIMAL(10,2) NOT NULL,
			status VARCHAR(20) NOT NULL, -- Pending, Complete, Rejected
			wallet VARCHAR(100) NOT NULL,
			confirmedstamp DATETIME NULL,
			tzstamp DATETIME NOT NULL,
			stamp DATETIME NOT NULL
		);";
	}

	// Admin
	private function admin(){
		return $query = "
		CREATE TABLE IF NOT EXISTS admin(
			id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
			username VARCHAR(100) NOT NULL,
			password VARCHAR(100) NOT NULL,
			timezone VARCHAR(100) NOT NULL,
			sitesetting TEXT NULL,
			contact TEXT NULL -- email, phone, whatsapp, telegram, facebook
		);";
	}

	// Admin
	private function support(){
		return $query = "
		CREATE TABLE IF NOT EXISTS support(
			sn BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
			id VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL UNIQUE,
			userid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL,
			detail TEXT NOT NULL, -- Subject, message, attachment, isReplied, repliedon
			tzstamp DATETIME NOT NULL,
			stamp DATETIME NOT NULL
		);";
	}

	// KYC
	private function kyc(){
		return $query = "
		CREATE TABLE IF NOT EXISTS kyc(
			sn BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL, -- ALL ID be changed to INDEX the, userid changed to id (And for all tables)
			id VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL UNIQUE,
			userid VARCHAR(40) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL,
			detail TEXT NOT NULL, -- start price, end price, trade type (High or low), status, amount, starttime, endtime
			tzstamp DATETIME NOT NULL, -- User timezone
			stamp DATETIME NOT NULL -- System timezone
		);";
	}

	################# Pages like -- Contact us and the likes dynamically
	private function page(){
		return $query =
		"CREATE TABLE IF NOT EXISTS page (
		    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		    name TEXT NOT NULL,
		    link TEXT NOT NULL,
		    data_ TEXT NOT NULL,
		    chunk VARCHAR(60) CHARACTER SET latin7 COLLATE latin7_general_cs NOT NULL UNIQUE,
		    lastupdated DATETIME NULL,
		    stampdate DATE NOT NULL,
			stamp DATETIME NOT NULL
		);";
	}

	################# Alter table
	private function altertable(){
		return $query = "";
	}
}

// use Model\Tables;
$table = new Migration();