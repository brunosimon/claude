( function()
{
    'use strict';

    B.Tools.Data = B.Core.Event_Emitter.extend(
    {
        options : {},
        static  : 'data',

        /**
         * Construct
         */
        construct : function( options )
        {
            this._super( options );
        },

        /**
         * Clear
         */
        clear : function()
        {
            localStorage.clear();
        },

        /**
         * Get
         */
        get : function( key )
        {
            var value = localStorage.getItem(key);

            if( typeof value !== null )
            {
                if( /\[.*\]/.test(value) || /\{.*\}/.test( value ) )
                    value = JSON.parse( value );
            }

            return value;
        },

        /**
         * Set
         */
        set : function( key, value )
        {
            if( typeof value !== 'string' )
                value = JSON.stringify( value );

            localStorage.setItem( key, value );

            return this;
        }
    } );
} )();
