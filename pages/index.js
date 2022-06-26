import axios from 'axios';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
import { useEffect, useState } from 'react';
//função para receber usuários do backend
export default function Services() {
    const [services, setServices] = useState();

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get('http://localhost:3001/users');
            setServices(response.data);
            
           
        };
        getUsers();
        
    }, []);

    // função para criar usuários
    const createUser = async () => {
        const name = document.getElementById('name').value;
        const nickname = document.getElementById('nickname').value;
        const age = document.getElementById('age').value;
        const cpf = document.getElementById('cpf').value;
        const phone = document.getElementById('phone').value;
        const gender = document.getElementById('gender').value;
        const address = document.getElementById('address').value;
        const img = document.getElementById('img').value;
        const obs = document.getElementById('obs').value;
        const id = Math.floor(Math.random() * 100)

        const response = await axios.post('http://localhost:3001/users', { name, age, cpf, phone, gender, nickname, address, img, obs, id });
        setServices(response.data);
    };
    const deleteUser = async (id) => {
        // const id = document.getElementById(`${service.id}`).value
        console.log(id);
        const response = await axios.post('http://localhost:3001/users/delete', { id });
        setServices(response.data);
    };
    const changeUser = async (service) => {
        const id = document.getElementById(`${service.id}`).value
        const name = document.getElementById(`${service.id}1${service.name}`).value
        const nickname = document.getElementById(`${service.id}2${service.nickname}`).value
        const age = document.getElementById(`${service.id}3${service.age}`).value
        const cpf = document.getElementById(`${service.id}4${service.cpf}`).value
        const phone = document.getElementById(`${service.id}5${service.phone}`).value
        const gender = document.getElementById(`${service.id}6${service.gender}`).value
        const address = document.getElementById(`${service.id}7${service.address}`).value
        const img = document.getElementById(`${service.id}8${service.img}`).value
        const obs = document.getElementById(`${service.id}9${service.obs}`).value
        const date = document.getElementById(`${service.id}10${service.date}`).value
        const changeDate = document.getElementById(`${service.id}11${service.changeDate}`).value
        
        const response = await axios.put('http://localhost:3001/users/', { 'name': name,    'nickname': nickname, 'age': age, 'cpf': cpf, 'phone': phone, 'gender': gender, 'address': address, 'img': img, 'obs': obs, date, changeDate, 'id': id });
        setServices(response.data);
    };

return (

<section>
    <header>
        CADASTRO
    </header>
    {/* {Formulário para criação de usuários} */}
    <form   id="creatForm"
            onSubmit={(e) => {
                e.preventDefault();
                const cpf = document.getElementById('cpf').value;
                const phone = document.getElementById('phone').value
                if(cpf.length >= 11 & phone.length >= 11) {createUser();}
                
            }}
        >
        
        <label>Nome*</label>
        <input id="name" placeholder="nome completo" required/>
        <label>Apelido</label>
        <input id="nickname" />
        <label>Idade*</label>
        <input id="age" type="number required"  />
        <label>CPF/min(11 caracteres)*</label>
        <input id="cpf" type="number required"  />
        <label>Telefone/min(11 caracteres)*</label>
        <input id="phone" type="number"  placeholder="ddd + telefone required" required/>
        <label>Gênero</label>
        <select id="gender" name="gender" >
            <option value="none" selected >Gênero</option>
            <option value="Homem">Homem</option>
            <option value="Mulher">Mulher</option>
            <option value="Outro">Outro</option>
        </select>
        <label>Endereço</label>
        <input id="address" type="text" autocomplete="off" name='e' display="none" height="4500"/>
        <label>Foto de perfil</label>
        <input id="img" type="file" placeholder="foto de perfil" name='e' />
        <label>Observações</label>
        <textarea id="obs"  />
        <button id="cadastrar">CADASTRAR</button>
    </form>

        <div id="division">
            USUÁRIOS
        </div>
        <div id="users">
        {services?.map((service) => (
        <div>
            {/* formulário para alteração de usuários */}
            <form id="userForm"
                // onSubmit={(e) => {
                //     e.preventDefault();
                    
                //     // changeUser(); 
                // }}
            >
            {/* dados do banco de dados */}
            <label>Nome*</label>    
            <input id={`${service.id}1${service.name}`} type="text"placeholder={service.name}/>
            <label>Apelido</label>
            <input id={`${service.id}2${service.nickname}`} type="text" placeholder={service.nickname}/>
            <label>Idade</label>
            <input id={`${service.id}3${service.age}`} type="number" placeholder={service.age}/>
            <label>CPF</label>
            <input id={`${service.id}4${service.cpf}`} type="number" placeholder={service.cpf} /> 
            <label>Telefone</label>
            <input id={`${service.id}5${service.phone}`}  placeholder={service.phone}/>
            <label>Gênero</label>
            <select id={`${service.id}6${service.gender}`} name="gender" placeholder={service.gender} >
                <option value="" disabled selected>{service.gender}</option>
                <option value="Homem">Homem</option>
                <option value="Mulher">Mulher</option>
                <option value="Outro">Outro</option>
            </select>
            <label>Endereço</label>
            <input id={`${service.id}7${service.address}`} placeholder={service.address}/>
            <label>Foto de Perfil</label>
            <input id={`${service.id}8${service.img}`} type="file" placeholder={service.img}/>
            <label>Observações</label>  
            <input id={`${service.id}9${service.obs}`} placeholder={service.obs}/>
            <label>Data de criação</label>
            <input id={`${service.id}10${service.date}`} placeholder={service.date}/>
            <label>Data de Edição</label>
            <input id={`${service.id}11${service.changeDate}`} placeholder={service.changeDate}/>
            <label >ID</label>
            <input id={service.id} value={service.id}  readonly="readonly"/>   
            <div id="buttons">
                <button id="change" type="button" form="userForm" onClick={() => changeUser(service)}>ALTERAR</button>
                <button id="delete" type="button" form="deleteUser" onClick={() => deleteUser(service.id)}>DELETAR</button>
            </div>
            {console.log(service.id)}
            </form>
            {/* formulário de deleção */}
            
            
        </div>  
        
    ))}
    
    </div>
</section>
);
}