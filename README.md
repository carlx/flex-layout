# Angular 2 Layouts

This is a TypeScript implementation for Angular 2 *flexbox* Layouts. This module provides Angular 2 developers with component layout features using a custom Layout API & internal flexbox-2016 css stylings. 

> This Angular 2 version is independent of Angular Material (v1 or v2); but is currently only available for Angular 2 applications


### Fast Start

Developers can easily install this `@angular/layouts` library using **npm**:

```console
npm install @angular/layouts -save
```

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
<div layout="row">
  <div [layout]="firstCol" [flex]="firstColWidth" >
    <div flex="27%"> First item in row  </div>
    <div flex      > Second item in row </div>
  </div>
  <div [layout]="secondCol" flex >
    <div flex       > First item in column  </div>
    <div flex="33px"> Second item in column </div>
  </div>
</div>
``` 


### Overview

The Angular Layout features provide smart, syntactic sugar to allow developers to easily and intuitively create 
responsive and adaptive layouts. The public **Layout API** is a simply list of HTML attributes that can be used on HTML containers and elements:

![demos3](https://cloud.githubusercontent.com/assets/210413/11566167/e074446c-99a6-11e5-8b69-4e84ed0a1dde.jpg)

<br/>

| HTML Markup API | Allowed values (raw or interpolated) |
|-----------------|----------------------------------------------------------------------------|
|  layout         | `row | column | row-reverse | column-reverse`                                                          |                  
|  layout-wrap    | `"" | wrap | none | nowrap | reverse`                                     |                   
|  layout-align   | `start|center|end|space-around|space-between` `start|center|end|stretch`|                   
|  flex           | "" , px , %                                                              |              
|  flex-fill      |                                                                            |
|  flex-order     | int                                                                        |                       
|  flex-offset    | %, px                                                                         |     
|  flex-align     | `start|baseline|center|end` |                   

<br/>


And if we use Breakpoints as specified in Material Design:

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

If we combine the breakpoint `alias` with the Layout API we can easily support Responsive breakpoints with a simple markup convention: the `alias` is used as suffix extensions to the Layout API.:

```html
<api>-<breakpoint alias>=<value>
```

Below is an example usage of the Responsive Layout API:

```html
<div layout='column' class="zero">

  <div flex="33" flex-md="{{ vm.box1Width }}" class="one" ></div>
  <div flex="33" layout="{{ vm.direction }}" layout-md="row" class="two">

    <div flex="22"   flex-md="10" hide-lg                         class="two_one"></div>
    <div flex="30px" show hide-md="{{ vm.hideBox }}" flex-md="25" class="two_two"></div>
    <div flex="20"   flex-md="65"                                 class="two_three"></div>

  </div>
  <div flex class="three"></div>

</div>
```

<br/>

---

#### 'Generation 1' Implementation 

Early versions used both complex SCSS rules and JS directives to dynamically map Layout DOM attributes/markup to equivalent CSS classNames... and inject those classNames into the DOM element class list. A separate SCSS file contained complex rules and nestings with `for-loops`.

This complexity of SCSS and Angular Layout directives was used to build (and group by classNames) CSS styles for the supported mediaQuery breakpoints and possible layout values.

Here is a sample of the SCSS rule generators:

```scss
@mixin flex-properties-for-name($name: null) {
  $flexName: 'flex';
  @if $name != null {
    $flexName: 'flex-#{$name}';
    $name : '-#{$name}';
  } @else {
    $name : '';
  }

  .#{$flexName}             { flex: 1;         box-sizing: border-box; }  // === flex: 1 1 0%;
  .#{$flexName}-grow        { flex: 1 1 100%;  box-sizing: border-box; }
  .#{$flexName}-initial     { flex: 0 1 auto;  box-sizing: border-box; }
  .#{$flexName}-auto        { flex: 1 1 auto;  box-sizing: border-box; }
  .#{$flexName}-none        { flex: 0 0 auto;  box-sizing: border-box; }

  // (1-20) * 5 = 0-100%
  @for $i from 0 through 20 {
    $value : #{$i * 5 + '%'};

    .#{$flexName}-#{$i * 5} {
      flex: 1 1 #{$value};
      max-width: #{$value};
      max-height: 100%;
      box-sizing: border-box;
    }

    .layout-row > .#{$flexName}-#{$i * 5},
    .layout#{$name}-row > .#{$flexName}-#{$i * 5} {
      flex: 1 1 #{$value};
      max-width: #{$value};
      max-height: 100%;
      box-sizing: border-box;
    }

    .layout-column > .#{$flexName}-#{$i * 5},
    .layout#{$name}-column > .#{$flexName}-#{$i * 5} {
      flex: 1 1 #{$value};
      max-width: 100%;
      max-height: #{$value};
      box-sizing: border-box;
    }
  }
}
```
> In order to apply the styles with correct CSS specificity, large quantities of NON-trivial, cumbersome Layout CSS styles were required.

And here is the static HTML markup that could be used:

```html
<div>

  <div layout="row">

    <div flex>First item in row</div>
    <div flex>Second item in row</div>

  </div>
  <div layout="column">

    <div flex>First item in column</div>
    <div flex>Second item in column</div>

  </div>

</div>
```

Which - at run-time - is transformed to use CSS classNames and externally defined stylesheets:

```html
<div>
  
  <div class="ng-scope layout-row">
    
    <div class="flex">First item in row</div>
    <div class="flex">Second item in row</div>

  </div>  
  <div class="ng-scope layout-column">
  
    <div class="flex">First item in column</div>
    <div class="flex">Second item in column</div>
  
  </div>

</div>
```

<br/>

##### Summary 

This Gen1 approach suffers from many issues:

*  Complexity of runtime conversion of layout attributes to classnames (required due to huge performance issues with IE)
*  Large file sizes for the generated, external stylesheets: >180Kb unminified
*  CSS specificity rules impact Layout CSS and sometimes produces unexpected results
*  The CSS rules are limited to values of 0 - 100 in increments of 5
*  Breakpoints are hard-coded and very difficult to extend or configure

<br/>

--- 

#### 'Generation 2' Implementation

The revised architecture for Layouts eliminates `all` external stylesheets and SCSS files. This is a pure, Angular JS Layout engine that is both independent of Angular Material and easily used within ngMaterial.

Layout directives are used to create Layout injectors; which inject specific flexbox css directly to the DOM element. For example, consider the use of the `layout="row"` and `layout-align="center center"` directives.

Static Markup:

```html
<div layout="{{vm.direction}}" layout-align="center center">
	<div>one</div>
	<div>two</div>
	<div>three</div>
</div>
```

is transformed to Dynamic styles:

```html
<div layout="row" layout-align="center center"
      style="display: flex; flex-direction: row; max-width: 100%; box-sizing: border-box; justify-content: center; align-content: center; align-items: center;">
  <div style="max-width: 100%; box-sizing: border-box;">one</div>
  <div style="max-width: 100%; box-sizing: border-box;">two</div>
  <div style="max-width: 100%; box-sizing: border-box;">three</div>
</div>
```

#### Demos

The **Generation 1** [layout demos](https://material.angularjs.org/latest/layout/grid) are included here to quickly demonstrate matching functionality (and more) when using the Gen2 implementation.

![demos2](https://cloud.githubusercontent.com/assets/210413/11286935/cc5b325c-8edd-11e5-9723-f866ec69fd97.jpg)

<br/>


#### Summary

Not only is the generation-2 codebase easier to maintain and debug, other more important benefits have been realized:

*  No external CSS requirements
*  Support for modified/additional breakpoints
*  Notifications for breakpoints changes
  *  Includes workaround for MediaQuery issues with **overlapping** breakpoints; see [**fix mediaQueryWatcher**](https://github.com/angular/material-layouts/commit/2d0406d308eb880113855d0e750df25091f7bb29)
*  Support (future) for Handset/Tablet and Orientation breakpoints
*  Support for **ANY** Layout injector value (instead of increments for 5)
*  Watchers for Layout injector values
*  Support for raw values or interpolated values
*  Support for raw, percentage or px-suffix values

<br/>

>  The code has been initially implemented with es6 and JSPM. A trans-compile process will be used to generate es5 versions and subsequent modifications will allow those files to be compiled into a `material.layout` module. Efforts in 2016 will focus on quickly converting the es6 codebase to TypeScript; which may become the master version used for both ngMaterial v1.x and v2.x

<br/>

---

#### Build


Use JSPM to build a self-extracting, minified, es5 dist file `material.layouts.min.js`:

```console
jspm bundle-sfx src/Layout.es6 - angular dist/material.layouts.min.js --globals "{'angular':'angular'}" -m
```

> Note that this deployable bundle:
> *  excludes the Angular library (considered an external dependency), and 
> *  has a file size < 75Kb!

<br/>

To use the bundle and the required, external AngularJS framework:

```html
<script src="/jspm_packages/github/angular/bower-angular@1.4.8/angular.js"></script>
<script src="/dist/material.layouts.min.js"></script>

<script type="text/javascript">

      angular
          .module('starterApp', ['ngMaterial', 'material.layouts'])
          .controller('DemoController',function($scope){
            
          });

</script>
```

> See the **[JSMP Configuration API](https://github.com/systemjs/systemjs/blob/master/docs/config-api.md#packages)** for details on build options.

<br/>

----

#### Angular Material

This library can be easily used with Angular Material, but the Material *Layout* directives need to be disabled so this Gen2 code will work properly:

Install latest version of Angular Material using:

```console
jspm install angular-material=github:angular/bower-material@master;
```

Modify the `boot.js` to include Angular Material resources:

```js
import angular  from 'angular'             // Load Angular library
import material from 'angular-material'    // Load Angular Material library
import mdLayouts from 'src/Layout.es6.js'  // Load Gen2 Layout modules

import 'angular-material/angular-material.css!' // Load Material CSS styles


/**
 * Manually bootstrap the application when AngularJS and
 * the application classes have been loaded.
 */
angular
  .element( document )
  .ready( function() {

    let appName = 'test-app';

    let body = document.getElementsByTagName("body")[0];
    let app  = angular
          .module( appName, [ mdLayouts, 'ngMaterial'] );

    angular.bootstrap( body, [ app.name ], { strictDi: false })

  });
```


Modify each demo with this simply change:

```html
<body md-layout-css ng-cloak>
...
</body>
```


<br/>

----

#### Adaptive Layouts (future)

Different from responsive layouts where components change sizes and positions, the concepts of Adaptive layouts provide for UX where  **different components** may be used for different breakpoints. 

The Gen2 engine here uses a MediaQueryWatcher in a Publish/Subcribe architecture. Layout injectors use an adaptor to subscribe to breakpoint change notifications. This subscription pattern can be extended to easily support breakpoint notifications to trigger Adaptive UX changes.

#### More possibilities (future)

With the new MediaQuery Pub/Sub mechanisms and Breakpoints, it would be quite easy to extend these injector-subscriber ideas to support constructs such as:

```html
<div md-class-sm="{'role_admin' : vm.isAdmin()}">
   ... Admin content here
</div>
```
