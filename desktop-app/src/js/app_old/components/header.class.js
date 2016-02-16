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
            this.gui      = require('nw.gui');
            this.win      = this.gui.Window.get();

            APP.CONFIG.$.body.prepend(this.template.render('header'));

            this.$.main              = $('header.header');
            this.$.name              = this.$.main.find('input.name');
            this.$.widgets_container = this.$.main.find('ul.widgets');
            this.$.buttons           = {};
            this.$.buttons.container = this.$.main.find('.buttons');
            this.$.buttons.quit      = this.$.buttons.container.find('.quit');
            this.$.buttons.minimize  = this.$.buttons.container.find('.minimize');
            this.$.buttons.maximize  = this.$.buttons.container.find('.maximize');
            this.$.handle            = this.$.main.find('.handle');

            // Widgets DOM
            var element = null,
                widget  = null;

            for(var type in this.widgets.types)
            {
                widget  = this.widgets.types[type];

                if(!widget.unique)
                {
                    element = ['<li><a href="#" data-type="',type,'">',widget.name,'</a></li>'].join('');
                    this.$.widgets_container.append(element);
                }
            }
            this.$.widgets = this.$.widgets_container.find('li a');

            this.init_events();
        },

        /**
         * START
         */
        start: function()
        {
            this.$.name.val(this.data.get('name'));

            if(APP.CONFIG.debug)
                this.win.showDevTools();
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

            this.$.name.on('keydown',function(e)
            {
                if(e.keyCode === 13)
                {
                    that.$.name.blur();
                }
            });

            // Widgets
            this.$.widgets.on('click',function(e)
            {
                e.preventDefault();
                var $this = $(this),
                    type  = $this.data('type');

                that.widgets.add(type);
            });

            // Quit
            this.$.buttons.quit.on('click',function()
            {
                that.win.close();
            });

            // Reduce
            this.$.buttons.minimize.on('click',function()
            {
                that.win.minimize();
            });

            // Close
            this.$.buttons.maximize.on('click',function()
            {
                that.win.maximize();
            });

            // Handle

            var is_down = false,
                offset  = {};

            this.$.handle.on('mousedown',function(e)
            {
                is_down = true;

                offset.x = e.clientX;
                offset.y = e.clientY;

                var mouseup_function = function(e)
                {
                    is_down = false;

                    window.document.removeEventListener('mouseup',mouseup_function,false);
                    window.document.removeEventListener('mousemove',mousemove_function,false);
                };

                var mousemove_function = function(e)
                {
                    that.win.moveBy(e.clientX - offset.x,e.clientY - offset.y);
                };

                window.document.addEventListener('mouseup',mouseup_function,false);
                window.document.addEventListener('mousemove',mousemove_function,false);
            });
        }
    });
})(window);
