import {
    Component,
    AfterViewInit,
    computed,
    ElementRef,
    input,
    viewChild
} from "@angular/core";
import tippy from "tippy.js";

type ButtonType = 'add' | 'delete';

@Component({
    selector: 'app-add-remove-button',
    standalone: true,
    template: `

        @if (buttonType() === 'add') {
            <button #addProductTooltip class="icon-btn" [class]="hostClasses()" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
            </button>
        }
        @else {
            <button class="icon-btn" [class]="hostClasses()" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
        }

    `
})
export class AddRemoveButton implements AfterViewInit {

    buttonType = input.required<ButtonType>();

    hostClasses = computed<ButtonType>(() => 
        this.buttonType() === 'add' 
        ? 'add'
        : 'delete'
    );
    
    ngAfterViewInit(): void {
        this.initialiseTippy();
    }

    private addProductTooltip = viewChild<ElementRef>('addProductTooltip');
    
    private initialiseTippy(): void {
        tippy(
            this.addProductTooltip()?.nativeElement,
            {
                content: 'Add new product row',
                placement: 'right',
                theme: 'btntip',
                duration: [400, 50],
            }
        );
    }

}