interface Habit {
    name: string;
    time: string;
    id?:number;
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

    static async getHabits(){
        const response = await fetch('http://localhost:3000/habbits');
        const data = await response.json() as Habit[];
        console.log(data)

        data.forEach(habit => {
            
            // const time_difference = (Date.now()) - Date.parse(habit.time);
            const habitTime = new Date(habit.time);
            const time_difference = Date.now() - habitTime.getTime();
            // console.log(time_difference);
            const minutes = Math.floor(time_difference/1000*60);
            const hours = Math.floor(time_difference/1000*60*60);
            const days = Math.floor(time_difference/1000*60*60*24);
            const weeks = Math.floor(time_difference/(1000*60*60*24*7));
            const months = Math.floor((Date.now() - habitTime.getTime()) / (1000 * 60 * 60 * 24 * 30));
            console.log(months);
          });
        const bottom = document.querySelector('.bottom') as HTMLDivElement;
        bottom.innerHTML = data.map(habit => {
            const habitTime = new Date(habit.time);
            const time_difference = Date.now() - habitTime.getTime();
            // console.log(time_difference);
            const days = Math.floor(time_difference/(1000*60*60*24));
            const weeks = Math.floor(time_difference/(1000*60*60*24*7));
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
    }

    static readValues() {
        const habit_input = document.querySelector('#habit-input') as HTMLInputElement;
        const time_input = document.querySelector('#time-input') as HTMLInputElement;
            console.log( habit_input.value)
            return { name: habit_input.value, time: time_input.value };
    }
    static async deleteHabit(id:number){
        const response = await fetch(`http://localhost:3000/habbits/${id}`,{
            method:'DELETE'
        });

    }
    static async restartHabit(id:number){
        const response = await fetch(`http://localhost:3000/habbits/${id}`);
        const habit = await response.json() as Habit[];
        habit.time= Date.now()
        const updated = await fetch(`http://localhost:3000/habbits/${id}`,{
            method:'PUT', body:JSON.stringify(habit), headers:{
                'Content-Type':'application/json'
            }
        });

    }
}

const create_button = document.querySelector('.create')as HTMLButtonElement;;
create_button.addEventListener('click', async(e) => {
    e.preventDefault()
    console.log('click');
    await Habits.createHabit();
});

Habits.getHabits();
