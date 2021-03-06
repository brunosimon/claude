( function()
{
    'use strict';

    B.Tools.Serial = B.Core.Event_Emitter.extend(
    {
        options :
        {
            logs : true
        },
        static : 'serial',

        /**
         * Construct
         */
        construct : function( options )
        {
            this._super( options );

            // Set up
            this.serial_port_handler = require( 'serialport' );
            this.serial_port         = null;
            this.connected           = false;
            this.data                = new B.Tools.Data();

            // Init
            this.connect_last_port();
        },

        /**
         * GET PORTS
         */
        get_ports : function( callback )
        {
            // Set up
            var that      = this,
                all_ports = [];

            // Test param
            if( typeof callback !== 'function' )
                return;

            // Get list callback
            this.serial_port_handler.list( function( error, ports )
            {
                // Each port
                ports.forEach( function( port )
                {
                    all_ports.push( port.comName );
                } );

                callback.apply( that, [ all_ports ] );
            } );
        },

        /**
         * CONNECT LAST PORT
         */
        connect_last_port : function(params)
        {
            var last_port = this.data.get( 'last_port' );

            if( last_port )
                this.open( last_port );
        },

        /**
         * Auto connect
         */
        auto_connect: function()
        {
            var that = this;

            // Disconnect
            if(this.connect)
                this.close();

            // List every ports
            this.serial_port_handler.list(function(error,ports)
            {
                // Each port
                ports.forEach(function(port)
                {
                    // Manufacturer match arduino
                    if(port.manufacturer.toLowerCase().indexOf('arduino') !== -1)
                    {
                        if(that.options.logs)
                            console.log('serial : arduino found on \'' + port.comName + '\'');

                        that.open(port.comName);
                    }
                });
            });

            return this;
        },

        /**
         * Open
         */
        open: function(communication_name)
        {
            if(this.options.logs)
                console.log('serial : try opening on \'' + communication_name + '\'');

            var that = this;

            // Initiate
            this.serial_port = new this.serial_port_handler.SerialPort(communication_name,{baudrate:9600});

            // Open event
            this.serial_port.on('open', function()
            {
                if(that.options.logs)
                    console.log('serial : connection opened');

                that.connected = true;

                // Save in data
                that.data.set( 'last_port', communication_name );

                // Receive data
                that.serial_port.on('data', function(data)
                {
                    if(that.options.logs)
                        console.log('serial : message received \'' + data + '\'');

                    // Trigger
                    that.trigger('message_received',[data]);
                });

                // Close
                that.serial_port.on('close', function()
                {
                    // Trigger
                    that.trigger('close',[data]);
                });

                // Trigger
                that.trigger('open',[communication_name]);
            });

            return this;
        },

        /**
         * Close
         */
        close: function()
        {
            if(!this.connected)
            {
                if(this.options.logs)
                    console.warn('serial : can\'t close, not connected');

                return this;
            }

            var that = this;

            // Receive data
            this.serial_port.close(function(data)
            {
                that.connected = false;

                if(that.options.logs)
                    console.log('serial : connection closed');

            });

            return this;
        },

        /**
         * Write
         */
        write: function(message)
        {
            var that = this;

            // Not connected
            if(!this.connected)
            {
                if(this.options.logs)
                    console.warn('serial : can\'t write, not connected');

                return this;
            }

            // Convert
            message = JSON.stringify(message);

            // Logs
            if(this.options.logs)
                console.log('serial : try writing message \'' + message + '\'');

            // Write message
            this.serial_port.write(message,function(error,results)
            {
                if(that.options.logs)
                {
                    if(error)
                        console.log('serial : message error',error);

                    else if(results === 1)
                        console.log('serial : message wrote');

                }
            });

            return this;
        }
    } );
} )();
