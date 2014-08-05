(function(window)
{
    "use strict";

    APP.COMPONENTS.Timer_Widget = APP.COMPONENTS.Widget.extend(
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
            this.name   = 'Timer';
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
