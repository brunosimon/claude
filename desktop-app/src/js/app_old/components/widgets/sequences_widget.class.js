(function(window)
{
    "use strict";

    APP.COMPONENTS.Sequences_Widget = APP.COMPONENTS.Widget.extend(
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

            this.serial   = new APP.TOOLS.Serial();
            this.name     = 'Sequences';
            this.slug     = 'sequences';
            this.template = 'sequences';
            this.list     =
            [
                {
                    name : 'Warning',
                    id   : 2
                },
                {
                    name : 'Snake',
                    id   : 3
                },
                {
                    name : 'k2000',
                    id   : 4
                },
                {
                    name : 'Rainbow',
                    id   : 5
                },
                {
                    name : 'Fire',
                    id   : 6
                },
                {
                    name : 'Ocean',
                    id   : 7
                },
                {
                    name : 'Glamor',
                    id   : 8
                },
                {
                    name : 'Every Colors',
                    id   : 9
                },
                {
                    name : 'Thunder',
                    id   : 10
                },
            ];

            // New
            if(typeof this.options.data === 'undefined')
            {
                this.data.favorites = [];
            }

            // Existing datas
            else
            {
                this.data.favorites = this.options.data.favorites;
            }
        },

        /**
         * START
         */
        start: function()
        {
            this._super();

            // Elements
            this.$.favorites = this.$.main.find('table.favorites');
            this.$.defaults  = this.$.main.find('table.defaults');
            this.$.items     = null;

            var element  = null,
                sequence = null;

            // Create DOM
            for(var i = 0, len = this.list.length; i < len; i++)
            {
                sequence = this.list[i];

                // Favorite
                element = $(['<tr class="sequence favorite sequence-',sequence.id,'" data-id="',sequence.id,'"><td class="name">',sequence.name,'</td><td class="icon"><span class="glyphicon glyphicon-heart"></span></td></tr>'].join(''));
                if(this.data.favorites.indexOf(sequence.id) === -1)
                    element.hide();
                this.$.favorites.append(element);

                // Default
                element = $(['<tr class="sequence default sequence-',sequence.id,'" data-id="',sequence.id,'"><td class="name">',sequence.name,'</td><td class="icon"><span class="glyphicon glyphicon-heart-empty"></span></td></tr>'].join(''));
                if(this.data.favorites.indexOf(sequence.id) !== -1)
                    element.hide();
                this.$.defaults.append(element);
            }

            this.$.items = this.$.main.find('tr.sequence');

            this.update_dom()
                .init_events();

            return this;
        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            // Sequences click
            this.$.items.find('.name,.icon').on('click',function(e)
            {
                e.preventDefault();

                var $this     = $(this),
                    $sequence = $this.parent(),
                    id        = $sequence.data('id');

                // Name click
                if($this.hasClass('name'))
                {
                    that.serial.write({action:'sequence',id:id});
                }

                // Favorite icon click
                else if($this.hasClass('icon'))
                {
                    $sequence.hide();

                    // Remove from favorites
                    if($sequence.hasClass('favorite'))
                    {
                        // Update datas
                        if(that.data.favorites.indexOf(id) !== -1)
                            that.data.favorites.splice(that.data.favorites.indexOf(id),1);

                        that.$.items.filter('.default.sequence-' + id).show();
                    }

                    // Add to favorites
                    else
                    {
                        // Update datas
                        if(that.data.favorites.indexOf(id) === -1)
                            that.data.favorites.push(id);

                        that.$.items.filter('.favorite.sequence-' + id).show();
                    }

                    that.update_dom();

                    // Trigger
                    that.trigger('needs-update');
                }

                return false;
            });

            return this;
        },

        /**
         * UPDATE DOM
         */
        update_dom: function()
        {
            var that = this;

            if(this.data.favorites.length === 0)
                this.$.main.find('th').add(this.$.favorites).hide();
            else if(this.data.favorites.length === this.list.length)
                this.$.main.find('th').add(this.$.defaults).hide();
            else
                this.$.main.find('th').add(this.$.favorites).add(this.$.defaults).show();

            return this;
        }
    });
})(window);
