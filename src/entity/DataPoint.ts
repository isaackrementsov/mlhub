import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Computer from './Computer';

@Entity()
export default class DataPoint {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    value : number;

    @ManyToOne(type => Computer)
    computer : Computer;

    constructor(dataValue : number, fromComputer : Computer){
        this.value = dataValue;
        this.computer = fromComputer;
    }

}
