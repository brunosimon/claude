var fs = require('fs');

(function(window)
{
    "use strict";

    APP.TOOLS.Template = APP.CORE.Abstract.extend(
    {
        options:
        {
            logs      : true,
            path      : 'templates/',
            extension : '.html',
        },

        /**
         * SINGLETON
         */
        static_instantiate: function()
        {
            if(APP.TOOLS.Template.instance === null)
                return null;
            else
                return APP.TOOLS.Template.instance;
        },

        /**
         * INIT
         */
        init: function(options)
        {
            APP.TOOLS.Template.prototype.instance = this;

            this._super(options);
        },

        /**
         * GET TEMPLATE
         */
        get_template: function(path)
        {
            // Async test if file exists
            var file_exists = fs.existsSync(path);

            if(!file_exists)
            {
                if(this.options.logs)
                    console.warn('template : file doesn\'t exists '+path)

                return false;
            }

            // Async read file
            return fs.readFileSync(path,'utf8');
        },

        /**
         * RENDER
         */
        render: function(template,values)
        {
            var path     = this.options.path + template + this.options.extension,
                template = this.get_template(path);

            if(!template)
                return false;

            return Mustache.render(template,values);
        }
    });
})(window);

