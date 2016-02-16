( function()
{
    'use strict';

    B.Components.Header = B.Core.Abstract.extend(
    {
        options : {},

        /**
         * CONSTRUCT
         */
        construct : function( options )
        {
            this._super( options );

            // Set up
            this.gui    = require( 'nw.gui' );
            this.win    = this.gui.Window.get();
            this.$.main = $( 'header.header' );

            // Init
            this.init_buttons();
            this.init_handle();
        },

        /**
         * INIT BUTTONS
         */
        init_buttons : function()
        {
            var that = this;

            // Set up
            this.buttons             = { $ : {} };
            this.buttons.$.container = this.$.main.find( '.buttons' );
            this.buttons.$.quit      = this.buttons.$.container.find( '.quit' );
            this.buttons.$.minimize  = this.buttons.$.container.find( '.minimize' );
            this.buttons.$.maximize  = this.buttons.$.container.find( '.maximize' );

            // Quit click
            this.buttons.$.quit.on( 'click', function()
            {
                that.win.close();
            } );

            // Reduce click
            this.buttons.$.minimize.on( 'click', function()
            {
                that.win.minimize();
            } );

            // Close click
            this.buttons.$.maximize.on( 'click', function()
            {
                that.win.maximize();
            } );
        },

        /**
         * INIT HANDLE
         */
        init_handle : function()
        {
            var that = this;

            // Set up
            this.handle             = { $ : {} };
            this.handle.$.container = this.$.main.find( '.handle' );
            this.handle.is_down     = false;
            this.handle.offset      = {};

            // Mouse down event
            this.handle.$.container.on( 'mousedown', function( e )
            {
                that.handle.is_down = true;

                that.handle.offset.x = e.clientX;
                that.handle.offset.y = e.clientY;

                var mouseup_function = function( e )
                {
                    that.handle.is_down = false;

                    window.document.removeEventListener( 'mouseup', mouseup_function, false );
                    window.document.removeEventListener( 'mousemove', mousemove_function, false );
                };

                var mousemove_function = function( e )
                {
                    that.win.moveBy( e.clientX - that.handle.offset.x, e.clientY - that.handle.offset.y );
                };

                window.document.addEventListener( 'mouseup', mouseup_function, false );
                window.document.addEventListener( 'mousemove', mousemove_function, false );
            } );
        }
    } );
} )();
