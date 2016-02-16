( function()
{
    'use strict';

    B.Components.Sequences = B.Core.Abstract.extend(
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
            this.$.container = $( 'section.sequences' );

            // Init
            this.init_speed_ratio();
            this.init_list();
        },

        /**
         * INIT SPEED RATIO
         */
        init_speed_ratio : function()
        {
            var that = this;

            // Set up
            this.speed_ratio             = { $ : {} };
            this.speed_ratio.$.container = this.$.container.find( '.speed-ratio' );
            this.speed_ratio.$.input     = this.speed_ratio.$.container.find( 'input' );
            this.speed_ratio.value       = this.data.get( 'last_speed_ratio' );

            // Update input
            if( this.speed_ratio.value )
            {
                this.speed_ratio.$.input.val( this.speed_ratio.value );
            }

            // Input change
            this.speed_ratio.$.input.on( 'change', function()
            {
                // Set up
                var value = parseFloat( that.speed_ratio.$.input.val() );

                // Value is different
                if( value !== that.speed_ratio.value )
                {
                    // Write
                    that.serial.write( { action : 'sequence', time_scale : value } );

                    // Save
                    that.speed_ratio.value = value;
                    that.data.set( 'last_speed_ratio', value );
                }
            } );
        },

        /**
         * INIT LIST
         */
        init_list : function()
        {
            var that = this;

            // Set up
            this.list             = { $ : {} };
            this.list.$.container = this.$.container.find( '.list' );
            this.list.$.items     = this.list.$.container.find( 'a.item' );

            // List item click
            this.list.$.items.on( 'click', function()
            {
                // Set up
                var $item       = $( this ),
                    sequence_id = $item.data( 'sequence-id' );

                // Send to Serial
                that.serial.write( { action : 'sequence', id : sequence_id } );

                // Prevent default
                return false;
            } );
        }
    } );
} )();
