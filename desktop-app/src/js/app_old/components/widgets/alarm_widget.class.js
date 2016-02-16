(function(window)
{
    "use strict";

    APP.COMPONENTS.Alarm_Widget = APP.COMPONENTS.Widget.extend(
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

            this.unique   = false;
            this.name     = 'Alarm';
            this.slug     = 'alarm';
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
