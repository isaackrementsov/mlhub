import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

import Computer from './Computer';



@Entity()
export default class RelativeMinimum {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: 'float'})
	value: number;
	@Column({type: 'float'})
	slope: number;
	@Column()
	date: Date;

	@ManyToOne(type => Computer)
	computer : Computer;

	constructor(computerThatFound : Computer, slopeAtPoint : number, dateCurrent : Date, mseValue : number) {
		this.computer = computerThatFound;
		this.slope = slopeAtPoint;
		this.date = dateCurrent;
		this.value = mseValue;
	}
}
