let globalUsers = [];
let filtro = [];
let sexoGlobal = null;
let sexoM = null;
let sexoF = null;
let idadeTotal = 0;
let mediaIdade = 0;


function start (){

    fetchUsers();
    enableFilter();
    handleFilter();
    
    
}



async function  fetchUsers () {
    const response = await fetch('http://localhost:3003/users');
    const json = await response.json();

    globalUsers = json.map(({name, picture, dob, gender}) => {
        return {
            userName:`${name.first.toLowerCase()} ${name.last.toLowerCase()}` ,
            userPicture: picture.large,
            userAge: dob.age,
            userSexo: gender,
        };
    })

 //   globalUsers.sort((a, b) => a.userName.localeCompare(b.userName));

console.log(globalUsers);
}


function enableFilter() {
    const buttonFilter = document.querySelector('#buttonFilter');
    const inputFilter = document.querySelector('#inputFilter');
  
    buttonFilter.addEventListener('click', handleFilter);
    inputFilter.addEventListener('keyup', handleKeyUp);
  }
  
  function handleKeyUp(event) {
    const { key } = event;
    // if (key !== 'Enter') {
    //   return;
    // }
    handleFilter();
  }
  
  function handleFilter() {
    const inputFilter = document.querySelector('#inputFilter');
    const filterValue = inputFilter.value.trim().toLowerCase();
    

        filtro = globalUsers.filter((item) => {
            return item.userName.includes(filterValue);
          });


          function clear() {
            if (filterValue === ''){
                filtro = [];
            }
        }

        clear();
          
 
    //   console.log(filtro);
    // for(let i =0; i < globalUsers.length; i++) {
    //     filtro =+ globalUsers[i].filter(function(obj) { return obj.userName === filterValue; })[0];
    // }

        console.log(filtro);;
        
        render();
        sexo();     
        somaIdade();
        mediaAge();
        
  }

function sexo() {

    let cont = [];

    filtro.forEach((user) => {
        cont = filtro.filter(
          (country) => country.userSexo === "male"
        );
        });
        sexoM = cont.length;
        sexoF = filtro.length - cont.length;

        const insertSexoM = document.querySelector('#sexoM');
        const insertSexoF = document.querySelector('#sexoF');


        insertSexoM.innerHTML = `Sexo Masculino ${sexoM}`;
        insertSexoF.innerHTML = `Sexo Feminino ${sexoF}`;


        // console.log('sexo masculino: ' +sexoM);
        // console.log('sexo feminino: ' +sexoF);

}


  function render() {
    const divUsers = document.querySelector('#divUsers');

    const divInfos = document.querySelector('#divInfos');
  
    divUsers.innerHTML = `
      <div class='row'>
      <div class='col6 s6 m6 l6'>
        ${filtro
          .map(({ userName, userPicture, userAge, userSexo}) => {
            return `
              <div class='flex-row bordered'>
                <img class='avatar' src='${userPicture}' alt='${userName}' />
                <div class='flex-column'>
                  <span>${userName}</span>                
                  <span>${userAge} anos</span>
                </div>
              </div>

              
            </div>
          `;
          })
          .join('')}     
      </div>  
    `;

    divInfos.innerHTML = `
    <div class='row'>
      
            <div class='col6 s6 m6 l6'>
              <div class='flex-row bordered'>
                <div class='flex-column'>

                  <div id="sexoM">Sexo Masculino:</div>                
                  <div id="sexoF">Sexo feminino:</div>                
                  <div>Soma das Idades: ${somaIdade() + ' anos'} </div>
                  <div>Média das Idades: ${mediaAge()} anos</div>
                </div>
              </div>
            </div>
              
      </div>  
    `;


    //o join acima stringfica o vetor e acrescenta o elemento que desejar no lugar das virgulas
    //nesse caso foi usado um espaço em branco
  }


  function blocoInfos () {

    divInfos.innerHTML = `
    <div class='row'>
      
            <div class='col6 s6 m6 l6'>
              <div class='flex-row bordered'>
                <div class='flex-column'>

                  <div id="sexoM">Sexo Masculino:</div>                
                  <div id="sexoF">Sexo feminino:</div>                
                  <div>Soma das Idades: ${somaIdade() + ' anos'} </div>
                  <div>Média das Idades: ${mediaAge()} anos</div>
                </div>
              </div>
            </div>
              
      </div>  
    `;

  }


function somaIdade() {

        const totalAges = filtro.reduce((accumulator, current) => {
          return accumulator + current.userAge;
        }, 0);
        
       // console.log('total: ' + idadeTotal)
        return  idadeTotal = totalAges;
      }

function mediaAge() {

  mediaIdade = parseFloat((idadeTotal / filtro.length).toFixed(2))            
 // console.log('media: ' +mediaIdade);
  return  mediaIdade;
   
}






start();





