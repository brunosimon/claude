(function(window)
{
    "use strict";

    APP.COMPONENTS.Ambient_Widget = APP.COMPONENTS.Widget.extend(
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

            this.serial = new APP.TOOLS.Serial();
            this.mode   = 'default';
            this.name   = 'Ambient';
            this.slug   = 'ambient';

            // New
            if(typeof this.options.data === 'undefined')
            {
                this.data.list = [];
            }

            // Existing datas
            else
            {
                this.data.list = this.options.data.list;
            }
        },

        /**
         * START
         */
        start: function()
        {
            var that = this;

            // Elements
            this.$.main   = $('.widget-' + this.id);
            this.$.list   = this.$.main.find('.list');
            this.$.add    = this.$.main.find('a.add');
            this.$.remove = this.$.main.find('a.remove');

            // Picker
            this.picker = new APP.COMPONENTS.Color_Picker({container:'.widget-' + this.id + ' .picker'});
            this.picker.start();

            // List
            this.add_color(this.data.list);

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

            // Picker change finish
            this.picker.on('change-finish',function(hue,saturation,lightness)
            {
                that.serial.write(hue); // A tester
            });

            // Add click
            this.$.add.on('click',function()
            {
                // Add color
                that.add_color(that.picker.get_hsl_object_format());

                // Save in list
                that.data.list.push(that.picker.get_hsl_object_format());

                // Trigger
                that.trigger('needs-update');

                return false;
            });

            // Remove click
            this.$.remove.on('click',function()
            {
                // Default
                if(that.mode === 'default')
                {
                    that.mode = 'remove';
                    that.$.remove.removeClass('btn-default').addClass('btn-primary');
                    that.$.list.addClass('remove');
                }

                // Remove
                else
                {
                    that.mode = 'default';
                    that.$.remove.removeClass('btn-primary').addClass('btn-default');
                    that.$.list.removeClass('remove');
                }
                return false;
            });

            return this;
        },

        /**
         * ADD COLOR
         */
        add_color: function(value)
        {
            var that = this;

            // Force array
            if(!(value instanceof Array))
                value = [value];

            // Create element
            var item = null;

            for(var i = 0, len = value.length; i < len; i++)
            {
                item = $('<div class="item" data-value=\''+ JSON.stringify(value[i]) +'\'><span class="glyphicon glyphicon-trash"></span></div>');
                item.css({
                    background : that.picker.get_hsl_css_format(value[i].hue,value[i].saturation,value[i].lightness)
                });
                that.$.list.prepend(item);
            }


            // Items events
            this.$.list.find('.item').off('click').on('click',function()
            {
                var $this = $(this);

                // Default
                if(that.mode === 'default')
                {
                    var value = $this.data('value');

                    that.picker.set(value);
                    that.serial.write(value); // A tester
                }

                // Remove
                else
                {
                    that.data.list.splice(that.data.list.length - 1 - $this.index(),1);

                    $this.off('click');
                    $this.remove();

                    // End removing
                    if(that.data.list.length === 0)
                    {
                        that.$.remove.trigger('click');
                    }

                    // Trigger
                    that.trigger('needs-update');
                }

                return false;
            });

            return this;
        }
    });
})(window);
