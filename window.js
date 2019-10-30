const Store = require("./store");

let store = new Store({
    configName: "user-preferences",
    defaults: {
        "width": 800,
        "height": 600,
        "x": 0,
        "y": 0
    }
});

function getWindowData() {
    return {
        "width": store.get("width"),
        "height": store.get("height"),
        "x": store.get("x"),
        "y": store.get("y")
    };
}

function updateWindowCoords(x, y) {
    store.set("x", x);
    store.set("y", y);
}

function updateWindowDims(width, height) {
    store.set("width", width);
    store.set("height", height);
}

module.exports = {
    "getWindowData": getWindowData,
    "updateWindowCoords": updateWindowCoords,
    "updateWindowDims": updateWindowDims
};