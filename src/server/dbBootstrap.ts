import { createConnection, Connection } from 'typeorm';

import Computer from '../entity/Computer';
import DataPoint from '../entity/DataPoint';

const data = [
    [
        {x: -3, y: 3},
        {x: -2.8, y: 2.7},
        {x: -2.6, y: 2.5},
        {x: -2.2, y: 2.1},
        {x: -2, y: 1.5},
        {x: -1.7, y: 0.8},
        {x: -1.3, y: 0.6},
        {x: -1.1, y: 0.4},
        {x: -0.8, y: 0.2},
        {x: -0.4, y: 0.3},
        {x: -0.2, y: -0.1},
        {x: 0, y: 0},
    ],
    [
        {x: -3, y: 3},
        {x: -2.8, y: 2.2},
        {x: -2.6, y: 1.5},
        {x: -2.2, y: 1.9},
        {x: -2, y: 0.5},
        {x: -1.7, y: 1.2},
        {x: -1.3, y: 0.2},
        {x: -1.1, y: 0.7},
        {x: -0.8, y: 0.5},
        {x: -0.4, y: 0.6},
        {x: -0.2, y: 0.2},
        {x: 0, y: 0},
    ],
    [
        {x: -3, y: 3},
        {x: -2.8, y: 2.5},
        {x: -2.6, y: 2.3},
        {x: -2.2, y: 2.4},
        {x: -2, y: 1.8},
        {x: -1.7, y: 1.6},
        {x: -1.3, y: 1.2},
        {x: -1.1, y: 0.5},
        {x: -0.8, y: 0.7},
        {x: -0.4, y: 0.3},
        {x: -0.2, y: 0.2},
        {x: 0, y: 0},
    ]
];

createConnection().then(async connection => {
    let computers : Computer[] = [
        new Computer('Dell G3', 2.3),
        new Computer('Macbook Pro', 5.6),
        new Computer('HP Pavilion', 4.6)
    ];
    for(let i = 0; i < computers.length; i++){
        let computer = computers[i];
        computer.connected = true;
        await connection.manager.save(computer);
        generateDataSet(computer, connection, data[i]);
    }

});
function generateDataSet(computer : Computer, connection : Connection, data : {x: number, y: number}[]){
    let MS_PER_MINUTE = 60000;
    let date = new Date();
    for(let point of data){
        let dataPoint : DataPoint = new DataPoint(point.y, 1, new Date(date.valueOf() + point.x*MS_PER_MINUTE), computer);
        connection.manager.insert('data_point', dataPoint);
    }
}
