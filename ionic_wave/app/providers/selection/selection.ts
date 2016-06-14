import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Selection {

  arr : any = [] ;
  constructor() {}

  // default to max heap if comparator not provided
  comp (a, b) {
    return a.sch_packet > b.sch_packet;
  };

  swap(a, b) {
    var temp = this.arr[a];
    this.arr[a] = this.arr[b];
    this.arr[b] = temp;
  };

  bubbleDown (pos) {
    var left = 2 * pos + 1;
    var right = left + 1;
    var largest = pos;
    if (left < this.arr.length && this.comp(this.arr[left], this.arr[largest])) {
      largest = left;
    }
    if (right < this.arr.length && this.comp(this.arr[right], this.arr[largest])) {
      largest = right;
    }
    if (largest != pos) {
      this.swap(largest, pos);
      this.bubbleDown(largest);
    }
  };

  bubbleUp(pos) {
    if (pos <= 0) {
      return;
    }
    var parent = Math.floor((pos - 1) / 2);
    if (this.comp(this.arr[pos], this.arr[parent])) {
      this.swap(pos, parent);
      this.bubbleUp(parent);
    }
  };

  pop() {
    if (this.arr.length === 0) {
      throw new Error("pop() called on emtpy binary heap");
    }
    var value = this.arr[0];
    var last = this.arr.length - 1;
    this.arr[0] = this.arr[last];
    this.arr.length = last;
    if (last > 0) {
      this.bubbleDown(0);
    }
    return value;
  };

  push(value) {
    console.log('push',value);
    this.arr.push(value);
    this.bubbleUp(this.arr.length - 1);
  };

  heapsize () {
    return this.arr.length;
  };
  getHeaparr(){
    return this.arr;
  }
}
