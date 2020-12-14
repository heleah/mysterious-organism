const dnaBases = ['A', 'T', 'C', 'G']
// Returns a random DNA base
const returnRandBase = () => {
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//Functions returnRandBase() and mockUpStrand() were provided in the Codecademy blueprint of this project


//Factory function to create multiple objects
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,

    //Changes randomly selected base in the object’s dna property to a random different base
    mutate() {
      let iRandom = Math.floor(Math.random() * 15);
      if (this.dna[iRandom] === 'A') {
        dnaBases.splice(0,1);
        this.dna[iRandom] = returnRandBase();
        return this.dna;
      } else if (this.dna[iRandom] === 'T') {
          dnaBases.splice(1,1);
          this.dna[iRandom] = returnRandBase();
          return this.dna;
      } else if (this.dna[iRandom] === 'C') {
          dnaBases.splice(2,1);
          this.dna[iRandom] = returnRandBase();
          return this.dna;
      } else {
          dnaBases.splice(3,1);
          this.dna[iRandom] = returnRandBase();
          return this.dna;
      };
    },

    //Determines how much % DNA two specimens have in common
    compareDNA(obj) {
      let matches = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === obj.dna[i]) {
          matches++;
        }
      };
      let commonBases = Math.floor(matches/this.dna.length * 100);
      console.log(`pAequor specimens ${this.specimenNum} and ${obj.specimenNum} have ${commonBases}% DNA in common.`);
    },

    //Determines if a specimen is likely to survive in its natural habitat (if C and G make up at least 60% of the DNA)
    willLikelySurvive() {
      let matches = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          matches++;
        };
      }
      const percentageCG = matches / this.dna.length;
      if (percentageCG >= 0.6) {
        return true;
      } else {
        return false;
      }
    },

    //Returns the complementery strand of a strand
    complementStrand() {
      let complementary = [];
      for (i = 0; i < this.dna.length; i++) {
        switch(this.dna[i]) {
          case 'A':
            complementary.push('T');
            break;
          case 'T':
            complementary.push('A');
            break;
          case 'C':
            complementary.push('G');
            break;
          case 'G':
            complementary.push('C');
            break;
        };
      };
      return complementary;
    },

  };
};

//Finds 30 specimens that are likely to survive in their natural habitats
const goodInstances = [];
while (goodInstances.length < 30) {
  let i = goodInstances.length + 1;
  let sample = pAequorFactory(i, mockUpStrand());
  if (sample.willLikelySurvive()) {
    goodInstances.push(sample);
  };
};

