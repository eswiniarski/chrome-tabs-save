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

document.addEventListener('DOMContentLoaded', function() {
    var openTabs = getOpenTabsUrl();

    setTimeout(function() {
        var div = document.getElementById("openTabs");
        for (var i = 0; i < openTabs.length; i++) {
            div.innerHTML = div.innerHTML + openTabs[i] + "<br>";
        }
    }, 200)
});
