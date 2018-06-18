export default class EventList{
	constructor(){
        this.list = [];
	}
    
    addEvent(event){
        event.id = this.list.length;
        this.list.push(event);
    }
}





