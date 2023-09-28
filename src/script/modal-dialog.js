import {
  LitElement,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class ModalDialog extends LitElement {
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
      Alpine.data("ModalDialog", () => ({
        count: 0,
        label: _label,
      }));
      // see https://stackoverflow.com/questions/72740759/webcomponent-in-template-and-alpine-js
      Alpine.initTree(this.shadowRoot); //必ず最後に
    });
    return html`
      <link href="/style.css" rel="stylesheet" />
      <div
        x-data="{ modalOpen: false }"
        @keydown.escape.window="modalOpen = false"
        class="relative z-50 w-auto h-auto"
      >
        <button @click="modalOpen=true" class="jumpu-outlined-button">
          Open
        </button>
        <template x-teleport="body">
          <div
            x-show="modalOpen"
            class="fixed top-0 left-0 z-[99] flex items-center justify-center w-screen h-screen"
            x-cloak
          >
            <div
              x-show="modalOpen"
              x-transition:enter="ease-out duration-300"
              x-transition:enter-start="opacity-0"
              x-transition:enter-end="opacity-100"
              x-transition:leave="ease-in duration-300"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0"
              @click="modalOpen=false"
              class="absolute inset-0 w-full h-full bg-black bg-opacity-40"
            ></div>
            <div
              x-show="modalOpen"
              x-trap.inert.noscroll="modalOpen"
              x-transition:enter="ease-out duration-300"
              x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
              x-transition:leave="ease-in duration-200"
              x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
              x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              class="relative w-full py-6 bg-white px-7 sm:max-w-lg sm:rounded-lg"
            >
              <div class="flex items-center justify-between pb-2">
                <h3 class="text-lg font-semibold">Modal Title</h3>
                <button
                  @click="modalOpen=false"
                  class="absolute top-2 right-2 jumpu-icon-button"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="relative w-auto">
                <p>
                  This is placeholder text. Replace it with your own content.
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    `;
  }
}
customElements.define("modal-dialog", ModalDialog);
