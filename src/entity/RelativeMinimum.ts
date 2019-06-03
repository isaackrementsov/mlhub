import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

import Computer from './Computer.ts';



@Entity()
export class RelativeMinimum {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: 'float'})
	value: number;
	@Column({type: 'float'})
	slope: number;
	@Column()
	date: Date;

	@ManyToOne(type => Computer, computer.relativeMinima)
	computer : Computer;

	constructor(computerThatFound : Computer, slopeAtPoint : number, dateCurrent : Date, mseValue : number) {
		this.computer = computerThatFound;
		this.slope = slopeAtPoint;
		this.date = dateCurrent;
		this.value = mseValues;
	}
}