(function(window)
{
    "use strict";

    APP.COMPONENTS.Forecast_Widget = APP.COMPONENTS.Widget.extend(
    {
        options:
        {

        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.unique = false;
            this.name   = 'Forecast';
        },

        /**
         * START
         */
        start: function()
        {
            return this;
        }
    });
})(window);
