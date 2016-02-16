( function()
{
    'use strict';

    B.Components.Ambient = B.Core.Abstract.extend(
    {
        options : {},

        /**
         * CONSTRUCT
         */
        construct : function( options )
        {
            this._super( options );

            // Set up
            this.serial      = new B.Tools.Serial();
            this.data        = new B.Tools.Data();
            this.$.container = $( 'section.ambient' );

            // Init
            this.init_color_picker();
            this.init_list();
        },

        /**
         * INIT COLOR PICKER
         */
        init_color_picker : function()
        {
            var that = this;

            // Set up
            this.picker = new B.Components.Color_Picker( { target : this.$.container.find( '.picker' ) } );

            // Picker change start
            this.picker.on( 'change-start', function( hue, saturation, lightness )
            {
                that.interval = window.setInterval( function()
                {
                    var rgb     = that.picker.get_rgb(),
                        message =
                        {
                            action : 'ambient',
                            r      : rgb.r,
                            g      : rgb.g,
                            b      : rgb.b
                        };

                    that.serial.write( message );
                }, 200 );
            } );

            // Picker change finish
            this.picker.on( 'change-finish', function( hue, saturation, lightness )
            {
                window.clearInterval( that.interval );

                var rgb     = that.picker.get_rgb(),
                    message =
                    {
                        action : 'ambient',
                        r      : rgb.r,
                        g      : rgb.g,
                        b      : rgb.b
                    };

                that.serial.write( message );
            } );
        },

        /**
         * INIT LIST
         */
        init_list : function()
        {
            var that = this;

            // Set up
            this.list                   = { $ : {} };
            this.list.$.container       = this.$.container.find( '.list' );
            this.list.$.items_container = this.list.$.container.find( '.items' );
            this.list.$.add             = this.list.$.container.find( 'a.add' );
            this.list.$.remove          = this.list.$.container.find( 'a.remove' );
            this.list.data              = this.data.get( 'saved_colors' ) || [];
            this.list.mode              = 'default';

            if( this.list.data.length )
                this.add_color( this.list.data );

            // Add click event
            this.list.$.add.on( 'click', function()
            {
                // Set up
                var hsl_color = that.picker.get_hsl_object_format();

                // Save in list
                that.list.data.push( hsl_color );

                // Save
                that.update_saved_colors();

                // Add color
                that.add_color( hsl_color );

                return false;
            });

            // Remove click event
            this.list.$.remove.on( 'click', function()
            {
                // Default
                if( that.list.mode === 'default' )
                {
                    that.list.mode = 'remove';
                    that.list.$.remove.removeClass( 'btn-default' );
                    that.list.$.remove.addClass( 'btn-primary' );
                    that.list.$.container.addClass( 'remove' );
                }

                // Remove
                else
                {
                    that.list.mode = 'default';
                    that.list.$.remove.removeClass( 'btn-primary' );
                    that.list.$.remove.addClass( 'btn-default' );
                    that.list.$.container.removeClass( 'remove' );
                }

                return false;
            });
        },

        /**
         * UPDATE SAVED COLORS
         */
        update_saved_colors : function()
        {
            var serialize_colors = JSON.stringify( this.list.data );

            this.data.set( 'saved_colors', serialize_colors );
        },

        /**
         * ADD COLOR
         */
        add_color: function( value )
        {
            var that = this;

            // Force array
            if( !( value instanceof Array ) )
                value = [ value ];

            // Create element
            var item = null;

            for( var i = 0, len = value.length; i < len; i++ )
            {
                item = $( '<div class="item" data-value=\'' + JSON.stringify( value[ i ] ) + '\'><span class="glyphicon glyphicon-trash"></span></div>' );
                item.css( {
                    background : that.picker.get_hsl_css_format( value[ i ].hue,value[ i ].saturation, value[ i ].lightness )
                } );
                that.list.$.items_container.prepend( item );
            }

            // Items events
            this.list.$.items_container.find( '.item' ).off( 'click' ).on( 'click', function()
            {
                var $this = $( this );

                // Default
                if( that.mode === 'default' )
                {
                    var value   = $this.data( 'value' ),
                        rgb     = that.picker.get_rgb( value.hue, value.saturation, value.lightness ),
                        message =
                        {
                            action : 'ambient',
                            r      : rgb.r,
                            g      : rgb.g,
                            b      : rgb.b
                        };

                    that.picker.set( value );
                    that.serial.write( message );
                }

                // Remove
                else
                {
                    that.list.data.splice( that.list.data.length - 1 - $this.index(), 1 );

                    $this.off( 'click' );
                    $this.remove();

                    // End removing
                    if( that.list.data.length === 0 )
                    {
                        that.$.remove.trigger( 'click' );
                    }

                    // Save
                    that.update_saved_colors();
                }

                return false;
            });
        }
    } );
} )();
