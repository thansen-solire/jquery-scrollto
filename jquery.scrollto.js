/*!
 * @author Thomas <thansen@solire.fr>
 * @licence CC BY-NC 4.0 http://creativecommons.org/licenses/by-nc/4.0/
 */
(function($){
    $.fn.scrollto = function(givenParams){
        var defaultParams = {
                speed   : function(dst){
                    return dst;
                },
                indent  : 0,
                after   : function(){}
            },
            isWebkit = /webkit/.test(navigator.userAgent.toLowerCase()),
            container,
            params = $.extend({}, defaultParams, givenParams),
            base = this,
//            where = $(base).offset().top + params.indent,
            distance,
            speed,
            scrollTop;

        if ('container' in params) {
            container = params.container;
            scrollTop = $(container).scrollTop() + $(base).position().top + params.indent;
        } else {
            container = isWebkit ? 'body' : 'html';
            scrollTop = $(base).offset().top + params.indent;
        }

        distance = Math.abs($(container).scrollTop() - scrollTop);

        if ($.isFunction(params.speed)) {
            speed = params.speed.call(this, distance);
        } else {
            speed = params.speed;
        }

        $(container).animate(
            {
                scrollTop : scrollTop
            },
            speed,
            function(){
                params.after.call(this, base);
            }
        );

        return base;
    };
})(jQuery);
