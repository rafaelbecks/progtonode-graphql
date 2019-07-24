
const fs = require('fs');
import Symptons from './models/Symptons';
import Diseases from './models/Diseases';

const parseData = () => {
  fs.readFile("./data/ncomms5212-s4.txt", "utf8", function(err, data) {
    if(err){
      console.error(err);
    }else{
      const symptonsByLine = data.split('\n');
  
      const symptons = {};
      const diseases = [];
  
    symptonsByLine.forEach(line => {
        const innerData = line.split('	');
  
        if(!symptons[innerData[0]]){
          symptons[innerData[0]] = { name: innerData[0], diseases: [], TFIDFScore: isNaN(innerData[3]) ? innerData[3] : 0};
        }

        let index = diseases.findIndex(({name}) =>  name === innerData[1]);
  
        if(index > 0){
          diseases[index].symptons.push(innerData[0]);
        }else{
          diseases.push({
            name: innerData[1],
            symptons: [innerData[0]]
          });
        }
  
        symptons[innerData[0]].diseases.push(innerData[1]);
      });

    Symptons.create(Object.values(symptons));
    Diseases.create(diseases);
    }
  });
}

export { parseData };

