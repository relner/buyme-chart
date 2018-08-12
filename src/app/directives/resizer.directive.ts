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
    //myDiv.addEventListener('click', () => { alert('Hello') })
    this.resizerJS(myDiv);
  }

  resizerJS(block_r){
    let block; // Основной блок
    let delta_w = 0; // Изменение по ширине
    let delta_h = 0; // Изменение по высоте
    /* После загрузки страницы */

    block = this.elementRef.nativeElement // Получаем основной блок
    document.onmouseup = clearXY; // Ставим обработку на отпускание кнопки мыши
    block_r.onmousedown = saveWH; // Ставим обработку на нажатие кнопки мыши

    /* Функция для получения текущих координат курсора мыши */
    function getXY(obj_event) {
      let x = obj_event.pageX;
      let y = obj_event.pageY;
      return [x, y];
    }

    function saveWH(obj_event) {
      let point = getXY(obj_event);
      let w_block = block.clientWidth; // Текущая ширина блока
      let h_block = block.clientHeight; // Текущая высота блока
      delta_w = w_block - point[0]; // Измеряем текущую разницу между шириной и x-координатой мыши
      delta_h = h_block - point[1]; // Измеряем текущую разницу между высотой и y-координатой мыши
      /* Ставим обработку движения мыши для разных браузеров */
      document.addEventListener("mousemove", resizeBlock, false);
      return false; // Отключаем стандартную обработку нажатия мыши
    }

    /* Функция для измерения ширины окна */
    function clientWidth() {
      return document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
    }

    /* Функция для измерения высоты окна */
    function clientHeight() {
      return document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
    }

    /* При отпускании кнопки мыши отключаем обработку движения курсора мыши */
    function clearXY() {
      document.removeEventListener('mousemove', resizeBlock);
      localStorage.setItem('charSize', JSON.stringify({ width: block.clientWidth, height: block.clientHeight}));
    }

    function resizeBlock(obj_event) {
      let point = getXY(obj_event);
      let new_w = delta_w + point[0]; // Изменяем новое приращение по ширине
      let new_h = delta_h + point[1]; // Изменяем новое приращение по высоте
      block.style.width = new_w + "px"; // Устанавливаем новую ширину блока
      block.style.height = new_h + "px"; // Устанавливаем новую высоту блока

      /* Если блок выходит за пределы экрана, то устанавливаем максимальные значения для ширины и высоты */
      if (block.offsetLeft + block.clientWidth > clientWidth()) {
        block.style.width = (clientWidth() - block.offsetLeft) + "px";
      }
      if (block.offsetTop + block.clientHeight > clientHeight()) { 
        block.style.height = (clientHeight() - block.offsetTop) + "px";
      }
    }
  }

}
