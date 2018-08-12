import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResizer]'
})
export class ResizerDirective {

  constructor(private elementRef: ElementRef) { }

  charSize = { width: 400, height: 400}

  ngOnInit() {
    this.setSizeToElement();
    
    let resizingWrap = this.cretaResizingWrapp();
    this.resizer(resizingWrap);
  }

  setSizeToElement(){
    this.charSize = JSON.parse(localStorage.getItem('charSize')) || this.charSize;
    this.elementRef.nativeElement.style.position = 'relative'    
    this.elementRef.nativeElement.style.width = this.charSize.width + 'px';
    this.elementRef.nativeElement.style.height = this.charSize.height + 'px';
  }

  cretaResizingWrapp(){
    let myDiv = document.createElement('div');
    myDiv.setAttribute("style", "background-color: blue; width: 20px; height: 20px; position: absolute; right: 0; bottom: 0");
    this.elementRef.nativeElement.appendChild(myDiv);

    return myDiv;
  }

  resizer(block_r){

    let delta_w = 0;
    let delta_h = 0;

    let block = this.elementRef.nativeElement;
    document.onmouseup = clearXY;
    block_r.onmousedown = saveWH;

    function saveWH(obj_event) {
      delta_w = block.clientWidth - obj_event.pageX;
      delta_h = block.clientHeight - obj_event.pageY;

      document.addEventListener("mousemove", resizeBlock, false);
      
      return false; 
    }

    function clearXY() {
      document.removeEventListener('mousemove', resizeBlock);
      localStorage.setItem('charSize', JSON.stringify({ width: block.clientWidth, height: block.clientHeight}));
    }

    function resizeBlock(obj_event) {
      block.style.width = delta_w + obj_event.pageX + "px";
      block.style.height = delta_h + obj_event.pageY + "px";
    }
  }

}
