const db = require('../models');

module.exports = function() {

  db.Game.deleteOne({ name: 'U.S. Presidents' })
    .then(deleted => {
      console.log(deleted);
      const newGame = new db.Game({
        name: 'U.S. Presidents',
        inputPlaceholder: 'Enter President\'s Name Here...',
        description: 'All United States Presidents',
        instructions: 'Last names will count towards correct answers, first names will not. If two presidents share a last name, both will be counted!',
        creatorId: '5e4467962d3d3180bc9cacd3',
        answers: [
          { display_value: 'George Washington', accepted_values: ['washington'] },
          { display_value: 'John Adams', accepted_values: ['adams'] },
          { display_value: 'Thomas Jefferson', accepted_values: ['jefferson'] },
          { display_value: 'James Madison', accepted_values: ['madison'] },
          { display_value: 'James Monroe', accepted_values: ['monroe'] },
          { display_value: 'John Quincy Adams', accepted_values: ['adams'] },
          { display_value: 'Andrew Jackson', accepted_values: ['jackson'] },
          { display_value: 'Martin Van Buren', accepted_values: ['van buren'] },
          { display_value: 'William Henry Harrison', accepted_values: ['harrison'] },
          { display_value: 'John Tyler', accepted_values: ['tyler'] },
          { display_value: 'James K. Polk', accepted_values: ['polk', 'napoleon of the south'] },
          { display_value: 'Zachary Taylor', accepted_values: ['taylor'] },
          { display_value: 'Franklin Pierce', accepted_values: ['pierce'] },
          { display_value: 'Millard Fillmore', accepted_values: ['fillmore'] },
          { display_value: 'James Buchanan', accepted_values: ['buchanan'] },
          { display_value: 'Abraham Lincoln', accepted_values: ['lincoln'] },
          { display_value: 'Andrew Johnson', accepted_values: ['johnson'] },
          { display_value: 'Ulysses S. Grant', accepted_values: ['grant'] },
          { display_value: 'Rutherford B. Hayes', accepted_values: ['hayes'] },
          { display_value: 'James Garfield', accepted_values: ['garfield'] },
          { display_value: 'Chester A. Arthur', accepted_values: ['arthur'] },
          { display_value: 'Grover Cleveland', accepted_values: ['cleveland'] },
          { display_value: 'Benjamin Harrison', accepted_values: ['harrison'] },
          { display_value: 'Grover Cleveland', accepted_values: ['cleveland'] },
          { display_value: 'William Mckinley', accepted_values: ['mckinley'] },
          { display_value: 'Theodore Roosevelt', accepted_values: ['roosevelt'] },
          { display_value: 'William Howard Taft', accepted_values: ['taft'] },
          { display_value: 'Wildrow Wilson', accepted_values: ['wilson'] },
          { display_value: 'Warren G. Harding', accepted_values: ['harding'] },
          { display_value: 'Calvin Coolidge', accepted_values: ['coolidge'] },
          { display_value: 'Herbert Hoover', accepted_values: ['hoover'] },
          { display_value: 'Franklin D. Roosevelt', accepted_values: ['roosevelt'] },
          { display_value: 'Harry S. Truman', accepted_values: ['truman'] },
          { display_value: 'Dwight D. Eisenhower', accepted_values: ['eisenhower'] },
          { display_value: 'John F. Kennedy', accepted_values: ['kennedy'] },
          { display_value: 'Lyndon B. Johnson', accepted_values: ['johnson'] },
          { display_value: 'Richard Nixon', accepted_values: ['nixon'] },
          { display_value: 'Gerald Ford', accepted_values: ['ford'] },
          { display_value: 'Jimmy Carter', accepted_values: ['carter'] },
          { display_value: 'Ronald Reagan', accepted_values: ['reagan'] },
          { display_value: 'George H.W. Bush', accepted_values: ['bush'] },
          { display_value: 'Bill Clinton', accepted_values: ['clinton'] },
          { display_value: 'George W. Bush', accepted_values: ['bush'] },
          { display_value: 'Barrack Obama', accepted_values: ['obama'] },
          { display_value: 'Donald Trump', accepted_values: ['trump'] }
        ]
      })

      newGame.save()
        .then(() => console.log('presidents game saved'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))


}