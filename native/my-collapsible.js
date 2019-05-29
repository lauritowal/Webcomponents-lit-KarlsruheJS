import './my-90button.js';

(function () {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                display: block;
            }

            span,
            my-90button {
                width: 100%;
            }   

            #description {
                display: none;
                width: 100%;
                padding: 2em;
                background-color: magenta;
                text-align: center
            }

            :host([opened]) #description {
                display: block;
            }

            /* show + if not opened */
            :host(:not([opened])) #toggleSymbol:after {
                content: "+";
            }

            /* show - if opened */
            :host([opened]) #toggleSymbol:after {
                content: "-";
            }

        </style>

        <my-90button id="button">
            <slot name="title"></slot> <span id="toggleSymbol"></span>
        </my-90button>
        <div id="description">
            <slot></slot>
        </div>  
    `;

    class MyCollapsible extends HTMLElement {
        constructor() {
            super();

            // Create a shadow root
            this.attachShadow({ mode: 'open' });

            // add template to shadow root
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            const button = this.shadowRoot.getElementById("button");
            button.addEventListener('click', this.toggleCollapsible.bind(this));
        }

        // get value of attribute 'opened'
        get opened() {
            return this.hasAttribute('opened');
        }

        // set value of attribute 'opened' when property changed
        set opened(isOpened) {
            if (isOpened) {
                this.setAttribute('opened', '');
            } else {
                this.removeAttribute('opened');
            }
        }

        toggleCollapsible() {
            this.opened = !this.opened;
        }

        static get observedAttributes() {
            return ['opened'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`Attribute ${name} changed`);
        }
    }
    customElements.define('my-collapsible', MyCollapsible);
})();