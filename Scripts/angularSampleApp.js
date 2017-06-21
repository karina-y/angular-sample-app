var sample = {
    utilities: {}
    , layout: {}
    , page: {
        handlers: {
        }
        , startUp: null
    }
    , services: {}
    , ui: {}

};
sample.moduleOptions = {
    APPNAME: "AngularSampleApp"
        , extraModuleDependencies: []
        , runners: []
        , page: sample.page//we need this object here for later use
}


sample.layout.startUp = function () {

    console.debug("sample.layout.startUp");

    //this does a null check on sample.page.startUp
    if (sample.page.startUp) {
        console.debug("sample.page.startUp");
        sample.page.startUp();
    }
};
sample.APPNAME = "AngularSampleApp";//legacy


$(document).ready(sample.layout.startUp);