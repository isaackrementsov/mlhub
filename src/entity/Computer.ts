import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Index} from 'typeorm';

import Weight from './Weight';
import DataPoint from './DataPoint';
import RelativeMinimum from './RelativeMinimum';
import randomGen from '../util/randomGen';

@Entity()
export default class Computer {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({type: "float"})
    learningRate : number;
    @Column()
    authKey : string;
    @Column()
    connected : boolean;

    @Index({unique: true})
    @Column()
    name : string;

    @OneToMany(type => DataPoint, dataPoint => dataPoint.computer)
    data : DataPoint[];
    @OneToMany(type => RelativeMinimum, relativeMinimum => relativeMinimum.computer)
    relativeMinima : RelativeMinimum[];

    constructor(model : string, computerLearningRate : number){
        this.name = model;
        this.learningRate = computerLearningRate;
        this.authKey = randomGen();
        this.connected = false;
    }

}
