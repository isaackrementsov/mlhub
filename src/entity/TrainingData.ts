import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Activation from './Activation';

@Entity()
export default class TrainingData {

    @PrimaryGeneratedColumn()
    id : number;

    @OneToMany(type => Activation, activation => activation.trainingData, {cascade: true})
    inputActivations : Activation[];
    @OneToMany(type => Activation, activation => activation.trainingData, {cascade: true})
    outputActivations : Activation[];

    constructor(){}

}
