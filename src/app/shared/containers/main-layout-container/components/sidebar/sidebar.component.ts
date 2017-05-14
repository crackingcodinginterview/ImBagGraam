import {
  Component,
  ViewEncapsulation,
  HostListener,
  Input,
  ElementRef
} from '@angular/core';

import {
  ThemeSetting
} from '../../../../services/theme-setting';

import {
  NoisMedia
} from '../../../../services/nois-media'

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'sidebar',  // <sidebar></sidebar>
  // Our list of styles in our component. We may add more to compose many styles together
  encapsulation: ViewEncapsulation.None,
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './sidebar.template.html',
  styleUrls: [
    './sidebar.style.scss'
  ]
})
export class SidebarComponent {
  public config: any = {
    // wheelSpeed: 1              // Scroll speed for the mousewheel event (Default: 1).
    // wheelPropagation: false        // Propagate wheel events at the end (Default: false).
    // swipePropagation: true        // Propagate swipe events at the end (Default: true).
    // minScrollbarLength      // Minimum size for the scrollbar (Default: null).
    // maxScrollbarLength      // Maximum size for the scrollbar (Default: null).
    // useBothWheelAxes        // Always use the both wheel axes (Default: false).
    // suppressScrollX         // Disable X axis in all situations (Default: false).
    // suppressScrollY         // Disable Y axis ni all situations (Default: false).
    // scrollXMarginOffset     // Offset before enabling the X scroller (Default: 0).
    // scrollYMarginOffset     // Offset before enabling the Y scroller (Default: 0).
    // stopPropagationOnClick  // Stop the propagation of click event (Default: true).
  };

  constructor(private _themeSetting: ThemeSetting,
              public el: ElementRef,
              private _noisMedia: NoisMedia) {

  }

  // Cache
  private _sidebarEl;

  private get _sidebar() {
    if (!this._sidebarEl) {
      this._sidebarEl = this.el.nativeElement.querySelector('nav.page-sidebar');
    }
    return this._sidebarEl;
  };

  @HostListener('mouseenter')
  public mouseenter() {
    if (this._noisMedia.is('max-width: 991px')) {
      return;
    }

    if (this._themeSetting.menuPin) {
      return true;
    }

    let css = 'translate3d(' + this._themeSetting.sideBarWidthCondensed + 'px, 0,0)';

    if (this._sidebar) {
      this._sidebar.style['-webkit-transform'] = css;
      this._sidebar.style['-moz-transform'] = css;
      this._sidebar.style['-ms-transform'] = css;
      this._sidebar.style['-o-transform'] = css;
      this._sidebar.style['transform'] = css;
    }

    this._themeSetting.sidebarHover = true;
  }

  @HostListener('mouseleave')
  public mouseleave() {
    let css = 'translate3d(0,0,0)';

    if (this._sidebar) {
      this._sidebar.style['-webkit-transform'] = css;
      this._sidebar.style['-moz-transform'] = css;
      this._sidebar.style['-ms-transform'] = css;
      this._sidebar.style['-o-transform'] = css;
      this._sidebar.style['transform'] = css;
    }

    this._themeSetting.sidebarHover = false;
  }

  public pinSidebar(){
    this._themeSetting.menuPin = !this._themeSetting.menuPin;
  }

  public isSidebarOpen(){
    return this._themeSetting.sidebarOpen;
  }

}
