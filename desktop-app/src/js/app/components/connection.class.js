( function()
{
    'use strict';

    B.Components.Connection = B.Core.Abstract.extend(
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
            this.$.container = $( 'section.connection' );

            // Init
            this.init_ports();
            this.init_checkbox();
            // this.init_close_button();
        },

        /**
         * INIT PORTS
         */
        init_ports : function()
        {
            var that = this;

            // Set up
            this.ports             = { $ : {} };
            this.ports.$.container = this.$.container.find( '.ports' );
            this.ports.$.select    = this.ports.$.container.find( 'select' );

            // Populate
            this.serial.get_ports( function( ports )
            {
                // Each port
                ports.forEach( function( port )
                {
                    // Set up
                    var $option = $( '<option>' );

                    $option.val( port );
                    $option.text( port );

                    that.ports.$.select.append( $option );
                } );
            } );

            // Input change
            this.ports.$.select.on( 'change', function()
            {
                // Set up
                var value = that.ports.$.select.val();

                that.serial.open( value );
            } );

            // Serial open event
            this.serial.on( 'open', function( port )
            {
                that.ports.$.select.val( port );
            } );
        },

        /**
         * INIT CHECKBOX
         */
        init_checkbox : function()
        {
            var that = this;

            // Set up
            this.checkbox             = { $ : {} };
            this.checkbox.$.container = this.$.container.find( '.checkbox' );
            this.checkbox.$.input     = this.checkbox.$.container.find( 'input' );

            // Serial open event
            this.serial.on( 'open', function( port )
            {
                that.checkbox.$.input.attr( 'checked', 'checked' );
            } );

            // Serial open event
            this.serial.on( 'close', function( port )
            {
                that.checkbox.$.input.removeAttr( 'checked' );
            } );
        },

        /**
         * INIT CLOSE BUTTON
         */
        init_close_button : function()
        {
            var that = this;

            // Set up
            this.close_button             = { $ : {} };
            this.close_button.$.container = this.$.container.find( '.close-button' );
            this.close_button.$.button    = this.close_button.$.container.find( 'button' );

            // Serial open event
            this.serial.on( 'open', function( port )
            {
                that.close_button.$.button.removeAttr( 'disabled' );
            } );

            // Serial open event
            this.serial.on( 'close', function( port )
            {
                that.close_button.$.button.attr( 'disabled', 'disabled' );
            } );

            // Close button click event
            this.close_button.$.button.on( 'click', function()
            {
                that.serial.close();

                return false;
            } );
        }
    } );
} )();
