(function(window)
{
    'use strict';

    APP.CORE.Abstract = Class.extend(
    {
        options: {},

        init: function(options)
        {
            if(typeof options === 'undefined')
                options = {};

            this.$ = {};

            this.options = merge(this.options,options);
        },

        start: function()
        {

        },

        destroy: function()
        {

        }
    });
})(window);
