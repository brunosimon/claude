(function(window)
{
    "use strict";

    APP.COMPONENTS.Friends_Widget = APP.COMPONENTS.Widget.extend(
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

            this.name = 'Friends';
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
