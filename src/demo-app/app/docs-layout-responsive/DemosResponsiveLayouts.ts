import { Component } from '@angular/core';

@Component({
    selector: 'demos-docs-layout',
    template: `
      <demo-responsive-direction  class="small-demo">  </demo-responsive-direction>
      <demo-responsive-row-column class="small-demo">  </demo-responsive-row-column>
      <demo-responsive-flex-directive  class="small-demo">  </demo-responsive-flex-directive>
      <demo-responsive-show-hide  class="small-demo">  </demo-responsive-show-hide>
    `
})
export class DemosResponsiveLayout { }

import {NgModule}            from '@angular/core';
import {CommonModule}        from "@angular/common";
import {FormsModule}         from "@angular/forms";

import {MaterialModule}      from "@angular/material";
import {LayoutsModule}       from "../../../lib/flexbox/_module";

import {DemoResponsiveRows}  from "./responsiveRowColumns.demo";
import {DemoResponsiveDirection }  from "./responsiveDirections.demo";
import {DemoResponsiveShowHide} from "./responsiveShowHide.demo";
import {DemoResponsiveFlexDirectives} from "./responsiveFlexDirective.demo";


@NgModule({
  declarations : [
    DemosResponsiveLayout,       // used by the Router with the root app component

    DemoResponsiveRows,
    DemoResponsiveDirection,
    DemoResponsiveFlexDirectives,
    DemoResponsiveShowHide

  ],
  imports : [
    CommonModule,
    FormsModule,
    MaterialModule,
    LayoutsModule
  ]

})
export class DemosResponsiveLayoutsModule { }
