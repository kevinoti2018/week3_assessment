interface Habit {
    name: string;
    time: string;
}

class Habits {
    static async createHabit() {
        const habit = Habits.readValues();
        console.log(habit)
        if (habit) {
            const response = await fetch('http://localhost:3000/habbits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(habit)
            });
            const data = await response.json();
            console.log(data);
        }
    }

    static async getHabits() {
        const response = await fetch('http://localhost:3000/habbits');
        const data = await response.json() as Habit[];
        console.log(data)
        const bottom = document.querySelector('.bottom') as HTMLDivElement;
        bottom.innerHTML = data.map(habit => {
            return `
            <div class='item'>
                <p class='watch'><ion-icon name="alarm"></ion-icon></p>
                <p>${habit.name}</p>
                <p> time started ${habit.time}</p>
                </div>
            `;
        }).join('');
    }

    static readValues() {
        const habit_input = document.querySelector('#habit-input') as HTMLInputElement;
        const time_input = document.querySelector('#time-input') as HTMLInputElement;
            console.log( habit_input.value)
            return { name: habit_input.value, time: time_input.value };
    }
}

const create_button = document.querySelector('.create')as HTMLButtonElement;;
create_button.addEventListener('click', async(e) => {
    e.preventDefault()
    console.log('click');
    await Habits.createHabit();
});

Habits.getHabits();
