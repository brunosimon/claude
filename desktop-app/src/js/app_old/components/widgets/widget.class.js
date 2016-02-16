(function(window)
{
    "use strict";

    APP.COMPONENTS.Widget = APP.CORE.Event_Emitter.extend(
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

            this.unique   = true;
            this.name     = 'Widget';
            this.slug     = 'widget';
            this.template = 'widget';
            this.id       = 0;
            this.data     = {};
        },

        /**
         * START
         */
        start: function()
        {
            var that = this;

            this.$.main  = $('.widget-' + this.id);
            this.$.close = this.$.main.find('a.close');

            if(this.$.close.length)
            {
                this.$.close.on('click',function()
                {
                    that.trigga('needs-remove',[that.id]);

                    return false;
                });
            }
        },

        /**
         * GET TEMPLATE
         */
        get_template: function()
        {
            var template = new APP.TOOLS.Template();

            return template.render('widgets/' + this.template,{id:this.id,slug:this.slug,name:this.name});
        },

        /**
         * SERIALIZE
         */
        serialize: function()
        {
            var datas = {};

            datas.name = this.name;
            datas.slug = this.slug;
            datas.id   = this.id;
            datas.data = this.data;

            return datas;
        }
    });
})(window);
