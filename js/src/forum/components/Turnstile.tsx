import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';

import type { VnodeDOM, Vnode } from 'mithril';

interface ITurnstileAttrs {
  action?: string;
  onTurnstileStateChange?: (token: string | null) => void;
}

export default class Turnstile extends Component<ITurnstileAttrs> {
  widgetId?: string;
  turnstileLoaded!: boolean;

  oninit(vnode: Vnode<ITurnstileAttrs, this>) {
    super.oninit(vnode);

    this.turnstileLoaded = !!window.turnstile;
  }

  get config() {
    const { action } = this.attrs;

    return {
      action,
      theme: this.getCurrentTheme(),
      language: app.translator.getLocale() || 'auto',
      sitekey: app.forum.attribute('blomstra-turnstile.site_key'),
      size: 'flexible',
      callback: this.onTurnstileComplete.bind(this),
      'expired-callback': this.onTurnstileExpire.bind(this),
      'error-callback': this.onTurnstileError.bind(this),
    };
  }

  getCurrentTheme() {
    const getTheme = flarum.extensions['fof-nightmode']?.getTheme;
    const Themes = flarum.extensions['fof-nightmode']?.Themes;

    if (getTheme && Themes) {
      let currentTheme = getTheme();

      if (currentTheme === Themes.AUTO) {
        currentTheme = window.matchMedia('(prefers-color-scheme:dark)').matches ? Themes.DARK : Themes.LIGHT;
      }

      if (currentTheme === Themes.DARK) {
        return 'dark';
      } else if (currentTheme === Themes.LIGHT) {
        return 'light';
      }
    }

    // fof/nightmode is not installed, so we fall back to detecting if the forum has been set to dark mode or not.
    return !!!app.forum.attribute('turnstile_dark_mode') ? 'light' : 'dark';
  }

  onTurnstileComplete(token: string) {
    this.attrs.onTurnstileStateChange?.(token);
  }

  onTurnstileExpire() {
    if (this.widgetId) window.turnstile.reset(this.widgetId);

    this.attrs.onTurnstileStateChange?.(null);
  }

  onTurnstileError() {
    this.attrs.onTurnstileStateChange?.(null);
  }

  createTurnstile() {
    if (!this.turnstileLoaded) return;

    window.turnstile.render(this.element, this.config);
  }

  removeTurnstile() {
    if (!this.turnstileLoaded) return;

    if (this.widgetId) window.turnstile.remove(this.widgetId);
  }

  oncreate(vnode: VnodeDOM<ITurnstileAttrs, this>): void {
    super.oncreate(vnode);

    this.createTurnstile();
  }

  onbeforeremove(vnode: VnodeDOM<ITurnstileAttrs, this>): void {
    super.onbeforeremove(vnode);

    this.removeTurnstile();
  }

  view(vnode: VnodeDOM<ITurnstileAttrs, this>) {
    if (!this.turnstileLoaded) {
      return <p class="BlomstraTurnstile-notLoaded">{app.translator.trans('blomstra-turnstile.forum.not_loaded_error')}</p>;
    }

    return <div class="Blomstra-Turnstile Form-group" />;
  }
}
