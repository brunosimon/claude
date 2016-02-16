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
            this.slug   = 'twitter';
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
