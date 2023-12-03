import { Component, Input, EventEmitter, Output, OnInit,
    DoCheck,
    OnChanges,
   AfterContentInit, 
   AfterContentChecked, 
   AfterViewChecked, 
   AfterViewInit } from '@angular/core';
 
@Component({
    selector: 'user-age',
    templateUrl: './user-age.component.html',
    styleUrls: []
})
export class UserAgeComponent implements OnInit,
DoCheck,
OnChanges,
AfterContentInit, 
AfterContentChecked, 
AfterViewChecked, 
AfterViewInit {
    //@Input() userName: string = "";
    _summ: number = 0;
      
    @Input()
    set summ(s:number) {
        if(s<0)
            this._summ=0;       
        else
            this._summ = s;
    }
    get summ() {
        return this._summ;
    }

    @Output() onSumm = new EventEmitter();
    calculate() {
        this.onSumm.emit();
    }


    //logs
    count:number = 1;

    ngOnInit() {
       
        this.log(`ngOnInit`);
      }
      ngOnChanges() {
         
        this.log(`OnChanges`);
      }
      ngDoCheck() {
         
        this.log(`ngDoCheck`);
      }
      ngAfterViewInit() {
         
        this.log(`ngAfterViewInit`);
      }
      ngAfterViewChecked() {
         
        this.log(`ngAfterViewChecked`);
      }
      ngAfterContentInit() {
         
        this.log(`ngAfterContentInit`);
      }
      ngAfterContentChecked() {
         
        this.log(`ngAfterContentChecked`);
      }
      private log(msg: string) {
        console.log(this.count + ". " + msg);
        this.count++;
    }
}
