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
    @Column({type: 'float'})
    val : number;

    constructor(startingIndex : number, layer : number, value : number, endingIndex ? : number){
        this.idx = startingIndex;
        this.layer = layer;
        this.val = value;
        this.to = endingIndex ? endingIndex : -1;
    }

}
