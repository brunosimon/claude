(function(window)
{
    "use strict";

    APP.COMPONENTS.Gmail_Widget = APP.COMPONENTS.Widget.extend(
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
            this.name   = 'Gmail';
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
