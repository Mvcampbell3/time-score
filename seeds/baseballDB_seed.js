const db = require('../models');

module.exports = function() {

  db.Game.deleteOne({ name: 'MLB Teams' })
    .then(deleted => {
      console.log(deleted);
      const newGame = new db.Game({
        name: 'MLB Teams',
        description: 'Name all Major League Baseball Teams',
        inputPlaceholder: 'Enter MLB Team Here...',
        instructions: 'Only team name will count towards correct answers, city names will not',
        creatorId: '5e4467962d3d3180bc9cacd3',
        answers: [
          // AL East
          { display_value: 'Baltimore Orioles', accepted_values: ['orioles'] },
          { display_value: 'Boston Red Sox', accepted_values: ['red sox'] },
          { display_value: 'New York Yankees', accepted_values: ['yankees'] },
          { display_value: 'Tampa Bay Rays', accepted_values: ['rays'] },
          { display_value: 'Toronto Blue Jays', accepted_values: ['blue jays', 'jays'] },
          // AL Central
          { display_value: 'Chicago White Sox', accepted_values: ['white sox'] },
          { display_value: 'Cleveland Indians', accepted_values: ['indians'] },
          { display_value: 'Detroit Tigers', accepted_values: ['tigers'] },
          { display_value: 'Kansas City Royals', accepted_values: ['royals'] },
          { display_value: 'Minnesota Twins', accepted_values: ['twins'] },
          // Al West
          { display_value: 'Houston Astros', accepted_values: ['astros', 'cheaters', 'trashcan'] },
          { display_value: 'Los Angeles Angels', accepted_values: ['angels'] },
          { display_value: 'Seattle Mariners', accepted_values: ['mariners'] },
          { display_value: 'Oakland Athletics', accepted_values: ['a\'s', 'athletics'] },
          { display_value: 'Texas Rangers', accepted_values: ['rangers'] },
          // NL East
          { display_value: 'Atlanta Braves', accepted_values: ['braves'] },
          { display_value: 'Miami Marlins', accepted_values: ['marlins', 'fish'] },
          { display_value: 'New York Mets', accepted_values: ['mets', 'metropolitans'] },
          { display_value: 'Philadelphia Phillies', accepted_values: ['phillies'] },
          { display_value: 'Washington Nationals', accepted_values: ['nationals', 'nats'] },
          // NL Central
          { display_value: 'Chicago Cubs', accepted_values: ['cubs'] },
          { display_value: 'Cincinnati Reds', accepted_values: ['reds'] },
          { display_value: 'Milwaukee Brewers', accepted_values: ['brewers', 'brewcrew'] },
          { display_value: 'Pittsburgh Pirates', accepted_values: ['pirates'] },
          { display_value: 'St. Louis Cardinals', accepted_values: ['cardinals', 'cards'] },
          // NL West
          { display_value: 'Arizona Diamondbacks', accepted_values: ['dbacks', 'diamondbacks'] },
          { display_value: 'Colorado Rockies', accepted_values: ['rockies'] },
          { display_value: 'Los Angeles Dodgers', accepted_values: ['dodgers'] },
          { display_value: 'San Diego Padres', accepted_values: ['padres'] },
          { display_value: 'San Francisco Giants', accepted_values: ['giants'] }
        ]
      });

      newGame.save()
        .then(result => {
          console.log('mlbTeams was saved')
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => console.log(err))


}