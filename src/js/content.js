var browser = require("webextension-polyfill");
import {btn_open_in_ncsu_library_acm, btn_open_in_ncsu_library_ieee, btn_open_in_ncsu_library_science_direct}from "./widgets";

var myport = browser.runtime.connect({ name: "port-from-content" });

let url = window.location.href;
console.log(url);
if (url.match("https://ieeexplore.ieee.org/*")) {
    //add auto check button
    window.addEventListener('load', () => {
        var document_id = url.match(/[0-9]+$/g)[0]
        var container_btns = document.getElementsByClassName("u-mb-1 u-mt-05 btn-container")[0];
        var btn_to_add = document.createElement('div');
        btn_to_add.innerHTML = btn_open_in_ncsu_library_ieee;
        btn_to_add.addEventListener('click', ()=>{openNCSULibrary('ieee', document_id)});
        container_btns.appendChild(btn_to_add);
    });
}
if (url.match("https://dl.acm.org/*")) {
    //add auto check button
    window.addEventListener('load', () => {
        var document_id = url.match(/doi\/(abs\/)?[0-9\.\/]+$/g)[0].replace('doi/','').replace('abs/','');
        console.log(document_id);
        var container_btns = document.getElementsByClassName("issue-item__footer-links pull-right")[0];
        var btn_to_add = document.createElement('div');
        btn_to_add.innerHTML = btn_open_in_ncsu_library_acm;
        btn_to_add.addEventListener('click', ()=>{openNCSULibrary('acm', document_id)});
        container_btns.appendChild(btn_to_add);
    });
}
if (url.match("https://www.sciencedirect.com/science/article/*")) {
    //add auto check button
    window.addEventListener('load', () => {
        setTimeout(()=>{
            var document_id = url.match(/(abs\/)?(pii\/)?[A-Z0-9]+$/g)[0].replace('abs/','').replace('pii/','');
            console.log(document_id);
            var container_btns = document.querySelector('[aria-label="PDF Options"]');
            var remote_access_button = document.getElementById('RemoteAccessButton')
            // get the src of institution icon 
            var institution_icon = document.querySelector('[class="inst-icon"]')
            var institution_icon_src = institution_icon.getAttribute('src')
            // replace the icon src in the pre-set widget with acquired one
            var btn_open_in_ncsu_library_science_direct_img_src_replaced = btn_open_in_ncsu_library_science_direct.replace('<img_src_to_be_replaced>',institution_icon_src)
            var btn_to_add = document.createElement('li');
            btn_to_add.innerHTML = btn_open_in_ncsu_library_science_direct_img_src_replaced;
            btn_to_add.addEventListener('click', ()=>{openNCSULibrary('science direct', document_id)});
            remote_access_button.parentNode.insertBefore(btn_to_add, remote_access_button.nextSibling)
            //container_btns.appendChild(btn_to_add);
        }, 500)
    },{once:true});
}

/* functions */
//open in ncsu library
function openNCSULibrary(site, document_id){
    if(site == 'ieee')
    {
        myport.postMessage({
            type: "open new page",
            page: "ieee ncsu library",
            document_id: document_id
        })
    }
    if(site == 'acm')
    {
        myport.postMessage({
            type: "open new page",
            page: "acm ncsu library",
            document_id: document_id
        })
    }
    if(site == 'science direct')
    {
        myport.postMessage({
            type: "open new page",
            page: "science direct ncsu library",
            document_id: document_id
        })
    }
}