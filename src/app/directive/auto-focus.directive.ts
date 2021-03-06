import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

    @Input() public wantsFocus: boolean;

    public constructor(private el: ElementRef) {

    }

    public ngAfterContentInit() {

        setTimeout(() => {
            console.log(this.wantsFocus)
            if(this.wantsFocus){
                this.el.nativeElement.focus();
            }

        }, 100);

    }

}