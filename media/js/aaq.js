/*
 * Prepopulate system info in AAQ form
 */

(function($) {

"use strict";

function AAQSystemInfo($form) {
    AAQSystemInfo.prototype.init.call(this, $form);
}

AAQSystemInfo.prototype = {
    init: function($form) {
        var self = this,
            $input = $form.find('input[name="os"]');

        // Autofill in the info we can get via js
        if(!$input.val()) {
            $input.val(self.getOS());
        }

        if((BrowserDetect.browser === 'fx' && self.isDesktopFF()) ||
           (BrowserDetect.browser === 'm' && self.isMobileFF())) {
            $form.find('input[name="useragent"]').val(navigator.userAgent);

            $input = $form.find('input[name="ff_version"]')
            if(!$input.val()) {
                $input.val(self.getFirefoxVersion());
            }
            $input = $form.find('textarea[name="plugins"]');
            if(!$input.val()) {
                $input.val(self.getPlugins());
            }
        }
    },
    getOS: function() {
        // Returns a string representing the user's operating system
        var os = [
                ['Android', /Android/i],
                ['Maemo', /Maemo/i],
                ['Windows 3.11', /Win16/i],
                ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/i],
                ['Windows 98', /(Windows 98)|(Win98)/i],
                ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/i],
                ['Windows XP', /(Windows NT 5.1)|(Windows XP)/i],
                ['Windows Server 2003', /(Windows NT 5.2)/i],
                ['Windows Vista', /(Windows NT 6.0)/i],
                ['Windows 7', /(Windows NT 6.1)/i],
                ['Windows NT 4.0', /(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)/i],
                ['Windows ME', /Windows ME/i],
                ['Windows', /Windows/i],
                ['OpenBSD', /OpenBSD/i],
                ['SunOS', /SunOS/i],
                ['Linux', /(Linux)|(X11)/i],
                ['Mac OS X 10.4', /(Mac OS X 10.4)/i],
                ['Mac OS X 10.5', /(Mac OS X 10.5)/i],
                ['Mac OS X 10.6', /(Mac OS X 10.6)/i],
                ['Mac OS', /(Mac_PowerPC)|(Macintosh)/i],
                ['QNX', /QNX/i],
                ['BeOS', /BeOS/i],
                ['OS/2', /OS\/2/i],
            ],
            ua = navigator.userAgent;
        for (var i=0, l=os.length; i<l; i++) {
            if (os[i][1].test(ua)) {
                return os[i][0];
            }
        }
        return navigator.oscpu || '';
    },
    getPlugins: function() {
        // Returns wiki markup for the list of plugins
        var plugins = [];
        for (var i = 0; i < navigator.plugins.length; i++) {
            var d = navigator.plugins[i].description.replace(/<[^>]+>/ig,'');
            if (plugins.indexOf(d) == -1) {
                plugins.push(d);
            }
        }
        if (plugins.length > 0) {
            plugins = "* " + plugins.join("\n* ");
        } else {
            plugins = "";
        }
        return plugins;
    },
    getFirefoxVersion: function() {
        // Returns a string with the version of Firefox
        var version = /Firefox\/(\S+)/i.exec(navigator.userAgent);
        if (version) {
            return version[1];
        } else {
            // Minefield pre-betas (nightlies)
            version = /Minefield\/(\S+)/i.exec(navigator.userAgent);
            if (version) {
                return version[1];
            }
        }
        return '';
    },
    isDesktopFF: function() {
        // Is the question for FF on the desktop?
        return document.location.search.indexOf('product=desktop') >= 0 ||
               document.location.search.indexOf('product=beta') >= 0;
    },
    isMobileFF: function() {
        // Is the question for FF on mobile?
        return document.location.search.indexOf('product=mobile') >= 0;
    }
};

window.AAQSystemInfo = AAQSystemInfo;

})(jQuery);