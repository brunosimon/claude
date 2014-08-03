(function(window)
{
    "use strict";

    APP.TOOLS.Data = APP.CORE.Event_Emitter.extend(
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
            if(APP.TOOLS.Data.instance === null)
                return null;
            else
                return APP.TOOLS.Data.instance;
        },

        /**
         * INIT
         */
        init: function(options)
        {
            APP.TOOLS.Data.prototype.instance = this;

            this._super(options);
        },

        /**
         * START
         */
        start: function()
        {


            return this;
        },

        /**
         * GET
         */
        get: function(key)
        {
            var value = localStorage.getItem(key);

            if(typeof value !== null)
            {
                if(/\[.*\]/.test(value) || /\{.*\}/.test(value))
                    value = JSON.parse(value);
            }

            return value;
        },

        /**
         * GET
         */
        set: function(key,value)
        {
            if(typeof value !== 'string')
                value = JSON.stringify(value);

            localStorage.setItem(key,value);

            return this;
        }
    });
})(window);

