// cytoscape style
let style = [{
    'selector': 'node',
    'style': {
        'shape': 'round',
        'width':60,
        'height':60,
        'content': 'data(name)',
        'text-valign': 'center',
        //'text-outline-color': 'data(faveColor)',
        'background-color': '#000',
       // 'background-opacity': 0.2,
        //'border-width': '0px',
        //'border-color': '#000',
        'color': '#000'
    }
}, {
    'selector': ':selected',
    'style': {
        'border-width': 3,
        'border-color': 'royalblue'
    }
}, {
    'selector': ':parent',
    'style': {
        'background-opacity': 0.333
    }
}, {
    'selector': 'edge',
    'style': {
        'curve-style': 'taxi-bezier',
        //'opacity': 0.666,
        'width': 4,
        'line-color': '#000',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': 'royalblue'/*,
        'line-color': 'data(faveColor)',
        'source-arrow-color': 'data(faveColor)',
        'target-arrow-color': 'data(faveColor)'*/
    }
}, {
    'selector': 'edge.questionable',
    'style': {
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
    }
}, {
    'selector': '.faded',
    'style': {
        'opacity': 0.25,
        'text-opacity': 0
    }
}];

// code
document.addEventListener('DOMContentLoaded', function() { // on dom ready
    var toJson = function(res){ return res.json(); };
    let effacer = "$(this).closest('.form-group').remove();";
    var cy = cytoscape({
        container: document.querySelector('#cy'),
        
        layout: {
            name: 'dagre',
            rankDir: 'LR',
            fit:true
        },
        
        style: style, //fetch('cy-style.json').then(toJson),
        
        elements: graph2
		// elements: json2Elements(doc)
		//elements: fetch('http://vps-e9e90ee3.vps.ovh.net:5000/lecons_detail').then(toJson)
    });

    // Définition du layout au démarrage
    let missingPos = false;
    for (let i = 0; i < cy.nodes().length; i++) {
        let node = cy.nodes()[i];
        // S'il manque au moins une position x ou y dans le fichier json, on choisit un layout par défaut
        if(!(node.data('x') && node.data('y'))) {
            missingPos = true;
        }
    }
    if(missingPos) {
        // Utilisation du layout par défaut
        cy.layout({
            name: 'dagre',
            rankDir: 'LR',
            fit:true
        });

        // Attribution des positions de bases en tant qu'attributs
        for (let i = 0; i < cy.nodes().length; i++) {
            let node = cy.nodes()[i];
            node.data('x', node.position().x);
            node.data('y', node.position().y);
        }
    }
    else {
        // La donnée sur la position existe déjà, on s'en sert pour disposer les noeuds (utile après une première sauvegarde)
        cy.layout({
            name: 'preset',
            positions: (node) => {return {x: node.data('x'), y: node.data('y')}}
        })
    }


    
    cy.on('mouseover', 'node', function(e) {
        var node = e.cyTarget;
        //var neighborhood = node.neighborhood().add(node);
        var neighborhood = cy.elements().successors().add(node);
        
        cy.elements().addClass('faded');
        neighborhood.removeClass('faded');
        
        //affichage données noeud/groupe ---------------------------------------------------------------------------------------        
        document.querySelector('#info').innerHTML = '';
        let data = [];
        data = node.data();
        Object.keys(data)
          .forEach(function eachKey(key) {
              if(key !== 'x' && key !== 'y')
              {
                document.querySelector('#info').innerHTML += '<b>'+key +'</b> <br> <span style="color: yellow;">'+ data[key]+'</span> <br /> <hr>';
              }
        
          });

    });
    let evtTarget = [];
    cy.on('tap', function(e) {
        evtTarget = e.cyTarget;
        if (e.cyTarget === cy) {
            cy.elements().removeClass('faded');
        }else{
            target = evtTarget.data('id');
        }
    });

    const btn = document.querySelector(".btn-delete");
    btn.addEventListener("click", function () {
        if (confirm('Êtes-vous sur de vouloir supprimer l\'élément ?')) {
            cy.remove(evtTarget);
        } else {
        }
    });

    $('#Add_Node').click(function () {
        $('.modal-title').html('Ajouter un noeud');
        $('#FormModal').modal('show');
        $('#save').val('new');
        let div = $('.content')
        div.empty();
        let new_html = '';
        new_html += '<div class="form-group" style="margin-bottom: 20px">';
        new_html += '<div class="form-floating">';
        new_html += '<input type="text" name="nom[]" autocomplete="disabled" class="form-control" placeholder="Nom" value="Title"/>';
        new_html += '<label>Nom</label>';
        new_html += '</div>';
        new_html += '<div class="form-floating" style="margin-top: 10px">';
        new_html += '<input type="text" name="valeur[]" autocomplete="disabled" class="form-control" placeholder="Contenu"/>';
        new_html += '<label>Contenu</label>';
        new_html += '</div>';
        new_html +='<a href="javascript:void(0);" class="link delete delete-row" onclick="'+effacer+'" style="margin-top: 3px">Effacer</a>';
        new_html += '<hr>';
        new_html += '</div>';
        new_html += '<div class="form-group" style="margin-bottom: 20px">';
        new_html += '<div class="form-floating">';
        new_html += '<input type="text" name="nom[]" autocomplete="disabled" class="form-control" placeholder="Nom" value="Content"/>';
        new_html += '<label>Nom</label>';
        new_html += '</div>';
        new_html += '<div class="form-floating" style="margin-top: 10px">';
        new_html += '<input type="text" name="valeur[]" autocomplete="disabled" class="form-control" placeholder="Contenu"/>';
        new_html += '<label>Contenu</label>';
        new_html += '</div>';
        new_html +='<a href="javascript:void(0);" class="link delete delete-row" onclick="'+effacer+'" style="margin-top: 3px">Effacer</a>';
        new_html += '<hr>';
        new_html += '</div>';
        div.append(new_html);
        // const btn = document.querySelector("#save");
        $('#save').click(function () {
                if ($('#save').val() === 'new') {
                    let noms = [];
                    let valeurs = [];
                    let obj={};
                    $("input[name='nom[]']").each(function() {
                        noms.push($(this).val());
                    });
                    $("input[name='valeur[]']").each(function() {
                        valeurs.push($(this).val());
                    });
                    for (var key in noms) {
                        obj[noms[key]] = valeurs[key];
                    }
                    cy.add({
                        data: obj,
                        renderedPosition: {x: evtPosition.x, y: evtPosition.y}
                    });
                    $('#save').val('test')
                    $('#FormModal').modal('hide');
                }
            });
    });

    $('#add-data-row').click(function () {
        let div = $('.content');
        let newDiv = '';
        newDiv += '<div class="form-group" style="margin-bottom: 20px">';
        newDiv += '<div class="form-floating">';
        newDiv += '<input type="text" name="nom[]" autocomplete="disabled" class="form-control" placeholder="Nom"/>';
        newDiv += '<label>Nom</label>';
        newDiv += '</div>';
        newDiv += '<div class="form-floating" style="margin-top: 10px">';
        newDiv += '<input type="text" name="valeur[]" autocomplete="disabled" class="form-control" placeholder="Contenu"/>';
        newDiv += '<label>Contenu</label>';
        newDiv += '</div>';
        newDiv +='<a href="javascript:void(0);" class="link delete delete-row" onclick="'+effacer+'" style="margin-top: 3px">Effacer</a>';
        newDiv += '<hr>';
        newDiv += '</div>';
        div.append(newDiv);
    });

        cy.on('free', function(event) {
        console.log(event);
        let node = event.cyTarget;
        node.position({
            x: Math.round(node.position().x),
            y: Math.round(node.position().y)
        });
        node.data('x', node.position().x);
        node.data('y', node.position().y);

    });

    $('#edit').click(function () {
        let data = [];
        data = evtTarget.data();
        $('.modal-title').html('Édition');
        $('#FormModal').modal('show');
        $('#save').val('update');
        let div = $('.content')
        div.empty();
        let new_html = '';
        Object.keys(data)
            .forEach(function eachKey(key) {
                new_html += '<div class="form-group">';
                if (key !== 'id' && key!== 'x' && key !== 'y' && key !== 'parent') {

                    new_html += '<div class="form-group" style="margin-bottom: 20px">';
                    new_html += '<div class="form-floating">';
                    new_html += '<input type="text" name="nom[]" autocomplete="disabled" class="form-control" placeholder="Nom" value="'+key+'"/>';
                    new_html += '<label>Nom</label>';
                    new_html += '</div>';
                    new_html += '<div class="form-floating" style="margin-top: 10px">';
                    new_html += '<input type="text" name="valeur[]" autocomplete="disabled" class="form-control" placeholder="Contenu" value="'+data[key]+'"/>';
                    new_html += '<label>Contenu</label>';
                    new_html += '</div>';
                    new_html +='<a href="javascript:void(0);" class="link delete delete-row" onclick="'+effacer+'" style="margin-top: 3px">Effacer</a>';
                    new_html += '<hr>';
                    new_html += '</div>';
                }
            });
        div.append(new_html);
        const btn = document.querySelector("#save");
            btn.addEventListener("click", function () {
                if (btn['value'] === 'update') {
                    let noms = [];
                    let valeurs = [];
                    $("input[name='nom[]']").each(function() {
                        noms.push($(this).val());
                    });
                    $("input[name='valeur[]']").each(function() {
                        valeurs.push($(this).val());
                    });
                    // evtTarget.removeData();
                    Object.keys(data)
                        .forEach(function eachKey(key) {
                            if (key === 'parent' || key === 'id') {

                            } else {
                                if (evtTarget.data().hasOwnProperty(key)){
                                    delete evtTarget.data()[key];
                                }
                            }
                            // evtTarget.data(key);
                        });
                    Object.keys(noms)
                        .forEach(function eachKey(key) {
                            if (key === 'id') {

                            } else {
                                evtTarget.data(noms[key], valeurs[key]);
                            }
                            // evtTarget.data(key);
                        });
                    $('#FormModal').modal('hide');
                }
            });
});
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const btn_add_arc = document.querySelector('#Add_edge');
    btn_add_arc.addEventListener("click",  async function () {
        target = '';
        while (target === '')
        {
            await sleep(50);
            cy.on('click', function(evt){
                target = this;
          });

        };
            cy.add({
                group: 'edges', data: {  source: source , target: target }
            });
        });

      cy.on('cxttap', function(event) {
          event.preventDefault();
          evtTarget = event.cyTarget;
          evtPosition = event.cyRenderedPosition;
          if (event.cyTarget === cy) {
            cy.elements().removeClass('faded');
            document.getElementById("myContext").children[0].style.display = "block"
            for (let i = 1; i <=3; i++)
            {
                document.getElementById("myContext").children[i].style.display = "none"
            }

        }
        else {
            // console.log(evtTarget.data()['target']);
            if (evtTarget.data()['target'] && evtTarget.data()['source'])
            {
                document.getElementById("myContext").children[3].style.display = "block"
                for (let i = 0; i <=2; i++)
                {
                    document.getElementById("myContext").children[i].style.display = "none"
                }
            }
            else{
                document.getElementById("myContext").children[0].style.display = "none"
                for (let i = 1; i <=3; i++)
                {
                    document.getElementById("myContext").children[i].style.display = "block"
                }
            }
        }
              // console.log(evtPosition);
              if (document.getElementById("contextMenu")
                  .style.display === "block")
              {
                  hideMenu();
              }
              else{
                  // console.log(evtTarget.data('id'));
                  var menu = document.getElementById("contextMenu")
                  menu.style.display = 'block';
                  menu.style.left = evtPosition.x + "px";
                  // let y = evtPosition.y + 100;
                  let y = evtPosition.y + 60 ;
                  menu.style.top = y + "px";
                  if (evtTarget.length){
                      source = evtTarget.data('id');
                  }
              }
          // }
        // console.log('Clic droit');

      });
      let target = '';
      let source = '';
      let evtPosition = [];
    document.onclick = hideMenu;
    function hideMenu() {
        document.getElementById("contextMenu")
            .style.display = "none"
    }

    //setting colors
    const colors = {}
    //random dark color
    function getRandomColor(id) {
        if (colors[id]) return colors[id]
        const letters = '0123456789ABCDEF';
        let color = '#' + letters.substr(0, 5)[Math.floor(Math.random() * 5)]
        for (let i = 1; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function setRandomColor(el, parent) {
        let id = parent.data().id
        if (!colors[id]) colors[id] = getRandomColor(id)
        const color = colors[id]
        setColor(el, color)
    }

    function setColor(el, color) {
        if (!el || !el.style) return false;
        el.style('background-color', color)
        el.style('border-color', color)
    }

    function setParentColors(parent) {
        if (!parent.data) return false;
        // setColor(parent, 'white')
        setRandomColor(parent, parent)
        for (let el of Object.values(parent.children())) {
            setRandomColor(el, parent)
        }
    }

    //set colors
    const parents = Object.values(cy.$(':parent'))
    for (let parent of parents) {
        setParentColors(parent)
    }


    cy.navigator({});
});

