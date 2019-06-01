import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Activation from './Activation';

@Entity()
export default class TrainingData {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    path : string;

    @OneToMany(type => Activation, activation => activation.trainingData)
    outputActivations : Activation[];

    constructor(targetActivations : Activation[], filePath : string){
        this.outputActivations = targetActivations;
        this.path = filePath;
    }

}
