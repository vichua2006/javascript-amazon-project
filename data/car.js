class Car {
    brand;
    model;
    speed;

    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    displayInfo() {
        return `${this.brand} ${this.model}, Speed: ${this.speed} km/h`;
    }

    go() {
        if (!this.checkSpeed(this.speed)) console.log("INVALID OPERATION: speed above/below limit");
        else this.speed += 5;
    }
    
    brake() {
        if (!this.checkSpeed(this.speed)) console.log("INVALID OPERATION: speed above/below limit");
        else this.speed -= 5;
    }

    checkSpeed() {
        if (this.speed < 0 || this.speed > 200) return false;
        else return true;
    }

}
