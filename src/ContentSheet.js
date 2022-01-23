const contentSheet = document.createElement("template");
contentSheet.innerHTML = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300&family=Montserrat:wght@300&family=Press+Start+2P&family=Sedgwick+Ave&display=swap');


        .content-sheet-wrapper {
            width: 100%; 
            overflow: hidden; 
        }

        .task-header {
            float: left; 
            width: 60%; 

        }

        .task-header-input {
            min-height: 20px; 
            width: 100%; 
            border: none; 
            font-size: 40px; 
            background-color: #e0e0fd; 
            border-radius: 20px; 
          font-family: 'Montserrat', sans-serif;
        }

        .task-details {
            min-height: 150px; 
            width: 100%; 
            border: none; 
            font-size: 30px; 
            display: none; 
            margin-bottom: 10px; 
            background-color: #ecebfc; 
            border-radius: 20px; 

          font-family: 'Montserrat', sans-serif;

        }

        .task-icons {
            float: left; 
            width: 35%; 
            margin-left: 5px; 
        }

        .details-icon {
            float: left; 

        }

        .task-complete-icon {
            float: left; 
        }

        .details-icon img {
            width: 35px; 
            height: 35px; 
            cursor: pointer; 
        }

        .task-complete-icon img {
            width: 29px; 
            height: 29px; 
            margin-top: 3px; 
            cursor: pointer; 

        }

        .trash-can-icon img {
            width: 30px; 
            height: 26px; 
            margin-top: 4px; 
            cursor: pointer; 


        }

        .details-icon img:hover{
            opacity: 0.5; 
        }

        .task-complete-icon img:hover {
            opacity: 0.5; 
        }

        .trash-can-icon img:hover {
            opacity: 0.5; 
        }
       
    </style>

    <div class= "content-sheet-wrapper"> 
        <div class="task-header"> 
            <textarea class="task-header-input" type="text" placeholder="Enter you task heading"></textarea>
            <textarea class="task-details" type="text" placeholder="Enter task details here..."></textarea> 
        </div>
        <div class="task-icons"> 
            <div class="details-icon"> 
                <img id="details-icon" src="./images/hover-down.png" alt="hover down icon">
            </div>
            
            <div class="task-complete-icon"> 
                <img id = "task-complete-icon" src="./images/tick-box.png" alt="tick box icon">
            </div> 

            <div class="trash-can-icon"> 
                <img id = "trash-can-icon" src="./images/trashcan-button.png" alt="tick box icon">
            </div> 
        </div> 
    </div> 
`;

class ContentSheet extends HTMLElement {
  constructor() {
    super();
    this.taskDetailsHidden = true;
    this.taskCompleted = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(contentSheet.content.cloneNode(true));

    this.detailsIcon = this.shadowRoot.querySelector("#details-icon");
    this.trashCanIcon = this.shadowRoot.querySelector("#trash-can-icon");
    this.taskCompleteIcon = this.shadowRoot.querySelector(
      "#task-complete-icon"
    );
  }

  connectedCallback() {
    this.contentSheet = this.shadowRoot.querySelector(".content-sheet-wrapper");
   
    this.taskDetails = this.shadowRoot.querySelector(".task-details");
    this.taskHeaderInput = this.shadowRoot.querySelector(".task-header-input");

    this.detailsIcon.addEventListener("click", () => {
      if (this.taskDetailsHidden) {
        this.taskDetails.style.display = "block";
        this.taskDetailsHidden = false;
      } else if (this.taskDetailsHidden == false) {
        this.taskDetails.style.display = "none";
        this.taskDetailsHidden = true;
      }
    });

    this.trashCanIcon.addEventListener("click", () => {
      this.contentSheet.remove();
    });

    this.taskCompleteIcon.addEventListener("click", () => {
      if (!this.taskCompleted) {
        this.taskCompleteIcon.style.backgroundColor = "#b3b2f8";
        this.taskHeaderInput.style.textDecoration = "line-through";
        this.taskCompleted = true;
      } else if (this.taskCompleted) {
        this.taskCompleteIcon.style.backgroundColor = "";
        this.taskHeaderInput.style.textDecoration = "";

        this.taskCompleted = false;
      }
    });
  }

  disconnectedCallback() {
    this.detailsIcon.removeEventListener(); 
    this.trashCanIcon.removeEventListener(); 
    this.taskCompleteIcon.removeEventListener(); 
  }
}

window.customElements.define("content-sheet", ContentSheet);

export { ContentSheet };
