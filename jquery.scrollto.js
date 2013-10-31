/**
 * @author Thomas <thansen@solire.fr>
 * @licence Solire <http://www.solire.fr>
 */
(function($){
    $.fn.scrollto = function(givenParams){
        var defaultParams = {
                speed   : function(dst){
                    return dst;
                },
//                speed   : 'slow',
                indent  : 0,
                after   : function(){}
            },
            isWebkit = /webkit/.test(navigator.userAgent.toLowerCase()),
            container = isWebkit ? 'body' : 'html',
            params = $.extend({}, defaultParams, givenParams),
            base = this,
            where = $(base).offset().top + params.indent,
            distance = Math.abs($(container).scrollTop() - where),
            speed;

        function isFunc(func){
            return $.isFunction(func);
        };

        if (isFunc(params.speed)) {
            speed = params.speed.call(this, distance);
        } else {
            speed = params.speed;
        }

        $(container).animate(
            {
                scrollTop : $(base).offset().top + params.indent
            },
            speed,
            function(){
                params.after.call(this, base);
            }
        );

        return base;
    };
})(jQuery);
