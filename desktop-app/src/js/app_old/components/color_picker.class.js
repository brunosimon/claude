(function(window)
{
    "use strict";

    APP.COMPONENTS.Color_Picker = APP.CORE.Event_Emitter.extend(
    {
        options:
        {
            size      : 130,
            container : null,
            paths     :
            {
                images : 'src/img/color-picker/'
            }
        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.canvas      = null;
            this.context     = null;
            this.$.container = $(this.options.container);

            this.mouse_down = false;
            this.hue        = 0;
            this.saturation = 1;
            this.lightness  = 0.5;

            // Errors
            if(this.$.container.length === 0)
                console.warn('color picker : wrong container');
        },

        /**
         * START
         */
        start: function()
        {
            var that = this;

            this.create();
            this.init_events();

            // Hue image
            this.image = new Image();
            this.image.onload = function()
            {
                that.draw();

            };
            this.image.src = this.options.paths.images + 'hue.jpg';

            return this;
        },

        /**
         * CREATE
         */
        create: function()
        {
            var that = this;

            // Create elements
            this.canvas        = document.createElement('canvas');
            this.canvas.width  = this.options.size + 20 + 20 + 20 + 20 + 10;
            this.canvas.height = this.options.size;
            this.$.container.append(this.canvas);
            this.context = this.canvas.getContext('2d');

            // Offsets
            this.offsets = {};
            this.update_offsets();

            // CSS
            this.$.container.css({cursor:'pointer'});
        },

        /**
         * UPDATE OFFSETS
         */
        update_offsets: function()
        {
            this.offsets.x = this.$.container.offset().left;
            this.offsets.y = this.$.container.offset().top;
        },

        /**
         * SET
         */
        set: function(value)
        {
            // Errors
            if(typeof value === 'undefined')
                console.warn('color picker : Value undefined');
            else if(typeof value.hue === 'undefined')
                console.warn('color picker : Hue undefined');
            else if(typeof value.saturation === 'undefined')
                console.warn('color picker : Saturation undefined');
            else if(typeof value.lightness === 'undefined')
                console.warn('color picker : Lightness undefined');

            this.hue        = value.hue;
            this.saturation = value.saturation;
            this.lightness  = value.lightness;

            this.draw();
        },

        /**
         * DRAW
         */
        draw: function()
        {
            var that     = this,
                half     = Math.round(this.options.size / 2),
                radius   = null,
                gradient = null;

            // Clear
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

            // Hue circle
            this.context.globalCompositeOperation = 'source-over';
            this.context.beginPath();
            this.context.arc(half,half,half, Math.PI * 2, false);
            this.context.fill();

            // Hue Image
            this.context.globalCompositeOperation = 'source-in';
            this.context.drawImage(this.image,0,0,this.options.size,this.options.size);

            this.context.globalCompositeOperation = 'destination-out';
            radius = Math.round(this.options.size / 4);
            this.context.beginPath();
            this.context.arc(half,half,radius, Math.PI * 2, false);
            this.context.fill();

            // Hue cursor
            radius = (Math.round(this.options.size / 2) - Math.round(this.options.size / 4)) / 2;

            this.context.globalCompositeOperation = 'source-over';
            this.context.beginPath();
            this.context.arc(half + Math.sin(this.hue) * (half - radius),half + Math.cos(this.hue) * (half - radius),radius, Math.PI * 2, false);
            this.context.fillStyle = '#ffffff';
            this.context.fill();

            // Saturation
            gradient = this.context.createLinearGradient(0,0,0,this.options.size);
            gradient.addColorStop(0,this.get_hsl_css_format(this.hue,1,0.5));
            gradient.addColorStop(1,this.get_hsl_css_format(this.hue,0,0.5));

            this.context.fillStyle = gradient;
            this.context.fillRect(this.options.size + 20, 0, 20, this.options.size);

            // Lightness
            gradient = this.context.createLinearGradient(0,0,0,this.options.size);
            gradient.addColorStop(0,this.get_hsl_css_format(this.hue,1,1));
            gradient.addColorStop(0.1,this.get_hsl_css_format(this.hue,1,0.9));
            gradient.addColorStop(0.2,this.get_hsl_css_format(this.hue,1,0.8));
            gradient.addColorStop(0.3,this.get_hsl_css_format(this.hue,1,0.7));
            gradient.addColorStop(0.4,this.get_hsl_css_format(this.hue,1,0.6));
            gradient.addColorStop(0.5,this.get_hsl_css_format(this.hue,1,0.5));
            gradient.addColorStop(0.6,this.get_hsl_css_format(this.hue,1,0.4));
            gradient.addColorStop(0.7,this.get_hsl_css_format(this.hue,1,0.3));
            gradient.addColorStop(0.8,this.get_hsl_css_format(this.hue,1,0.2));
            gradient.addColorStop(0.9,this.get_hsl_css_format(this.hue,1,0.1));
            gradient.addColorStop(1,this.get_hsl_css_format(this.hue,1,0));

            this.context.fillStyle = gradient;
            this.context.fillRect(this.options.size + 60, 0, 20, this.options.size);

            // Saturation cursor
            this.context.fillStyle = '#ffffff';
            this.context.fillRect(this.options.size + 22, 2 + Math.round((1 - this.saturation) * (this.options.size - 14)), 16, 10);

            // Lightness cursor
            this.context.fillStyle = '#ffffff';
            this.context.fillRect(this.options.size + 62, 2 + Math.round((1 - this.lightness) * (this.options.size - 14)), 16, 10);

            // Color disk
            radius = Math.round(this.options.size / 5);
            this.context.beginPath();
            this.context.arc(half,half,radius,Math.PI * 2,false);
            this.context.fillStyle = this.get_hsl_css_format();
            this.context.fill();

        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that     = this,
                angle    = null,
                distance = null,
                mode     = null;

            // Mouse down canvas
            this.canvas.onmousedown = function(e)
            {
                that.update_offsets();

                that.mouse_down = true;

                if(e.clientX < that.options.size + that.offsets.x + 10)
                    mode = 'hue';
                else if(e.clientX < that.options.size + that.offsets.x + 10 + 20 + 20)
                    mode = 'saturation';
                else
                    mode = 'lightness';

                update(e.clientX,e.clientY);
                that.trigger('change-start',[that.hue,that.saturation,that.lightness]);

                return false;
            };

            // Mouse up canvas
            this.canvas.onmouseup = function()
            {
                that.mouse_down = false;
                mode            = null;
                that.trigger('change-finish',[that.hue,that.saturation,that.lightness])

                return false;
            };

            // Mouse move canvas
            this.canvas.onmousemove = function(e)
            {
                update(e.clientX,e.clientY);
                that.trigger('change-progress',[that.hue,that.saturation,that.lightness])

                return false;
            };

            // Update
            var update = function(x,y)
            {
                if(that.mouse_down)
                {
                    switch(mode)
                    {
                        case 'hue':
                            that.hue = Math.atan2((x - that.offsets.x) - that.options.size / 2, (y - that.offsets.y) - that.options.size / 2);
                            break;

                        case 'saturation':
                            that.saturation = 1 - ((y - that.offsets.y) /  that.options.size);

                            if(that.saturation < 0)
                                that.saturation = 0;
                            else if(that.saturation > 1)
                                that.saturation > 1;

                            break;

                        case 'lightness':
                            that.lightness = 1 - ((y - that.offsets.y) /  that.options.size);

                            if(that.lightness < 0)
                                that.lightness = 0;
                            else if(that.lightness > 1)
                                that.lightness > 1;

                            break;
                    }

                    that.draw();
                }
            };

            // Mouse out container
            this.$.container.on('mouseout',function()
            {
                if(that.mouse_down)
                {
                    that.mouse_down = false;
                    mode            = null;
                    that.trigger('change-finish',[that.hue,that.saturation,that.lightness])
                }
            });
        },

        /**
         * TO HSL CSS FORMAT
         */
        get_hsl_css_format: function(hue,saturation,lightness)
        {
            if(typeof hue === 'undefined')
                hue = this.hue;
            if(typeof saturation === 'undefined')
                saturation = this.saturation;
            if(typeof lightness === 'undefined')
                lightness = this.lightness;

            hue        = hue / (Math.PI * 2) * 380;
            saturation = Math.round(saturation * 100) + '%';
            lightness  = Math.round(lightness * 100) + '%';

            return ['hsl(', hue, ',', saturation, ',', lightness, ')'].join('');
        },

        /**
         * TO HSL OBJECT FORMAT
         */
        get_hsl_object_format: function(hue,saturation,lightness)
        {
            if(typeof hue === 'undefined')
                hue = this.hue;
            if(typeof saturation === 'undefined')
                saturation = this.saturation;
            if(typeof lightness === 'undefined')
                lightness = this.lightness;

            return {
                hue        : hue,
                saturation : saturation,
                lightness  : lightness
            };
        },

        /**
         * GET RGB
         */
        get_rgb: function(hue,saturation,lightness)
        {
            if(typeof hue === 'undefined')
                hue = this.hue;
            if(typeof saturation === 'undefined')
                saturation = this.saturation;
            if(typeof lightness === 'undefined')
                lightness = this.lightness;

            // Clamp hue between 0 and 1
            hue = (hue) / (Math.PI * 2);

            var r, g, b, q, p;

            if(saturation == 0)
            {
                r = g = b = lightness;
            }

            else
            {
                q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
                p = 2 * lightness - q;

                r = this.hue_to_rgb(p, q, hue + 1/3);
                g = this.hue_to_rgb(p, q, hue);
                b = this.hue_to_rgb(p, q, hue - 1/3);
            }

            return {
                r : Math.round(r * 255),
                g : Math.round(g * 255),
                b : Math.round(b * 255)
            };
        },

        hue_to_rgb: function(p, q, t)
        {
            if(t < 0)
                t += 1;

            if(t > 1)
                t -= 1;

            if(t < 1/6)
                return p + (q - p) * 6 * t;

            if(t < 1/2)
                return q;

            if(t < 2/3)
                return p + (q - p) * (2/3 - t) * 6;

            return p;
        }
    });
})(window);




