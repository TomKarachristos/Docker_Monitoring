export class GeneratedKeyedCollection<T>{
    private items: { [index: string]: T } = {};
    private count: number = 0;
    private callbackToCreateValue: Function;

    constructor(callbackToCreateValue){
        this.callbackToCreateValue = callbackToCreateValue
    }

    public ContainsKey(key: any): boolean {
        return this.items.hasOwnProperty(key);
    }
 
    public Count(): number {
        return this.count;
    }
 
    public Add(key: any) {
        if(!this.items.hasOwnProperty(key))
             this.count++;
        this.items[key] = this.callbackToCreateValue(key);
    }
 
    public Remove(key: any): T {
        var val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    }
 
    public AddAndGet(key: any): T {
        if(!this.items.hasOwnProperty(key))
            this.Add(key);
        return this.items[key];
    }
 
    public Keys(): any[] {
        var keySet: string[] = [];
 
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        } 
 
        return keySet;
    }
 
    public Values(): T[] {
        var values: T[] = [];
 
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }
 
        return values;
    }
}