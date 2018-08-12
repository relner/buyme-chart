import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResizer]'
})
export class ResizerDirective {

  constructor(private elementRef: ElementRef) { 
    console.log(this);
    console.info("----> ", elementRef.nativeElement);
  }

  charSize = { width: 400, height: 400}

  ngOnInit() {
    this.elementRef.nativeElement.style.position = 'relative'
    
    this.charSize = JSON.parse(localStorage.getItem('charSize')) || this.charSize;
    this.elementRef.nativeElement.style.width = this.charSize.width + 'px';
    this.elementRef.nativeElement.style.height = this.charSize.height + 'px';

    let myDiv = document.createElement('div');
    myDiv.setAttribute("style", "background-color: blue; width: 20px; height: 20px; position: absolute; right: 0; bottom: 0");
    this.elementRef.nativeElement.appendChild(myDiv);

    this.resizerJS(myDiv);
  }

  resizerJS(block_r){
    let block;
    let delta_w = 0;
    let delta_h = 0;

    block = this.elementRef.nativeElement;
    document.onmouseup = clearXY;
    block_r.onmousedown = saveWH;

    function saveWH(obj_event) {
      let point = [obj_event.pageX, obj_event.pageY];
      let w_block = block.clientWidth;
      let h_block = block.clientHeight;
      delta_w = w_block - point[0];
      delta_h = h_block - point[1];
      document.addEventListener("mousemove", resizeBlock, false);
      return false; 
    }

    function clearXY() {
      document.removeEventListener('mousemove', resizeBlock);
      localStorage.setItem('charSize', JSON.stringify({ width: block.clientWidth, height: block.clientHeight}));
    }

    function resizeBlock(obj_event) {
      let point = [obj_event.pageX, obj_event.pageY];
      let new_w = delta_w + point[0];
      let new_h = delta_h + point[1];
      block.style.width = new_w + "px";
      block.style.height = new_h + "px";

      if (block.offsetLeft + block.clientWidth > document.documentElement.clientWidth) {
        block.style.width = (document.documentElement.clientWidth - block.offsetLeft) + "px";
      }
      if (block.offsetTop + block.clientHeight > document.documentElement.clientHeight) { 
        block.style.height = (document.documentElement.clientHeight - block.offsetTop) + "px";
      }
    }
  }

}
