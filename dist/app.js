"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Habits {
    static createHabit() {
        return __awaiter(this, void 0, void 0, function* () {
            const habit = Habits.readValues();
            console.log(habit);
            if (habit) {
                const response = yield fetch('http://localhost:3000/habbits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(habit)
                });
                const data = yield response.json();
                console.log(data);
            }
        });
    }
    static getHabits() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3000/habbits');
            const data = yield response.json();
            console.log(data);
            data.forEach(habit => {
                // const time_difference = (Date.now()) - Date.parse(habit.time);
                const habitTime = new Date(habit.time);
                const time_difference = Date.now() - habitTime.getTime();
                // console.log(time_difference);
                const minutes = Math.floor(time_difference / 1000 * 60);
                const hours = Math.floor(time_difference / 1000 * 60 * 60);
                const days = Math.floor(time_difference / 1000 * 60 * 60 * 24);
                const weeks = Math.floor(time_difference / (1000 * 60 * 60 * 24 * 7));
                const months = Math.floor((Date.now() - habitTime.getTime()) / (1000 * 60 * 60 * 24 * 30));
                console.log(months);
            });
            const bottom = document.querySelector('.bottom');
            bottom.innerHTML = data.map(habit => {
                const habitTime = new Date(habit.time);
                const time_difference = Date.now() - habitTime.getTime();
                // console.log(time_difference);
                const days = Math.floor(time_difference / (1000 * 60 * 60 * 24));
                const weeks = Math.floor(time_difference / (1000 * 60 * 60 * 24 * 7));
                const month = Math.floor((Date.now() - habitTime.getTime()) / (1000 * 60 * 60 * 24 * 30));
                console.log(month);
                return `
            <div class='item'>
                <p class='watch'><ion-icon name="alarm"></ion-icon></p>
                <p>${habit.name}</p>
                <p> ${habit.time}</p>
                <div class='timeSince'>
                    <p>time since</p>
                    <p>${month} months</p>
                    <p>${days} days</p>
                </div>
                <div>
                    <button onClick='Habits.restartHabit(${habit.id})'><ion-icon name="refresh-circle"></ion-icon></button>
                    <button onClick='Habits.deleteHabit(${habit.id})'><ion-icon name="trash"></ion-icon></button>
                </div>
                </div>
            `;
            }).join('');
        });
    }
    static readValues() {
        const habit_input = document.querySelector('#habit-input');
        const time_input = document.querySelector('#time-input');
        console.log(habit_input.value);
        return { name: habit_input.value, time: time_input.value };
    }
    static deleteHabit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:3000/habbits/${id}`, {
                method: 'DELETE'
            });
        });
    }
    static restartHabit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:3000/habbits/${id}`);
            const habit = yield response.json();
            habit.time = Date.now();
            const updated = yield fetch(`http://localhost:3000/habbits/${id}`, {
                method: 'PUT', body: JSON.stringify(habit), headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    }
}
const create_button = document.querySelector('.create');
;
create_button.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    console.log('click');
    yield Habits.createHabit();
}));
Habits.getHabits();
