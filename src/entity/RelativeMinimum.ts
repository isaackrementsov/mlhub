import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

import Computer from './Computer';



@Entity()
export default class RelativeMinimum {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: 'float'})
	value: number;
	@Column()
	session: number;
	@Column()
	date: Date;

	@ManyToOne(type => Computer)
	computer : Computer;

	constructor(computerThatFound : Computer, sessionFound : number, dateCurrent : Date, mseValue : number) {
		this.computer = computerThatFound;
		this.session = sessionFound;
		this.date = dateCurrent;
		this.value = mseValue;
	}
}
