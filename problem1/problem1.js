var sum_to_n_a = function(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;  
};

var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};

var sum_to_n_c = function(n) {
    var arr = Array.from(Array(n), (_, i) => i + 1);
    return arr.reduce((a, b) => a + b, 0);
};

console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15