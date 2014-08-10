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

            this.unique = true;
            this.name   = 'Widget';
            this.slug   = 'widget';
            this.id     = 0;
            this.data   = {};
        },

        /**
         * START
         */
        start: function()
        {

        },

        /**
         * GET TEMPLATE
         */
        get_template: function()
        {
            var template = new APP.TOOLS.Template();

            return template.render('widgets/' + this.slug,{id:this.id,slug:this.slug,name:this.name});
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
