var Presenter = {
    // 1
    makeDocument: function (resource) {
        if (!Presenter.parser) {
            Presenter.parser = new DOMParser();
        }
        var doc = Presenter.parser.parseFromString(resource, "application/xml");
        return doc;
    }, // 2
    modalDialogPresenter: function (xml) {
        navigationDocument.presentModal(xml);
    },

    // 3
    pushDocument: function (xml) {
        navigationDocument.pushDocument(xml);
    },

    replaceDocument: function (xmlToGo, xmlToCome) {
        navigationDocument.replaceDocument(xmlToGo, xmlToCome);
    },

    load: function (event, callback) {
        var self = this
            , ele = event.target
            , videoURL = ele.getAttribute("videoURL")
            , action = ele.getAttribute("action")
            , page = ele.getAttribute("page")

        if (videoURL) {
            var player = new Player();
            var playlist = new Playlist();
            var mediaItem = new MediaItem("video", videoURL);

            player.playlist = playlist;
            player.playlist.push(mediaItem);
            player.present();
        } else if (action) {
            page = Number(page);
            if (action === "next") {
                if (!(page === 5)) {
                    page += 1;
                } else {
                    return;
                }
            } else {
                if (!(page === 1)) {
                    page -= 1;
                } else {
                    return;
                }
            }
            var resourceLoader = new ResourceLoader(url);
            resourceLoader.getVinePops(page, function () {
                resourceLoader.loadResource(`${url}templates/LoadingScreenTemplate.xml.js`, function (resource) {
                    var doc = Presenter.makeDocument(resource);
                    navigationDocument.clear();
                    Presenter.pushDocument(doc);
                });
            }, function (response) {
                if (response) {
                    resourceLoader.loadVines(response, function (resource) {
                        var doc = Presenter.makeDocument(resource);
                        var document = navigationDocument.documents[navigationDocument.documents.length - 1];
                        doc.addEventListener("select", Presenter.load.bind(Presenter));
                        navigationDocument.clear();
                        Presenter.pushDocument(doc);
                    });
                }
            });
        }
    }
, }

var url;