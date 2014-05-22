/**
 * 	Phonegap Plugin Directions Plugin
 * 	Author: Mikey Alder
 * 	Twitter: @MikeyAlder
 *
 *
 *	Use this plugin to fire an intenet to show directions using the native map software on the device
 */

var DirectionsPlugin = {

	error : 0,
	user_location : [],
	daddr : '',
	mode : '',

	/**
	 * Show the directions to the user using the native mapping app
	 * @param  {Array} daddr  Lat and Lng of the destination address
	 * @param  {String} mode  driving, walking, train etc
	 * @return {void}
	 */
	showDirections: function(daddr, mode)
	{
		// grab the mode, start address and end address
		this.mode = (mode !== undefined) ? mode : 'driving';
		this.daddr = (daddr !== undefined) ? daddr : 'NONE';

		// set errors if things are missing
		if(this.daddr === "NONE")
		{
			alert('Expected to receive a destination address');
			this.error = true;
		}

		if(device.platform == "iOS")
		{
			this.iOS();
		} else if (device.platform == "Android")
		{
			this.Android();
		} else {
			alert('DirectionsPlugin: Device Unknown');
			return false;
		}

	},


	iOS: function()
	{
		// get current location
		navigator.geolocation.getCurrentPosition(
			//success
			function(position) {
				DirectionsPlugin.user_location = position.coords.latitude + "," + position.coords.longitude;
				// create URL
				var url = "maps:saddr=" + DirectionsPlugin.user_location + "&daddr=" + DirectionsPlugin.daddr[0] + "," + DirectionsPlugin.saddr[1];

				window.location = url;

				DirectionsPlugin._onDirectionsSuccessCallback();

			},
			//error
			function() {
				navigator.notification.alert(
					"There was an error whilst trying to receive your current location. Please check your location settings and try again",
					function() { return false; },
					'Could\'t Find Current Location',
					"Okay"
				);

				return false;
			},
			{
				timeout: 5000
			}
		);
	},

	_onDirectionsSuccessCallback: function()
	{
		return true;
	},

	_onDirectionsFailedCallback: function()
	{
		alert("DirectionsPlugin: Couldn't show directions");
	},

};