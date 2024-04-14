import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmBorderCard]'
})
export class BorderCardDirective {

  constructor(private el: ElementRef) { 
    this.setHeight(200);
    this.setBorder("#f5f5f5")
  }

  @Input('pkmBorderCard') borderColor: string = ''

  private isDefaultBg: boolean = true;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || 'green')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder("#f5f5f5")
  }

  /* EXERCICE : Au double click la couleur de l'arriere plan change, quand on reclick ca se remet par defaut */
  @HostListener('dblclick') onClick() {
    if(this.isDefaultBg){
      this.setBg("#b8c9b5")
    }else {
      this.setBg("transparent")
    }
    this.isDefaultBg = !this.isDefaultBg;
  }

  setBg(bgColor: string ) {
    this.el.nativeElement.style.backgroundColor = `${bgColor}`
  }

  setHeight(height: number){
    this.el.nativeElement.style.height = `${height}px`
  }

  setBorder(color: string){
    this.el.nativeElement.style.border = `4px solid ${color}`
  }

}
