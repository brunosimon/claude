(function(window)
{
    "use strict";

    APP.COMPONENTS.Twitter_Widget = APP.COMPONENTS.Widget.extend(
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
            this.name   = 'Twitter';
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
