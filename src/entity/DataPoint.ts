import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Computer from './Computer';

@Entity()
export default class DataPoint {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({type: "float"})
    value : number;
    @Column()
    session : number;
    @Column()
    time : Date;

    @ManyToOne(type => Computer)
    computer : Computer;

    constructor(dataValue : number, sessionNumber : number, timeSent : Date, fromComputer : Computer){
        this.value = dataValue;
        this.session = sessionNumber;
        this.time = timeSent;
        this.computer = fromComputer;
    }

}
