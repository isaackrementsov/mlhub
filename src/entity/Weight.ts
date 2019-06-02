import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

import Computer from './Computer';

@Entity()
export default class Weight {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    idx : number;
    @Column()
    to : number;
    @Column()
    layer : number;

    @ManyToOne(type => Computer)
    computer : Computer;

    constructor(startingIndex : number, layer : number, hostComputer : Computer, endingIndex ? : number){
        this.idx = startingIndex;
        this.layer = layer;
        this.computer = hostComputer;
        this.to = endingIndex ? endingIndex : -1;
    }

}
