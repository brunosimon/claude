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
            this.data     = new APP.TOOLS.Data();
            this.widgets  = options.widgets;

            $('body').append(this.template.render('header'));

            this.$.main              = $('header');
            this.$.name              = this.$.main.find('input.name');
            this.$.widgets_container = this.$.main.find('ul.widgets');

            // Widgets DOM
            var element = null;

            for(var type in this.widgets.types)
            {
                element = ['<li><a href="#" data-type="',type,'">',this.widgets.types[type].name,'</a></li>'].join('');
                this.$.widgets_container.append(element);
            }
            this.$.widgets = this.$.widgets_container.find('li a');

            this.init_events();
        },

        /**
         * START
         */
        start: function()
        {


        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            // Name
            this.$.name.on('focusout',function(e)
            {
                var val = that.$.name.val();
                that.data.set('name',val);
            });

            // Widgets
            this.$.widgets.on('click',function(e)
            {
                e.preventDefault();
                var $this = $(this),
                    type  = $this.data('type');

                that.widgets.add(type);
            });
        }
    });
})(window);
