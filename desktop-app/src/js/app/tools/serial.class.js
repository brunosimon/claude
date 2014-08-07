var serialport = require('serialport');

(function(window)
{
    "use strict";

    APP.TOOLS.Serial = APP.CORE.Event_Emitter.extend(
    {
        options:
        {
            logs : false
        },

        /**
         * SINGLETON
         */
        static_instantiate: function()
        {
            if(APP.TOOLS.Serial.instance === null)
                return null;
            else
                return APP.TOOLS.Serial.instance;
        },

        /**
         * INIT
         */
        init: function(options)
        {
            APP.TOOLS.Serial.prototype.instance = this;

            this._super(options);

            this.serialPort = null;
            this.connected  = false;
        },

        /**
         * START
         */
        start: function()
        {
            this.auto_open();

            return this;
        },

        /**
         * AUTO OPEN
         */
        auto_open: function()
        {
            var that = this;

            // Disconnect
            if(this.connect)
                this.close();

            // List every ports
            serialport.list(function(error,ports)
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
         * OPEN
         */
        open: function(communication_name)
        {
            if(this.options.logs)
                console.log('serial : try opening on \'' + communication_name + '\'');

            var that = this;

            // Initiate
            that.serial_port = new serialport.SerialPort(communication_name,{baudrate:9600});

            // Open event
            that.serial_port.on('open', function()
            {
                if(that.options.logs)
                    console.log('serial : connection opened');

                that.connected = true;

                // Receive data
                that.serial_port.on('data', function(data)
                {
                    if(that.options.logs)
                        console.log('serial : message received \'' + data + '\'');

                    that.trigger('message_received',[data]);
                });
            });

            return this;
        },

        /**
         * CLOSE
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
         * WRITE
         */
        write: function(message)
        {
            // Not connected
            if(!this.connected)
            {
                if(this.options.logs)
                    console.warn('serial : can\'t write, not connected');

                return this;
            }

            var that = this;

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
    });
})(window);
