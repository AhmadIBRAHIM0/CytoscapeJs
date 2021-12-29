let doc = [
{"type":"node","id":"0","labels":["enchainement"],"properties":{"titre":"start intro"}},
{"type":"node","id":"1","labels":["activite"],"properties":{"titre":"intro","desc":"Introduction aux bases de données"}},
{"type":"node","id":"2","labels":["activite"],"properties":{"titre":"cle primaires","desc":"Concept de clé primaire"}},
{"type":"node","id":"3","labels":["activite"],"properties":{"titre":"cle etrangeres","desc":"Concept de clé étrangère"}},
{"type":"node","id":"4","labels":["enchainement"],"properties":{"titre":"stop intro"}},
{"type":"node","id":"5","labels":["enchainement"],"properties":{"titre":"start LCD"}},
{"type":"node","id":"6","labels":["activite"],"properties":{"titre":"typage","desc":"typage de données"}},
{"type":"node","id":"7","labels":["activite"],"properties":{"titre":"create table","desc":"création de table"}},
{"type":"node","id":"8","labels":["activite"],"properties":{"titre":"contraintes","desc":"contraintes sur les données"}},
{"type":"node","id":"9","labels":["enchainement"],"properties":{"titre":"stop lcd"}},
{"type":"node","id":"10","labels":["enchainement"],"properties":{"titre":"start lmd"}},
{"type":"node","id":"11","labels":["activite"],"properties":{"titre":"lmd insert","desc":"insertion d'enreigstrement(s)"}},
{"type":"node","id":"12","labels":["activite"],"properties":{"titre":"lmd update","desc":"modification d'enreigstrement(s)"}},
{"type":"node","id":"13","labels":["activite"],"properties":{"titre":"lmd delete","desc":"suppression d'enreigstrement(s)"}},
{"type":"node","id":"14","labels":["enchainement"],"properties":{"titre":"stop lmd"}},
{"type":"node","id":"15","labels":["enchainement"],"properties":{"titre":"start lid"}},
{"type":"node","id":"16","labels":["activite"],"properties":{"titre":"select from where","desc":"select from where"}},
{"type":"node","id":"17","labels":["activite"],"properties":{"titre":"join","desc":"join"}},
{"type":"node","id":"18","labels":["activite"],"properties":{"titre":"outer join","desc":"outer join"}},
{"type":"node","id":"19","labels":["activite"],"properties":{"titre":"group by","desc":"group by"}},
{"type":"node","id":"20","labels":["activite"],"properties":{"titre":"having","desc":"having"}},
{"type":"node","id":"21","labels":["activite"],"properties":{"titre":"union except","desc":"union except"}},
{"type":"node","id":"22","labels":["activite"],"properties":{"titre":"order by","desc":"order by"}},
{"type":"node","id":"23","labels":["enchainement"],"properties":{"titre":"stop lid"}},
{"type":"node","id":"24","labels":["enchainement"],"properties":{"titre":"start algebra"}},
{"type":"node","id":"25","labels":["activite"],"properties":{"titre":"algebra","desc":"algèbre relationnelle"}},
{"type":"node","id":"26","labels":["enchainement"],"properties":{"titre":"stop algebra"}},
{"id":"0","type":"relationship","label":"connecteur","start":{"id":"0","labels":["enchainement"]},"end":{"id":"1","labels":["activite"]}},
{"id":"1","type":"relationship","label":"sequence","start":{"id":"1","labels":["activite"]},"end":{"id":"2","labels":["activite"]}},
{"id":"2","type":"relationship","label":"sequence","start":{"id":"2","labels":["activite"]},"end":{"id":"3","labels":["activite"]}},
{"id":"3","type":"relationship","label":"connecteur","start":{"id":"3","labels":["activite"]},"end":{"id":"4","labels":["enchainement"]}},
{"id":"4","type":"relationship","label":"connecteur","start":{"id":"4","labels":["enchainement"]},"end":{"id":"5","labels":["enchainement"]}},
{"id":"5","type":"relationship","label":"connecteur","start":{"id":"5","labels":["enchainement"]},"end":{"id":"6","labels":["activite"]}},
{"id":"6","type":"relationship","label":"sequence","start":{"id":"6","labels":["activite"]},"end":{"id":"7","labels":["activite"]}},
{"id":"7","type":"relationship","label":"sequence","start":{"id":"7","labels":["activite"]},"end":{"id":"8","labels":["activite"]}},
{"id":"8","type":"relationship","label":"connecteur","start":{"id":"8","labels":["activite"]},"end":{"id":"9","labels":["enchainement"]}},
{"id":"9","type":"relationship","label":"connecteur","start":{"id":"4","labels":["enchainement"]},"end":{"id":"10","labels":["enchainement"]}},
{"id":"10","type":"relationship","label":"connecteur","start":{"id":"10","labels":["enchainement"]},"end":{"id":"11","labels":["activite"]}},
{"id":"11","type":"relationship","label":"sequence","start":{"id":"11","labels":["activite"]},"end":{"id":"12","labels":["activite"]}},
{"id":"12","type":"relationship","label":"sequence","start":{"id":"12","labels":["activite"]},"end":{"id":"13","labels":["activite"]}},
{"id":"13","type":"relationship","label":"connecteur","start":{"id":"13","labels":["activite"]},"end":{"id":"14","labels":["enchainement"]}},
{"id":"14","type":"relationship","label":"connecteur","start":{"id":"4","labels":["enchainement"]},"end":{"id":"15","labels":["enchainement"]}},
{"id":"15","type":"relationship","label":"connecteur","start":{"id":"15","labels":["enchainement"]},"end":{"id":"16","labels":["activite"]}},
{"id":"16","type":"relationship","label":"sequence","start":{"id":"16","labels":["activite"]},"end":{"id":"17","labels":["activite"]}},
{"id":"17","type":"relationship","label":"sequence","start":{"id":"17","labels":["activite"]},"end":{"id":"18","labels":["activite"]}},
{"id":"18","type":"relationship","label":"sequence","start":{"id":"16","labels":["activite"]},"end":{"id":"19","labels":["activite"]}},
{"id":"19","type":"relationship","label":"sequence","start":{"id":"19","labels":["activite"]},"end":{"id":"20","labels":["activite"]}},
{"id":"20","type":"relationship","label":"sequence","start":{"id":"16","labels":["activite"]},"end":{"id":"21","labels":["activite"]}},
{"id":"21","type":"relationship","label":"sequence","start":{"id":"16","labels":["activite"]},"end":{"id":"22","labels":["activite"]}},
{"id":"22","type":"relationship","label":"connecteur","start":{"id":"18","labels":["activite"]},"end":{"id":"23","labels":["enchainement"]}},
{"id":"23","type":"relationship","label":"connecteur","start":{"id":"21","labels":["activite"]},"end":{"id":"23","labels":["enchainement"]}},
{"id":"24","type":"relationship","label":"connecteur","start":{"id":"22","labels":["activite"]},"end":{"id":"23","labels":["enchainement"]}},
{"id":"25","type":"relationship","label":"connecteur","start":{"id":"4","labels":["enchainement"]},"end":{"id":"24","labels":["enchainement"]}},
{"id":"26","type":"relationship","label":"connecteur","start":{"id":"24","labels":["enchainement"]},"end":{"id":"25","labels":["activite"]}},
{"id":"27","type":"relationship","label":"connecteur","start":{"id":"25","labels":["activite"]},"end":{"id":"26","labels":["enchainement"]}},
{"id":"28","type":"relationship","label":"connecteur","start":{"id":"26","labels":["enchainement"]},"end":{"id":"15","labels":["enchainement"]}}
];

const json2Elements = function(jsondoc) {
  let nodes = []
  jsondoc.forEach(function (n) {
  	if (n.type == "node") {
      nodes.push({ data: { id: n.id, name: n.properties.titre, type: n.labels[0]} });
    }
  });

  let edges = []
  jsondoc.forEach(function (e) {
  	if (e.type == "relationship") {
      edges.push({ data: { source: e.start.id, target: e.end.id} });
    }
  });

  return {nodes: nodes, edges: edges};
};
