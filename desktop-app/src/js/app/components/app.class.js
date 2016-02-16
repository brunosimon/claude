( function()
{
    'use strict';

    B.Components.App = B.Core.Abstract.extend(
    {
        options :
        {
            debug : true
        },

        /**
         * CONSTRUCT
         */
        construct : function( options )
        {
            this._super( options );

            // Set up
            this.gui        = require( 'nw.gui' );
            this.win        = this.gui.Window.get();
            this.header     = new B.Components.Header();
            this.sequences  = new B.Components.Sequences();
            this.connection = new B.Components.Connection();
            this.ambient    = new B.Components.Ambient();
            this.registry   = new B.Tools.Registry();
            this.keyboard   = new B.Tools.Keyboard();
            this.serial     = new B.Tools.Serial();

            this.registry.set( 'debug', this.options.debug );

            // Debug
            if( this.options.debug )
                this.win.showDevTools();

            // Init
            this.init_shortcuts();
        },

        /**
         * INIT SHORTCUTS
         */
        init_shortcuts : function()
        {
            var that = this;

            this.keyboard.on( 'down', function()
            {
                // Dev tools
                if( that.keyboard.are_down( [ 'cmd', 'alt', 'i' ] ) )
                {
                    that.win.showDevTools();
                    that.keyboard.downs = [];
                }

                // Refresh
                if( that.keyboard.are_down( [ 'cmd', 'r' ] ) )
                {
                    that.win.reloadDev();
                    that.keyboard.downs = [];
                }
            } );
        }
    } );
} )();
