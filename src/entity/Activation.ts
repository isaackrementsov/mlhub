import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

import TrainingData from './TrainingData';

@Entity()
export default class Activation {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    idx : number;
    @Column({type: 'float'})
    val : number;
    @Column()
    def : string

    @ManyToOne(type => TrainingData)
    trainingData : TrainingData;

    constructor(index : number, trainingFile : TrainingData, value : number, definition : string){
        this.idx = index;
        this.val = value;
        this.trainingData = trainingFile;
        this.def = definition;
    }

}
