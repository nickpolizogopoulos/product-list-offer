import {
    Component,
    signal
} from "@angular/core";

@Component({
    selector: 'app-back-to-top',
    standalone: true,
    host: {
        '(window:scroll)': 'onVisibilitySet($event)',
        '(click)': 'scrollToTop()'
    },
    template: `

        @if (visible()) {
            <svg
                width="35" height="35"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
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
            color: rgb(206, 206, 206);
            border: 1px solid transparent;
            background-color: transparent;
            transition: all 0.2s ease-in-out;
            border-radius: 7px;
            z-index: 100;
            
            &:hover {
                color: rgb(206, 206, 206);
                border: 1px solid rgb(189, 189, 189);
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

    private isVisible = signal<boolean>(false);
    visible = this.isVisible.asReadonly();

    private onVisibilitySet(): void {
        this.isVisible.set(window.scrollY > 120);
    }

    private scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

}