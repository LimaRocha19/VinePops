App.onLaunch = function(options) {
  var javascriptFiles = [
    `${options.BASEURL}js/PageLoader.js`
  ];
  evaluateScripts(javascriptFiles, function(success) {
     if(success) {
         var pageLoader = new PageLoader(options.BASEURL);
         pageLoader.loadVinePage("1", function(error) {
            var alert = createAlert(error.type,error.message);
            navigationDocument.presentModal(alert);
         });
     } else {
         var title = "Evaluation Error",
             description = `Error evaluating scripts.\nTry again later.`
         var alert = createAlert(title, description);
         navigationDocument.presentModal(alert);
     }
  });
}

var createAlert = function (title, description) {

    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <alertTemplate>
                <title>${title}</title>
                <description>${description}</description>
                <button>
                <text>OK</text>
                </button>
                <button>
                <text>CANCEL</text>
                </button>
            </alertTemplate>
        </document>`

    var parser = new DOMParser();

    var alertDoc = parser.parseFromString(alertString, "application/xml");

    return alertDoc
}