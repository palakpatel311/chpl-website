import { compliance } from '../smart-table/filters/compliance';

export const ProductsComponent = {
  templateUrl: 'chpl.components/products/products.html',
  bindings: {
    onCancel: '&?',
    onEdit: '&?',
    products: '<',
    productId: '@',
    versionId: '@',
    searchOptions: '<',
  },
  controller: class ProductsComponent {
    constructor ($log, $q, $state, $uibModal, authService, networkService, utilService) {
      'ngInject';
      this.$log = $log;
      this.$q = $q;
      this.$state = $state;
      this.$uibModal = $uibModal;
      this.filter = {
        items: [],
        surveillance: {},
      };
      this.hasAnyRole = authService.hasAnyRole;
      this.networkService = networkService;
      this.statusFont = utilService.statusFont;
      this.defaultRefine = {
        'Active': true,
        'Retired': false,
        'Suspended by ONC-ACB': true,
        'Withdrawn by Developer': true,
        'Withdrawn by Developer Under Surveillance/Review': true,
        'Withdrawn by ONC-ACB': true,
        'Suspended by ONC': true,
        'Terminated by ONC': true,
      };
    }

    $onChanges (changes) {
      if (changes.products) {
        this.products = changes.products.currentValue
          .map(p => {
            let all = {
              version: 'All',
              listings: [],
            };
            p.openSurveillance = 0;
            p.totalSurveillance = 0;
            p.activeAcbs = new Set();
            p.versions.forEach(v => {
              p.openSurveillance += v.listings.reduce((sum, l) => sum += l.openSurveillanceCount, 0);
              p.totalSurveillance += v.listings.reduce((sum, l) => sum += l.surveillanceCount, 0);
              v.listings = v.listings.map(l => {
                l.compliance = JSON.stringify({
                  complianceCount: l.surveillanceCount,
                  openNonConformityCount: l.openSurveillanceNonConformityCount,
                  closedNonConformityCount: l.closedSurveillanceNonConformityCount,
                });
                return l;
              });
              all.listings = all.listings.concat(v.listings);
            });
            p.versions.unshift(all);
            p.activeVersion = p.versions[0];
            p.hasActiveListings = p.versions.filter(v => v.listings.filter(l => l.certificationStatus === 'Active').length > 0).length > 0;
            return p;
          })
          .sort((a, b) => {
            if (a.hasActiveListings !== b.hasActiveListings) {
              return a.hasActiveListings ? -1 : 1;
            }
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          });
      }
      if (changes.searchOptions && changes.searchOptions.currentValue && changes.searchOptions.currentValue.certificationStatuses) {
        this.statusItems = changes.searchOptions.currentValue.certificationStatuses
          .map(cs => {
            let status = {
              value: cs.name,
              selected: this.defaultRefine[cs.name],
            };
            return status;
          })
          .sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));
      }
      if (this.products && this.productId) {
        this.activeProduct = this.products
          .filter(p => p.productId === parseInt(this.productId, 10))[0];
      }
      if (this.products && this.statusItems) {
        this.filter.items = this.statusItems;
        this.doFilter();
      }
    }

    cancel () {
      this.activeProduct = undefined;
      this.onCancel();
    }

    doFilter () {
      this.products.forEach(p => {
        p.versions.forEach(v => {
          if (v.listings) {
            v.listings.forEach(l => {
              l.displayed = this.filter.items.find(i => i.value === l.certificationStatus).selected
                && (!this.filter.surveillance.compliance || compliance(l.compliance, this.filter.surveillance));
            });
          }
        });
      });
    }

    editProduct (product) {
      this.$state.go('organizations.developers.developer.product.edit', {
        productId: product.productId,
      });
    }

    editVersion (product) {
      this.$state.go('organizations.developers.developer.product.version.edit', {
        productId: product.productId,
        versionId: product.activeVersion.versionId,
      });
    }

    handleFilter (filter) {
      if (filter.surveillance) {
        this.filter.surveillance = angular.copy(filter.surveillance);
      } else {
        this.filter.items = filter;
      }
      this.doFilter();
    }

    mergeProduct (product) {
      this.$state.go('organizations.developers.developer.product.merge', {
        productId: product.productId,
      });
    }

    mergeVersion (product) {
      this.$state.go('organizations.developers.developer.product.version.merge', {
        productId: product.productId,
        versionId: product.activeVersion.versionId,
      });
    }

    splitProduct (product) {
      this.$state.go('organizations.developers.developer.product.split', {
        productId: product.productId,
      });
    }

    splitVersion (product) {
      this.$state.go('organizations.developers.developer.product.version.split', {
        productId: product.productId,
        versionId: product.activeVersion.versionId,
      });
    }

    getListingCounts (product) {
      let counts = product.versions
        .filter(v => v.version !== 'All')
        .reduce((acc, v) => {
          acc.active += v.listings.filter(l => l.certificationStatus === 'Active').length;
          acc.total += v.listings.length;
          return acc;
        }, {active: 0, total: 0});
      let ret = '';
      if (counts.active > 0) {
        ret += counts.active + ' active / ';
      }
      ret += counts.total + ' listing';
      if (counts.total !== 1) {
        ret += 's';
      }
      return ret;
    }

    handleEdit (action, data) {
      switch (action) {
      case 'cancel':
        this.cancel();
        break;
      case 'edit':
        this.save(data);
        break;
                //no default
      }
    }

    noVisibleListings (product) {
      return product.activeVersion && product.activeVersion.listings
        .filter(l => l.displayed)
        .length === 0;
    }

    save (data) {
      this.onEdit({data: data});
    }

    viewCertificationStatusLegend () {
      this.viewCertificationStatusLegendInstance = this.$uibModal.open({
        templateUrl: 'chpl.components/certification-status/certification-status.html',
        controller: 'CertificationStatusController',
        controllerAs: 'vm',
        animation: false,
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
      });
      this.viewCertificationStatusLegendInstance.result.then(() => {
        angular.noop;
      }, () => {
        angular.noop;
      });
    }
  },
};

angular.module('chpl.components')
  .component('chplProducts', ProductsComponent);
