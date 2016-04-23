if (window.openDatabase) {
  var mydb = openDatabase("research_db", "0.1", "Pesquisa de campo", 1024 * 1024);

  mydb.transaction(function(t) {
    t.executeSql("CREATE TABLE IF NOT EXISTS researches (id INTEGER PRIMARY KEY ASC, quality TEXT, suggestion TEXT)");
  });
} else {
  alert("Seu browser não tem suporte para WebSQL!");
}

//atualizar lista de pesquisas
function update_list(transaction, results) {
  var listitems = "";

  var listholder = document.getElementById("list");

  listholder.innerHTML = "";

  var i;

  for (i = 0; i < results.rows.length; i++) {
    var row = results.rows.item(i);

    listholder.innerHTML += "<li>" + 
    												"<span class='quality'>" + row.quality + "</span>" +
    												"<span class='suggestion'>" + row.suggestion  + "</span>" +
    												"<a href='javascript:void(0);' onclick='delete_research(" + row.id + ");' class='delete'></a>" +
    												"</li>";
  }

  var researcheslength = document.getElementById("list").children.length;

  if (researcheslength > 0) {
  	document.getElementById("researches").style.display = "block";
  }
  else {
  	document.getElementById("researches").style.display = "none";
  }
}

//mostrar pesquisas
function output_researches() {
  if (mydb) {
    mydb.transaction(function(t) {
      t.executeSql("SELECT * FROM researches", [], update_list);
    });
  } else {
    alert("Banco de dados não encontrado, seu browser não tem suporte para WebSQL.");
  }
}

//inserir nova pesquisa
function add_research() {
  if (mydb) {
  	var options = document.getElementsByName("quality");

		if (options) {
	    for (var i = 0; i < options.length; i++) {
        if (options[i].checked){
          var quality = options[i].value;
        }
	    }
		}

    var suggestion = $("#suggestion").val();

    if (quality !== undefined && suggestion !== "") {
      mydb.transaction(function(t) {
        t.executeSql("INSERT INTO researches (quality, suggestion) VALUES (?, ?)", [quality, suggestion]);

        output_researches();
      });
    } else {
      alert("Por favor, selecione a qualidade e faça uma sugestão.");
    }
  } else {
    alert("Banco de dados não encontrado, seu browser não tem suporte para WebSQL.");
  }
}

//apagar pesquisa
function delete_research(id) {
  if (mydb) {
    mydb.transaction(function(t) {
      t.executeSql("DELETE FROM researches WHERE id=?", [id], output_researches);
    });
  } else {
    alert("Banco de dados não encontrado, seu browser não tem suporte para WebSQL.");
  }
}

output_researches();

$("#insert").on("click", function(){
	add_research();
});
