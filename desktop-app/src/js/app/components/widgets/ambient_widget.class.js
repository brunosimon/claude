(function(window)
{
    "use strict";

    APP.COMPONENTS.Ambient_Widget = APP.COMPONENTS.Widget.extend(
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

            this.name = 'Ambient';
            this.slug = 'ambient';
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
