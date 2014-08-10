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

            this.data        = new APP.TOOLS.Data();
            this.template    = new APP.TOOLS.Template();
            this.id_iterator = 1;
            this.types       = {};
            this.items       = [];

            APP.CONFIG.$.body.prepend(this.template.render('widgets/widgets'));

            this.$.container = $('section.widgets');

            // Instances list
            for(var i = 0, len = this.options.types.length, slug = null; i < len; i++)
            {
                slug = this.options.types[i];
                this.types[slug] = new APP.COMPONENTS[this.get_class_name(slug)]();
            }

            // From save
            var widgets = this.data.get('widgets'),
                widget  = null;

            if(widgets !== null)
            {
                for(var i = 0, len = widgets.length; i < len; i++)
                {
                    widget = widgets[i];
                    this.add(widget.slug,widget.data);
                }
            }

            // Create defaults if not exist (duplicates auto prevented if unique)
            this.add('ambient');
            this.add('sequences');
            this.add('friends');
        },

        /**
         * START
         */
        start: function()
        {
            return this;
        },

        /**
         * SAVE
         */
        save: function()
        {
            var datas = [];

            for(var i = 0, len = this.items.length; i < len; i++)
                datas.push(this.items[i].serialize());

            this.data.set('widgets',datas);

            return this;
        },

        /**
         * ADD
         */
        add: function(type,data)
        {
            var that = this;

            // Errors
            if(this.options.types.indexOf(type) === -1)
            {
                // Log
                if(this.options.logs)
                    console.warn('widgets : type \'' + type + '\' doesn\'t exist');

                return false;
            }

            // Prevent duplicates
            if(this.types[type].unique)
            {
                var widgets = this.find_by_type(type);
                if(widgets.length)
                {
                    console.log('false');
                    return false;
                }
            }

            // Create widget
            var widget = new APP.COMPONENTS[this.get_class_name(type)]({
                data : data
            });
            widget.id  = this.id_iterator++;
            this.items.push(widget);

            // Add template
            this.$.container.append(widget.get_template());

            // Events
            widget.on('needs-update',function()
            {
                // Save all widgets
                that.save();
            });

            // Start
            widget.start();

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
        },

        /**
         * FIND BY TYPE
         */
        find_by_type: function(type)
        {
            var widgets = [],
                i       = this.items.length;

            while(i-- > 0)
            {
                if(this.items[i].slug === type)
                    widgets.push(this.items[i]);
            }

            return widgets;
        }
    });
})(window);
