const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require('path');
const usersFilePath = path.join(__dirname, "./data/usuario.json")
const usuarios= JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

let usersControllers = {

    accessRegister: function(req, res, next) {
        res.render('register');
      },

    saveProfile: function(req, res, next) {
        

        let nuevoUser = {};

        nuevoUser.id = usuarios.length+1,    
        nuevoUser.nombre = req.body.nombre,
        nuevoUser.apellido = req.body.apellido,
        nuevoUser.email = req.body.email,
        nuevoUser.password = bcrypt.hashSync(req.body.password1, 10),
        nuevoUser.password2 = bcrypt.hashSync(req.body.password2, 10),
        nuevoUser.avatar = req.files[0].filename
        

        usuarios.push(nuevoUser);
        let userModificadosJson = JSON.stringify(usuarios);
        fs.writeFileSync(usersFilePath, userModificadosJson);

    

        res.redirect("login");

    },

        accessProfile: function(req, res, next) {
            
            let usuario = usuarios.find(function(element) {
                return element.name == usuarios.name;
            })

            console.log(usuario)
            
        res.render("profile", {
            title: "Mercado Libre Argentina",
            usuarios: usuarios,
            usuario: usuario
         });

         console.log(usuarios)
         

},
     login: function(req, res, next) {
    res.render("login");
},

processLogin: function(req, res, next) {
    let usuarioQueSeLoguea = usuarios.find(function(element) {
        if (element.email == req.body.email) {
           return element
        
        }
    })
    

    if (usuarioQueSeLoguea == undefined) {
        res.send("Email no encontrado"); 
    } 

    if (usuarioQueSeLoguea.email == req.body.email && (!bcrypt.compareSync(req.body.password, usuarioQueSeLoguea.password))) {
        res.send("contraseña incorrecta")
    }
   
    if (usuarioQueSeLoguea.email == req.body.email && (bcrypt.compareSync(req.body.password, usuarioQueSeLoguea.password))) {
        
        res.render("profile", {
            title: "Tu Perfil",
            nombre: usuarioQueSeLoguea.nombre,
            email: usuarioQueSeLoguea.email,
            avatar: usuarioQueSeLoguea.avatar 
    }) 
     };

     
    
        }
    
       
}








module.exports = usersControllers;