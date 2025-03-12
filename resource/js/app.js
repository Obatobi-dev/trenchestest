var App = {
	message: function(msg, success = false, extra = null){
		if(success){
			toastr.success(msg)
		} else {
			toastr.error(msg)
		}

		if(extra){
			var ext = ['redirect', 'reload'];
			if(extra.redirect){
				let loc = `${App.location.origin}/${extra.redirect}`
				loc = loc.replace("//", "/")
				setTimeout(e => {location = loc}, 3000)
			} else if(extra.reload){
				setTimeout(e => {location.reload();}, 1000)
			}
		}
	},
	sendToServer: function(data){
		// Check if a data isn't a form data
		// Creat to a form data
		if(data instanceof FormData === false){
			let p = data
			data = new FormData();
			for(let key in p){
				data.append(key, p[key])
			}
		}

		let RES;
		$.ajax({
			type: "POST",
			url: `${App.location.origin}/handler.php`,
			data: data,
			processData: false,
			async: false,
			contentType: false,
			success: function(e){
				RES = e;
			},
			error: function(e){
				App.message(`Network connection issue. Please check your network and try again. Or please try reload the page`);
				return;
			}
		})

		return RES
	},
	GetInfo: async function(apiCall, sortType = '', isLen = false){
		// isLen is used to count the returned result from api.
		const res = await fetch(`${this.location.origin}/json/${apiCall??App.Unique()}/${sortType}`)
		const result = await res.json();
		
		if(isLen) return result.length;
		return result;
	},
	Unique: function(len = 12){
		let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		str = str.split("")
		let ran = "";
		isF = 0
		for(let i = 0; i < len; i++){
			ran += str[Math.ceil(Math.random() * str.length - 1)]
		}

		return ran;
	},
	// Configuration file (In head)
	// this.Config
	Handler: function(data, sendToCaller = false){
		// Data sent from form or not
		// If data wasn't sent from form instance: Convert to a form data
		let inst = data
		if(!data.form){
			if(data instanceof FormData === false){
				data = new FormData();
				for(let key in inst){
					data.append(key, inst[key])
				}
			}
		} else {
			inst.disabled = true; // Disable caller btn
			data = new FormData(data.form ?? data); // A direct form calling or a submit btn calling
		}

		let Response = this.sendToServer(data); // Response from server

		// Message modal: If the both are true i.e Response and showMessage to default toast is true
		// This indicates that the message isn't returning to any caller, but will show message to the notification box without sending back any message to the caller
		let realRes = true;
		try {
			Response = JSON.parse(Response);
		} catch (e) {
			realRes = false
		}

		inst.disabled = false; // Remove disable from btn caller
		if(realRes){
			if(this.location.isLive && !sendToCaller){
				// Show message through the notification box if web app is live
				this.message(Response.message, Response.success, Response.extra)
			} else {
				if(sendToCaller){
					return Response; // Return response to caller
				}
				show(Response); // Show message if the message is not sent back to the caller
			}
		} else {
			if(sendToCaller){
				return Response; // Return response to caller
			}
			show(Response); // Show message if the message is not sent back to the caller
			// Error mode
			// show(Response)
		}
	},
}