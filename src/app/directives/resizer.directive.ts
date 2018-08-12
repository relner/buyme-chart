import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResizer]'
})
export class ResizerDirective {

  constructor(private elementRef: ElementRef) { }
  charSize = { width: 400, height: 400, left: 0, top: 0}
  delta_w: number;
  delta_h: number;
  resizeFlag: boolean;
  moveFlag: boolean;

  ngOnInit() {
    this.setSizeToElement();
    
    let createMoverAndResizer = this.cretaResizingWrapp()
    this.resizer(createMoverAndResizer);
  }

  setSizeToElement(){
    this.charSize = JSON.parse(localStorage.getItem('charSize')) || this.charSize;
    this.elementRef.nativeElement.style.position = 'fixed'    
    this.elementRef.nativeElement.style.width = this.charSize.width + 'px';
    this.elementRef.nativeElement.style.height = this.charSize.height + 'px';
    this.elementRef.nativeElement.style.left = this.charSize.left + 'px';
    this.elementRef.nativeElement.style.top = this.charSize.top + 'px';
  }

  cretaResizingWrapp(){
    let myResizer = document.createElement('div');
    let myMover = document.createElement('div');
    myResizer.setAttribute("style", "background-color: blue; width: 10px; height: 10px; position: absolute; right: 0; bottom: 0");
    myMover.setAttribute("style", "background-color: red; width: 10px; height: 10px; position: absolute; right: 0; top: 0");
    this.elementRef.nativeElement.appendChild(myResizer);
    this.elementRef.nativeElement.appendChild(myMover);

    return [myResizer, myMover];
  }
  
  resizer(block_r){

    this.delta_w = 0;
    this.delta_h = 0;

    document.onmouseup = () => {
      this.resizeFlag = false;
      this.moveFlag = false;
      this.clearXY(this.elementRef.nativeElement);
    }

    block_r[0].onmousedown = () => {
      this.resizeFlag = true;
      this.saveWH(event, this.elementRef.nativeElement);
    }
    block_r[1].onmousedown = () => {
      this.moveFlag = true;
      this.saveWH(event, this.elementRef.nativeElement);
    }

  }

  saveWH(obj_event, block) {
    this.delta_w = block.clientWidth - obj_event.pageX;
    this.delta_h = block.clientHeight - obj_event.pageY;

    window.onmousemove = () => {
      if(this.resizeFlag == true) this.resizeBlock(event, block);
      if(this.moveFlag == true) this.moveBlock(event, block);
    }
    
    return false; 
  }

  moveBlock(obj_event, block){
    block.style.left = obj_event.pageX - block.clientWidth + "px";
    block.style.top =  obj_event.pageY + "px";
  }

  resizeBlock(obj_event, block) {
    block.style.width = this.delta_w + obj_event.pageX + "px";
    block.style.height = this.delta_h + obj_event.pageY + "px";
  }

  clearXY(block) {
    localStorage.setItem('charSize', JSON.stringify({ width: block.clientWidth, height: block.clientHeight, left: block.offsetLeft, top: block.offsetTop}));
  }

}
