/*
Author: Chris Humboldt
*/

Rocket.log('The app file loads successfully...');

Rocket.modal({
   heading: 'This is a test',
   buttons: true,
   body: 'Body here.',
   onTrue: () => {
      Rocket.message({
         body: 'Woot'
      });
      Rocket.log('ok');
   }
});
