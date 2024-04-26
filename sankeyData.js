// color constants 
const red = '#db3236';
const blue = '#4885ed';
const yellow = '#f4c20d';
const gray = '#bababa';
const black = '#000000';
const white = '#ffffff';

function buildData() {
    const data = [
        //`Cardinal,Vote 1,Vote 2,Vote 3,Vote 4,Vote 5`,
        `Borgia,Borgia,Borgia,Borgia,Borgia,Borgia`,
        `Carafa,Carafa,Borgia,Borgia,Borgia,Borgia`,
        `Colonna,Colonna,Colonna,Sforza,n/a,Borgia`,
        `Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere`,
        `Gentili,Sforza,Sforza,Della Rovere,Della Rovere,Della Rovere`,
        `Orsini,Conti,Conti,Sforza,Borgia,Borgia`,
        `Piccolomini,Piccolomini,Piccolomini,Sforza,Sforza,Borgia`,
        `Nanni,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere`,
        `Sforza,Sforza,Sforza,Sforza,Sforza,Borgia`,
        `Torriani,n/a,Borgia,Sforza,Borgia,Borgia`,
        `Basso Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere`,
        `Briconnet,De Prie,De Prie,Della Rovere,Della Rovere,n/a`,
        `De Bucy,De Prie,De Prie,Della Rovere,Della Rovere,Della Rovere`,
        `D'Aubusson,De Prie,De Prie,Nanni,Della Rovere,Della Rovere`,
        `Conti,Carafa,Sforza,Sforza,Borgia,Borgia`,
        `Da Costa,Della Rovere,Colonna,Della Rovere,Sforza,Borgia`,
        `Patriarch,Orsini,Conti,Sforza,Sforza,Borgia`,
        `Della Porta Junior,Piccolomini,Piccolomini,Sforza,n/a,Borgia`,
        `De Prie,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere`,
        `Battista Zen,Orsini,Orsini,Borgia,Sforza,Borgia`,
        `Michiel Zen,Carafa,Piccolomini,Borgia,Sforza,Borgia`,
        `Savelli,Colonna,Colonna,Sforza,Sforza,Borgia`,
        `Soderini,Piccolomini,Piccolomini,Sforza,Sforza,Borgia`,
        `Bembo,Della Rovere,Della Rovere,Sforza,Borgia,Borgia`,
        `D'Este,Sforza,Sforza,Sforza,Borgia,Borgia`,
        `Medici,Conti,Conti,Sforza,n/a,Borgia`,
        `Riario,Della Rovere,Della Rovere,Della Rovere,Borgia,Della Rovere`,
        `Hadrian,Orsini,Colonna,Sforza,Sforza,Borgia`,
        `Schiner,Schiner,Schiner,Della Rovere,Borgia,Borgia`,
        `Farnese,,,Borgia,Borgia,Borgia`,
        `C. Borgia,,,Borgia,Borgia,Borgia`,

    ];

    // reformat data into list of "vote links" each containing [ from, to, count ] data
    let voteLinks = [];
    data.forEach(cardinal => {
        let [name, v1, v2, v3, v4, v5] = cardinal.split(',');

        // NOTE: Sankey library does not support haivng muiltple nodes with the same title, so
        // spaces are added to differentiate between nodes in different voting rounds
        //      Vote 1: Name
        //      Vote 2: _Name
        //      Vote 3: __Name
        //      Vote 4: Name_
        //      Vote 4: Name__
        v2 = v2 ? ` ${v2}` : undefined;
        v3 = v3 ? `  ${v3}`: undefined;
        v4 = v4 ? `${v4} ` : undefined;
        v5 = v5 ? `${v5}  ` : undefined;

        function addVoteLink(from, to) {
            if (from && to) {
                // find the vote link if it already exists
                const voteLink = voteLinks.find(link => link[0] === from && link[1] === to);
                // make or increment the count of the the vote link
                if (voteLink) {
                    voteLink[2] = voteLink[2] + 1;
                } else {
                    voteLinks.push([ from, to, 1 ]);
                }
            }
        }

        addVoteLink(v1, v2);
        addVoteLink(v2, v3);
        addVoteLink(v3, v4);
        addVoteLink(v4, v5);
    });
    
    return voteLinks;
}

// based on https://developers.google.com/chart/interactive/docs/gallery/sankey
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Votes');

    // add a bunch of vote links with count 0 to control order of nodes
    const alphabatize = [
        [ 'Borgia', ' Borgia', 0 ], // 0,1
        [ 'Carafa', ' Borgia', 0 ], // 2,1
        [ 'Colonna', ' Colonna', 0 ], // 3,4
        [ 'Conti', ' Conti', 0 ], // 5,6
        [ 'De Prie', ' De Prie', 0 ], // 7,8
        [ 'Della Rovere', ' Della Rovere', 0 ], // 9,10
        [ 'Orsini', ' Orsini', 0 ], // 11, 12
        [ 'Piccolomini', ' Piccolomini', 0 ], // 13,14
        [ 'Schiner', ' Schiner', 0 ], // 15,16
        [ 'Sforza', ' Sforza', 0 ], // 17,18
        [ 'n/a', ' Borgia', 0 ], // 19,1
        [ '  Borgia', 'Borgia ', 0 ], // 20,21
        [ '  Della Rovere', 'Della Rovere ', 0 ], // 22,23
        [ '  Nanni', 'Sforza ', 0 ], // 24,25
        [ '  Sforza', 'n/a ', 0 ], // 26,27
        [ 'Borgia ', 'Borgia  ', 0 ], // 20,28
        [ 'Borgia ', 'Della Rovere  ', 0 ], // 20,29
        [ 'Borgia ', 'n/a  ', 0 ], // 20,30
    ];
    let rows = [...alphabatize, ...buildData()];
    data.addRows(rows);

    // setup the colors
    let nodeColors = Array(31).fill(gray);
    const colorNodes = [
        // color Borgia nodes red
        { row: 0, color: red },
        { row: 1, color: red },
        { row: 20, color: red },
        { row: 21, color: red },
        { row: 28, color: red },
        // color Della Rovere nodes blue
        { row: 9, color: blue },
        { row: 10, color: blue },
        { row: 22, color: blue },
        { row: 23, color: blue },
        { row: 29, color: blue },
        // color Sforza nodes yellow
        { row: 17, color: yellow },
        { row: 18, color: yellow },
        { row: 25, color: yellow },
        { row: 26, color: yellow },
    ];
    colorNodes.forEach(item=> {
        nodeColors[item.row] = item.color;
    });

    // Set chart options
    var options = {
        sankey: {
            node: {
                colors: nodeColors,
            },
            link: {
                colorMode: 'gradient',
                colors: nodeColors,
            },
            iterations: 0, // so that order of nodes is same as input order
        }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    console.log(chart.Sankey);
    chart.draw(data, options);
}

google.charts.load("current", {packages:["sankey"]});
google.charts.setOnLoadCallback(drawChart);