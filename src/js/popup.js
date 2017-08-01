/*
Returns list of open tab's url
*/
function getOpenTabsUrl() {
    var openTabs = [];

    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            openTabs.push(tabs[i].url);
        }
    })

    return openTabs;
}

function exportOpenTabs() {
    var openTabs = getOpenTabsUrl();

    setTimeout(function() {
        var fileContext = "";

        for (var i = 0; i < openTabs.length; i++) {
            fileContext = fileContext + openTabs[i] + "\n";
        }

        saveTextFile(fileContext, 'open-tabs.txt');
    }, 200);
}

function saveTextFile(content, fileName) {
    var file = new File([content], fileName, {
        type: "text/plain;charset=utf-8"
    });
    saveAs(file);
}

function loadTextFile(event) {
    var file = event.target.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var fileLines = e.target.result.split('\n');

            fileLines= fileLines.filter(function(line){
                return line != '' ? true : false;
            });
            
            openTabs(fileLines);
        };

        reader.readAsText(file);

    } else {
        console.log('Load failed');
    }

    return false;
}

function openTabs(tabs) {
    tabs.forEach(function(tab){
        chrome.tabs.create({
            'url': tab
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var exportButton = document.getElementById('exportButton');
    exportButton.addEventListener("click", exportOpenTabs, false);

    var loadButton = document.getElementById('loadButton');
    loadButton.addEventListener('change', loadTextFile, false);
});
