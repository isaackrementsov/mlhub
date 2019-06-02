import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Weight from './Weight';
import DataPoint from './DataPoint';

@Entity()
export default class Computer {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    learningRate : number;
    @Column()
    name : string;

    @OneToMany(type => Weight, weight => weight.computer)
    weights : Weight[];
    @OneToMany(type => Weight, weight => weight.computer)
    biases : Weight[]
    @OneToMany(type => DataPoint, dataPoint => dataPoint.computer)
    data : DataPoint[];

    constructor(model : string, computerLearningRate : number){
        this.name = model;
        this.learningRate = computerLearningRate;
    }

}
