(function(window)
{
    "use strict";

    APP.COMPONENTS.Widgets = APP.CORE.Event_Emitter.extend(
    {
        options:
        {
            logs  : true,
            types : ['ambient','forecast','timer','alarm','gmail','twitter','sequences','friends']
        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.id_iterator = 1;
            this.types       = {};
            this.items       = [];

            // Instances list
            for(var i = 0, len = this.options.types.length, slug = null; i < len; i++)
            {
                slug = this.options.types[i];
                this.types[slug] = new APP.COMPONENTS[this.get_class_name(slug)]();
            }
        },

        /**
         * START
         */
        start: function()
        {
            return this;
        },

        /**
         * ADD
         */
        add: function(type)
        {
            // Errors
            if(this.options.types.indexOf(type) === -1)
            {
                // Log
                if(this.options.logs)
                    console.warn('widgets : type \'' + type + '\' doesn\'t exist');

                return false;
            }

            // Create widget
            var widget = new APP.COMPONENTS[this.get_class_name(type)]();
            widget.id  = this.id_iterator++;
            widget.start();
            this.items.push(widget);

            // Log
            if(this.options.logs)
                console.log('widgets : type \'' + type + '\' added');

            return widget;
        },

        /**
         * GET CLASS NAME
         */
        get_class_name: function(slug)
        {
            return slug.substr(0,1).toUpperCase() + slug.substr(1) + '_Widget';
        },

        /**
         * FIND BY ID
         */
        find_by_id: function(id)
        {
            var widget = null,
                i      = this.items.length;

            while(widget === null && i-- > 0)
            {
                if(this.items[i].id === id)
                    return this.items[i];
            }

            return false;
        }
    });
})(window);
