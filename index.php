<?php 

$DB = new PDO('mysql:host=localhost;dbname=test',"root","");

$req=$DB->query("select * from test");
$data = $req->fetchAll();

while ($data = $req->fetch()) {
	# code...
}
 ?>