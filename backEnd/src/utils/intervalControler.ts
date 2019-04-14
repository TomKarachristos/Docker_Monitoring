/// TODO registry this to dependecy inejction
export class IntervalControl{
  private IntervalListener
  private intervalTime; 

  constructor(intervalTime:number){
    this.intervalTime = intervalTime;
  }

  public callInterval(callback, ...arg){
        if (this.IntervalListener) clearInterval(this.IntervalListener);     
        
        this.IntervalListener = setInterval(() => 
              callback(...arg),
        this.intervalTime);
  }

}

