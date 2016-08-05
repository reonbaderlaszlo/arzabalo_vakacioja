(function() {

    var __extends = function(child, parent) {
        for (var key in parent) {
            if (Object.prototype.hasOwnProperty.call(parent, key))
                child[key] = parent[key];
        }

        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
    };

    window.Popup = (function() {

        var o;

        function Popup() {
            o = this;
        }

        Popup.prototype.open = function(popup, text, onClose) {
            if ($('.popup.' + popup).length) {
                $('.overlay').show();

                var top = $(window).height() / 2 + $(document).scrollTop() - $('.popup.' + popup).outerHeight() / 2;
                if (top < 0)
                    top = 5;
                $('.popup.' + popup).css('margin-top', top);

                if (text)
                    $('.popup.' + popup + ' p').html(text);

                $('.popup.' + popup + ' .close').unbind('click');

                if (onClose) {
                    if (typeof onClose === 'function') {
                        $('.popup.' + popup + ' .close').click(function(e) {
                            e.preventDefault();
                            onClose();
                        });
                    }
                } else {
                    $('.popup.' + popup + ' .close').click(function(e) {
                        e.preventDefault();
                        o.close(popup);
                    });
                }

                $('.popup.' + popup).fadeIn('fast');
            }
        };

        Popup.prototype.close = function(popup) {

            if (popup)
                $('.popup.' + popup).fadeOut('fast');
            else
                $('.popup').fadeOut('fast');
            $('.overlay').hide();
        };

        return Popup;

    })();

    window.FBHelper = (function() {

        var o, priv = {
            accessToken: null
        };

        function FBHelper() {
            o = this;
        }

        FBHelper.prototype.getAccessToken = function() {
            return priv.accessToken;
        };

        FBHelper.prototype.login = function(cb, scope) {
            if (priv.accessToken)
                return;
            FB.login(function() {
                FB.getLoginStatus(function(response) {
                    if (response.status == 'connected') {
                        priv.accessToken = response.authResponse.accessToken;
                        cb();
                    }
                });
            }, {
                scope: scope
            });
        };

        return FBHelper;

    })();

    window.Page = (function() {

        var o, priv = {};

        function Page() {
            o = this;
            priv.init();
        }

        Page.prototype.Popup = new Popup();
        Page.prototype.FBHelper = new FBHelper();

        priv.init = function() {
            var that = this;
        };

        return Page;

    })();

    window.Access = (function(_super) {

		__extends(Access, _super);

		var o, priv = {};

		function Access() {
			o = this;
			priv.init();
		}
		

		priv.test = function() {
			var that = this;
			
		};
		

		return Access;

	}) (Page);

})();