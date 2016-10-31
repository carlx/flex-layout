# Angular 2 Layouts

Angular Layouts provides a sophisticated layout API using FlexBox CSS + mediaQuery. This module provides Angular 2 developers with component layout features using a custom Layout API, mediaQuery observables,and injected DOM flexbox-2016 css stylings. 

> This Angular 2 version is independent of Angular Material (v1 or v2); but is currently only available for Angular 2 applications


#### Layout Demos

![layoutdemos](https://cloud.githubusercontent.com/assets/210413/19868966/511c8eea-9f78-11e6-9692-7a23f399b502.jpg)


Use the following command to start the WebPack server and launch the demo application with its non-responsive and responsive demos:

```
npm run start	
```

These static and responsive Layout Demos are based on real samples used in:

*  Angular Material v1.x Layout Documentation
*  GitHub Issuses
*  StackOverflow Issues
*  CodePen Issues


### Fast Start

> Note: This ^ feature is pending public release of the Github repository!

Developers can easily install this `@angular/layouts` library using **npm** (pending feature):

```console
npm install @angular/layouts -save
```


#### Application Usages
In their application module, developers import the global Layout API directives (as shown below): 

```ts
// demo-app-module.ts

import { AngularLayouts } from '@angular/layouts';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, HttpModule, 
    AngularLayouts.forRoot(),           // import dependency on ng2 Layouts
  ], 
)}
export class DemoAppModule { }
```

In their component templates, developers easily use the Layout API to build
complex, dynamic layouts:

```html
<div ng-layout="row">
  <div [ng-layout]="firstCol" [ng-flex]="firstColWidth" >
    <div ng-flex="27%"> First item in row  </div>
    <div ng-flex      > Second item in row </div>
  </div>
  <div [ng-layout]="secondCol" flex >
    <div ng-flex       > First item in column  </div>
    <div ng-flex="33px"> Second item in column </div>
  </div>
</div>
``` 


### API Overview

The Angular Layout features provide smart, syntactic directives to allow developers to easily and intuitively create 
responsive and adaptive layouts using Flexbox CSS. The public **Layout API** is a simply list of HTML attributes that can be used on HTML containers and elements:

| HTML Markup API | Allowed values (raw or interpolated) |
|-----------------|----------------------------------------------------------------------------|
|  ng-layout         | `row | column | row-reverse | column-reverse`                                                          |                  
|  ng-layout-wrap    | `"" | wrap | none | nowrap | reverse`                                     |                   
|  ng-layout-align   | `start|center|end|space-around|space-between` `start|center|end|stretch`|                   
|  ng-flex           | "" , px , %                                                              |              
|  ng-flex-fill      |                                                                            |
|  ng-flex-order     | int                                                                        |                       
|  ng-flex-offset    | %, px                                                                         |     
|  ng-flex-align     | `start|baseline|center|end` |                   

Static Markup Example:

```html
<div ng-layout='column' class="zero">

  <div ng-flex="33" class="one" ></div>
  <div ng-flex="33" ng-layout="{{ vm.direction }}" class="two">

    <div ng-flex="22"    class="two_one"></div>
    <div ng-flex="205"   class="two_two"></div>
    <div ng-flex="30px"  class="two_three"></div>

  </div>
  <div ng-flex class="three"></div>

</div>
```

### Responsive Features

And if we use Breakpoints as specified by Material Design:

![](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B8olV15J7abPSGFxemFiQVRtb1k/layout_adaptive_breakpoints_01.png)

<br/>

We can associate breakpoints with mediaQuery definitions using breakpoint **alias(es)**:

| breakpoint | mediaQuery |
|--------|--------|
| ""    | 'screen'                                                |
| xs    | 'screen and (max-width: 599px)'                         |
| gt-xs | 'screen and (min-width: 600px)'                         |
| sm    | 'screen and (min-width: 600px) and (max-width: 959px)'  |
| gt-sm | 'screen and (min-width: 960px)'                         |
| md    | 'screen and (min-width: 960px) and (max-width: 1279px)' |
| gt-md | 'screen and (min-width: 1280px)'                        |
| lg    | 'screen and (min-width: 1280px) and (max-width: 1919px)'|
| gt-lg | 'screen and (min-width: 1920px)'                        |
| xl    | 'screen and (min-width: 1920px)'                        |
<br/>

If we combine the breakpoint `alias` with the Layout API we can easily support Responsive breakpoints with a simple markup convention: the `alias` is used as suffix extensions to the Layout API:

```html
<api>.<breakpoint alias>='<value>'
```

Below is an example usage of the Responsive Layout API:

```html
<div ng-layout='column' class="zero">

  <div ng-flex="33" ng-flex.md="{{ vm.box1Width }}" class="one" ></div>
  <div ng-flex="33" ng-layout="{{ vm.direction }}" layout.md="row" class="two">

    <div ng-flex="22"    ng-flex.md="10px" hide.lg                       class="two_one"></div>
    <div ng-flex="205"   ng-flex.md="65"                                 class="two_two"></div>
    <div ng-flex="30px"  ng-show hide.md="{{ hideBox }}" ng-flex.md="25" class="two_three"></div>

  </div>
  <div ng-flex class="three"></div>

</div>
```

<br/>

#### Implementation

The Angular 2 architecture for Layouts eliminates `all` external Flexbox stylesheets and SCSS files (as used in Angular Material 1 Layout API). 

This is a pure, Angular Layout engine that is independent of Angular Material yet can be used easily within any Material 2 application.

The Layout API directives are used to create DOM element style injectors which inject specific, custom Flexbox CSS directly to the DOM element. For example, consider the use of the `ng-layout="row"` and `ng-layout-align="center center"` directives.

Static Markup:

```html
<div ng-layout="{{vm.direction}}" ng-layout-align="center center">
	<div>one</div>
	<div>two</div>
	<div>three</div>
</div>
```

is transformed with inline, injected styles:

```html
<div ng-layout="row" ng-layout-align="center center"
      style="display: flex; flex-direction: row; max-width: 100%; box-sizing: border-box; justify-content: center; align-content: center; align-items: center;">
  <div style="max-width: 100%; box-sizing: border-box;">one</div>
  <div style="max-width: 100%; box-sizing: border-box;">two</div>
  <div style="max-width: 100%; box-sizing: border-box;">three</div>
</div>
```

#### Summary

Not only is the generation-2 codebase easier to maintain and debug, other more important benefits have been realized:

*  No external CSS requirements
*  Override provide to supply custom breakpoints
*  Notifications for breakpoints changes
  *  Includes workaround for MediaQuery issues with **overlapping** breakpoints
*  Support (future) for Handset/Tablet and Orientation breakpoints
*  Support for **ANY** Layout injector value (instead of increments for 5)
*  Change dectection for Layout injector values
*  Support for raw values or interpolated values
*  Support for raw, percentage or px-suffix values

<br/>

---

#### Build Instructions


Use Gulp and Rollup to build a UMD `layouts.umd.js`:

```console
gulp build:components
```

To use the bundle and the required, external AngularJS framework:

```html
<script src="/dist/@angular/layouts/layouts.umd.js"></script>


```

<br/>

----

#### Adaptive Layouts (future)

Different from responsive layouts where components change sizes and positions, the concepts of Adaptive layouts provide for UX where  **different components** may be used for different breakpoints. 

The Gen2 engine here uses a MediaQueryWatcher in a Publish/Subcribe architecture. Layout injectors use an adaptor to subscribe to breakpoint change notifications. This subscription pattern can be extended to easily support breakpoint notifications to trigger Adaptive UX changes.


