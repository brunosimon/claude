(function(window)
{
    "use strict";

    APP.COMPONENTS.Header = APP.CORE.Event_Emitter.extend(
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

            this.template = new APP.TOOLS.Template();
            $('body').append(this.template.render('header'));
        },

        /**
         * START
         */
        start: function()
        {

        }
    });
})(window);
