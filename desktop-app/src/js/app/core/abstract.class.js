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

            this.options = _.defaults(options,this.options);
        },

        start: function()
        {

        }
    });
})(window);
