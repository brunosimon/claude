(function(window)
{
    "use strict";

    APP.COMPONENTS.Forecast_Widget = APP.COMPONENTS.Widget.extend(
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

            this.unique   = false;
            this.name     = 'Forecast';
            this.slug     = 'forecast';
            this.template = 'forecast';
        },

        /**
         * START
         */
        start: function()
        {
            this._super();

            this.$.city       = this.$.main.find('input.city');
            this.$.change     = this.$.main.find('a.change');
            this.$.popin      = {};
            this.$.popin.main = this.$.main.find('.modal');

            // Events
            this.init_events();

            return this;
        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            this.$.change.on('click',function()
            {
                that.$.popin.main.modal('show');

                return false;
            });
        }
    });
})(window);
