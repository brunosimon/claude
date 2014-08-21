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
            this.slug   = 'forecast';
        },

        /**
         * START
         */
        start: function()
        {
            this._super();

            return this;
        }
    });
})(window);
