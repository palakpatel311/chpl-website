let states = {
    'complaints-on': [
        {
            name: 'surveillance.complaints',
            url: '/complaints',
            component: 'chplSurveillanceComplaints',
            data: { title: 'CHPL Surveillance - Complaints' },
        },
    ],
    'surveillance-reports-on': [
        {
            name: 'surveillance.reporting',
            url: '/reporting',
            component: 'chplSurveillanceReporting',
            data: { title: 'CHPL Surveillance - Reporting' },
        },
    ],
    'ocd-1277-on': [
        {
            name: 'surveillance.manage',
            url: '/manage',
            component: 'chplSurveillanceManagement',
            resolve: {
                allowedAcbs: networkService => {
                    'ngInject'
                    return networkService.getAcbs(true);
                },
                listings: networkService => {
                    'ngInject'
                    return networkService.getCollection('correctiveAction');
                },
            },
            data: { title: 'CHPL Surveillance - Manage' },
        },
    ],
    'base': [
        {
            name: 'administration.upload',
            abstract: true,
            url: '/confirm',
            template: '<ui-view/>',
        },{
            name: 'administration.upload.listings',
            url: '/listings',
            component: 'chplUploadListings',
            data: { title: 'CHPL Administration - Upload' },
        },{
            name: 'surveillance',
            abstract: true,
            url: '/surveillance',
            component: 'chplSurveillance',
            data: { title: 'CHPL Surveillance' },
        },{
            name: 'surveillance.upload',
            url: '/upload',
            component: 'chplUploadSurveillance',
            data: { title: 'CHPL Surveillance - Upload' },
        },{
            name: 'surveillance.confirm',
            url: '/confirm',
            component: 'chplConfirmSurveillance',
            data: { title: 'CHPL Surveillance - Confirmation' },
        },{
            name: 'surveillance.complaints',
            url: '/complaints',
            template: '<div>Coming soon</div>',
            data: { title: 'CHPL Surveillance - Complaints' },
        },{
            name: 'surveillance.manage',
            url: '/manage',
            template: '<div>Coming soon</div>',
            data: { title: 'CHPL Surveillance - Manage' },
        },{
            name: 'surveillance.reporting',
            url: '/reporting',
            template: '<div>Coming soon</div>',
            data: { title: 'CHPL Surveillance - Reporting' },
        },
    ],
}

/**
 * This config can only be used when the both flags are set to true, or both are removed when fully deployed
 */
function surveillanceStatesConfig ($stateProvider) {
    'ngInject'
    states['base'].forEach(state => {
        $stateProvider.state(state);
    });
}

export { surveillanceStatesConfig, states };
