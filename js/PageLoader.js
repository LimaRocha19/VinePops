function PageLoader(baseURL) {
    this.BASEURL = baseURL;
}

PageLoader.prototype.loadVinePage = function(page,errorDoc) {
  var self = this;
    
  var javascriptFiles = [
    `${self.BASEURL}js/ResourceLoader.js`, 
    `${self.BASEURL}js/presenter.js`
  ];
 
  evaluateScripts(javascriptFiles, function(success) {
    if(success) {
      var resourceLoader = new ResourceLoader(self.BASEURL);
      resourceLoader.getVinePops(page, function() {
        resourceLoader.loadResource(`${self.BASEURL}templates/LoadingScreenTemplate.xml.js`, function(resource) {
            var doc = Presenter.makeDocument(resource);
            Presenter.pushDocument(doc);
        });
      }, function(response) {
          if(response) {
              resourceLoader.loadVines(response, function(resource) {
                var doc = Presenter.makeDocument(resource);
                url = self.BASEURL;
                doc.addEventListener("select", Presenter.load.bind(Presenter));
                Presenter.pushDocument(doc);
              });
          }
      });
    } else {
      var error = {
          type: "Evaluate Scripts Error",
          message:  "Error attempting to evaluate external JavaScript files."
      }
      errorDoc(error);
    }
  });
}