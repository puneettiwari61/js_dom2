
(function(){
const inc = document.querySelector('.inc');
const count = document.querySelector('.count');
const dec = document.querySelector('.dec');
const res = document.querySelector('.res')
var actcount = 0;
function increase(){
    count.textContent = ++(actcount) ;
}
function decrease(){
    count.textContent = --(actcount) ;
}
function reset(){
    actcount = 0 ;
    count.textContent = actcount;
}
inc.addEventListener('click',increase);
dec.addEventListener('click',decrease);
res.addEventListener('click',reset);
})();