<?php

namespace Model;

// Deny direct access to file
defined("ISLOADED") OR die("{{Access denied}}");

Trait Model 
{
	use Database;

	private static $limit 		= 30;
	private static $offset 		= 0;
	private static $order_type 	= "desc";
	private static $order_column = "sn";
	private static $clause = "and";
	// private static $table;
	// public $table;

	###################### Select all
	public static function findAll($table = null)
	{
		if($table == null) $table = self::$table;
		$query = "SELECT * FROM $table ORDER BY ".self::$order_column." ".self::$order_type;

		$remove = ['password', 'withdrawalpin'];
		if($query = self::query($query)){
			foreach($query as $num => $data){
				// $data = (array) $data;
				// show(array_keys((array)$data));
				foreach($data as $key => $val){
					if(in_array($key, $remove)){
						unset($query[$num]->$key);
					}
				}
			}
		}

		return Helper::json($query? $query:[]);
	}

	public static function findSingle($table = null, array $ref = []){
		self::$table = $table;
		if($table == null) $table = self::$table;
		// Reference
		$key = array_keys($ref)[0];
		$value = array_values($ref)[0];

		/*$remove = ['password', 'withdrawalpin'];
		if($query = self::$read($key, $value)){
			foreach($query as $num => $data){
				// $data = (array) $data;
				// show(array_keys((array)$data));
				foreach($data as $key => $val){
					if(in_array($key, $remove)){
						unset($query[$num]->$key);
					}
				}
			}
		}*/
		$query = self::whereSelect($ref);

		return Helper::json($query? $query:[]);
	}

	###################### Select all
	public static function selectAll(string $extra = NULL){
		$self = self::class;
		$query = trim("SELECT * FROM {$self::$table} $extra");

		return self::$query($query);
	}


	###################### INSERT
	public static function insert(mixed $data){
		$data = (array) $data;
		$dataKeysCollate = array_keys($data);
		$dataKeys = implode(",", $dataKeysCollate);// Data keys
		$dataValues = implode(",:", $dataKeysCollate);// Data keys


		// $self = self::class;
		$query = "INSERT INTO ".self::$table."($dataKeys) VALUES (:$dataValues)";

		self::query($query, $data);
		return true;
	}

	###################### Select from where static function
	public static function whereSelect(mixed $data){
		$data = (array) $data;
		$ref = $data;
		$dataKeys = array_keys($ref);
		$constr = "";
		$clause = self::$clause ?? 'or';
		$clause = strtoupper($clause);

		// Seperate key into PDO static function
		foreach ($dataKeys as $key){
			$constr .= "{$key} = :{$key} {$clause} ";
		}

		$constr = rtrim($constr, "{$clause} ");
		$self = self::class;

		// $query = "SELECT * FROM self::$table WHERE {$constr} ORDER BY self::$order_column self::$order_type LIMIT self::$limit OFFSET self::$offset"; // Query part Remove clause ( )
		$query = "SELECT * FROM {$self::$table} WHERE {$constr} ORDER BY {$self::$order_column} {$self::$order_type}"; // Query part Remove clause ( )

		// return $query;
		return self::query($query, $ref);
	}

	###################### Delete all
	public static function whereDelete(mixed $data){
		$data = (array) $data;
		$dataKeys = array_keys($data);
		$constr = "";
		$clause = self::$clause ?? 'and';
		$clause = strtoupper($clause);

		foreach ($dataKeys as $key){
			$constr .= "$key = :$key {$clause} ";
		}

		$self = self::class;
		$constr = rtrim($constr, " {$clause} ");
		$query = "DELETE FROM {$self::$table} WHERE $constr";
		self::query($query, $data);
		return true;
	}

	###################### Update from where
	public static function whereUpdate(mixed $data, array $ref){
		$data = (array) $data;
		$dataKeys = array_keys($data);
		$constr = "";
		$self = self::class;

		foreach ($dataKeys as $key){
			$constr .= "{$key} = :{$key}, ";
		}

		// Join data array with the ref array to form a bond
		$data = array_merge($data, $ref);
		$query = "UPDATE {$self::$table} SET {$constr}"; // Query part
		$query = rtrim($query, ", "); // Remove the last comma

		// Reference array keys extract
		$refs = " WHERE ";
		$clause = "AND";
		if(!empty(self::$clause)){
			$clause = self::$clause;
		}

		$clause = strtoupper($clause);
		$refkeys = array_keys($ref);
		foreach ($refkeys as $key){
			$refs .= "{$key} = :{$key} {$clause} ";
		}

		$refs = rtrim($refs, "{$clause} "); // Remove clause ( )

		$query .= $refs; // Query final

		self::query($query, $data);
		return true;
	}

	###################### Validate empty inputs
	protected static function empty_check($post_data, $optionals = []){
		$post_data = (array) $post_data;
		// Remove optional check from the list of $data
		foreach($optionals as $optional){
			if(in_array($optional, array_keys($post_data))){
				unset($post_data[$optional]);
			}
		}

		foreach($post_data as $data){
			if(empty($data)){
				return Message("Fill important field(s)");
			}
		}
	}


	######################### FOR API REQUEST
	######################### CRUD SYSYEM
	public static function create(mixed $data){
		$data = (array) $data;
		if(!self::insert($data)){
			return false;
		}

		return true; // On success
	}

	######################### Read data
	public static function read(mixed $key = null, mixed $val = null, $ref = null){
		// Fetch mode
		if(!is_array($key) && !is_object($key)){
			$data = [$key => $val];
		} else {
			$data = $key;
			self::$clause = $val ?? 'and';
		}

		foreach($data as $col){
			if(empty($col)){
				return false;
			}
		}

		if(!$query = self::whereSelect($data)){
			return false;
		}

		// If only one result is Matched / Returned
		if(count($query) == 1){
			$query = $query[0];
			if($ref){
				return $query->$ref ?? false;
			}
			return $query;
		}

		// Return result
		return $query;
	}

	public static function update(mixed $data, array $ref){
		$data = (array) $data;
		if($query = self::whereUpdate($data, $ref)){
			return true;
		}

		return false;
	}

	public static function delete(mixed $data){
		$data = (array) $data;

		if($query = self::whereDelete($data)){
			return true;
		}

		return false;
	}

	public static function up(){
		// Create table
		// self::schema();

	}

	public static function down(){
		// drop table
		// self::schema();
		
	}
}