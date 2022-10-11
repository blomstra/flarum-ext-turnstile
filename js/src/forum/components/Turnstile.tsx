import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';

import type { VnodeDOM } from 'mithril';

interface ITurnstileAttrs {
  action?: string;
  onTurnstileStateChange?: (valid: boolean) => void;
}

export default class Turnstile extends Component<ITurnstileAttrs> {
  widgetId?: string;

  get config() {
    const { action } = this.attrs;

    return {
      action,
      sitekey: app.forum.attribute('blomstra-turnstile.site_key'),
      callback: this.onTurnstileComplete,
      'expired-callback': this.onTurnstileExpire,
      'error-callback': this.onTurnstileError,
    };
  }

  onTurnstileComplete() {
    this.attrs.onTurnstileStateChange?.(true);
  }

  onTurnstileExpire() {
    this.attrs.onTurnstileStateChange?.(false);
  }

  onTurnstileError() {
    this.attrs.onTurnstileStateChange?.(false);
  }

  createTurnstile() {
    window.turnstile.render(this.element, this.config);
  }

  oncreate(vnode: VnodeDOM<ITurnstileAttrs, this>): void {}

  view(vnode: VnodeDOM<ITurnstileAttrs, this>) {
    return <div class="Blomstra-Turnstile" />;
  }
}
