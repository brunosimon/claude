(function(window)
{
    'use strict';

    APP.CORE.App = APP.CORE.Event_Emitter.extend(
    {
        options:
        {
            page_name : 'landing'
        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            // Tools
            this.browser  = new APP.TOOLS.Browser();
            this.serial   = new APP.TOOLS.Serial();
            this.forecast = new APP.TOOLS.Forecast();
            this.data     = new APP.TOOLS.Data();
            this.template = new APP.TOOLS.Template();

            // Components
            this.widgets = new APP.COMPONENTS.Widgets();
            this.header  = new APP.COMPONENTS.Header({widgets:this.widgets});
        },

        /**
         * START
         */
        start: function()
        {
            this.browser.start();
            this.serial.start();
            this.forecast.start();
            this.data.start();
            this.template.start();

            this.header.start();
            this.widgets.start();
        }
    });
})(window);
