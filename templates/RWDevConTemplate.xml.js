function Template(json, baseurl) {
    this.json = json;
    this.BASEURL = baseurl;
}

Template.prototype.loadTemplate = function (currentPage) {

    var records = this.json.data["records"];

    var doc = `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
      .lightBackgroundColor {
        background-color: #F2B35D;
      }
    </style>
  </head>
  <stackTemplate theme="light" class="clearBackgroundColor" >
    <identityBanner>
      <background>
 <img src="${this.BASEURL}images/popular-header.png" width="1920" height="500" />
      </background>
      <title></title>
      <row>
        <buttonLockup action = "previous" page = "${currentPage}">
            <badge src="${this.BASEURL}images/previous.png" width="50" height="50" />
        </buttonLockup>
        <buttonLockup action = "next" page = "${currentPage}">
            <badge src="${this.BASEURL}images/next.png" width="50" height="50" />
        </buttonLockup>
      </row>
    </identityBanner>
    <collectionList>
    <style>
      .lightBackgroundColor {
        background-color: #FFFFFF;
      }
    </style>
      <shelf>
        <section>`;

    for (record in records) {
        if (Number(record) < 9) {
            var data = records[record];
            doc += `<lockup videoURL="${data["videoDashUrl"]}">
		              <img src="${data["thumbnailUrl"]}" width="300" height="300" />
                      <title style="tv-text-style: none; font-size:30; font-weight:regular; color: rgb(50,50,50)"> ${data["username"]}</title>
		        </lockup>`;
        }

    }

    doc += `</section>
      </shelf>
<shelf>
        <section>`;

    for (record in records) {
        if (Number(record) >= 9) {
            var data = records[record];
            doc += `<lockup videoURL="${data["videoDashUrl"]}">
		              <img src="${data["thumbnailUrl"]}" width="300" height="300" />
                      <title style="tv-text-style: none; font-size:30; font-weight:regular; color: rgb(50,50,50)"> ${data["username"]}</title>
		        </lockup>`;
        }

    }

    doc += `</section>
      </shelf>
      <shelf>
        <section>
            <header>
                <title style="color:rgb(50,50,50)">Team</title>
            </header>
            <monogramLockup>
                <monogram src="${this.BASEURL}images/matheus.JPG" class ="baseMonogram" width="300" height="300"/>
                <title style="color:rgb(50,50,50)">Matheus Amancio</title>
                <subtitle style="color:rgb(50,50,50)">Developer/Design</subtitle>
            </monogramLockup>
            <monogramLockup>
                <monogram src="${this.BASEURL}images/isaias.JPG" class ="baseMonogram" width="300" height="300"/>
                <title style="color:rgb(50,50,50)">Isaias Lima</title>
                <subtitle style="color:rgb(50,50,50)">Developer/BackEnd</subtitle>
            </monogramLockup>
        </section>
      </shelf>

    </collectionList>
  </stackTemplate>
</document>`;

    return doc;
}