import { LitElement, html, css } from 'lit-element';
import './lit-90button';

class LitCollapsible extends LitElement {

    static get properties() {
        return {
            opened: { type: Boolean, reflect: true }
        };
    }

    /**
     * Makes sure styles are used for all instances of a LitElement component
     * instead of evaluating and applying styles per instance
     */
    static get styles() {
        return css`
            :host {
                display: block;
                width: 30em;
            }
            span,
            lit-90button {
                width: 100%;
            }   
            #description {
                width: 100%;
                padding: 2em;
                background-color: magenta;
                text-align: center
            }
        `;
    }

    render() {
        let descriptionTemplate = html`
            <div id="description">
                <slot>No Content</slot>
            </div>
        `;

        return html`
            <lit-90button id="button" @click=${this.toggleCollapsible}>
                <slot name="title"></slot> <span id="toggleSymbol">${this.opened ? '-' : '+'}</span>
            </lit-90button>
            
            ${this.opened ? descriptionTemplate : ''}
        `;
    }

    toggleCollapsible() {
        this.opened = !this.opened;
    }
}

customElements.define('lit-collapsible', LitCollapsible);