import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

//import Weight from './Weight';
import Bias from './Bias';

@Entity()
export default class Computer {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    learningRate : number;
    @Column()
    name : string;

    /*@OneToMany(type => Weight, weight => weight.computer)
    weights : Weight[];*/

    @OneToMany(type => Bias, bias => bias.computer)
    biases : Bias[]

    constructor(model : string, computerLearningRate : number){
        this.name = model;
        this.learningRate = computerLearningRate;
    }

}
