(function () {
    'use strict';

    angular
        .module('chpl')
        .config(config);

    /** @ngInject */
    function config ($analyticsProvider, $logProvider, stConfig, DEVELOPER_MODE, ENABLE_LOGGING) {
        // Enable/disable analytics tracking
        $analyticsProvider.developerMode(DEVELOPER_MODE);
        /*
        $analyticsProvider.developerMode(false);
        if (ENABLE_LOGGING) {
            $analyticsProvider.registerPageTrack(function (path) {
                console.log('Page tracking: ', path);
            });
            $analyticsProvider.registerEventTrack(function (action, properties) {
                console.log('Event tracking: ', action, properties);
            });
        }
        */

        // Enable log
        $logProvider.debugEnabled(ENABLE_LOGGING);

        // Set smart-table pagination template
        stConfig.pagination.template = 'app/components/smart_table/stPagination.html';
    }
})();
