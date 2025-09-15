function JsonCommandMessage(command, value){
    this.command = command;
    this.value = value;
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Control') {
        var cmmnd = new JsonCommandMessage("showZoomControls", true);
        $('#channel')[0].contentWindow.postMessage(cmmnd, "*");                    
    }else if(event.key === 'Escape') {
        var cmmnd = new JsonCommandMessage("showZoomControls", false);
        $('#channel')[0].contentWindow.postMessage(cmmnd, "*");
    }
});