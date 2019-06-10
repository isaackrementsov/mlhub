import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export default class Config {

    @PrimaryGeneratedColumn()
    id : number;

    @Column('simple-array')
    layers : number[];
    @Column()
    maxSteps : number;
    @Column({type: 'float'})
    thresHold : number;
    @Column({type: 'float'})
    decayRate : number;

    constructor(layers : number[], maxSteps? : number, thresHold? : number, decayRate? : number){
        this.layers = layers;
        this.maxSteps = maxSteps || 500;
        this.thresHold = thresHold || 0.001;
        this.decayRate = decayRate || 2;
    }

}
