var browser = require("webextension-polyfill");

// handle received messages
browser.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (message) {
      if (message.type == "open new page") {
          if(message.page == "dashboard")
              browser.tabs.create({url: '../src/html/index.html'});
          else if(message.page == "Yu Lab Wiki")
              browser.tabs.create({url: 'https://pages.github.ncsu.edu/NCSU-Yu-Research-Group/ReadMe/'});                
          else if (message.page == "ieee ncsu library"){
              var url_ieee_ncsu_lib = "https://ieeexplore-ieee-org.prox.lib.ncsu.edu/document/";
              var document_id = message.document_id;
              var url_ieee_document_ncsu = url_ieee_ncsu_lib+document_id
              browser.tabs.create({url: url_ieee_document_ncsu});
          }
          else if (message.page == "acm ncsu library"){
              var url_acm_ncsu_lib = "https://dl-acm-org.prox.lib.ncsu.edu/doi/";
              var document_id = message.document_id;
              var url_acm_document_ncsu = url_acm_ncsu_lib+document_id
              browser.tabs.create({url: url_acm_document_ncsu});
          }
          else if (message.page == "science direct ncsu library"){
            var url_acm_ncsu_lib = "https://www-sciencedirect-com.prox.lib.ncsu.edu/science/article/pii/";
            var document_id = message.document_id;
            var url_acm_document_ncsu = url_acm_ncsu_lib+document_id
            browser.tabs.create({url: url_acm_document_ncsu});
        }
      }
  });
});