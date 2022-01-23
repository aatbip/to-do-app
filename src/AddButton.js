import { ContentSheet } from "./ContentSheet.js";

const tmpl = document.createElement("template");
tmpl.innerHTML = `
    <style>
        img {
            width: 40px; 
            height: 40px; 
            cursor: pointer; 
        }

        img:hover {
            opacity: 0.5; 
        }

        .add-button-wrapper {
            width: 20%; 
            float: left; 
        }

       
    </style>

    <div class= "add-button-wrapper"> 
        <img class="add-button" /> 
    </div> 
`;

class AddButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
    this.shadowRoot.querySelector("img").src =
      this.getAttribute("addButtonImage");

    this.addButton = this.shadowRoot.querySelector(".add-button");
  }

  connectedCallback() {
    this.contentSheetContainer = document.querySelector(
      ".content-sheet-container"
    );
    this.contentSheet = document.querySelector(".content-sheet");
    this.addButton.addEventListener("click", () => {
      this.contentSheet = new ContentSheet();
      this.contentSheetContainer.appendChild(this.contentSheet);
    });
  }

  disconnectedCallback() {
    this.addButton.removeEventListener();
  }
}

window.customElements.define("add-button", AddButton);
