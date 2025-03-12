function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}


// Create readable time interval (time ago)
function timeAgo(date, tz = App.config.time_zone_id) {
	return date+' '+tz;
	if(date == null || date == ''){
		return ''
	}

	// tz = '';
	

	if(!Number.isInteger(date)){
		date = new Date(date).toLocaleString({timeZone: tz});
		// date = new Date(date).getTime() / 1000
	}
	
	// let now = new Date().toLocaleString('en-US', {timeZone: tz});
	let now = new Date()
	date = new Date(date)

	date.setMinutes(date.getMinutes() + now.getTimezoneOffset()); // convert to utc
	// now = new Date(now).getTime() / 1000;
	show(date)

	let seconds = now - date;
	var interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + "yr";
	}

	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + "mth";
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + "d";
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + "hr";
	}

	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + "min";
	} else {
		return "just now";
	}
}


function timeSince(date, tz = App.config.time_zone){
	if(date == null || date == ''){
		return ''
	}

	if(!Number.isInteger(date)){
		date_obj = date = new Date(date).toLocaleString({timeZone: tz});
	}

	let now_obj = new Date().toLocaleString('en-US', {timeZone: tz});
	date_obj = new Date(date_obj);
	now_obj = new Date(now_obj);

	let period = "am";
	let hour = date_obj.getHours();
	let minute = date_obj.getMinutes();
	let day = "today";
	let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']


	if(hour >= 12){
		if(hour > 12){
			hour = hour - 12
		}
		
		period = "pm";
	}

	if(hour <= 9){
		hour = `0${hour}`
	}

	if(minute <= 9){
		minute = `0${minute}`
	}

	let Interval = timeDiff(date, tz, 'ago');
	day = `${Proper_Number(date_obj.getDate())} ${months[date_obj.getMonth()]} ${date_obj.getFullYear()}`;

	return `${day}, ${hour}:${minute}${period}`
}

function timeDiff(date, tz, mode = null){
	if(!date){
		return '';
	}

	if(!tz){
		return '';
	}

	let now, static, interval;

	now = new Date().toLocaleString('en-US', {timeZone: tz});
	now = new Date(now).getTime() / 1000


	static = new Date(date).toLocaleString({timeZone: tz});
	static = new Date(static).getTime() / 1000

	// Interval difference in seconds
	interval = static - now
	// Reverse mode
	if(mode === "ago"){
		interval = now - static
	}
	

	year = parseInt(interval / 60 / 60 / 24 / 7 / 4 / 12);
	month = parseInt(interval / 60 / 60 / 24 / 7 / 4);
	week = parseInt(interval / 60 / 60 / 24 / 7);
	day = parseInt(interval / 60 / 60 / 24);
	// day = Math.floor(interval / 60 / 60 / 24);
	hour = parseInt(interval / 60 / 60 % 24, 10);
    minute = parseInt(interval / 60 % 60, 10);
    second = parseInt(interval % 60, 10);

    return {
    	year: year,
    	month: month,
    	week: week,
    	hour: hour,
    	day: day,
    	minute: minute,
    	second: second,
    }
}


function fullDate(date = null, tz = App.config.time_zone, isOnlyDate = false){
	Now = null;
	if(tz == null) tz = App.app.tz; 
	if(date == null){
		Now = new Date().toLocaleString('en-US', {timeZone: tz});
		Now = new Date(Now)
	}

	// 
	if(isOnlyDate) tm = `00:00:00`;
	else tm = `${Proper_Number(Now.getHours())}:${Proper_Number(Now.getMinutes())}:${Proper_Number(Now.getSeconds())}`
	return full_date = `${Now.getFullYear()}-${Proper_Number(Now.getMonth() + 1)}-${Proper_Number(Now.getDate())} ${tm}`;
}


function Proper_Number(number){
	number = Number(number);
	if(number < 10){
		number = `0${number}`
	}

	return number;
}

function Number_Rank(num = 0) {
    var units = ["","K","M","B","T","Q"]
    var unit = (num / 1.0e+1).toFixed(0).toString().length
    var r = unit%3
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return ((Math.round(x)==x) ? x : x.toFixed(2))+units[Math.floor(unit / 3)]
}

// Make first letter a upper case
function ucfirst(str = null) {
	if(str == null) return '';
	if(str == undefined) return '';
	// converting first letter to uppercase
	return capitalized = str.charAt(0).toUpperCase() + str.slice(1);
}

// Copy text to clipboard
function copy(text, msg = 'Copied'){
	navigator.clipboard.writeText(text)
	.then(() => {
		// App.message(`${text}\n\nCopied to clipboard`, true)
		App.message(msg, true)
	}).catch(() => {
		App.message("something went wrong");
	});
}


// Show helper
function show(data = null){
	console.log(data)
}

// Convert to reable number
function Number_(num, fixed = 2){
	// show((Number(num).toLocaleString(fixed)))
    // return (num)
    return Number(num).toLocaleString();
    // return Number(num).toFixed(fixed)
}

// Increase and decrease input type number
function Decrease_And_Increase(html, isIncrease = false){
	// Decrease and increase
	let val = Number($(`${html}`).val());

	if(!isIncrease){
		val--;
		if(val < 0) val = 0; // In case the calculations result to minus zero. Then, make the final result zero
	} else {
		val++;
	}

	$(`${html}`).val(val)
}

// 
function Coin_Img(name = "btc"){
	name = name.toLowerCase();
	return `${App.rest.coin_icon}/${name}.svg`;
}

function App_Img(source = null){
	return `${App.rest.image_root}/${source}`;
}

function Crypto_Name(name = 'btc'){
	name = name.toUpperCase();
	let crypto = {
		"BTC": "bitcoin",
		"ETH": "ethereum",
		"SOL": "solana",
		"USDT": "tether",
		"DOGE": "doge",
		"XRP": "ripple",
		"DOT": "Dot",
		"BCH": "bitcoin cash",
		"BNB": "binance coin",
		"WBTC": "wrapped bitcon",
		"SAND": "sandbox",
		"LTC": "litecoin",
		"UNI": "uniswap",
		"1INCH": "1inch",
		"AAVE": "aave",
		"MATIC": "polygon",
		"ALICE": "myNeighborAlice",
		"ETC": "ethereum classic",
		"LINK": "chainlink",
		"ADA": "cardano",
		"FTM": "fantom",
		"LRC": "loopringToken",
		"GALA": "gala",
		"AXS": "axie infinity",
		"POWR": "powerledger",
		"NEAR": "near",
		"AVAX": "avalanche",
		"ALGO": "algorand",
		"MANA": "decentraland",
		"HBAR": "hedera",
		"GHST": "aavegotchi",
		"ATOM": "cosmos",
		"GRT": "graph",
		"ONE": "onecoin",
	}

	return `${crypto[name] ?? name}`;
}

// 
function nl2br (str, replaceMode = false, isXhtml = false) {
	var breakTag = (isXhtml) ? '<br />' : '<br>';
	var replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';

	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}


// Show / Toggle password
function Toggle_Password(html_identifier, btn_elem){
	let input_elem = document.querySelector(`${html_identifier}`);
	let _type = (input_elem.type == 'text')?'password':'text';
	let _icon = (input_elem.type == 'text')?'far fa-eye':'far fa-eye-slash';
	input_elem.type = _type;
	btn_elem.innerHTML = `<i class="${_icon}"></i>`;
}


// Captcha
function Captcha(){
	let capt = App.Unique(5); // Get code
	let cap_split = capt.split(''); // Split code into an array
	let cap_html = ``;
	let rand_array = []; // For random transform property degree value
	for(let i = -50; i < 50; i++) rand_array.push(i);

	for(let single_cap of cap_split){
		cap_html += `<span style="transform: rotate(${rand_array[Math.ceil(Math.random() * rand_array.length - 1)]}deg)">${single_cap}</span>`;
	}

    return {text: capt, styled: cap_html};
}


// Color conditional
function Color(name = 'muted'){
	name = name.toLowerCase();
	let data = {
		success: ['up', 'complete', 'buy', 'open', 'won', 'high', 'processed', 'raise'],
		danger: ['low', 'lost', 'sell', 'deposit', 'closed', 'reject', 'rejected', 'fall', 'red'],
		info: ['pending', 'running', 'withdraw', 'withdrawal'],
	}

	for(let col in data){
		let arr_col = data[col];
		// Loop through the values of color
		for(let single of arr_col){
			if(single == name) return col; // if any of the name listed in array is found, then send back the object key;
		}
	}

	return name; // Or else return the name
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}