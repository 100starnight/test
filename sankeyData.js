// color constants 
const red = '#db3236';
const blue = '#4885ed';
const yellow = '#f4c20d';
const gray = '#bababa';
const black = '#000000';
const white = '#ffffff';

function buildData() {
    const data = [
        //`Cardinal,Vote 1,Vote 2,Vote 3,Vote 4,Vote 5,Vote 5.5,Vote 6`
        `D'Aubusson,Della Rovere,Briconnet,Della Rovere,Della Rovere,Piccolomini,Della Rovere,Borgia`,
        `Bembo,Della Rovere,Della Rovere,Piccolomini,Borgia,Sforza,Sforza,Borgia`,
        `Borgia,Borgia,Borgia,Borgia,Borgia,Borgia,Borgia,Borgia`,
        `Briconnet,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Sforza,Della Rovere,Della Rovere`,
        `De Bucy,Della Rovere,Nanni,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere`,
        `Campofregoso,Sforza,Sforza,Sforza,Sforza,Sforza,Sforza,Borgia`,
        `Carafa,Borgia,Borgia,Borgia,Borgia,Borgia,Borgia,Borgia`,
        `Castellesi,Sforza,Sforza,Borgia,Sforza,Borgia,Sforza,Borgia`,
        `Colonna,Colonna,Colonna,Colonna,Colonna,Sforza,Sforza,Sforza`,
        `Conti,Borgia,Orsini,Borgia,Sforza,Borgia,Sforza,Borgia`,
        `Da Costa,D'Aubusson,Della Porta,Da Costa,Borgia,Borgia,Sforza,Sforza`,
        `D'Este,Sforza,Sforza,Borgia,Borgia,Sforza,Sforza,Borgia`,
        `Gentili,Sforza,Sforza,Della Rovere,Della Rovere,Sforza,Sforza,Sforza`,
        `Patriarch,Orsini,Orsini,Patriarch,Borgia,Sforza,Sforza,Borgia`,
        `Medici,Orsini,Piccolomini,Borgia,Borgia,Patriarch,Patriarch,Patriarch`,
        `Nanni,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Borgia,Borgia`,
        `Orsini,Orsini,Orsini,Borgia,Borgia,Orsini,Borgia,Borgia`,
        `Piccolomini,Nanni,Piccolomini,Carafa,Carafa,Sforza,Sforza,Sforza`,
        `Della Porta,Nanni,Piccolomini,Piccolomini,Piccolomini,Sforza,Sforza,Borgia`,
        `De Prie,Nanni,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere`,
        `Riario,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Borgia,Della Rovere,Della Rovere`,
        `Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere`,
        `Basso,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere`,
        `Domenico,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Della Rovere,Medici,Medici`,
        `Achilles,Sforza,Sforza,Sforza,Sforza,Sforza,Borgia,Borgia`,
        `Sanseverino,Sanseverino,Sanseverino,Piccolomini,Sforza,Sforza,Sforza,Sforza`,
        `Savelli,Colonna,Colonna,Colonna,Colonna,Borgia,Borgia,Borgia`,
        `Schiner,Della Rovere,Colonna,Colonna,Borgia,Borgia,Borgia,Borgia`,
        `Soderini,Sforza,Nanni,Sforza,Sforza,Sforza,Sforza,Sforza`,
        `Sforza,Sforza,Sforza,Sforza,Sforza,Sforza,Sforza,Sforza`,
        `Torriani,Borgia,Borgia,Borgia,Borgia,Borgia,Sforza,Borgia`,
        `B. Zen,Patriarch,Patriarch,Patriarch,Della Rovere,Sforza,Medici,Medici`,
        `M. Zen,Patriarch,Patriarch,Patriarch,Patriarch,Sforza,Sforza,Sforza`,
        `C. Borgia,,,Borgia,Borgia,Borgia,Medici,Borgia`,
        `Farnese,,,,,Borgia,Borgia,Borgia`,
    ];

    // reformat data into list of "vote links" each containing [ from, to, count ] data
    let voteLinks = [];
    data.forEach(cardinal => {
        let [_name, v1, v2, v3, v4, v5, v5b, v6] = cardinal.split(',');

        // NOTE: Sankey library does not support haivng muiltple nodes with the same title, so
        // spaces are added to differentiate between nodes in different voting rounds
        //      Vote 1: Name
        //      Vote 2: Name_
        //      Vote 3: Name__
        //      Vote 4: Name___
        //      Vote 5: Name____
        //      Vote 6: Name_____
        v2 = v2 ? `${v2} ` : undefined;
        v3 = v3 ? `${v3}  `: undefined;
        v4 = v4 ? `${v4}   ` : undefined;
        v5 = v5 ? `${v5}    ` : undefined;
        v5b = v5b ? `${v5b}     ` : undefined;
        v6 = v6 ? `${v6}      ` : undefined;

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
        addVoteLink(v5, v5b);
        addVoteLink(v5b, v6);
    });
    
    return voteLinks;
}

// based on https://developers.google.com/chart/interactive/docs/gallery/sankey
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Votes');

    const rows = buildData();
    data.addRows(rows);

    // Sankey library doesn't expose nodes, so create them
    const nodes = [];
    rows.forEach((link) => {
        if (!nodes.includes(link[0])) {
            nodes.push(link[0]);
        }
        if (!nodes.includes(link[1])) {
            nodes.push(link[1]);
        }
    });
    // match nodes to appropriate colors
    let nodeColors = Array(nodes.length);
    nodes.forEach((node, index) => {
        let color = gray;
        const name = node.trim();
        // color the Borgia nodes red
        if (name === 'Borgia') {
            color = red;
        }
        // color the Della Rovere nodes blue
        if (name === 'Della Rovere') {
            color = blue;
        }
        // color the Sforza nodes yellow
        if (name === 'Sforza') {
            color = yellow;
        }
        nodeColors[index] = color;
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
    chart.draw(data, options);
}

google.charts.load("current", {packages:["sankey"]});
google.charts.setOnLoadCallback(drawChart);