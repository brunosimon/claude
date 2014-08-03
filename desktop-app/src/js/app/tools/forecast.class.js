var Forecast = require('forecast');

(function(window)
{
    "use strict";

    APP.TOOLS.Forecast = APP.CORE.Event_Emitter.extend(
    {
        options:
        {
            logs : true
        },

        /**
         * SINGLETON
         */
        static_instantiate: function()
        {
            if(APP.TOOLS.Forecast.instance === null)
                return null;
            else
                return APP.TOOLS.Forecast.instance;
        },

        /**
         * INIT
         */
        init: function(options)
        {
            APP.TOOLS.Forecast.prototype.instance = this;

            this._super(options);
        },

        /**
         * START
         */
        start: function()
        {
            // Initialize
            this.instance = new Forecast(
                {
                    service : 'forecast.io',
                    key     : APP.CONFIG.forecast.key,
                    units   : 'celcius',
                    cache   : true,
                    ttl     :
                    {
                        minutes: 30,
                        seconds: 45
                    }
                }
            );

            return this;
        },

        /**
         * GET
         */
        get: function(coords)
        {
            var that = this;

            // Errors
            if(!(coords instanceof Object) || typeof coords.lat === 'undefined' || typeof coords.lng === 'undefined')
            {
                if(this.options.logs)
                    console.warn('forecast : wrong coordinates');

                return false;
            }

            if(this.options.logs)
                console.log('serial : try getting weather for coordinates ' + JSON.stringify(coords) + '');

            // Get
            this.instance.get([coords.lat,coords.lng], function(error, weather)
            {
                if(error && that.options.logs)
                    return console.log(err);

                that.trigger('weather_received',[weather])

                if(that.options.logs)
                    console.log('forecast : got weater',weather);
            });

            return this;
        }
    });
})(window);

