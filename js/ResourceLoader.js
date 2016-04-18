function ResourceLoader(baseurl) {
  this.BASEURL = baseurl;
}
 
ResourceLoader.prototype.loadResource = function(resource, callback) {
  var self = this;
  evaluateScripts([resource], function(success) {
    if(success) {
      var resource = loadingTemplate.call(self);
      callback.call(self, resource);
    } else {
      var title = "Resource Loader Error",
          description = `Error loading resource '${resource}'. \n\n Try again later.`,
          alert = createAlert(title, description);
      navigationDocument.presentModal(alert);
    }
  }); 
}

ResourceLoader.prototype.loadVines = function(json,callback) {
  var self = this;
  var path = `${self.BASEURL}templates/RWDevConTemplate.xml.js`;
  evaluateScripts([path], function(success) {
    if(success) {
      var template = new Template(json,self.BASEURL);
      var resource = template.loadTemplate(Number(self.page));
      callback.call(self, resource);
    } else {
      var title = "Resource Loader Error",
          description = `Error loading vines. \n\n Try again later.`,
          alert = createAlert(title, description);
      navigationDocument.presentModal(alert);
    }
  });
}

ResourceLoader.prototype.getVinePops = function(page,paralel,callback) {
    this.page = page;
    paralel();
    var url = 'https://api.vineapp.com/timelines/popular?page=' + page;
    var jsonHTTP = new XMLHttpRequest();
    jsonHTTP.open('GET', url, true);
    
    jsonHTTP.onload = function(e) {
        if(jsonHTTP.readyState === 4) {
            if(jsonHTTP.status === 200) {
                callback(JSON.parse(jsonHTTP.responseText));
            } else {
                callback(null);
            }
        }
    };
    jsonHTTP.onerror = function(e) {
        callback(JSON.parse(null));  
    };
    
    jsonHTTP.send(null);
}