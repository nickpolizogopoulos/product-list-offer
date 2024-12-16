import {
    Component,
    signal
} from "@angular/core";

@Component({
    selector: 'app-back-to-top',
    standalone: true,
    host: {
        '(window:scroll)': 'onVisibilitySet($event)'
    },
    template: `

        @if (visible()) {
            <svg
                (click)="scrollToTop()"
                width="35" height="35"
                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
            >
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
            </svg>
        }
    
    `,
    styles: `
    
        svg {
            position: fixed;
            padding: 5px;
            bottom: 30px;
            right: 30px;
            cursor: pointer;
            color: #e0e0e0;
            border: 1px solid transparent;
            background-color: transparent;
            transition: all 0.2s ease-in-out;
            border-radius: 7px;
            z-index: 100;
            
            &:hover {
                color: #e0e0e0;
                border: 1px solid #e0e0e0;
            }
            
            @media screen and (max-width: 1300px) {
                bottom: 25px;
                right: 25px;
                color: white;
                background-color: rgba(186, 186, 186, 0.3);
                border: 1px solid white;
            }
        }
    
    `
})
export class BackToTopComponent {

    visible = signal<boolean>(false);

    private onVisibilitySet(): void {
        this.visible.set(window.scrollY > 350);
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

}