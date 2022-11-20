class CustomDate {
    constructor(date) {
        this.currentDate = date;
    }
    get() {
        return this.currentDate;
    }
    increment() {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        return this;
    }
    decrement() {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        return this;
    }
    getClone() {
        return new CustomDate(new Date(this.currentDate.getTime()));
    }
}