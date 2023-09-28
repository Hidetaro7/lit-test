import {
  LitElement,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class MyElement extends LitElement {
  static properties = {
    myLabel: { type: String },
  };
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.myLabel = "default label";
  }
  render() {
    const _label = this.myLabel;
    document.addEventListener("alpine:init", () => {
      Alpine.data("myelement", () => ({
        count: 0,
        label: _label,
      }));
      Alpine.initTree(this.shadowRoot); //必ず最後に
    });
    return html`
      <link href="/style.css" rel="stylesheet" />
      <div x-data="myelement" class="bg-slate-100 rounded-xl p-16">
        <button
          class="jumpu-button"
          @click="count++,$dispatch('foo')"
          x-text="label"
        ></button>
        <p x-text="count" class="text-xl font-bold"></p>
      </div>
    `;
  }
}
customElements.define("my-element", MyElement);
