/* 
 * BASEURL is a variable existing in the page calling this framework
 * through a script element referencing this specific javascript file
 * the repo rest is then determined from here and accessed accordingly
*/
var DEBUG = false;
var PUBLICKEY = "";
var VISITORIP = "";
var CDNROOTDIR = "";
var CURRENTCONTEXT = "11111111111111111111111111111111";
var ISTOUCHDEVICE = window.matchMedia("(pointer: coarse)").matches;
var DEVICE = window.matchMedia("(pointer: coarse)").matches ? "Mobile" : "PC";
var DEVICEWIDTH = 0;
var DEVICEHEIGHT = 0;
var WIDTH = "600";
var HEIGHT = "500";
var FITWIDTH = "600";
var FITHEIGHT = "500";
var PARFITWIDTH = 0;
var PARFITHEIGHT = 0;
var PARWHEXIST = false;
var SHOWTRACKER = "true";
var TRACKERSCALE = "";
var DARKESTCLR = "";
var GLASS = "";
var FONTSIZE = 40;
var ICONSIZE = 50;
var BARWIDTH_PC = 60;
var BARWIDTH_MOBILE = 56;
var BARWIDTH = BARWIDTH_PC;
var PARENTURL = "";
var PARENTREGISTERED = false;
var SITEURL = "";
var rootData;
var rootDataStr = "";
var rootFitBoundsData;
var rootFitBoundsDataStr = "";
var DARKESTCOLOR = "#0178af";
var DARKCOLOR = "#188fc6";
var LIGHTCOLOR = "#34abe2";
var LIGHTERCOLOR = "#4ec5fc";
var LIGHTESTCOLOR = "#5ad1ff";
var NAVCOLOR = "#b5d7e8";
var HTML = null;

var trackingTd = null;
var trackerTd = null;
var searchTd = null;
var search = document.getElementById("search");
var rootTd = null;
var defHeight = "430px";
var varHeight = "480px";
var adjustHeight = 0;

var expandToFitBounds = false;

var FINAL_TABLE_HEIGHT = 0;
var FINAL_TABLE_WIDTH = 0;
var FINAL_TRACKBAR_HEIGHT = 0;
var FINAL_TRACKBAR_WIDTH = 0;

const CACHE_BASE64 = new Map();
const CACHE_SVG = new Map();
const CACHE_JS = new Map();

var styleDefault = "topLeft{background-color: NAVCOLOR;} div.horscroll {margin:0 !important;padding:0 !important;height:60px;overflow-x: auto;overflow-y:hidden;white-space:nowrap;background-color: NAVCOLOR;}div.verscroll {margin:0 !important;padding:0 !important;width:60px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background-color: NAVCOLOR;} .trackerImage{cursor:pointer;margin-right:4px !important;margin-top:2px !important;} .rootImage{cursor:pointer;margin-right:2px !important;margin-top:2px !important;display:table-column;} a {color:#0178af;font-weight:bold;font-size:12px;} * {margin:0 !important;padding:0 !important;} .topLeft{padding: 0px 0px 5px 2px !important;}";
var styleScroll = "*{scrollbar-width:thin;scrollbar-height:thin;scrollbar-color: #ffffff;} *::-webkit-scrollbar {height:4px;width:4px;} *::-webkit-scrollbar-track {background-color: NAVCOLOR;} *::-webkit-scrollbar-thumb {background-color:#ffffff;border-radius:2px;border: 1px solid #ffffff;}";
var styleScroller = ".scroller {--scrollbar-color-thumb: #ffffff;--scrollbar-color-track: NAVCOLOR;--scrollbar-width: thin;--scrollbar-width-legacy: 0.5rem;}";
var styleTrackerScroller = "#trackerDiv::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.0);background-color:NAVCOLOR;}#trackerDiv::-webkit-scrollbar {width:4px;height:4px;background-color: #ffffff;}#trackerDiv::-webkit-scrollbar-thumb {background-color:#ffffff;}";
var styleRootScroller = "#rootDiv::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.0);background-color:NAVCOLOR;}#rootDiv::-webkit-scrollbar {width:4px;height:4px;background-color: #ffffff;}#rootDiv::-webkit-scrollbar-thumb {background-color:#ffffff;}";
var styleSupport1 = "@supports (scrollbar-width: auto) {.scroller {scrollbar-color: var(--scrollbar-color-thumb) var(--scrollbar-color-track);scrollbar-width: var(--scrollbar-width);}}";
var styleSupport2 = "@supports selector(::-webkit-scrollbar) {.scroller {text-align: justify;}.scroller::-webkit-scrollbar-thumb {background: var(--scrollbar-color-thumb);}.scroller::-webkit-scrollbar-track {background: var(--scrollbar-color-track);}.scroller::-webkit-scrollbar {max-width: var(--scrollbar-width-legacy);max-height: var(--scrollbar-width-legacy);}}";
var styleGlass = ".glass{position:relative;display:inline-block;background-color:DARKCOLOR;background-image:linear-gradient(DARKCOLOR,LIGHTCOLOR);padding: 0px 0px 0px FONTMARGINLEFTGLASSpx !important;height:50px;width:50px;color:#fff;font-size:40px;font-family:sans-serif;font-weight:bold;border-radius:3px;box-shadow:0px 1px 4px -2px DARKESTCOLOR;text-shadow:0px -1px DARKESTCOLOR;cursor:pointer;}.glass:after{content:'';position:absolute;top:2px;left:2px;width:calc(100% - 4px);height:50%;background:linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.2));}.glass:hover{background:linear-gradient(LIGHTCOLOR,LIGHTERCOLOR);}";
var styleMat = ".mat{position: relative;display: inline-block;background-color: DARKCOLOR;border-radius: 3px;border: 2px solid DARKESTCOLOR;padding: 0px 0px FONTMARGINBOTMATpx FONTMARGINLEFTMATpx !important;height:50px;width:50px;color:#fff;font-size:40px;font-family:sans-serif;font-weight:bold;cursor:pointer;}";

$(document).ready(function () {

    console.log("JQUERY READY");

    DEBUG = (new URL(location.href)).searchParams.get('debug');
    if(DEBUG !== null){
       DEBUG = true; 
    }
    
    console.log("DEBUG : " + DEBUG);

    if(window.postMessage){
        console.log('CHANNEL SUPPORTS POST MESSAGE');
    }
    
    var body = $("#body");
    var path = document.getElementById("cdnOrigin").src;
    
    CDNROOTDIR = getPath(path);
    PUBLICKEY = document.getElementById("cdnOrigin").getAttribute("data-publicKey");
    VISITORIP = document.getElementById("cdnOrigin").getAttribute("data-visitorIp");
    
    console.log('CDNORIGIN : ' + CDNROOTDIR);
    console.log('PUBLICKEY : ' + PUBLICKEY);
    console.log('VISITORIP : ' + VISITORIP);
    console.log('ISTOUCHDEVICE : ' + ISTOUCHDEVICE);

    $.get(CDNROOTDIR + 'consoleChannelUI.html', function (contents) {
        HTML = $.parseHTML(contents.replaceAll("@",CDNROOTDIR));
        if(hasParent()){
            HTML[2] = "";            
        }
        body.append(HTML);
        if(DEBUG){
            console.log("HTML TEMPLATE APPENDED");        
        }        
        buildUI();
    }, 'text');

});

function isBoolean(truefalse){
    return /^true|false$/i.test(truefalse);
}

function JsonCommandMessage(command, value){
    this.command = command;
    this.value = value;
}

// MESSAGE LISTENER
function listenMessage() {
    if (typeof event.data === 'object' && event.data !== null) {
        let cmmnd = event.data;
        doSwitch(cmmnd);
    } else {
        let cmmnd = JSON.parse(event.data);
        doSwitch(cmmnd);
    }
}

function doSwitch(cmmnd){
    switch(cmmnd.command){
        case "showNavBar":
            showOrHideIconTrack(cmmnd.value);
            break;
        case "showZoomControls":
            $('#contentFrm')[0].contentWindow.postMessage(cmmnd, "*");
            break;                    
        case "currentContext":
            postAdmiChannelEditornCurrentContext();
            break;            
    }
}

function postAdmiChannelEditornCurrentContext(){
    let cmmnd = new JsonCommandMessage("admiChannelEditorCurrentContext", CURRENTCONTEXT);
    window.parent.postMessage(cmmnd, "*");
}

if (window.addEventListener) {
    window.addEventListener("message", listenMessage, false);
} else {
    window.attachEvent("onmessage", listenMessage);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Control') {
        document.getElementById('contentFrm').contentWindow.showControls();
    }else if(event.key === 'Escape') {
        document.getElementById('contentFrm').contentWindow.hideControls();
    }
});

function showOrHideIconTrack(collapse){
    var contentFrm = $("#contentFrm");
    if(collapse){
        $("#trackingTd").hide();
        $("#trackerTd").hide();
        $("#searchTd").hide();
        $("#rootTd").hide();
        contentFrm.css("width", FINAL_TABLE_WIDTH + "px");
        let newHeight = parseInt(FINAL_TABLE_HEIGHT) + parseInt(adjustHeight);
        contentFrm.css("height", newHeight + "px");
    }else{
        $("#trackingTd").show();
        $("#trackerTd").show();
        $("#searchTd").show();
        $("#rootTd").show();
        contentFrm.css("width", (FINAL_TABLE_WIDTH - FINAL_TRACKBAR_WIDTH - 5) + "px");
        let newHeight = (parseInt(FINAL_TABLE_HEIGHT) - parseInt(FINAL_TRACKBAR_HEIGHT) - 5) + parseInt(adjustHeight);
        contentFrm.css("height", newHeight + "px");
        $("#channelTbl").css("height", FINAL_TABLE_HEIGHT + "px");
    }
    document.getElementById("contentFrm").contentWindow.adjustSvgSizeToContainer(collapse);
}

function adjustContentHeight(adjHeight){
    adjustHeight = Math.abs(adjHeight);
    if($("#trackingTd").css("display") === "none"){
        let newHeight = parseInt(FINAL_TABLE_HEIGHT) + parseInt(adjHeight);
        $('#contentFrm').css("height", newHeight + "px");
    }else{
        let newHeight = (parseInt(FINAL_TABLE_HEIGHT) - parseInt(FINAL_TRACKBAR_HEIGHT) - 5) + parseInt(adjHeight);
        $('#contentFrm').css("height", newHeight + "px");
    }
}

function adjustSvgSizeToContainer(){
    document.getElementById("contentFrm").contentWindow.adjustSvgSizeToContainer();
}

function getTrackingTD(){
    return trackingTd;
}

function getRootTD(){
    return rootTd;
}

function hasParent(){
    return window.location !== window.parent.location;
}

function getParentUrl() {
    var PARENTURL = (window.location !== window.parent.location) ? document.referrer : document.location;
    SITEURL = new URL(PARENTURL);
    var isInIframe = (parent !== window), parentUrl = null;
    if (isInIframe) {
        parentUrl = document.referrer;
    }
    return parentUrl;
}

function getPath(path){
    path = path.match(/(^.*[\\\/]|^[^\\\/].*)/i);
    if(path !== null){
        return path[0];
    }else{
        return false;
    }            
}

function buildUI() {
     
    if(DEBUG){
        console.log("*** buildUI");        
    }
   
    $('#deviceType').html(' ' + DEVICE);
    $('#deviceWidth').html($(window).width());
    $('#deviceHeight').html($(window).height());

    PARENTURL = (window.location !== window.parent.location) ? document.referrer : document.location;

    console.log("CHANNEL HAS PARENT : " + hasParent());
    console.log("PARENTURL : " + PARENTURL);

    SITEURL = new URL(PARENTURL);

    // CONTROL MECHANISM TO LIMIT EMBEDDING BY REGISTERED SITES AND APPS ONLY 
    validateSite();
    
    var contextId = (new URL(location.href)).searchParams.get('contextId');
    var showTracker = (new URL(location.href)).searchParams.get('showTracker');
    var trackerScale = (new URL(location.href)).searchParams.get('trackerScale');
    var fitWidth = (new URL(location.href)).searchParams.get('fitWidth');
    var fitHeight = (new URL(location.href)).searchParams.get('fitHeight');
    var color = (new URL(location.href)).searchParams.get('color');
    var navColor = (new URL(location.href)).searchParams.get('navColor');
    var glass = (new URL(location.href)).searchParams.get('glass');

    if (contextId !== null && contextId !== "") {
        CURRENTCONTEXT = contextId;
    }
    if (color !== null && color !== "") {
        fetchHues('#' + color);
    } else {
        fetchHues('#0178af');
    }
    if (showTracker !== null && showTracker !== "") {
        SHOWTRACKER = showTracker;
    }
    if (trackerScale !== null && trackerScale !== "") {
        TRACKERSCALE = trackerScale;
    }else{
        trackerScale = 1;
        TRACKERSCALE = trackerScale;
    }

    if(hasParent()){
        WIDTH = $(window).width() - 10;
        HEIGHT = parent.document.body.clientHeight - 32;
    }else if(ISTOUCHDEVICE && !hasParent()){
        WIDTH = $(window).width() - 6;
        HEIGHT = parent.document.body.clientHeight - 32;
    }
    
    if (fitWidth !== null && fitWidth !== "") {
        PARWHEXIST = true;
        PARFITWIDTH = fitWidth;
        WIDTH = fitWidth;
    }else{
        PARFITWIDTH = WIDTH;
    }
    
    if (fitHeight !== null && fitHeight !== "") {
        PARFITHEIGHT = fitHeight;
        HEIGHT = fitHeight;
    }else{
        PARFITHEIGHT = HEIGHT;
    }

    if(WIDTH < 300){
        $("#widthLbl").hide();
        $("#heightLbl").hide();
        $("#deviceWidth").hide();
        $("#deviceHeight").hide();
    }
    
    if (color !== null && color !== "") {
        DARKESTCLR = color;
    }
    if (navColor !== null && navColor !== "") {
        NAVCOLOR = '#' + navColor;
    } else {
        if (color === null || color === "") {
            NAVCOLOR = "#b5d7e8";
        } else {
            NAVCOLOR = LIGHTESTCOLOR;
        }
    }
    setDefaultColor(NAVCOLOR);
    if (glass !== null && glass !== "") {
        GLASS = glass;
    }

    var ceiling = 500;
    var max = Math.max(fitWidth, fitHeight);
    var scale = 1;
    if (max < ceiling) {
        scale = 1 - ((ceiling - max) / ceiling);
    }
    
    scale = (scale === 0) ? 1 : scale;

    trackerScale = (trackerScale > scale) ? scale : trackerScale;

    styleDefault = styleDefault.replaceAll("NAVCOLOR", NAVCOLOR);
    styleScroll = styleScroll.replaceAll("DARKESTCOLOR", DARKESTCOLOR).replaceAll("NAVCOLOR", NAVCOLOR);
    styleTrackerScroller = styleTrackerScroller.replaceAll("NAVCOLOR", NAVCOLOR); 
    styleRootScroller = styleRootScroller.replaceAll("NAVCOLOR", NAVCOLOR); 
    styleScroller = styleScroller.replaceAll("NAVCOLOR", NAVCOLOR);
    styleGlass = styleGlass.replaceAll("DARKESTCOLOR", DARKESTCOLOR).replaceAll("DARKCOLOR", DARKCOLOR).replaceAll("LIGHTCOLOR", LIGHTCOLOR).replaceAll("LIGHTERCOLOR", LIGHTERCOLOR).replaceAll("FONTMARGINLEFTGLASS", 0);
    styleMat = styleMat.replaceAll("DARKESTCOLOR", DARKESTCOLOR).replaceAll("DARKCOLOR", DARKCOLOR).replaceAll("FONTMARGINBOTMAT", 0).replaceAll("FONTMARGINLEFTMAT", 0);

    if(/chrome/.test(navigator.userAgent.toLowerCase())){
        console.log("BROWSER Chrome!");
        injectCSS(styleTrackerScroller);
        //console.log(styleTrackerScroller);
        injectCSS(styleRootScroller);
        //console.log(styleRootScroller);    
    }else{
        console.log("BROWSER Other!");
        injectCSS(styleScroll);
    }

//    injectCSS(styleScroller);
//    injectCSS(styleSupport1);
//    injectCSS(styleSupport2);
    injectCSS(styleGlass);
    injectCSS(styleMat);
    
    if (WIDTH === 0) {
        WIDTH = $(document).width();
    }
    if (HEIGHT === 0) {
        HEIGHT = $(document).height();
    }

}

function refreshUI() {
    $.ajax({
        type: "POST",
        url: window.location,
        data: data,
        success: success,
        dataType: dataType
    });
}

const injectCSS = css => {
    let el = document.createElement('style');
    el.type = 'text/css';
    el.innerText = css;
    document.head.appendChild(el);
    return el;
};

function LightenDarkenColor(col, amt) {
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
}

function LightenColor(color, percent) {
    var num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            B = (num >> 8 & 0x00FF) + amt,
            G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}
;

function fetchHues(colorHex) {
    var hue1 = LightenColor(colorHex, 9);
    var hue2 = LightenColor(colorHex, 20);
    var hue3 = LightenColor(colorHex, 30);
    var hue4 = LightenColor(colorHex, 35);

    DARKESTCOLOR = colorHex;
    DARKCOLOR = hue1;
    LIGHTCOLOR = hue2;
    LIGHTERCOLOR = hue3;
    LIGHTESTCOLOR = hue4;
}

function setDefaultColor(color) {
    document.getElementById("channelTbl").style.border = "0px solid " + color;
    document.getElementById("trackingTd").style.backgroundColor = color;
    document.getElementById("trackerTd").style.backgroundColor = color;
    document.getElementById("channelTbl").style.backgroundColor = color;
    document.getElementById("rootTd").style.backgroundColor = color;
    document.getElementById("contentFrm").style.border = "0px solid " + color;
}

function validateSite() {
    if(DEBUG){
        console.log("*** validateSite");        
    }
    
    var path = SITEURL.pathname.split('/');
    var domain = path[1];
    console.log("HOST : " + SITEURL.hostname);
    console.log("DOMAIN : " + domain);
    var finalUrl = BASEURL + "jquery/validateRepoSite/?siteHost=" + SITEURL.hostname + "&siteDomain=" + domain;
    $.ajax({
        url: finalUrl
    }).then(function (data) {
        if (data === "HOME") {
            console.log("REGISTERED WEBSITE : HOME");
            PARENTREGISTERED = true;
        } else {
            if (parseInt(data) > 0) {
                console.log("REGISTERED WEBSITE NUMBER : " + data);
                PARENTREGISTERED = true;
            } else if (parseInt(data) === 0) {
                PARENTREGISTERED = false;
                window.location = CDNROOTDIR + "images/viewProhibited.svg";
            } else if (parseInt(data) === -1) {
                PARENTREGISTERED = false;
            }
        }
        getRootContexts();
        configureUI();
    });
}

function autoScale() {
    var ceiling = 500;
    var max = Math.max(WIDTH, HEIGHT);
    if (max < ceiling) {
        var difference = ceiling - max;
        var recoReduct = 1 - (difference / ceiling);
        TRACKERSCALE = recoReduct;
    }
}

function configureUI() {
    if(DEBUG){
        console.log("*** configureUI");        
    }
    
    autoScale();
    
    let scaleSearchImage = Math.ceil((ICONSIZE - 4) * TRACKERSCALE);
    $('#searchImage').width(scaleSearchImage);
    $('#searchImage').height(scaleSearchImage);
    
    if (ISTOUCHDEVICE) {
        BARWIDTH = BARWIDTH_MOBILE;
    }
    
    $('#channelTbl').css('border-color', '0px solid ' + "LIGHTESTCOLOR");
    $('#channelTbl').css('background-color', "LIGHTESTCOLOR");
    $('#trackerTd').css('background-color', "LIGHTESTCOLOR");
    $('#rootTd').css('background-color', "LIGHTESTCOLOR");
    $('#channelTbl').css('width', WIDTH + 'px');
    $('#channelTbl').css('height', HEIGHT + 'px');
    
    FITWIDTH = parseInt(WIDTH) - BARWIDTH;
    if (SHOWTRACKER === "false") {
        $('#trackingTd').hide();
        FITHEIGHT = parseInt(HEIGHT);
    } else {
        FITHEIGHT = parseInt(HEIGHT) - BARWIDTH;
    }
    if (GLASS === "false") {
        $('#searchButton').removeClass("glass");
        $('#searchButton').addClass("mat");
    }else{
    }
    if (parseFloat(TRACKERSCALE) < 1) {
        if(DEBUG){
            console.log("TRACKERSCALE BELOW 1 [" + TRACKERSCALE + "]");           
        }
        
        let keep = parseFloat(ICONSIZE) * parseFloat(TRACKERSCALE);
        let subtract = ICONSIZE - keep;
        let dim = BARWIDTH - subtract;
        let fontSize = parseFloat(FONTSIZE) * parseFloat(TRACKERSCALE);

        $('#searchButton').css('width', keep + 'px');
        $('#searchButton').css('height', keep + 'px');
        $('#searchButton').css('font-size', fontSize + 'px');
       
        console.log('PARWHEXIST : ' + PARWHEXIST);
        
        if(!PARWHEXIST){
            $('#search').css('width', keep + 'px');
            $('#search').css('height', keep + 'px');
        }
        
        $('#trackerTd').css('height', dim + 'px');
        $('#trackerDiv').css('height', dim + 'px');
        let newHeight = parseInt(HEIGHT) - parseInt($('#trackerDiv').height());
        $('#channelTbl').css('height', newHeight + 'px');
        $('#channelTbl').css('height', newHeight + 'px');
        $('#rootDiv').css('width', dim + 'px');
        $('#rootDiv').css('height', newHeight + 'px');
        FITWIDTH = parseInt(WIDTH) - parseInt($('#rootDiv').width());
        FITHEIGHT = parseInt(HEIGHT) - parseInt($('#trackerDiv').height());
        $('#trackerDiv').css('width', FITWIDTH + 'px');
        $('#contentFrm').css('width', FITWIDTH + 'px');
        $('#contentFrm').css('height', FITHEIGHT + 'px');
        
        // CHANGE HEIGHT OF CONTENT
        
    } else {
        if(DEBUG){
            console.log("TRACKERSCALE 1 UP [" + TRACKERSCALE + "]");           
        }
        $('#contentFrm').css('width', FITWIDTH + 'px');
        $('#contentFrm').css('height', FITHEIGHT + 'px');
        $('#trackerDiv').css('width', FITWIDTH + 'px');
        $('#rootDiv').css('height', FITHEIGHT + 'px');

        if(TRACKERSCALE === "" || TRACKERSCALE === "1" || TRACKERSCALE === "1.0"){
            $('#searchLetter').css('margin-left', '10px !important');
        }
    }
    if (CURRENTCONTEXT) {
        viewContextSvg(CURRENTCONTEXT, true, true);
    }
    $('#contentFrm').on('load', function () {
        if(DEBUG){
            console.log("CONTENT FRAME ONLOAD");            
        }
        if (!CACHE_SVG.has(CURRENTCONTEXT)) {
            var iframeDocument = $(this).contents();
            var svg = iframeDocument.find("svg");
            if (ISTOUCHDEVICE) {
                svg.removeAttr("style");
            }
            var JS = $("#contentFrm")[0].contentWindow.document.getElementById('apiCallsJS').innerHTML;
            var SVG = $("#contentFrm")[0].contentWindow.extSVG;
            CACHE_JS.set(CURRENTCONTEXT, JS);
            CACHE_SVG.set(CURRENTCONTEXT, SVG);
            if(DEBUG){
                console.log("CONTEXT NOT IN CACHE SO CALL viewContextSvg");                
            }
            viewContextSvg(CURRENTCONTEXT,false,false);
        }
    });
    FINAL_TABLE_HEIGHT = $("#channelTbl").css("height").replace("px", "");
    FINAL_TABLE_WIDTH = $("#channelTbl").css("width").replace("px", "");
    FINAL_TRACKBAR_HEIGHT = $("#trackingTd").css("height").replace("px", "");
    FINAL_TRACKBAR_WIDTH = $("#rootTd").css("width").replace("px", "");
}

function getRootContexts() {
    if(DEBUG){
        console.log("*** getRootContexts");        
    }    
    $.ajax({
        url: BASEURL + "jquery/svgFitBounds/"
    }).done(function (data) {
        rootFitBoundsDataStr = JSON.stringify(data);
        rootFitBoundsData = jQuery.parseJSON(rootFitBoundsDataStr);
        expandToFitBounds = rootFitBoundsData.expandToFit;
        console.log("FITBOUNDS JSON : " + rootFitBoundsDataStr);
        console.log("FITBOUNDS OBJ :" + rootFitBoundsData);
        console.log("expandToFitBounds : " + expandToFitBounds);
    });    
    $.ajax({
        url: BASEURL + "jquery/rootabrevcontexts/"
    }).done(function (data) {
        rootDataStr = JSON.stringify(data);
        setTimeout(renderRootContexts, 500);
    });
}

function renderRootContexts() {
    if(DEBUG){
        console.log("*** renderRootContexts");        
    }
    rootData = jQuery.parseJSON(rootDataStr);
    for (let i = 0; i < rootData.length; i++) {
        (function (i) {
            setTimeout(function () {
                renderRootThumbtag(i, rootData[i]);
            }, 100 * i);
        })(i);
    }
}

function renderRootThumbtag(index, rootContext) {
    var image = new Image();
    image.src = rootContext.base64image;
    image.id = rootContext.id;
    image.setAttribute('id', rootContext.id);
    image.setAttribute('name', index);
    image.setAttribute('style', 'visibility:hidden;');
    image.setAttribute('title', rootContext.name);
    image.addEventListener('load', function (evnt) {
        var img = evnt.target;
        if (TRACKERSCALE !== "1") {
            var width = Math.ceil(img.width * parseFloat(TRACKERSCALE));
            var height = Math.ceil(img.height * parseFloat(TRACKERSCALE));
            $("#rootDiv").append("<div style=\"display:table-row;\"><img class=\"rootImage\" width=\"" + width + "\" height=\"" + height + "\" onclick=\"viewContextSvg('" + img.id + "',true,false);\" title=\"" + img.id + "\" src=\"" + img.src + "\"/></div>");
        } else {
            $("#rootDiv").append("<div style=\"display:table-row;\"><img class=\"rootImage\" onclick=\"viewContextSvg('" + img.id + "',true,false);\" title=\"" + img.id + "\" src=\"" + img.src + "\"/></div>");
        }
    });
    document.body.appendChild(image);
}

function getNavigatorScaleDifference(){
    var rootTdWidth = $("#rootTd").width();    
    var trackerTdHeight = $("#trackingTd").height();

    var leftWidth = document.getElementById("leftWidth");
    var topHeight = document.getElementById("topHeight");
    
    leftWidth.innerHTML = rootTdWidth;
    topHeight.innerHTML = trackerTdHeight;
}

function viewContextSvg(contextId, addViewContextIcon, clearContextIcons) {
    if(DEBUG){
        console.log("*** viewContextSvg : " + contextId + " - addViewContextIcon : " + addViewContextIcon + " - clearContextIcons : " + clearContextIcons);        
    }
    if (contextId !== null && contextId !== "") {
        CURRENTCONTEXT = contextId;
    }
    if(window.postMessage && hasParent()){
        var cmmnd = new JsonCommandMessage("currentContext", CURRENTCONTEXT);
        window.parent.postMessage(cmmnd, "*");
    }
    loopTracker(CURRENTCONTEXT);
    if (!CACHE_SVG.has(CURRENTCONTEXT)) {
        if(DEBUG){
            console.log("CONTEXT NOT IN CACHE");            
        }
        var SCALEFITWIDTH = parseFloat(PARFITWIDTH) - $("#rootTd").width();
        var SCALEFITHEIGHT = parseFloat(PARFITHEIGHT) - $("#trackingTd").height();
        if (ISTOUCHDEVICE) {
            // MOBILE
            SCALEFITWIDTH = (parseInt(parseFloat(FITWIDTH) - $("#rootTd").width()) * 0.96);
            SCALEFITHEIGHT = (parseInt(parseFloat(FITHEIGHT) - $("#trackingTd").height()) * 0.96);
        }
        SCALEFITWIDTH = Math.floor(SCALEFITWIDTH);
        SCALEFITHEIGHT = Math.floor(SCALEFITHEIGHT);
        //alert("SCALEFITWIDTH : " + SCALEFITWIDTH + " - SCALEFITHEIGHT : " + SCALEFITHEIGHT + ' - FITWIDTH : ' + FITWIDTH + ' - FITHEIGHT : ' + FITHEIGHT + ' - PARFITWIDTH : ' + PARFITWIDTH + ' - PARFITHEIGHT : ' + PARFITHEIGHT);
        var url = BASEURL + "contextConsole/" + CURRENTCONTEXT + "/contextConsole.html?fitWidth=" + SCALEFITWIDTH + "&fitHeight=" + SCALEFITHEIGHT;
        $("#contentFrm").attr("src", url);
        if(DEBUG){
            console.log("CONTENTFRAME SRC : " + $("#contentFrm").attr("src"));            
        }
        if (clearContextIcons) {
            $("#trackerDiv").empty();
        }
        if (addViewContextIcon && SHOWTRACKER === "true") {
            viewContextIcon(CURRENTCONTEXT);
        }
        if(window.postMessage && hasParent()){
            var cmmnd = new JsonCommandMessage("scaleDimensions", SCALEFITWIDTH + ":" + SCALEFITHEIGHT);
            window.parent.postMessage(cmmnd, "*");
        }
    } else {
        if(DEBUG){
            console.log("CONTEXT IN CACHE");            
        }
        $("#contentFrm").attr("src", "");
        $("#contentFrm").attr("padding", "0px");
        $("#contentFrm").contents().find("body").css("padding", "0px 0px 0px 0px");
        var contentFrm = document.getElementById('contentFrm');
        setTimeout(() => {
            var JS = wrapJS(CACHE_JS.get(CURRENTCONTEXT));
            var SVG = CACHE_SVG.get(CURRENTCONTEXT);
            var HTML = wrapSVG(JS, SVG);
            var doc = contentFrm.contentWindow || contentFrm.contentDocument.document || contentFrm.contentDocument;
            doc.document.open();
            doc.document.write(HTML);
            doc.document.close();
            setTimeout(getContentHtmlSvgAfter(),200);
        }
        , 600);
    }
}

function getContentHtmlSvgAfter(){
    if(DEBUG){
        console.log("*** getContentHtmlSvgAfter");
    }    
    const contentFrm = $('#contentFrm');
    const doc = contentFrm.contents();
    const dynamicSVG = doc.find('#dynamicSVG');
    const symbologySVG = doc.find('#symbologySVG');
    symbologySVG.css("visibility", "visible");
    if(DEBUG){
        console.log("html doc : " + doc);
        console.log("div dynamicSVG : " + dynamicSVG);
        console.log("svg symbologySVG: " + symbologySVG);
    }
}

function getApiJS(){
    return '<script id="svgApiJS" src="https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.2.0/svg.min.js"></script>\n<script id="symbologyApiJS" src="' + CDNROOTDIR + 'svgAnimatedFilters.min.js"></script>\n<script id="dimensionApiJS" src="' + CDNROOTDIR + 'svg-pan-zoom.min.js"></script>\n<script id="dimensionApiJS" src="' + CDNROOTDIR + 'svgDimensioning.js"></script>\n';
}

function wrapJS(js) {
    return "<script id=''onLoadJS'>\nvar embedded = false;var expandToFitBounds = " + expandToFitBounds + ";\nvar fitWidth = 0;var fitHeight = 0;var realWidth = 0;var realHeight = 0;var extSVG = '';var draw = null;var children = null;var svgEl = null;var grpEl = null;function onLoad() {draw = SVG('#symbologySVG');svgEl = document.getElementById('symbologySVG');grpEl = document.getElementById('root');children = grpEl.childNodes;iniDimensioner();\nif(!window.matchMedia(\"(pointer: coarse)\").matches) {window.zoomScavecgraph = svgPanZoom('#symbologySVG',{zoomEnabled: true,controlIconsEnabled:true,fit: true,center: true});document.addEventListener('keydown', function (event) {if (event.key === 'Control') {window.zoomScavecgraph.enableControlIcons();}else if(event.key === 'Escape') {window.zoomScavecgraph.disableControlIcons();}});}};\n" + js + "\nfunction showControls(){console.log('showControls');zoomScavecgraph.enableControlIcons()}\nfunction hideControls(){console.log('hideControls');\nzoomScavecgraph.disableControlIcons()}\n</script>";
}

function wrapSVG(apiCallsJS, svg) {
    return "<html>\n<head>\n<title>\n</title>\n</head>\n<body style='padding:5px;margin:0px;' onload='onLoad();animateContext();'>\n" + getApiJS() + apiCallsJS + "<div id='dynamicSVG' data-fromcache='true' style='position:absolute;left:0px;top:0px;width:" + FITWIDTH + "px;height:" + FITHEIGHT + "px;'>" + svg + "\n</div>\n</body>\n</html>";
}

function viewContextIcon(contextId) {
    if(DEBUG){
        console.log("*** viewContextIcon : " + contextId);        
    }
    CURRENTCONTEXT = contextId;
    if(window.postMessage && hasParent()){
        var cmmnd = new JsonCommandMessage("currentContext", CURRENTCONTEXT);
        window.parent.postMessage(cmmnd, "*");
    }      
    if (SHOWTRACKER === "true" && !CACHE_BASE64.get(CURRENTCONTEXT)) {
        $.ajax({
            url: BASEURL + "jquery/symbologyContextById/" + contextId + "/"
        }).then(function (data) {
            CACHE_BASE64.set(CURRENTCONTEXT, data);
            var icon = wrapBase64Image(data);
            if(icon !== null){
                $("#trackerDiv").append(wrapBase64Image(data));
            }
            loopTracker(CURRENTCONTEXT);
        });
        //PERMIT HREF FORWARD TO VIEW AND CACHE ASSETS
        return true;
    } else {
        loopTracker(CURRENTCONTEXT);
        //LOAD ASSETS FROM CACHE
        viewContextSvg(CURRENTCONTEXT, false, false);
        //BLOCK HREF FORWARD
        return false;
    }
}

function viewContext(contextId){
    if(DEBUG){
        console.log("*** viewContext : " + contextId);        
    }
    var SCALEFITWIDTH = parseFloat(PARFITWIDTH) - $("#rootTd").width();
    var SCALEFITHEIGHT = parseFloat(PARFITHEIGHT) - $("#trackingTd").height();
    if (ISTOUCHDEVICE) {
        // MOBILE
        SCALEFITWIDTH = (parseInt(parseFloat(FITWIDTH) - $("#rootTd").width()) * 0.96);
        SCALEFITHEIGHT = (parseInt(parseFloat(FITHEIGHT) - $("#trackingTd").height()) * 0.96);
    }
    SCALEFITWIDTH = Math.floor(SCALEFITWIDTH);
    SCALEFITHEIGHT = Math.floor(SCALEFITHEIGHT);
    CURRENTCONTEXT = contextId;
    var url = BASEURL + "contextConsole/" + CURRENTCONTEXT + "/contextConsole.html?fitWidth=" + SCALEFITWIDTH + "&fitHeight=" + SCALEFITHEIGHT;
    $("#contentFrm").attr("src", url);    
}

function loopTracker(contextId) {
    $("#trackerDiv").children('img').each(function () {
        let index = $(this).index();
        let image = $(this);
        if (image.attr('id') === contextId) {
            image.css('border', "solid 2px red");
            let offSet = image.width() * index;
            $("#trackerDiv").scrollLeft(offSet);
        } else {
            image.css('border', "solid 0px white");
        }
    });
}

function wrapBase64Image(data) {
    var dim = getThumbtagDimensions(data.base64image);
    if(dim.width !== 0 && dim.height !== 0){
        if (TRACKERSCALE !== "1") {
            var width = dim.width * parseFloat(TRACKERSCALE);
            var height = dim.height * parseFloat(TRACKERSCALE);
            if(DEVICE === "Mobile"){
                width = width - 4;
                height = height - 4;
            }
            var img = "<img width=\"" + width + "\" height=\"" + height + "\" src=\"" + data.base64image + "\" class=\"trackerImage\" alt=\"Base64Image\" onclick=\"viewContextSvg('" + data.id + "',false,false);\" id=\"" + data.id + "\" title=\"" + data.id + "\"/>";
            return img;
        } else {
            var img = "<img src=\"" + data.base64image + "\" class=\"trackerImage\" alt=\"Base64Image\" onclick=\"viewContextSvg('" + data.id + "',false,false);\" id=\"" + data.id + "\" title=\"" + data.id + "\"/>";
            return img;
        }
    }else{
        return null;
    }
}

function getThumbtagDimensions(base64image) {
    $('#thumbtag').attr("src", base64image);
    var width = $('#thumbtag').width();
    var height = $('#thumbtag').height();
    let dim = new Object();
    dim.width = width;
    dim.height = height;
    return dim;
}

function getQueryParam(param, defaultValue = undefined) {
    location.search.substr(1)
        .split("&")
        .some(function (item) { // returns first occurence and stops
            return item.split("=")[0] === param && (defaultValue = item.split("=")[1], true);
        });
    return defaultValue;
}

function doSearch() {
    const color = DARKESTCLR.replace(/#/, '');
    var url = BASEURL + "contextSearch.html?fitWidth=" + FITWIDTH + "&fitHeight=" + FITHEIGHT + "&color=" + DARKESTCLR + "&glass=" + GLASS;
    $("#contentFrm").attr("src", url);
}