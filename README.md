hPlate
======

hPlate is a simple template engine (javascript)


### Usage

    var data = {
        name: {
            first: 'hamid',
            last: 'raza'
        },
        fls: 'hamid' == 'raza'
    };

    var html = '<div>%{name.first} %{name.last}</div>'; //your html template
    ar hp = new hplate(html, data);

    console.log(hp.getText());


### Demo

[http://hamidlab.github.io/hPlate/demo.html]


[http://hamidlab.github.io/hPlate/demo.html]: http://hamidlab.github.io/hPlate/demo.html