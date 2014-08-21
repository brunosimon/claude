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

            this.init_events();
        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            // Debug mode
            if(APP.CONFIG.debug)
            {
                var keys_down = [],
                    index     = null;

                // Keydown
                window.onkeydown = function(e)
                {
                    index = keys_down.indexOf(e.keyCode);

                    if(index === -1)
                        keys_down.push(e.keyCode);

                    // CMD + R
                    if(keys_down.indexOf(82) !== -1 && keys_down.indexOf(91) !== -1)
                    {
                        var gui = require('nw.gui'),
                            win = gui.Window.get();

                        win.reload();
                    }
                };

                // Keyup
                window.onkeyup = function(e)
                {
                    index = keys_down.indexOf(e.keyCode);

                    if(keys_down.indexOf(e.keyCode) !== -1)
                        keys_down.splice(index,1);
                };
            }
        }
    });
})(window);
