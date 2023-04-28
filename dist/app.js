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
            const bottom = document.querySelector('.bottom');
            bottom.innerHTML = data.map(habit => {
                return `
            <div class='item'>
                <p class='watch'><ion-icon name="alarm"></ion-icon></p>
                <p>${habit.name}</p>
                <p> time started ${habit.time}</p>
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
}
const create_button = document.querySelector('.create');
;
create_button.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    console.log('click');
    yield Habits.createHabit();
}));
Habits.getHabits();
