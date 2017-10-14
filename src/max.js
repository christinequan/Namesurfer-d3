const maxArray = (arr) => {
  arr.reduce((a,b) => Math.max(a,b));
}

const maxRank = (nameranksArr) => {
  nameranksArr.reduce((a,b) => Math.max(a.rank, b.rank));
}

module.exports = {
    maxArray: maxArray,
    maxRank: maxRank,
};
