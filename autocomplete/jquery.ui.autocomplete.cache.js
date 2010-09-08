/*
* extension for jQuery UI 1.8 autocomplete which provides caching when using a
* remote data source.
*
* Copyright (c) 2010, Christopher Russell (http://github.com/crussell52/jquery-ui-extensions)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* MIT license: http://www.opensource.org/licenses/mit-license.php
* GPLv2 license: http://www.gnu.org/licenses/gpl-2.0.html
*
* Thanks to scottgonzalez for guidance and
* feedback during development.
*/
(function($) {
  /*
  * To use, set cache option to true.
  */
  var initSource = $.ui.autocomplete.prototype._initSource;
  $.ui.autocomplete.prototype._initSource = function() {
    var self = this;

    // if a string was specified for the source, it's assumed to be a
    // remote data url.  In this case, we want to use our own function
    // for handling it, rather than the anonymous function that the base
    // created for handling it.  This allows us to implement our caching
    // mechanism.
    if (this.options.cache && typeof this.options.source === "string") {
      var self = this,
          cache = {};

      self.source = function (request, response) {
        var term = request.term

        // before making the request, see if it's in our cache
        if (cache[term]) {
          response(cache[term]);
          return;
        }

        // record the most recent XHR instance so we know whether a given response belongs to the most recent request.
        self.xhr = $.getJSON(self.options.source, request, function(data, textStatus, xhr) {
                                                              cache[term] = data;

                                                              // only pass the data on for display if we are handling the active request
                                                              if (self.xhr === xhr) {
                                                                response(data);
                                                              }
                                                            });
      };
    }
    else {
      initSource.apply(this, arguments);
    }
  };
})(jQuery);