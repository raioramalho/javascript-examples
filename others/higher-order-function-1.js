console.clear();

// Executando funções como params para outra função...

function run(fn) {
    fn();
};


function sayHello() {
    console.log('Hello!');
};


run(sayHello);

run(function() {
    console.log('Run!!');
});

run(() => {
    console.log('Run!');
});


// Executando funções como params para outra função...
