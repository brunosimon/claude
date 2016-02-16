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
            if(APP.TOOLS.Data.prototype.instance === null)
                return null;
            else
                return APP.TOOLS.Data.prototype.instance;
        },

        /**
         * INIT
         */
        init: function(options)
        {
            APP.TOOLS.Data.prototype.instance = this;

            this._super(options);

            this.set_defaults();
        },

        /**
         * CLEAR
         */
        clear: function()
        {
            localStorage.clear();
        },

        /**
         * SET DEFAULTS
         */
        set_defaults: function()
        {
            // Need defaults
            if(!this.get('name'))
            {
                // Clear
                localStorage.clear();

                // Add defaults values
                this.set('name','Mon Cloud');
            }
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

