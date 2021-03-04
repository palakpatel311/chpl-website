import React/*, { useState }*/ from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import Snackbar from '@material-ui/core/Snackbar';
//import MuiAlert from '@material-ui/lab/Alert';
import theme from '../../../themes/theme';
//import { getAngularService } from './';

function ChplConfirmListings () {

  return (
    <ThemeProvider theme={theme}>
    <div>Text</div>
    </ThemeProvider>
  );
}

export { ChplConfirmListings };

ChplConfirmListings.propTypes = {};

/*
<div class="row" ng-if="$ctrl.hasAnyRole(['ROLE_ADMIN', 'ROLE_ACB'])" ui-view>
  <div class="col-md-12">
    <h2>View Products in the process of upload</h2>
    <p ng-if="!$ctrl.uploadingCps || $ctrl.uploadingCps.length === 0">No products currently in queue</p>
    <div ng-if="$ctrl.uploadedListingsMessages">
      <ul>
        <li ng-repeat="message in $ctrl.uploadedListingsMessages">{{ message }}</li>
      </ul>
    </div>
    <table class="table table-striped" ng-if="$ctrl.uploadingCps.length > 0" id="pending-listings-table">
      <thead>
        <tr>
          <th scope="col">CHPL ID</th>
          <th scope="col">Developer</th>
          <th scope="col">Product</th>
          <th scope="col">Version</th>
          <th scope="col">Certification date</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
          <th scope="col">Mass Reject</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th colspan="7">&nbsp;</th>
          <th>
            <button class="btn btn-danger btn-block"
                    ng-disabled="$ctrl.getNumberOfListingsToReject() < 1"
                    confirm="Are you sure you wish to remove {{ $ctrl.getNumberOfListingsToReject() }} product{{ $ctrl.getNumberOfListingsToReject() > 1 ? 's' : '' }} from the queue?"
                    confirm-ok="Yes"
                    confirm-cancel="No"
                    confirm-settings="{animation: false, keyboard: false, backdrop: 'static'}"
                    ng-click="$ctrl.massRejectPendingListings()"><i class="fa fa-trash-o"></i> Reject</button>
          </th>
        </tr>
      </tfoot>
      <tbody>
        <tr ng-repeat="cp in $ctrl.uploadingCps | orderBy: 'certificationDate' track by cp.id">
          <td>{{ cp.chplProductNumber }}</td>
          <td>{{ cp.developer.name }}</td>
          <td>{{ cp.product.name }}</td>
          <td>{{ cp.version.version }}</td>
          <td>{{ cp.certificationDate | date : 'mediumDate' : 'UTC' }}</td>
          <td>{{ cp.errorCount }} error<span ng-if="cp.errorCount !== 1">s</span> / {{ cp.warningCount }} warning<span ng-if="cp.warningCount !== 1">s</span></td>
          <td class="text-center">
            <button class="btn btn-ai-success btn-block" ng-click="$ctrl.inspectCp(cp.id)"
                    id="pending-listing-inspect-{{ cp.chplProductNumber }}"><i class="fa fa-eye"></i> Inspect</button>
          </td>
          <td class="text-center">
            <input type="checkbox" class="form-control" ng-model="$ctrl.massReject[cp.id]" id="pending-listing-reject-checkbox-{{ cp.id }}">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="col-md-12" feature-flag="enhanced-upload">
    <h2>View (Beta) Products in the process of upload</h2>
    <p ng-if="!$ctrl.uploadedListings || $ctrl.uploadedListings.length === 0">No products currently in queue</p>
    <div ng-if="$ctrl.uploadedListingsMessages">
      <ul>
        <li ng-repeat="message in $ctrl.uploadedListingsMessages">{{ message }}</li>
      </ul>
    </div>
    <table class="table table-striped" ng-if="$ctrl.uploadedListings.length > 0" id="pending-listings-table-beta">
      <thead>
        <tr>
          <th scope="col">CHPL ID</th>
          <th scope="col">Developer</th>
          <th scope="col">Product</th>
          <th scope="col">Version</th>
          <th scope="col">Certification date</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
          <th scope="col">Mass Reject</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th colspan="7">&nbsp;</th>
          <th>
            <button class="btn btn-danger btn-block"
                    ng-disabled="$ctrl.getNumberOfListingsToRejectBeta() < 1"
                    confirm="Are you sure you wish to remove {{ $ctrl.getNumberOfListingsToRejectBeta() }} product{{ $ctrl.getNumberOfListingsToRejectBeta() > 1 ? 's' : '' }} from the queue?"
                    confirm-ok="Yes"
                    confirm-cancel="No"
                    confirm-settings="{animation: false, keyboard: false, backdrop: 'static'}"
                    ng-click="$ctrl.massRejectPendingListingsBeta()"><i class="fa fa-trash-o"></i> Reject</button>
          </th>
        </tr>
      </tfoot>
      <tbody>
        <tr ng-repeat="listing in $ctrl.uploadedListings | orderBy: 'certificationDate' track by listing.id">
          <td>{{ listing.chplProductNumber }}</td>
          <td>{{ listing.developer }}</td>
          <td>{{ listing.product }}</td>
          <td>{{ listing.version }}</td>
          <td>{{ $ctrl.DateUtil.getDisplayDateFormat(listing.certificationDate) }}</td>
          <td>{{ listing.errorCount }} error<span ng-if="listing.errorCount !== 1">s</span> / {{ listing.warningCount }} warning<span ng-if="listing.warningCount !== 1">s</span></td>
          <td class="text-center">
            <button class="btn btn-ai-success btn-block" ng-click="$ctrl.inspectListing(listing.id)"
                    id="pending-listing-inspect-{{ listing.chplProductNumber }}"><i class="fa fa-eye"></i> Inspect</button>
          </td>
          <td class="text-center">
            <input type="checkbox" class="form-control" ng-model="$ctrl.massRejectBeta[listing.id]" id="pending-listing-reject-checkbox-{{ listing.id }}">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div class="row" ng-if="!$ctrl.hasAnyRole(['ROLE_ADMIN', 'ROLE_ACB'])">
  <div class="col-md-6 col-md-offset-3 jumbotron">
    <chpl-login form-class=""
                p-class="bg-success lead"
                p-class-fail="bg-danger lead">
    </chpl-login>
  </div>
</div>
*/
