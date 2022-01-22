"use strict";

const publicaciones = document.querySelector(".publicaciones");

let contador = 0;

const createPublicationCode = (name,content)=>{
	const container = document.createElement("DIV");
	const comentarios = document.createElement("DIV");
	const h1 = document.createElement("h1");
	const p = document.createElement("p");
	const comentario= document.createElement("input");
	const enviar= document.createElement("input");

	container.classList.add("publicacion");
	comentarios.classList.add("comentarios");
	comentario.classList.add("comentario");
	enviar.classList.add("enviar");
	comentario.placeholder= "Introduce un Comentario";
	h1.textContent = name;
	p.textContent = content;
	enviar.setAttribute("type", "submit");//enviar.type = "submit";

	comentarios.appendChild(comentario);
	comentarios.appendChild(enviar);
	container.appendChild(h1);
	container.appendChild(p);
	container.appendChild(comentarios);
	return container;

}

const cargarMasPublicaciones = (entrada)=>{
	if (entrada[0].isIntersecting) {
		cargarPublicaciones(4);
	}
}

const observer = new IntersectionObserver(cargarMasPublicaciones);

const cargarPublicaciones = async (num)=>{
	const reques = await fetch("informacion.txt");
	const contentRes = await reques.json();
	let arr = contentRes.content;
	// console.log(arr[0].contenido)
	const documentFragment = document.createDocumentFragment();
	for (let i = 0; i < num; i++) {
		if(arr[contador] !=undefined) {
			let replaceContent = arr[contador].contenido;
			let newPublicacion = createPublicationCode(arr[contador].nombre, replaceContent.replaceAll("'",'"'));
			
			documentFragment.appendChild(newPublicacion);
			contador++;
			if (i == num-1) {observer.observe(newPublicacion);}
		}else {
			if (publicaciones.lastElementChild.id != "noMasContent") {
				let finalContent = document.createElement("h2");
				finalContent.textContent = "No hay mas publicaciones";
				finalContent.id = "noMasContent";
				documentFragment.appendChild(finalContent);
				publicaciones.appendChild(documentFragment);
				break;
			}
		}
	}
	publicaciones.appendChild(documentFragment);
}
cargarPublicaciones(2)


//Api visibilityChange:
addEventListener("visibilitychange", (e)=>{
	if (e.target.visibilityState == "visible") { 
	}
})
if (!("Notification" in window )){
	console.log("no estan permitidas las notificaciones");
}
Notification.requestPermission(()=>{
	if (Notification.permission == "granted") {
		new Notification("No es necesario crear variables para las notificaciones")
	} else {
		console.log("No tienes permiso concedido");
	}
});