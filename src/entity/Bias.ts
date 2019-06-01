import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

import Computer from './Computer';

@Entity()
export default class Bias {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    idx : number;
    @Column()
    layer : number;

    @ManyToOne(type => Computer)
    computer : Computer;

    constructor(startingIndex : number, layer : number, hostComputer : Computer){
        this.idx = startingIndex;
        this.layer = layer;
        this.computer = hostComputer;
    }

}
