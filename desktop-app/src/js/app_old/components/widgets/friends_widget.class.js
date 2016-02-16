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

            this.name     = 'Friends';
            this.slug     = 'friends';
            this.template = 'friends';
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
