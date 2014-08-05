(function(window)
{
    "use strict";

    APP.COMPONENTS.Sequences_Widget = APP.COMPONENTS.Widget.extend(
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

            this.name = 'Sequences';
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
