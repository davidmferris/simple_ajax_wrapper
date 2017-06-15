(function(context) {
  var request,
      AJAX;

  AJAX = function() {};

  /**
    * @param url - String
    * @returns Promise
  */
  AJAX.prototype.get = function(url) {
    return intializeRequest({
      method: 'GET',
      url: url
    });
  };

  /**
    * @param url - String
    * @param data - Object
    * @returns Promise
  */
  AJAX.prototype.post = function(url, data) {
    return intializeRequest({
      method: 'POST',
      url: url,
      data: data
    });
  };

  /**
    * @param url - String
    * @param data - Object
    * @returns Promise
  */
  AJAX.prototype.put = function(url, data) {
    return intializeRequest({
      method: 'PUT',
      url: url,
      data: data
    });
  }

  /**
    * @param url - String
    * @param data - Object
    * @returns Promise
  */
  AJAX.prototype.patch = function(url, data) {
    return intializeRequest({
      method: 'PATCH',
      url: url,
      data: data
    });
  }

  /**
    * @param url - String
    * @returns Promise
  */
  AJAX.prototype.delete = function(url) {
    return intializeRequest({
      method: 'DELETE',
      url: url
    });
  }

  // Private methods


  // Initiate the AJAX request
  function intializeRequest(options) {
    return new Promise(function(resolve, reject) {
      request = new XMLHttpRequest();

      request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status >= 200 || request.status < 300) {
            resolve(JSON.parse(request.responseText));
          } else {
            reject(request.responseText);
          }
        }
      };

      request.open(options.method, options.url);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      params = options.data ? formattedParams(options.data) : '';
      request.send(params);
    });
  }

  // Convert an object to string params
  function formattedParams(paramObject) {
    var str = '';

    for (var param in paramObject) {
      if (str !== '') {
        str += '&';
      }
      str += param + "=" + encodeURIComponent(paramObject[param]);
    }

    return str;
  };

  context.AJAX = new AJAX();
})(this);
